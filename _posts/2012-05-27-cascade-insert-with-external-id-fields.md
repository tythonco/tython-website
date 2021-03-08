---
title: Cascade Insert with External Id Fields
description: ''
date: '2012-05-27T16:05:12.000Z'
categories: ['salesforce', 'development']
keywords: []
slug: /cascade-insert-with-external-id-fields
---

[Scott
Covert](https://www.tython.co/)

Many times I have run into the situation where I would like to insert a parent record and its children into Salesforce’s database simultaneously. This can be a little tricky if you are inserting a list of parent records and would like to instantiate the children records prior to the commit of said list because then you do not yet have the Salesforce Ids for the children records to reference. External Id fields to the rescue!

Instead of instantiating the children with the lookup relationship field being set to the parent record’s Id you can define the reference field to be set equal to an empty record of the parent’s sObject type that was instantiated with the same external Id field value as the parent record the child should lookup to:

Parent\_\_c p = new Parent\_\_c(Name=’ABC’,External\_Id\_\_c = ‘123’,Description\_\_c=’ABCs and 123s’);

Parent\_\_c refToP = new Parent\_\_c(External\_Id\_\_c=’123');

Child\_\_c c = new Child\_\_c(Parent\_\_r = refToP);

insert p;

insert c;

Oddly enough, you have to create the empty record refToP that is instantiated with the external id field value of p — you cannot simply set c’s reference field Parent\_\_r equal to p itself. That said, you do not have to actually insert the empty record refToP into your database-so no harm, no foul.

Thanks to the following site for helping me find this solution:

[Cascade Insert with External Id Fields - Engineering](http://blogs.developerforce.com/engineering/2012/02/cascade-insert-with-external-id-fields.html "http://blogs.developerforce.com/engineering/2012/02/cascade-insert-with-external-id-fields.html")[](http://blogs.developerforce.com/engineering/2012/02/cascade-insert-with-external-id-fields.html)