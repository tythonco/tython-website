---
title: >-
  Salesforce Etiquette: Excusing One’s Self from the Subdomain of a Managed
  Package
description: ''
date: '2013-01-07T05:39:53.000Z'
categories: []
keywords: []
slug: >-
  /salesforce-etiquette-excusing-ones-self-from-the-subdomain-of-a-managed-package
---

[Scott
Covert](https://www.tython.co/)

Happy New Year boys & girls! In preparing a new version of an app I released on the AppExchange I came across the interesting problem of needing to excuse myself from my managed package subdomain in order to dynamically grab the content (using the native getContent() method) of a visualforce page that may or may not exist within the package itself.

As you may have noticed previously the standard subdomain for a visualforce page is c.XXX.visual.force.com where XXX refers to your particular salesforce server (na1 for example). On the other hand, when accessing a visualforce page that exists within a managed package the subdomain looks more like NameSpace.XXX.visual.force.com where NameSpace refers to the pre-defined namespace prefix of the managed package.

Normally this is irrelevant from a user’s standpoint, but in my case I needed the Apex controller extension for a managed visualforce page to grab the content of a visualforce page defined within Custom Settings. This means, depending on the settings, the page might exist within the managed package itself or it may be a custom page created solely within an individual Salesforce org. The latter case can cause a problem since when defining a new PageReference using partial URLs the current subdomain is maintained by default.

Well, as it turns out I discovered the solution to this problem is actually quite simple. You can treat any pages outside of your package as if they belonged to a managed package with a namespace prefix of “c” In hindsight this seems obvious given the structure of the standard subdomain of a visualforce page. Many thanks to @jhart from the Force.com discussion boards for pointing me in the right direction with the last post from [his thread](http://boards.developerforce.com/t5/Visualforce-Development/PageReference-question-how-to-move-in-amp-out-of-package/td-p/102570/page/2).

Here’s a snippet of code you could use within an Apex class to accomplish this functionality (You’ll notice I only grab the content when the class is not running within the context of a test — this is because the getContent() method is not allowed within a test context):

![]({{ site.baseurl }}/images/1__9TOWSSTGhuLyLIFM8z6Xpw.png)

Hope this helps someone, happy coding!