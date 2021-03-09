---
layout: post
title: >-
  Location-Aware Salesforce App Cloud Development with Beacons and Automatic
  Geocoding
description: >-
  Although there was no hackathon at #Dreamforce2015 I was fortunate enough to
  participate in the next best thing by presenting two sessions…
date: '2016-08-09T17:12:07.352Z'
categories: ['salesforce', 'development', 'dreamforce']
keywords: ['dreamforce', 'ibeacons', 'location']
slug: >-
  /location-aware-salesforce-app-cloud-development-with-beacons-and-automatic-geocoding
---

[Scott
Covert](https://www.tython.co/)

Although there was no hackathon at #Dreamforce2015 I was fortunate enough to participate in the next best thing by presenting two sessions at the conference.

One of my talks was on [location-aware development](http://www.slideshare.net/developerforce/locationaware-salesforce1-development-with-beacons) on the platform through beacons, specifically using Apple’s iBeacon protocol and estimotes. In the session I discussed how Salesforce CRM data could easily be leveraged in an organization’s mobile app to promote sales and improve their customer experience.

As a demonstration, I showed an iOS app built using the Ionic framework that sends a push notification to a customer as she walks by a storefront, even with the store’s app running in the background. The notification itself contained data pulled directly from an open Salesforce opportunity related to the customer.

![]({{ site.baseurl }}/images/1__goPOUjWX4LIeIyEdics4Dw.png)

Fast forward to the Spring ’16 release and now Salesforce offers automatic geocoding of standard address fields. Using some techniques from a [previous blog post on the subject by Salesforce MVP Gorav Seth](http://goravseth.com/geocode-all-the-records) I decided to update the code behind my demonstration over the weekend.

First, I added two new objects in Salesforce; one to represent the estimote beacons and the other a junction object between contacts and beacons meant to represent check-ins at a given location.

Instead of creating fields on the user object like Gorav had done I decided to instead create a hierarchical custom setting meant to represent an estimote beacon located at the San Diego zoo. I then created a formula field on the Account object very similar to his, which should provide the distance in miles between a given account and the zoo.

![]({{ site.baseurl }}/images/1__BOUzg2flPcI__gFos21ReaQ.png)
![]({{ site.baseurl }}/images/1__r5xda5HDBdQkqcgNPiijTA.png)

Next, I modified the Ionic app from my demo to callout to an updated version of the Apex class being exposed as a custom REST endpoint. This would ensure that in addition to a push notification being sent to the customer a check-in would be created in Salesforce.

Finally, I created a few reports and a dashboard to visualize the data. The first provides insight into how many times each contact checked-in at the particular beacon location (in this case the zoo) and the second shows nearby accounts.

![]({{ site.baseurl }}/images/1__aDiwlgbJXp9zWkF4gDDOIQ.png)

Summarizing this information in a dashboard allows a manager to do some cool analyses very quickly. For example, if she were considering opening a new storefront at the zoo then the dashboard would give an idea of expected foot traffic, provide a geo-targeted list of contacts to run a future campaign against, and show partner accounts that may be interested in advertising to mutual customers at the location.

All source code and metadata is available on GitHub:  
[Ionic source](https://github.com/scottbcovert/salesforce-beacon-demo)  
[Salesforce source/metadata](https://github.com/scottbcovert/salesforce-beacon-demo-apex)