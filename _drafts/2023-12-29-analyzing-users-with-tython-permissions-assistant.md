---
layout: post
title: Analyzing Users with Tython Permissions Assistant
description: Gain full insight into user access with Tython Permissions Assistant User Analysis.
date: 2024-01-01T09:00:00.000Z
categories: ['permissions', 'apps']
keywords: ['permissions', 'permissions assistant', 'admin', 'tools', 'user analysis']
slug: 
---

[Andrew Chen](https://www.linkedin.com/in/ndrewr/)

<div style="padding: 0.75rem 1.25rem; background-color: #eaeafa;  border: 1px solid #dadada; border-radius: 6px; margin: 2rem 1rem;">
    <h4>Other Posts In This Series</h4>
    <ul>
        <li>
            <a target="_blank" href="https://tython.co/permissions/apps/2023/11/28/introducing-tython-permissions-assistant.html">
                Introducing Tython Permissions Assistant
            </a>
        </li>
    </ul>
</div>

### A Recipe for Frustration

Managing permissions in Salesforce has for years (decades?) been a thorn in the side of admins. Getting to the bottom of "Who can see what and Why" is, like my scrambled eggs recipe, harder than it has any right being. The team at Tython set out to build a tool that assists in getting permissions under control. Enter Tython Permissions Assistant.

Permissions Assistant is an app that equips admins with tools to pry open the permissions black-box. All functionality occurs on-platform, right in your org. This post focuses on the User Analysis utility. Future blog posts in this series will deep dive into Permission Assistant’s other operations.

When whipping up a recipe, unexpected ingredients can jeopardize the batch. Missing key ingredients can likewise delay or spoil the result. Assigning the wrong permissions, or withholding needed ones, is a recipe for frustration. User Analysis reveals everything* a user can access with a few quick clicks.

<br/>

### At Your Fingertips

Identify the user you want to analyze and get a comprehensive overview of their assigned access. Right off the bat inspect:

- Assigned profile, permission sets, and permission set groups

- The user’s “Combined Permissions” in an easy to navigate interface. Everything enabled in the assigned permission sets right down to field-level settings.

<div style="text-align: center; border: 1px solid #dadada; border-radius: 6px;">
    <img src="/images/2023-12-29-pa-user-analysis-combined-perms-fls.png" alt="User Analysis deep inspection of field settings" title="User Analysis screenshot F.L.S." style="max-width:700px;"/>
    <p style="color: #6a6a6a; font-size: .75rem;">Quickly see object and field-level security settings.</p>
</div>
<br/>

The “Combined Permissions” breaks down into four main categories:

- Objects, including at-a-glance object-level security, object tab visibility, and field-level security

- Tabs, including Lightning Component, Lightning Page, Visualforce Page, and Web tabs

- Setup Entity Access Items, including Apps, Apex Classes, Custom Settings, Custom Metadata Types, Custom Permissions, Connected Apps, External Data Sources, Flows, and Visualforce Pages

- System Permissions

<div style="text-align: center; border: 1px solid #dadada; border-radius: 6px;">
    <img src="/images/2023-12-29-pa-user-analysis-combined-perms-tabs.png" alt="User Analysis all tab permissions" title="User Analysis all tab permissions" style="max-width:700px;"/>
    <p style="color: #6a6a6a; font-size: .75rem; margin-top: 1rem;">Convenient breakdown of categories like Tabs.</p>
</div>
<br/>

### Know the How

Identify which permission set is granting what permission, all from the same screen. There are two methods of discovery:

- Select an item on the left to inspect a target permission set. Easily zoom in and out between combined and single-set permissions.

<div style="text-align: center; border: 1px solid #dadada; border-radius: 6px;">
    <img src="/images/2023-12-29-pa-user-analysis-select-perm-set.png" alt="User Analysis permission set focus" title="User Analysis drill into target permission set" style="max-width:700px;"/>
    <p style="color: #6a6a6a; font-size: .75rem;">Drill into a specific permission set.</p>
</div>
<br/>

- Hover over an item in the "Combined Permissions" section to see a list of permission sets that enable that item.

<div style="text-align: center; border: 1px solid #dadada; border-radius: 6px;">
    <img src="/images/2023-12-29-pa-user-analysis-perm-access-list.png" alt="User Analysis permission assigning list" title="User Analysis permissoin assignment list" style="max-width:700px;"/>
    <p style="color: #6a6a6a; font-size: .75rem; margin-top: 1rem;">Instantly see where the permission is being assigned.</p>
</div>
<br/>

### Head-to-Head Comparison

Sometimes you want to know why User A can view all accounts but User B cannot. Permissions Assistant User Analysis includes a comparison mode to answer these questions.

Simply enter comparison mode to select a second user. You can now inspect everything accessible to both users, side-by-side, on the same screen!

<div style="text-align: center; border: 1px solid #dadada; border-radius: 6px;">
    <img src="/images/2023-12-29-pa-user-analysis-compare-users.png" alt="Comparing user permissions side-by-side" title="Comparing users, all permissions" style="max-width:700px;"/>
    <p style="color: #6a6a6a; font-size: .75rem;">Comparing two users side-by-side.</p>
</div>
<br/>

Easily filter down to only what either user can access that the other cannot.

<div style="text-align: center; border: 1px solid #dadada; border-radius: 6px;">
    <img src="/images/2023-12-29-pa-user-analysis-compare-user-diffs.png" alt="Compare user permission differences" title="Comparing user permission differences" style="max-width:700px;"/>
    <p style="color: #6a6a6a; font-size: .75rem;">Viewing only the different permission assignments between two users.</p>
</div>
<br/>

### Master Chef

Tython Permissions Assistant User Analysis brings order to a chaotic kitchen. It lays out user access neatly on the counter. Combined with Permissions Assistant's other tools, admins can really get cooking!

Permissions Assistant is currently in invite-only beta, but will be available on the AppExchange in early 2024. And we are just getting started.

The team at Tython is always open to feedback! Interested in what we have in the oven? Want to request access to the Permissions Assistant beta?  [Drop us a line, anytime](mailto:support@tython.co?subject=Permissions%20Assistant%20Demo)!

<br/>

---

<sup><sub>* OK, almost everything. Service Providers and External Credentials are on the Todo list.</sub></sup>