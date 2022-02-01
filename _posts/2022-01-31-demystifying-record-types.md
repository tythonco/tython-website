---
layout: post
title: Demystifying Record Types
description: ''
date: 2022-01-31T12:00:00.000Z
categories: ['salesforce', 'permissions']
keywords: ['permissions', 'profiles']
slug: >-
  /demystifying-record-types
---

[Scott Covert](https://www.tython.co/)

**Demystifying Record Types**

Wrapping your head around all the nuances involved with Salesforce permissions
can be dizzying. The notion of a record type is probably one of the most widely used
features in this arena that is still largely misunderstood.

Probably the best example of this is the common misconception that record type
access is equivalent to record access. We've seen many organizations make the
mistake of assuming that a user cannot access a record if the associated record
type is not assigned to the user through a profile or permission set. If a user
does not have a record type assigned to them then *that only means they cannot
create new records with that record type or transfer existing records to that
record type.* Record visibility is still controlled by sharing settings and CRUD
permissions for the object. Here is an excerpt from the
[SOAP API Documenation](https://developer.salesforce.com/docs/atlas.en-us.232.0.api.meta/api/sforce_api_objects_recordtype.htm)
that describes this in further detail.

> Don’t use record types as an access control mechanism. Profile assignment governs
> create and edit access for an object but doesn’t govern read access. For example,
> a user assigned to a profile that isn't enabled for a particular record type can't
> create records with that record type, but can access records associated with that
> record type. Users with access to an object can read all record type information
> for that object. We strongly recommend against storing sensitive information in
> the record type description, name, or label. Instead, store sensitive information
> in a separate object or fields to which you’ve applied appropriate access controls.

One of the great benefits to using record types is the ability to allow only a
specific subset of values from a picklist field for a given record type. However,
there are a few standard picklist fields that must be handled in a unique way.
The stage field on the Opportunity object and the status field on both the Lead
and Case objects do not use record types to directly control their available
values. Instead, you must first create Sales/Lead/Support processes for these objects
and then assign each process to an individual record type.

Another common pitfall with record types is thinking a user doesn't have access to
a given record type because it isn't assigned to their profile. *Record types can also
be assigned to users via permission sets (/permission set groups)!*

One final nugget to end on is the static record id value for the master record type.
The master record type is system-generated and used for records without a custom
record type. And while the ids of your record types may differ between sandboxes and
production, the master record type (for all objects) has an id of `012000000000000AAA`
This can be useful when working with LWCs that leverage the `getPicklistValues` wire
adapter from `uiObjectInfoApi`,
[as seen here](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_wire_adapters_picklist_values)

If you could use a hand in managing record types within your org
or with another Salesforce development project then
[drop us a line](mailto:support@tython.co),
we’d love to help!