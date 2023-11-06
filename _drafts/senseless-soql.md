---
layout: post
title: Senseless SOQL
description:
date: 2023-11-03T20:00:00.000Z
categories: ['salesforce', 'soql']
keywords: ['permissions', 'soql']
slug:
---

[Scott Covert](https://www.linkedin.com/in/scottbcovert/)

<br/>

<p align="center">
  <img alt="" src="/images/2023-11-03-senseless-soql-doesnt-make-sense.gif" />
</p>

As a Salesforce professional you may be used to seeing quirky behavior due to the many nuances of the platform. Recently we came across some special SOQL behavior that
we'd like to spotlight. To put it simply, the following...

Doesn't. Make. Sense.

### It All Depends on Your Point of View

The Tython team has been building out a tool to help admins manage permissions in Salesforce, and in so doing we've been working with some lesser known
objects such as `PermissionSetTabSetting` and `TabDefinition`. As you likely guessed, the former deals with permissions related to tab access; the latter represents
a custom tab.

The first bit of senselessness we discovered while querying these objects was that:

**SOQL will return different values depending on context**

If a `PermissionSetTabSetting` relates to a custom object tab, then when you query its `Name` field in a SOQL statement from Anonymous Apex you will receive the tab *name*,
which will match that of the custom object it relates to.
However, the same SOQL statement when run from a lightning web component via an @AuraEnabled Apex method returns the tab *id*! At first we thought we were seeing things, but we found
two posts on the Salesforce StackExchange where others noticed the same odd behavior.
<sup>
[1](https://salesforce.stackexchange.com/questions/355625/permissionsettabsetting-record-returns-different-name-when-i-call-it-from-lwc)
[2](https://salesforce.stackexchange.com/questions/316678/permissiontabsetting-masking-name-values-in-vf-aura)
</sup>

<p align="center">
  <img alt="" src="/images/2023-11-03-senseless-soql-from-a-certain-point-of-view.jpeg" />
</p>

### Elementary Mathematics

Recall the *Symmetric Property of Equality* which states:

`If a = b, then b = a`

Not exactly a jaw-dropping revelation, but you may be surprised to learn that Salesforce's query language violates this property...

If you fork the accompanying [git repo for this post](https://github.com/tythonco/senseless-soql) then you can deploy the necessary metadata to your own org
with this command:

`sf project deploy start -d force-app/main -o [YourOrgAliasOrUsername]`

Next, assign the project permission set to your user with this command:

`sf org assign permset -n SenselessSOQL -o [YourOrgAliasOrUsername]`

After doing this, you can run the following command to see how SOQL behaves in an Anonymous Apex context:

`sf apex run -f anonApex.apex -o [YourOrgAliasOrUsername] > anonApex.log`

Note the following from the resulting log file:

>\~\~\~ Searching for tab definition by DurableId ~\~\~\
\
Searching for tab definition where TabDefinition.DurableId = PermissionSetTabSetting.Name (SenselessSOQL__c)\
\
No tab definition found where TabDefinition.DurableId = PermissionSetTabSetting.Name (SenselessSOQL__c)\
\
\~\~\~ Searching for tab definition by SObjectName \~\~\~\
\
Searching for tab definition where TabDefinition.SObjectName = PermissionSetTabSetting.Name (SenselessSOQL__c)\
\
Found tab definition by matching TabDefinition.SObjectName (SenselessSOQL__c) to PermissionSetTabSetting.Name (SenselessSOQL__c)\
\
Now running inverse search by matching PermissionSetTabSetting.Name to TabDefinition.SObjectName (SenselessSOQL__c)\
\
Found permission set tab setting by matching PermissionSetTabSetting.Name (SenselessSOQL__c) to TabDefinition.SObjectName (SenselessSOQL__c) meaning matching is bidirectional ✔

From an Anonymous Apex context, the `TabDefinition` record relating to the `PermissionSetTabSetting` pulled from our permission set is discoverable
by matching the `TabDefinition.SObjectName` field to the `PermissionSetTabSetting.Name` field.

The inverse is also true--given the `TabDefinition.SObjectName` field value we can use SOQL to find the related `PermissionSetTabSetting` record
by matching `PermissionSetTabSetting.Name` to the given `TabDefinition.SObjectName` value.

So far this makes sense, but the wheels come off once we move to a LWC context.

In Salesforce, navigate to `SenselessSOQL (LWC)` via the App Launcher. Here you will see an output similar to the following (though
of course your record ids will be slightly different):

>\~\~\~ Searching for tab definition by DurableId \~\~\~\
\
Searching for tab definition where TabDefinition.DurableId = PermissionSetTabSetting.Name (01rRt000002xgoW)\
\
Found tab definition by matching TabDefinition.DurableId (0KDRt000002xgoWOAQ) to PermissionSetTabSetting.Name (01rRt000002xgoW) even though 0KDRt000002xgoWOAQ != 01rRt000002xgoW ¯\\_(ツ)_/¯\
\
Searching for permission set tab setting where PermissionSetTabSetting.Name = 0KDRt000002xgoWOAQ\
\
No permission set tab setting found where PermissionSetTabSetting.Name = 0KDRt000002xgoWOAQ so it seems the automagic only works one way... ¯\\_(ツ)_/¯\
\
Swapping the tab definition key prefix (0KD) in TabDefinition.DurableId (0KDRt000002xgoWOAQ) with the key prefix for CustomTabDefinition (01r) to create a value of 01rRt000002xgoW\
\
Searching for permission set tab setting where PermissionSetTabSetting.Name = 01rRt000002xgoW\
\
Found permission set tab setting by matching PermissionSetTabSetting.Name (01rRt000002xgoW) to 01rRt000002xgoW meaning swapping key prefixes works... (ツ)\
\
\~\~\~ Searching for tab definition by SObjectName \~\~\~\
\
Searching for tab definition where TabDefinition.SObjectName = PermissionSetTabSetting.Name (01rRt000002xgoW)\
\
No tab definition found where TabDefinition.SObjectName = PermissionSetTabSetting.Name (01rRt000002xgoW)

To start, note that the `TabDefinition` record relating to the `PermissionSetTabSetting`
pulled from our permission set is discoverable by matching `TabDefinition.DurableId` (rather than `TabDefinition.SObjectName`) to the given `PermissionSetTabSetting.Name` value.
As stated earlier, SOQL will return the custom object tab id in a LWC context for `PermissionSetTabSetting.Name` instead of returning the SObject name as it does from an
Anonymous Apex context.

What's more, if you look closely you will find that the `PermissionSetTabSetting.Name` value in a LWC context begins with the key prefix associated with the `CustomTabDefinition`
object, while the `TabDefinition.DurableId` value begins with the key prefix associated with the `TabDefinition` object. Aside from the key prefixes the ids match and it seems
SOQL is performing some automagic on our behalf since the `TabDefinition` record is returned despite the fact that the `TabDefinition.DurableId` value does not *technically*
equal the `PermissionSetTabSetting.Name` value that was searched. :thinking:

And to make things even *more* confusing, the SOQL automagic appears to be unidirectional as the inverse search yields no results.
We cannot use SOQL to find the related `PermissionSetTabSetting` record by matching `PermissionSetTabSetting.Name` to a given `TabDefinition.DurableId` value. :no_mouth:

Finally, if we manually swap the key prefixes on the inverse search (as the SOQL automagic from the initial search appears to be doing) then we *are* able to find the related `PermissionSetTabSetting` record! :raised_hands:

So tying this back to the *Symmetric Property of Equality*, it would make sense that

`If TabDefinition.DurableId = PermissionSetTabSetting.Name, then PermissionSetTabSetting.Name = TabDefinition.DurableId`

However, as we now know, SOQL can be senseless.

<p align="center">
  <img alt="" src="/images/2023-11-03-senseless-soql-meme.jpeg" />
</p>

If you have your own SOQL stories to share, or if you think the Permissions Assistant tool we are building can help restore some sense to your org's permissions quagmire, please [contact us](mailto:support@tython.co)!