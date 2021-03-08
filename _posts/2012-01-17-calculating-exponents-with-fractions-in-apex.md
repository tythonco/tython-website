---
layout: post
title: Calculating Exponents with Fractions in Apex
description: ''
date: '2012-01-17T21:24:30.000Z'
categories: ['salesforce', 'development']
keywords: []
slug: /calculating-exponents-with-fractions-in-apex
---

[Scott
Covert](https://www.tython.co/)

Shockingly, the ability to calculate exponents containing fractions is (as of this posting and to the best of my knowledge) not yet supported within Salesforce. This can cause serious issues for any Salesforce users that require very exact calculations, such as those within the financial industry. I urge anyone reading this post to go [here](https://sites.secure.force.com/success/ideaView?id=08730000000XrAeAAK) and promote the idea of adding this functionality to the native platform.

That said, I actually do have a way to get around this until Salesforce provides native support. Although Salesforce currently only accepts positive, integer values as exponents the EXP function and LN function accept any number, including decimal values. Using a little math you can rearrange the problem-see the example below:

a = b^(c)

ln(a) = c \* ln(b)

a = e ^ \[ c \* ln(b) \]

Rearranging the problem into this format allows you to utilize the EXP and LN functions, which as mentioned before, can accept decimals and negative values alike.

So, if you are creating a formula field try using:

EXP(c \* LN(b))

as opposed to b ^ (c)

and/or if you are developing an Apex class try using:

Math.exp(c \* Math.log(b))

as opposed to Math.pow(b,c)

I have also posted this in the developer discussion boards for future reference, which can be found [here](http://boards.developerforce.com/t5/Formulas-Validation-Rules/Formulas-Raising-a-number-to-a-power-with-a-fractional-exponent/m-p/213115/highlight/false#M9796).

Hope that helps and if you have any other workarounds you’ve used to circumvent the limitations of Salesforce’s Math methods then let’s hear ’em in the comments!