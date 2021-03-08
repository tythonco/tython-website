---
layout: post
title: >-
  Preserving Your Tab Style’s Color Scheme within a VFPage when showHeader is
  False
description: ''
date: '2012-05-15T21:05:39.000Z'
categories: ['salesforce', 'development']
keywords: []
slug: >-
  /preserving-your-tab-styles-color-scheme-within-a-vfpage-when-showheader-is-false
---

[Scott
Covert](https://www.tython.co/)

Sometimes it is necessary to set the showHeader attribute of the apex:page tag to false within your Visualforce page. Unfortunately, doing this causes you to lose any color scheme brought over with the tab style you set up when initially creating the page. If you are unhappy with the default color scheme you are left with then there is a way to bring back the color scheme of your tab style by inserting a modest amount of CSS into the page.

First, with the showHeader attribute still set to true, load your Visualforce page. You will need to inspect a few elements’ CSS values to emulate the same color scheme once we set showHeader to false. If you are using Firefox, right-click the very top border of the page, just under the header, and select “Inspect Element” If you clicked the correct area, then the entire Visualforce page area should be selected. In the bottom right corner of your screen select “Style” and then on the side panel that appears search for a section that says “.bPageBlock {border-top: 4px solid \[SOME COLOR\]}” Take note of the color written here-mine was rgb(49,148,49).

![]({{ site.baseurl }}/images/0__UsU6k3RwHlkPgb4h.png)

Next, right-click the sub-header on your Visualforce page, select “Style” and search for a section that says “.pbSubheader{background-color: \[SOME COLOR\]}” Take note of this color as well-mine was rgb(126,180,126).

![]({{ site.baseurl }}/images/0__prbkYfOHG5OixaOl.png)

Next, you will want to edit your Visualforce page. First, set the showHeader attribute in the apex:page tag to false and then insert the following code below your apex:page tag line (replacing the color values with those you took note of earlier):

<style type="text/css">  
.bPageBlock {  
    border-top: 4px solid rgb(49,148,49);  
}  
.pbSubheader {  
    background-color: rgb(126,180,126);  
}  
</style>

That’s it! Now after saving your header should be gone, but the original color scheme should remain…