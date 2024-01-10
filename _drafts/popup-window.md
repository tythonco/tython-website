---
layout: post
title: Creating a Popup Window Component
description: How to create a reusable popup window component from scratch
date: 2023-10-31
categories: ["salesforce", "lightning web components"]
keywords: ["lightning web components"]
slug:
---

[Chuck Ross](https://www.tython.co/)

For many years (OK, I'll be honest, for decades), I worked with the FileMaker platform, a
competitor of sorts to the Salesforce platform. Both offer tools to quickly build
database-driven apps for various target platforms, including the web. FileMaker has a
particularly useful widget called the popover. The basic idea is that you can place a button on
the screen and when the user clicks the button, they get a small window attached to the button
with additional information.

While Salesforce doesn't (yet) have an analogous Lightning Web Component, this feature _is_
offered by the Lightning Platform. In this article we'll walk through building a Lightning
Web Component that takes advantage of the Lightning Design System and, one of my favorite LWC
features, slots, to create a reusable popup window.

Now, this was built specifically for an internal use case, so this version only does what was
required for that specific need, but there's plenty that could be added to this initial version.
Consider this a starting point for customizing this component to your perhaps more complex
needs.

Here are the features this component will support:

- The ability to customize the button's icon, alternative text, title, and variant
- The ability to show whatever content we with within the popup window
- the ability to dismiss the window by either hitting the escape key or clicking anywhere
  outside the window

The `popoverButton.css` file is the simplest, so let's cover that first.

```css
lightning-icon {
  cursor: pointer;
}

section {
  position: fixed;
}

.outside-click-capture {
  position: fixed;
  z-index: 5999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
```

The first CSS rule is pretty self-explanitory. Within the HTML, we're using the `lightning-icon`
component, but this icon will be acting light a button, and buttons should show a pointer when
they're hovered over. This rule take care of that.

Next we have our `section` rule. Here we set the position to `fixed` so that the component
doesn't jump around when we open and close the popover window.

As you'll see, the `outside-click-capture` class selector is applied to a `div` tag in the
HTML, which will allow us to dismiss the popup window when the user clicks on the page's
background. We use a `z-index` to place it above everything else on the page, and position it
`fixed` to the top left of the page so that it covers everything else.
