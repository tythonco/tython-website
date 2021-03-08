---
layout: post
title: Solving the Salesforce Managed Package Redirecting Problem
description: ''
date: '2012-12-18T19:23:20.000Z'
categories: ['salesforce', 'development']
keywords: []
slug: >-
  /solving-the-salesforce-managed-package-redirecting-problem
---

[Scott
Covert](https://www.tython.co/)

If you have developed an app being offered on the AppExchange then you may have noticed some interesting behavior by Visualforce redirects once customers install your package.

Let’s say you have a Visualforce component embedded within a Visualforce page included in your package and you would like the page to simply refresh after a save. You will notice some odd functionality when customers embed your component within their own custom Visualforce pages. Depending on the context of where your component is used, Salesforce may try to add your namespace prefix automatically-this can lead to serious issues, especially if the Visualforce page is being hosted by a Salesforce Site. Strangely, the redirect will often work perfectly within your developer org so this can be a tricky issue to debug.

After tinkering with this I’ve come up with the following resolution. The Apex code below, when used within an extension of your Visualforce component, should properly refresh a page whether the component exists within a native Visualforce page of your managed package or within a customer’s custom Visualforce page. Likewise, the refresh will behave properly whether the page is being accessed internally or via a Salesforce Site. This is a tweak on a solution originally proposed by d3developer [here](http://boards.developerforce.com/t5/Apex-Code-Development/Get-Current-Page-URL-in-Apex-Class-Full-amp-Exact-URL/td-p/134623)\-so many thanks to him or her for getting me started in the right direction.

![]({{ site.baseurl }}/images/1__FnO__CUSG85xymKSwpMf7mg.png)

As you may have already guessed, prior to this snippet I declared the newPageRef variable to be an instance of the PageReference class and theObject is an instance of the generic sObject class (Depending on your code you may want to just use ApexPages.currentPage().getParameters().get(‘id’) ). Hope this helps-happy coding everyone!