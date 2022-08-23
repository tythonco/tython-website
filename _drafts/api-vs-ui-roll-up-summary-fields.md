---
layout: post
title: 'API vs UI: Roll-Up Summary Fields'
description:
date: 2022-08-23T12:00:00.000Z
categories: ['salesforce', 'api']
keywords: ['api', 'ui', 'setup']
slug: >-
  /api-vs-ui-roll-up-summary-fields
---

[Scott Covert](https://www.tython.co/)

**API vs UI: Roll-Up Summary Fields**

When it comes to Salesforce configuration and development the `clicks not code`
mantra can be a good rule of thumb...to an extent. Diminishing marginal returns
begin to set in past a threshold of clicks, at which point it's more efficient
to work with code. Click overload aside, there are also some changes that
require working with `sfdx` and the metadata and tooling APIs directly
for deployment because they aren't possible from the setup menu UI.

One example is if you're creating roll-up summary fields on the Quote object
to summarize the `TotalPrice` field from specific Quote Line Item records.

:raising_hand: Excuse me, doesn't the `TotalPrice` field on the Quote object
already aggregate this field from the Quote Line Item records? Yes, that's
true...but what if you only want to aggregate *specific* Quote Line Item
records? Perhaps you sell both products and services in a single deal and
would like to summarize the total amount for each of these offerings at the
Quote level. Or perhaps you'd like to summarize by individual product family.

The problem you'll find is that, from the setup UI, Salesforce does not allow
you to create a roll-up summary field on the Quote object that aggregates the
`TotalPrice` field from child Quote Line Item records. :scream:

Fear not fellow Salesforce enthusiast! If you're comfortable with XML and `sfdx`
you can still create that roll-up summary field through the metadata/tooling API directly!
First you'll want to
[setup sfdx](https://trailhead.salesforce.com/content/learn/modules/sfdx_app_dev/sfdx_app_dev_setup_dx).
Afterward, pop open your favorite IDE (we'd recommend Visual Studio Code) and create
a new project associated with the Salesforce scratch org or sandbox where you plan to test.

From the root of your source (`force-app/main/default` by default) you'll need to create
some additional folders and files so the following paths resolve:

`force-app/main/default/objects/Quote/Quote.object-meta.xml`

`force-app/main/default/objects/Quote/fields/TotalPriceProductFamilyA__c.field-meta.xml`

Next, run
`sfdx force:source:retrieve -p force-app/main/default/objects/Quote/Quote.object-meta.xml`
to retrieve your existing fields and settings for the Quote object. If your target org is not
connected as the default org for `sfdx` then you'll also need to use the `-u` flag to identify your
org by username or alias.

Now we're ready to create that roll-up summary field! Copy and paste the following XML into the
`TotalPriceProductFamilyA__c.field-meta.xml` file created previously:

```
<?xml version="1.0" encoding="UTF-8"?>
<CustomField xmlns="http://soap.sforce.com/2006/04/metadata">
    <fullName>TotalPriceProductFamilyA__c</fullName>
    <description>The total price of product family A line items</description>
    <externalId>false</externalId>
    <inlineHelpText>The total price of product family A line items</inlineHelpText>
    <label>Total Price Product Family A</label>
    <summarizedField>QuoteLineItem.TotalPrice</summarizedField>
    <summaryFilterItems>
        <field>QuoteLineItem.ProductFamily__c</field>
        <operation>equals</operation>
        <value>A</value>
    </summaryFilterItems>
    <summaryForeignKey>QuoteLineItem.QuoteId</summaryForeignKey>
    <summaryOperation>sum</summaryOperation>
    <type>Summary</type>
</CustomField>
```

Finally, deploy your field by running
`sfdx force:source:deploy -p force-app/main/default/objects/Quote/fields/TotalPriceProductFamilyA__c.field-meta.xml`,
again using the `-u` flag if necessary.

Et Voila! You've now created a roll-up summary field that wouldn't otherwise be possible through the
setup UI by instead leveraging the metadata/tooling API directly! If you check `Object Manager`
you should see your new field has been created for the Quote object. :raised_hands:
Note that you'll now need to add it to the appropriate page layout(s) and setup field-level security
since none of that is done automatically when creating a new field using the metadata/tooling API
directly. As an aside, we'd suggest you
[use permission sets and permission set groups instead of profiles](/salesforce/permissions/2021/03/02/goodbye-profiles-hello-permission-sets).

Not a fan of dealing with XML and the Metadata API directly? We got your back!
[Reach out](mailto:support@tython.co)
and let us help so you don't have to sweat the small stuff!
