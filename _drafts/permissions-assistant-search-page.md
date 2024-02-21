---
layout: post
title: Permissions Assistant Search Page
description: Scry all access vectors with Tython Permissions Assistant Permission Search.
date: 2024-02-23T09:00:00.000Z
categories: ['permissions', 'apps']
keywords: ['permissions', 'permissions assistant', 'admin', 'tools', 'search']
slug: 
---

[Andrew Chen](https://www.linkedin.com/in/ndrewr/)

<!-- INSERT TABLE OF CONTENTS -->

### The Best Defense is a Good Offense?

Org admins are commonly tasked with managing hundreds, even thousands of users. They control and meter access to powerful functionality and valuable data using dozens, even hundreds, of permission sets and profiles. When something goes wrong because of this allowance, whether accidental or on purpose, serious damage can result.

Gandhi once said:

>Nobody can hurt me without my permission.

At the end of the day, users do what they have been permitted to do. The responsibilty falls on the capable shoulders of the admin to divert many disasters. The stakes are high!

Salesforce has not made it particuarly easy to get a handle on managing user access at scale. To be sure, there have been efforts introduced to mitigate these challenges. Thus far, [results have been mixed, unreliable or not detailed enough](https://appexchange.salesforce.com/appxListingDetail?listingId=a0N3A00000FeF99UAF&tab=r
).

Tython Permissions Assistant aims to equip admins with the means to get user access in order. "Playing good defense" by seizing the initiative and heading off unwarrated access. This post takes a detailed look at Permission Search, a tool to quickly identify HOW and TO WHOM specific permissions have been granted.

<br/>

### Establish Search Parameters

Permission Search reveals what permission sets and profiles enable access to a target you specify. Step one is to select the potentially perilous permission. There are a couple of easy methods to do this.

When the page loads you are greeted with a *permission tree*. Within this tree are all* of the items that can be made accessible via permission sets and profiles, organized by category. Simply drill into the category of permission you want to target. Even fine-grained targets, such as "Read" or “Edit” access on a particular custom field on a particular object, can be searched.

Once pinpointed, a quick click trains our sights on the quarry!

<div style="text-align: center; border: 1px solid #dadada; border-radius: 6px;">
    <img src="/images/2024-02-20-pa-perm-search-tree-selection.png" alt="Using the Permission Tree for selections" title="Using the Permission Tree for selections" style="max-width:700px;"/>
    <p style="color: #6a6a6a; font-size: .75rem;">Using the Permission Tree for selections.</p>
</div>
<br/>

Selection can also be done by utilizing the integrated finder. Type in the target and select from the resulting list. Notice you can select multiple targets.

<div style="text-align: center; border: 1px solid #dadada; border-radius: 6px;">
    <img src="/images/2024-02-20-pa-perm-search-finder-selection.png" alt="Using the Finder for selections" title="Using the Finder for selections" style="max-width:700px;"/>
    <p style="color: #6a6a6a; font-size: .75rem;">Using the Finder for selections.</p>
</div>
<br/>

So far, so easy! Before we kick off the search, there is one important option to consider.

If selecting multiple targets, “exact matches only” can be specified. This option controls whether or not resulting permission sets and profiles have to contain *all* of the selected permissions (“exact matches” checked) or just one (“exact matches” unchecked, the default).

<div style="text-align: center; border: 1px solid #dadada; border-radius: 6px;">
    <img src="/images/2024-02-20-pa-perm-search-exact-match.png" alt="Exact matches option when working with multiple selections" title="Exact matches option when working with multiple selections" style="max-width:700px;"/>
    <p style="color: #6a6a6a; font-size: .75rem;">Exact matches option when working with multiple selections.</p>
</div>
<br/>

With that, the hunt is on! 

### Scrutinize the Round Up

Results have loaded and, like a police lineup, we have rounded up the suspects. Now we can determine without doubt where access is being granted.

<div style="text-align: center; border: 1px solid #dadada; border-radius: 6px;">
    <img src="/images/2024-02-20-pa-perm-search-result-list.png" alt="Displaying post-search results" title="Displaying post-search results" style="max-width:700px;"/>
    <p style="color: #6a6a6a; font-size: .75rem;">Displaying post-search results.</p>
</div>
<br/>

The list of permission sets and profiles contain the permission(s) we are pursuing. Clicking on these results opens up a window to further dissect the permission set or profile in detail.

<!-- INSERT PICTURE OF DETAILS MODAL -->
<div style="text-align: center; border: 1px solid #dadada; border-radius: 6px;">
    <img src="/images/2024-02-20-pa-perm-search-result-detail-modal.png" alt="Inspecting results in more detail" title="Inspecting results in more detail" style="max-width:700px;"/>
    <p style="color: #6a6a6a; font-size: .75rem;">Inspecting results in more detail.</p>
</div>
<br/>

If there are active user assignments, a section with a filtered list of users can be reviewed. These are the users who have been granted access to the permissions we are targeting. Click on a user in the list to view which permission sets and profiles from the search results have been assigned to them.

<!-- INSERT PICTURE OF USER LIST -->
<div style="text-align: center; border: 1px solid #dadada; border-radius: 6px;">
    <img src="/images/2024-02-20-pa-perm-search-user-access-list.png" alt="Identify users who carry the permission" title="Identify users who carry the permission" style="max-width:700px;"/>
    <p style="color: #6a6a6a; font-size: .75rem;">Identify users who carry the permission and where they got it from.</p>
</div>
<br/>

### The Spider-Man Lesson

Some version of Peter Parker once uttered:

> When you can do the things that I can, but you don't, and then the bad things happen? They happen because of you.

The power of prevention is ultimately in the hands of admins. Tython Permission Search grants insight into both How a permission is enabled as well as Who holds those privileges. From here, the empowered admin can reach into their playbook and decide What actions to take.

Perhaps remove some permissions from a certain profile? Revoke a particularly precarious assignment from certain users? Clone and modify a mostly on-point permission set? Maybe even combine these results with other Permissions Assistant tools like deep User Analysis and Permission Set Similarity Analysis to do some "spring cleaning"?

Got other use cases for Permission Search? The team at Tython is always open to feedback! Interested in other tools to help deploy your offense? [Reach out to request access to the Permissions Assistant beta](mailto:support@tython.co?subject=Permissions%20Assistant%20Demo)!

<br/>

---

<sup><sub>* OK, almost everything. Service Providers and External Credentials are on the Todo list.</sub></sup>