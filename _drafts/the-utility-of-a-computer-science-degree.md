---
layout: post
title: The Utility of a Computer Science Degree
description: ''
date: 2023-07-14T21:24:30.000Z
categories: ['education']
keywords: ['computer science']
slug: /the-utility-of-a-computer-science-degree
---

[Chuck Ross](https://www.tython.co/)

I love computer science. I'll take a deep dive into algorithm speed and efficiency any time.
Designing the perfect data structure for a project is a task to look forward to. I look forward
to the day when I can put machine learning or artificial intelligence into practice.

But I'm not a computer scientist. What I do can be described in a few ways: programmer,
developer, software engineer. Whatever you want to call it, what I _do_ is write code to solve
problems, generally for businesses. What I don't do is perform research into information
theory or cryptogrophy. I do use the results of others' research every day and am infinitely
grateful for their work.

And I've been doing that for a long time, nearly all of my professional career and for more
than half of my life. And my experience has lead me to be tapped by management to mentor junior
developers a few times. And each time, the junior developer had a degree in computer
science, either a bachelor's or master's. These junior developers were much more educated than
I in computer science. They knew more about efficient sorting algorithms and all
the ways to build a linked list than I ever will.

But, they didn't know how to write software for clients.

Now it's not their fault that this was the case. Given my experience mentoring, achiving a
degree in computer science just doesn't prepare the person for creating software to solve
business problems. And I do understand why a CS degree path was chosen. Most universities don't
have a degree program for Computer Programming or Software Development, just like they don't
have a degree program for Carpentry or Masonry. Universities are homes to academia, and there's
a reason that in some contexts "academic" is a synonym for "theoretical."

I actually considered returning to school to get my degree in computer science, but after my
mentoring experience, rejected the idea. While it might be fun, it wouldn't have any practical
effect on my daily career. With that in mind, if you are currently studying computer science,
or have recently attained your degree in the field, here are some tips for how to create
software that businesses can use to make themselves more efficient and profitable.

## The Minutie Can Be Ignored

Unless you're building operating systems or real-time systems, you're probably using a very
high level language, probably JavaScript, but perhaps Python or some flavor of Java. According
to Stack Overflow's 2023 developer survey, the top six (procedural) languages all include
some form of garbage collection, so you probably don't need to worry about memory management at
all.

In a similar vein, speed isn't the highest priority for most software. There are exceptions,
such as 3D graphics, video encoding, etc., but even in these cases there are libraries such as
Apple's Metal framework, that can do the heavy lifting. The highest priority for most business
software is that it works and as quickly as possible.

## Learn the Development Tools

There is more to software engineering than knowing how to write code. Almost every development
platform will use a standard set of tools, and the better you know these tools, the more
efficiently you'll create software. Generically, these tools include:

- A text editor
- A version control system
- A command line shell

My specific instances of these tools is Vim, git, and the Z Shell. Like any
generalization, there are exceptions. For years I worked in a platform called FileMaker, where
a text editor was unnecessary, version control difficult, and the command line seldom needed.
But regardless of whether you're developing for the web, desktop, or mobile applications,
you'll probably be working with a traditional text-based programming language, and these are
the three tools you'll want to know regardless of your specific target.

Depending on the target, there may be additional tools to know, such as an integrated
development environment (VS Code being popular with Salesforce, Xcode pretty much necessary for
Apple platforms), the browser tools for web development, perhaps even a graphics program like
Photoshop if your development includes icon design.

Given that Tython is a Salesforce software developer, here are some specific tools that we use
every day:

- The VS Code IDE (with the Vim plugin in some cases)
- `git` for version control with GitHub for collaboration
- Z Shell for the macOS developers and Bash for the Linux developers

Learn tools deeply.

## Know Your Available Libraries

Every programming language is more than the syntax of functions and loops. It comes with a
library of reusable code. But the breadth of each library, and the naming of similar features
differs across languages. Whatever language you're working with, read at least the name and
description of every available tool. Yes, I do mean _every_ tool. You needn't do this in a
single block of time, but take some time out of your schedule, perhaps 15 minutes each day, to
read the documentation on a few built-in classes or functions.

Working in Salesforce, this means we developers need to know about every available object and function in JavaScript and Apex. Notice I said "know about every available object," not "know every available object." You don't need to know how to use everything available, but you _do_ need to know everything that _is_ available.

If you don't know that (to give a trivial example) JavaScript includes `Array.filter`, you will
some day have a need to retain array elements that match a criterion and try to build it
yourself. But if you have read that `Array.filter` exists, even if you don't remember the
precise usage, you'll be able to quickly look it up.

Reading through your current language's library will also help when languages have different
names for similar features.

## Automatically Test

Stub.

## Learn Continuously

Stub.
