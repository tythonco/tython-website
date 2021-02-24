---
title: Using the String.split() method with a Pipe Delimiter
description: ''
date: '2012-05-16T21:52:17.000Z'
categories: []
keywords: []
slug: >-
  /using-the-string-split-method-with-a-pipe-delimiter
---

[Scott
Covert](https://www.tython.co/)

Today I noticed a very interesting fact about the `String.split()` and `String.contains()` methods within Salesforce while attempting to iterate through a text field that contained one or more pipe `(|)` delimited strings. First, I ran a check to ensure that the text contained the pipe delimiter by using the `String.contains()` method. If it did contain the pipe delimiter, I then used the `String.split()` method to create a string array. Upon running my code and seeing that it did not execute as I intended I ran a few `System.debug()` calls and noticed that `String.split(‘|’)` will actually split a string into an array of its characters rather than splitting around the pipe delimiter itself. In order to correct this issue I had to change my split call to `String.split(‘\\|’)`, which splits the string using REGEX matching. I then updated my contains call to `String.contains(‘\\|’)` only to find that the `String.contains()` method was searching for the literal string `‘\\|’` instead of utilizing REGEX matching so I had to change it back to `String.contains(‘|’)`. In sum, be careful how you utilize REGEX matching when using the `String.split(`) and `String.contains()` methods!

BAD → `String.split(‘|’)`

GOOD → `String.split(‘\\|’)`

BAD → `String.contains(‘\\|’)`

GOOD → `String.contains(‘|’)`

EDIT: Another note on the `String.split()` command — if you need to include any trailing empty strings after the final pipe delimiter be sure to insert -1 as a second parameter to the method like this:

`String.split(‘\\|’,-1)`

Thanks to these sites for helping me resolve this issue:

[String Splitting](http://www.laceysnr.com/2010/03/string-splitting.html)

[Splitting a string using `'|'`](http://stackoverflow.com/questions/6978901/splitting-a-string-using)