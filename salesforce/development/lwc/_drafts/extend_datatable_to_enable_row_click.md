---
title: >-
  Extending LWC Datatable With Row-Click Handling
description: 'Extending LWC base components to implement new functionality, using row-click handling on the Datatable as an example.'
date: '2021-03-08T20:00:00.000Z'
categories: ['development']
keywords: ['lwc', 'javascript', 'code']
slug: >-
  /extend-lwc-datatable-with-row-click-handling
---

[Andrew R Chen](https://www.tython.co/)


# Extending LWC Datatable With Row-Click Handling

Salesforce provides a bevy of base components when building applications. These often get the job done but there are limitations. When some desired functionality is not implemented, the choices are:

a) Roll your own component and/or

b) Clone and extend one of the [open-source base component recipes](https://github.com/salesforce/base-components-recipes).

For Lightning data tables, doing a) could be very time-consuming. Meanwhile doing b) is currently impossible. Lightning data tables are not part of the shared repository at the time of writing!

[Salesforce is aware](https://salesforce.stackexchange.com/questions/292573/recommended-approach-when-lwc-base-component-is-missing-feature).

Until rectified, here is a way to extend Lightning data table functionality. Let's add click-handling to table rows.

## Step 1

Here is the basic setup and definition of the data columns for our example.

```js
// DatatablePlus.html ("empty" since we are extending class)
<template></template>

// DatatablePlus.js
export default class DatatablePlus extends LightningElement {
    columns = [
      { label: 'Label', fieldName: 'name' },
      { label: 'Website', fieldName: 'website', type: 'url' },
      { label: 'Phone', fieldName: 'phone', type: 'phone' },
      { label: 'Balance', fieldName: 'amount', type: 'currency' },
      { label: 'CloseAt', fieldName: 'closeAt', type: 'date' },
    ];
}
```

[It is worth reviewing the component documentation](https://developer.salesforce.com/docs/component-library/bundle/lightning-datatable/documentation). Note the section "Creating Custom Data Types". We take a page from this strategy and `extend` the Lightning Datatable.

## Step 2

The life-cycle function `renderedCallback` can access rendered elements. Here we will attach a “click” event handler to the `tbody` element. The actual click target may differ.

```js
// DatatablePlus.js
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
```

Use arrow function syntax to preserve context.  The _hasRendered flag prevents multiple attachments of the click handler. [Note that the framework will handle listener removal](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.events_handling) within the component context.

## Step 3

We normalize the click target by finding the “table row” element. This `TR` element is where Lightning Datatable locates the unique Id field value.

```js
// DatatablePlus.js

// Helper function
function findParentRow(element) {
    if (element.tagName === 'TR') return element;
    return findParentRow(element.parentElement);
}

table.addEventListener(
    'click',
    (e) => {
        const parentRow = findParentRow(e.target);
        if (parentRow) {
          console.log(
            'Clicked Row with Id of: ',
            parentRow.getAttribute('data-row-key-value')  
          );
        }
    },
    true
);
```

## Step 4

We now have the unique row Id. How to send this data to the parent component? Dispatching an event will not work! [This is because events get re-targeted when passing through the "shadow barrier"](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.events_propagation).

[Salesforce has a couple of recommended patterns](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.events_pubsub). We will use a third pattern, the `message` api on the `Window` object.

```js
// DatatablePlus.js

table.addEventListener(
    'click',
    (e) => {
        const parentRow = findParentRow(e.target);
        if (parentRow) {
            window.postMessage(
                {
                    datarow: parentRow.getAttribute(
                        'data-row-key-value'
                    )
                },
                window.location.origin
            );
        }
    },
    true
);
```

## Step 5

Let’s use our _enhanced_ Lightning-Datatable. Set up a handler to parse the message and use the passed Id.

```js
// Example.html

<c-datatable-plus
    class="goal-setup-datatable"
    key-field="id"
    data={goalTableData}
    columns={goalTableColumns}
    hide-checkbox-column
>
</c-datatable-plus>

// Example.js

connectedCallback() {
    this.setupEventListeners();
}

setupEventListeners() {
    this.messageHandler = ({ data, origin }) => {
        if (origin === window.location.origin) {
            if (data.datarow) {
              console.log('Do stuff with this Row Id: ', data.datarow);
            }
        }
    };
    window.addEventListener('message', this.messageHandler);
}
```

The targetOrigin check [handles situations where the page is hosted on a different domain](https://salesforce.stackexchange.com/a/315965).

## Step 6

We have one more clean-up step. Globally-attached listeners (e.g. window, document) [are not handled by the framework and must be removed explicitly](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.events_handling). In the disconnectedCallback hook, pass in the saved reference to messageHandler.

```js
disconnectedCallback() {
    window.removeEventListener('message', this.messageHandler);
}
```

===

With that, we can now handle the row click event! This pattern can be used to extend Lightning Datatable in other ways, and other Lightning Web Components as well.

If you could use a hand in hacking your LWCs, or with another Salesforce development project then [give us a shout](mailto:support@tython.co), we’d be happy to help!
