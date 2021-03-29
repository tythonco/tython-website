---
layout: post
title: >-
  Writing Idempotent Backend Methods in Salesforce
description: ''
date: 2021-03-25T07:00:00.000Z
categories: ['salesforce', 'apex']
keywords: ['salesforce' , 'apex' ]
slug: >-
  /writing-idempotent-backend-methods-in-salesforce
---

[Martin Glauber](https://www.tython.co/)

<hr>

The code for the sample application in this blog post can be found here:  
[https://github.com/martinglauber/writing-idempotent-backend-methods-in-salesforce](https://github.com/martinglauber/writing-idempotent-backend-methods-in-salesforce)

<hr><br>

The example application that I have created is a movie review app. Here's a screen shot:

<img src="/images/2021-03-25-idempotent-backend-methods-1.png" class="image-center" />

As you can see in the image above,

1. The star section is where the user can input their 1 to 5 rating by clicking on the stars.

2. The text box is where the user can input their comments.

3. The save buttons where users can save their ratings.
 
   Of course in a real application, there would only need to be one save button. I created three save buttons here to illustrate three attempts to implement the save functionality. 

   The intended functionality is that each user should only be able to leave one review; the first time a user hits save, their review is added to the list of all reviews, and if they have already left a review, hitting save again will change their existing review.

4. The "Delete My Rating(s)" button let's users delete their ratings. 

5. The "All Ratings" section shows all users' ratings for the movie. 

In the first implementation of the save functionality, which is wired to the button `Save 0`, everything may seem fine at first, but the trouble pops up when you click the button multiple times in a row on the first save.  

Since the same user is rating the same movie, you would want an idempotent save method to just have one rating saved there. In reality though, we get multiple records saved. 

<img src="/images/2021-03-25-idempotent-backend-methods-2.png" class="image-center" />

So what's going on here?

```
@AuraEnabled
public static void saveRating_0( Id movieId , Integer stars , String comments )
{
    Rating__c RatingToSave = new Rating__c() ;

    Id UserId = UserInfo.getUserId() ;

    RatingToSave.Movie__c    = movieId  ;
    RatingToSave.User__c     = userId   ;
    RatingToSave.Stars__c    = stars    ;
    RatingToSave.Comments__c = comments ;

    list<Rating__c> ExistingUserRatings =
        [ SELECT Id
          FROM Rating__c
          WHERE Movie__c = :movieId
            AND User__c = :UserId
        ] ;

    // delay
    Integer i = fibonacci( 28 ) ;

    if ( ExistingUserRatings.size() > 0 )
    {
        RatingToSave.Id = ExistingUserRatings[0].Id ;
        update RatingToSave ;
    }
    else
    {
        insert RatingToSave ;
    }
}
```

When the multiple requests come in, they are executed in parallel, and the queries all happen before any of the dml operations happen. So in each transaction, when no existing ratings are found for the user for that movie, each of the ratings are inserted. 

In this example, the delay between the query and the dml operations was artificially added to illustrate the point, but this does happen in real situations as the app collects more data and the logic gets more complex. 

In the second implementation, with button `Save 1`, you can click on the button multiple times on the first save, but you still just get the one record. 

<img src="/images/2021-03-25-idempotent-backend-methods-3.png" class="image-center" />

What this method does differently is that rather than having a separate query and dml call, the same method just upserts against an "external id".

```
@AuraEnabled
public static void saveRating_1( Id movieId , Integer stars , String comments )
{
    Rating__c RatingToSave = new Rating__c() ;

    Id UserId = UserInfo.getUserId() ;

    RatingToSave.Movie__c    = movieId  ;
    RatingToSave.User__c     = userId   ;
    RatingToSave.Stars__c    = stars    ;
    RatingToSave.Comments__c = comments ;
    RatingToSave.Key__c      = userId + '-' + movieId ;

    // delay
    Integer i = fibonacci( 28 ) ;

    Database.upsert( RatingToSave , Rating__c.Key__c ) ;
}
```

And a solution to the problem could just be this simple. 

There are some situations though where a different approach is required. Depending on your database schema, you might be having trouble coming up with a key to upsert against for your sObject. Also, in this application, if you click `Save 1` multiple times and click delete before the saves are complete, the delete could finish before some of the saves, and you would be left with a rating record even though the last action was a delete; which might not be the desired behavior. 

The third approach to implementing the save functionality, `Save 2`, is to use database locks:

```
@AuraEnabled
public static void saveRating_2( Id movieId , Integer stars , String comments )
{
    Rating__c RatingToSave = new Rating__c() ;

    Id UserId = UserInfo.getUserId() ;

    RatingToSave.Movie__c    = movieId  ;
    RatingToSave.User__c     = userId   ;
    RatingToSave.Stars__c    = stars    ;
    RatingToSave.Comments__c = comments ;

    // set lock
    String Key = UserId + '-' + movieId ;
    DatabaseLock__c Lock = new DatabaseLock__c( Key__c = Key ) ;
    insert Lock ;
    list<DatabaseLock__c> Locks = [ SELECT Id FROM DatabaseLock__c WHERE Key__c = :Key FOR UPDATE ] ;

    list<Rating__c> ExistingUserRatings = 
        [ SELECT Id
          FROM Rating__c
          WHERE Movie__c = :movieId
            AND User__c = :UserId
        ] ;

    // delay 
    Integer i = fibonacci( 28 ) ;

    if ( ExistingUserRatings.size() > 0 )
    {
        RatingToSave.Id = ExistingUserRatings[0].Id ;
        update RatingToSave ;
    }
    else
    {
        insert RatingToSave ;
    }

    // delete lock
    delete Lock ;
}
```

By doing a `FOR UPDATE` query, any other requests doing a `FOR UPDATE` query against the same records will have to wait for the lock to be lifted at the end of the locking transaction. In this case, the key that is used to create the locks is derived from the user Id and the movie Id. So, any requests for this user and movie that use this locking mechanism will have to wait until the previous ones finish. 

So here, you can click `Save 2` multiple times and then click delete, and the delete will finish last since it locks on the same key as the save and has to wait for all of the saves to finish first:

```
@AuraEnabled
public static void deleteUserRating( Id movieId )
{
    Id UserId = UserInfo.getUserId() ;

    // set lock
    String Key = UserId + '-' + movieId ;
    DatabaseLock__c Lock = new DatabaseLock__c( Key__c = Key ) ;
    insert Lock ;
    list<DatabaseLock__c> Locks = [ SELECT Id FROM DatabaseLock__c WHERE Key__c = :Key FOR UPDATE ] ;

    delete [ SELECT Id FROM Rating__c WHERE Movie__c = :movieId AND User__c = :UserId ] ;

    // delete lock
    delete Lock ;
}
```

For our movie rating application, another way to handle this issue could be to have the ui prevent there from being multiple clicks. If you disable the buttons until the first request returns, you won't have multiple requests coming in at once. That is unless a clever user clicks save on multiple devices at the same time. 

Along that same line of thought though, it's also important to point out that not all apex code is initiated though ui actions. I've seen push requests come into a Salesforce org from a service that would sometimes send out duplicates, and in those situations, we absolutely needed to make sure our apex endpoints were idempotent.  

Thanks for reading. If you need any help with your apex code or with anything Salesforce-related, you can reach us at <a href="mailto:support@tython.co">support@tython.co</a>.

