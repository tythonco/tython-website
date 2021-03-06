---
layout: post
title: >-
  Mind the Lifecycle When Extending LWC
description: 'Though component extension is powerful, there are some points to watch out for!'
date: 2021-04-19T20:00:00.000Z
categories: ['salesforce', 'development', 'lwc']
keywords: ['lwc', 'javascript', 'code', 'inheritance']
slug: >-
  /mind-lifecycle-when-extending-lwc
---

[Andrew R Chen](https://www.tython.co/)

<br/>

### Extension Caveats

 Row-click handling is not currently supported by Salesforce's base Lightning-Datatable component. [In a previous post, we explored extending the component to achieve this functionality](https://tython.co/salesforce/development/lwc/2021/03/08/extend-lwc-datatable-with-row-click-handling.html). This is powerful, but there are hangups! Lets examine one of these sneaky side-effects.

<br/>

### The Example

```js
// DatatablePlus.js
import LightningDatatable from  'lightning/datatable';
    
export default class DatatablePlus extends LightningDatatable {

	renderedCallback() {
	    if (this._hasRendered) {
	        return;
	    }

	    const table = this.template.querySelector('tbody');
	    table.addEventListener(
	        'click',
	        (e) => { console.log(e.target.tagName + ' was clicked.'); }
	    );
	        
	    this._hasRendered = true;
	}
}
```

First, we extended the component. Next we attach a targeted listener in a life-cycle method. The "renderedCallback" method gives us access to the mounted elements.

Lets define some columns. We will give the first column a "fixedWidth". According to [the documentation](https://developer.salesforce.com/docs/component-library/bundle/lightning-datatable/documentation), this option will enforce a set width.

```js
// DatatablePlus.js
const columns = [
      { label: '', fieldName: 'name', fixedWidth: 200 },
      { label: 'Col1', fieldName: 'Col1' },
      { label: 'Col2', fieldName: 'Col2' },
      { label: 'col3', fieldName: 'Col3' },
      { label: 'Col4', fieldName: 'Col4' },
];
```

Take a look at the result: _Wasn't that first column supposed to be a lot wider?_

![Extended Datatable w/ fixed width column.](/images/2021-04-19-mind-lifecycle-when-extending-lwc_table-before-example.png){: style="padding: 0 20px 20px;" }

<br/>

### What Happened?

That first column should be considerably wider than the others! It is instead displaying with the same width despite it's "fixedWidth" setting!

_It turns out that when extending an LWC, defining a life-cycle method overrides the parent's implementation._

This means that whatever logic contained in the parent method does not run.  If your extended component includes "connectedCallback", say bye-bye to parent's "connectedCallback". In our example, our "renderedCallback" supersedes the original. For Lightning-Datatable, it turns out that some important column-width adjustments happen in "renderedCallback". Our extension innocently wiped that functionality away.

<br/>

### A Super Solution

Luckily, [there is a *Super* solution](https://salesforce.stackexchange.com/a/325962/68974). We usually call "super" in a class constructor function. Here, we can use "super" as a namespace to access parent properties like life-cycle methods.

```js
// DatatablePlus.js
renderedCallback() {
    super.renderedCallback(); // Execute parent logic!
		
    if (this._hasRendered) { return; }

    const table = this.template.querySelector('tbody');
    table.addEventListener(
        'click',
        (e) => { console.log(e.target.tagName + ' was clicked.'); }
    );
        
    this._hasRendered = true;
}
```

This pattern ensures the parent logic runs first, followed by our custom logic. Check out the updated result.

![Extended Datatable w/ fixed width column.](/images/2021-04-19-mind-lifecycle-when-extending-lwc_table-after-example.png){: style="padding: 0 20px 20px;" }

This will work for any of the life-cycle methods. For instance, if you override "connectedCallback", since Lightning-Datatable uses that method as well, we must call `super.connectedCallback` to maintain base functionality. Be warned, this is *not* covered in [Salesforce component documentation](https://developer.salesforce.com/docs/component-library/bundle/lightning-datatable/documentation) at the time of this writing.

<br/>

### Equipped to Succeed

You are now equipped with some deep knowledge, have fun building extended LWCs! If you'd like an assist, or have another Salesforce development project in mind, then [give us a shout](mailto:support@tython.co). We’d be happy to help!
