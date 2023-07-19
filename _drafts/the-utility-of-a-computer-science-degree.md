---
layout: post
title: The Utility of a Computer Science Degree
description: ''
date: 2023-07-27T20:00:00.000Z
categories: ['education']
keywords: ['computer science']
slug: /the-utility-of-a-computer-science-degree
---

[Chuck Ross](https://www.tython.co/)

I love computer science. I'll take a deep dive into algorithm speed and efficiency any time.
Designing the perfect data structure for a project is a task to look forward to. I eagerly
anticipate the day when I can put machine learning or artificial intelligence into practice.

But I'm not a computer scientist. What I do can be described in a few ways: programmer,
developer, software engineer. Whatever you want to call it, what I _do_ is write code to solve
problems, generally for businesses. What I don't do is perform research into information
theory or cryptogrophy. I do use the results of others' research every day and am infinitely
grateful for their work.

And I've been doing that for a long time, nearly all of my professional career and for more
than half of my life. My experience has lead me to be tapped by management to mentor junior
developers a few times. And each time, the junior developer had a degree in computer
science, either a bachelor's or master's. These junior developers were much more educated than
I in computer science. They knew more about efficient sorting algorithms and all
the ways to build a linked list than I ever will.

But, they didn't know how to write software for clients.

Now it's not their fault that this was the case. Given my experience mentoring, achiving a
degree in computer science just doesn't prepare the person for creating software to solve
business problems. And I do understand why a CS degree path was chosen. Until fairly recently,
a degree in Software Engineering was rarely offered by most universities. I think this is
partly because universities are homes to academia, and there's a reason that in some contexts
"academic" is a synonym for "theoretical."

I actually considered returning to school to get my degree in computer science, but after my
mentoring experience, rejected the idea. While it might be fun, it wouldn't have any practical
effect on my daily career. With that in mind, if you are currently studying computer science,
or have recently attained your degree in the field, here are some tips for how to create
software that businesses can use to make themselves more efficient and profitable.

## The Minutie Can Be Ignored

Unless you're building operating systems or real-time systems, you're probably using a very
high level language, probably JavaScript, but perhaps Python or some flavor of Java. According
to Stack Overflow's 2023
[developer survey](https://survey.stackoverflow.co/2023/#programming-scripting-and-markup-languages),
the top six (procedural) languages all include some form of garbage collection, so you probably
don't need to worry about memory management at all.

In a similar vein, speed isn't the highest priority for most software. There are exceptions,
such as 3D graphics, video encoding, etc., but even in these cases there are libraries such as
Apple's [Metal](https://developer.apple.com/metal/) framework, that can do the heavy lifting.
The highest priority for most business software is that it works and as soon as possible.
Leave making it work quickly for when you discover it needs to.

## Learn the Standard Development Tools

There is more to software engineering than knowing how to write code. Almost every development
platform will use a standard set of tools, and the better you know these tools, the more
efficiently you'll create software. Generically, these tools include:

- A text editor
- A command line shell
- A version control system

My specific instances of these tools is [Vim](https://www.vim.org), the [Z
Shell](https://www.zsh.org), and [`git`](https://git-scm.com). Like any generalization, there
are exceptions. For years I worked in a platform called FileMaker, where a text editor was
unnecessary, version control difficult, and the command line seldom needed. But regardless of
whether you're developing for the web, desktop, or mobile applications, you'll probably be
working with a traditional text-based programming language, and these are the three tools
you'll want to know regardless of your specific target.

Depending on the target, there may be additional tools to know, such as an integrated
development environment ([VS Code](https://code.visualstudio.com) being popular with
Salesforce, [Xcode](https://developer.apple.com/xcode/) pretty much necessary for Apple
platforms), the browser tools for web development, perhaps even a graphics program like
Photoshop if your development includes icon design.

Given that Tython is a Salesforce software developer, here are some specific tools that we use
every day:

- The VS Code IDE (with the Vim plugin in my case)
- Z Shell for the macOS developers and Bash for the Linux developers
- `git` for version control with [GitHub](https://github.com) and
  [Jira](https://www.atlassian.com/software/jira) for collaboration
- [`sfdx`](https://www.salesforce.com/products/platform/products/salesforce-dx/) for dealing
  with orgs and source code
- [`node`](https://nodejs.org/en) for automating local development processes
- [Chrome](https://www.google.com/chrome/) and
  [Firefox](https://www.mozilla.org/en-US/firefox/) for testing and debugging

Whichever set of tools you either choose are have chosen for you, know them well. Software
engineers are like craftpeople, and just as a carpenter will create better woodworks if they
know their jigsaw inside out, the better you know your tools and the features they offer,
the more you'll be able to leverage them to save you time and produce better software.

## Know Your Libraries

Every programming language is more than the syntax of functions and loops. It comes with a
library of reusable code. But the breadth of each library, and the naming of similar features,
differs across languages. Whatever language you're working with, read at least the name and
description of every available tool. Yes, I do mean _every_ tool. You needn't do this in a
single block of time, but take some time out of your schedule, perhaps 15 minutes each day, to
read the documentation on a few built-in classes or functions.

Working in Salesforce, this means we developers need to know about every available object and
function in JavaScript and Apex, as well as the various built-in Lightning Web Components and
Lightning Design System features. Notice I said "know about every available object," not "know
every available object." You don't need to know how to use everything available, but you _do_
need to know everything that _is_ available.

To give a trivial example, if you don't know that JavaScript includes
[`Array.filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
you will some day have a need to retain array elements that match a criterion and try to build
it yourself. But if you have read that `Array.filter` exists, even if you don't remember the
precise usage, you'll be able to quickly look up the documentation.

This goes for your tools as well. Once you've gotten the basics of, for example, `git`, and
have familiarized yourself with the available features of your languages' libraries, go back
and do with `git` what you did with your language libraries: Read through the various options
available so that you know they exist when you need them.

## Learn Continuously

As a software engineer, you're never finished with your education, so I hope you enjoy
learning. Technology, almost by definition, is an ever changing field. New languages are
invented, new paradigms discovered.

Your continuing education will generally take one of three forms:

### Updates to Current Tools

Languages, tools, and libraries are constantly updated. When they are you need to read the
release notes so that your deep knowledge of the available features doesn't grow obsolete.

### Learning from Others

You don't know everything, and you never will. Take advantage of the generous developers out
there who write blog posts about their process. Listen to podcasts that cover your industry.
Attend conferences to learn how others have solved specific problems that they've come across,
many of which will be similar if not identical to those you'll find.

### Learning for Its Own Sake

Spend some time learning a technology foreign to you just for the sake of learning something
new. Even if you never use it professionally, there's utility in knowing how technologies you
_don't_ use every day work. If, as a Salesforce developer, you're only familiar with JavaScript
and Apex, I'd suggest learning Lisp or Python. I've often found that knowing how a different
programming language works can improve my use of my daily languages.

## Conclusion

Please don't misunderstand me. I don't think that a CS degree is _useless_ for a software
engineer. You will put to use your education in how to build algorithms and data structures at
the very least. But it's not _sufficient_ for a software engineer. There other tips I've left
out for brevity, so let us know if you found this helpful and if so I can return to the topic
with more.
