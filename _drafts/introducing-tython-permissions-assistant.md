---
layout: post
title: Introducing Tython Permissions Assistant
description: Tython has been building out a tool to simplify permissions visibility and insights.
date: 2023-11-28T09:00:00.000Z
categories: ['permissions', 'apps']
keywords: ['permissions', 'permissions assistant', 'admin', 'tools']
slug: 
---

[Andrew Chen](https://www.linkedin.com/in/ndrewr/)
<br/>

### Permissions Purgatory

Managing permissions in Salesforce can be a daunting task. Common questions when working with permissions include:

- Who can access a certain feature or object field?

- What features does this particular permission set enable?

- Where is this user granted access to a particular permission?

- How can I compare permission sets to prevent duplication?

Tython has been developing a tool to tackle these pain points.

We call it *Tython Permissions Assistant*. 

While still deep in development, it can already aid with all the above challenges. This post serves as an introduction and the first in a series. Lets see what *Permissions Assistant* brings to the table!

<br/>

### What Is Tython Permissions Assistant?

Permissions Assistant is a packaged app that clarifies an org's permission structure to grant greater insight and well-informed action. Once installed, it runs completely on-platform. Lets scope some of its key features!

<br/>

#### Permission Set Summary

You can use Permissions Assistant to inspect a given permission set all from one page. Just filter and then select a permission set (or profile!) to view all enabled permissions on the same screen. Quickly and conveniently switch between different permission sets.

Permissions are broken down into several main categories. We can see key information, such as object and field-level access, at a glance. View only the enabled system permissions.

<div style="text-align: center; border: 1px solid #dadada; border-radius: 6px;">
    <img src="/images/2023-11-22-introducing-pa-perm-summary1.png" alt="Permissions Summary allows easy, deep inspection" title="Permissions Summary screenshot" style="max-width:700px;"/>
</div>

<br/>

#### User Access Summary

With Permissions Assistant, you can see everything* a given user can access from one place. Simply bring up a target user, then inspect their _combined_ permissions. These results pull in all permission sets (and the profile) they have been assigned.

While viewing results, each permission item can also display the list of permission sets that enable it.

<div style="text-align: center; border: 1px solid #dadada; border-radius: 6px;">
    <img src="/images/2023-11-22-introducing-pa-user-perms1.png" alt="Showing what a selected user can access" title="User Permissions summary screenshot" style="max-width:700px;"/>
</div>

<br/>

#### Permission Search

Target a specific permission and hunt down all the permission sets and profiles that enable it! You can select multiple permissions at once, including object and field-level access settings. The search can be exact (results contain ALL selected permissions) or inclusive (results contain AT LEAST ONE of the selected permissions).

The screen below demonstrates targeting all permission sets with 1. Account View All, 2. Account Modify All, 3. Account Tab access.

<div style="text-align: center; border: 1px solid #dadada; border-radius: 6px;">
    <img src="/images/2023-11-22-introducing-pa-perm-search1.png" alt="Permissions search in action" title="Permissions Search screenshot" style="max-width:700px;"/>
</div>

<br/>

#### Permission Set Similarity Analysis

Permissions Assistant can analyze all permission sets to identify near-duplicates. Compare the flagged permission sets side-by-side. View only the differences between two sets. The degree of similarity can even be configured!

The example screen shows results from an org-wide permission set analysis. These results are set to "75% similar and above".

<div style="text-align: center; border: 1px solid #dadada; border-radius: 6px;">
    <img src="/images/2023-11-22-introducing-pa-similarity-analysis1.png" alt="Permissions Set Similarity Analysis" title="Permissions set Similarity Analysis screenshot" style="max-width:700px;"/>
</div>

<br/>

### Permission to Engage (with us!)

Future posts will explore each of the above capabilities (and more!) of this app in greater detail. We will also dive into some interesting challenges behind its development.

There is one more important question to ask:

- When can I try out *Tython Permissions Assistant* in my own org?

If you'd like a test drive, and don't mind some follow-up feedback questions, [give us a shout](mailto:support@tython.co?subject=Permissions%20Assistant%20Demo)!

<br/>

---

<sup><sub>* OK, almost everything. Service Providers and External Credentials are on the Todo list.</sub></sup>