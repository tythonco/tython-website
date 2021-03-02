---
title: >-
  Goodbye Profiles, Hello Perm Sets
description: ''
date: '2021-03-01T03:32:00.000Z'
categories: []
keywords: []
slug: >-
  /goodbye-profiles-hello-perm-sets
---

[Scott Covert](https://www.tython.co/)

The day is finally here! After weeks of development and testing (you
did test, right? RIGHT?) you're finally ready to deploy your changes
to production.
:rocket:

You sip your coffee with a sense of pride as you wait for user feedback.
Then you see those three dreaded words flash across Slack,
`It's not working.`

*What*?!?
How could that be? You get reports that users can't see the new
fields or access any of the new tabs. And then you get that sinking feeling
in the pit of your stomach as you realize
**you forgot to update profile permissions...**
:man_facepalming:

Okay, okay - you can fix this. You can just deploy the profiles from your
QA sandbox. Oh, wait - if you do that then you'll overwrite the profile permission
changes from the new fields that your colleague created directly in production.
> Just this once!

Yea right, that's what they said last time... So you begin the process of
_manually_
updating all the profiles in production, cursing yourself for scheduling yet
another deployment on a Friday...

Sound familiar? Don't worry, you're not alone! Everyone has their own
Salesforce deployment horror stories, and far too often they can be traced
back to profile permissions. But fear not, because
**there's a better way**!

Permission sets have been around for quite a while now (apparently since 2012!)
Yet, I still see so many orgs managing all their permissions via profiles.
There are two main reasons why I think this is a bad idea:
1. Profiles have a tendency to mutate frequently
2. Profiles have a one-to-many relationship with the User object

**Frequent Changes**

It can be very difficult to have strict governance over Salesforce profiles
because they seem to constantly be in a state of flux. Field level security
settings can be manipulated by someone creating or deleting a field, as
mentioned earlier. Another problem I've seen is that many orgs have parallel
Salesforce projects going on at once, sometimes managed by different teams
and/or external consultants, so it's easy for one team to overwrite changes
made by another team unless they all stay in sync. There are even times where
the underlying metadata for a profile changes slightly as a result of a new
Salesforce release. All these frequent changes can make profile management
very difficult.

**One-to-Many vs Many-to-Many**

If you think about the underlying objects, essentially there is a lookup from
the User object to the Profile object. This means although many users may share
the same profile, each individual can only have one profile. This is significant
because in many businesses, especially in ones growing rapidly, users are wearing
many different hats so it's difficult to define a single role (as in job role,
*not*
role hierarchy!) for each user. Often what ends up happening is admins
have to choose between making a
*ton*
of profiles or risk assigning unnecessary permissions to users that have the same
profile as a user that needs special access.

With permission sets, there is a junction object (permission set assignment)
that exists between users and the permission sets themselves. This means one user
could have several different permission sets assigned to him. So we can get
*really*
granular in what permissions are contained within a single permission set and then
assign the permission set only to those users that actually need it.

**Permission Set Groups**

Of course, the more focused you keep the scope of your permission sets, the more
that you're going to have. After a while, this could be quite a challenge to
manage as well.
*Enter permission set groups!*

In the Spring '20 release permission set groups became generally available to help
organizations that needed to simplify the assignment of permission sets to their
users. Permission set groups also have a many-to-many relationship with the User
object, and as the name suggests, can group multiple permission sets in one shot.
Another important note is that a permission set can be assigned to multiple groups.
This means you can
**map permission sets to job functions and permission set groups to job roles.**
:tada:

So if a user takes on an additional role temporarily while the business searches for a
full-time hire, then they can have the appropriate permission set group assigned to
them for as long as is needed. Once the new hire is onboarded, the permission set group
can be reassigned to the new hire instead.

There's even the ability to
_mute_
specific permissions within a permission set group so
you don't have to change the underlying permission set (impacting other permission set
groups) if a specific aspect of the permission set doesn't apply.

We use permission sets all the time in our Salesforce development, and with permission
set groups it's getting harder to justify managing permissions via profiles. In fact,
even Salesforce has stated
[their long term plan is to sunset profiles.](https://admin.salesforce.com/blog/2019/introducing-the-next-generation-of-user-management-permission-set-groups)

If you could use a hand in updating your org to leverage perm sets
or with another Salesforce development project then
[give us a shout](mailto:support@tython.co),
we’d be happy to help!
