---
layout: post
title: Override CSS in LWC Part 1
description: 
date: 2022-10-10T20:00:00.000Z
categories: ['salesforce', 'development', 'lwc', 'css']
keywords: ['lwc', 'javascript', 'code', 'css']
slug: 
---

[Andrew R Chen](https://www.tython.co/)

<br/>

### Falling into Shadow

Lightning Web Components follow the Web Components standard of [encapsulation using Shadow DOM](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.create_dom). This means that strcuture and styles defined within an LWC will not affect other components, whether parent, child, or sibling. This is often Good! Style-rule collisions and unintended overrides can lead to spiralling development headaches when you just want some certain padding to be applied!

However, in certain circumstances, you want that control over all components. In particular, we have found that integrating [Salesforce LWC Base Components](https://github.com/salesforce/base-components-recipes) into a specific custom theme sometimes cannot be achieved with only [styling hooks](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.create_components_css_custom_properties). In these specific situations we needed a way to *punch through the Shadow DOM*.

<br/>

### Injecting some Light

One method to work around Shadow DOM encapsulation is utilizing *style injection*. ([Credit for this approach goes to this stack post](https://salesforce.stackexchange.com/a/270624/68974])).

Style injection is where we leverage our access to a component's `template` instance in order to directly append a `style` tag into the component's DOM. This has the desired affect of allowing CSS style rules to affect the internal markup of the component, with a key caveat (more on that below). Lets see this in action.

<br/>

### Example

Here we have a lightning-input component that we want to apply a custom border to. First we try to set the `style` attribute:

```html
<!-- demo.html -->
<lightning-input
    class="target-element"
    label="Demo"
    value="code with Tython"
    style="border: 2px solid red"
>
</lightning-input>
```

This results in:

<!-- EMBED IMG 1 HERE -->
![Base component Lightning-Input with attribute styling affecting the LWC host element only.](/images/2022-10-10-css-overriding-in-lwc-p1-1.png){: style="padding: 0 20px 20px; max-width: 420px;" }

Uh-oh. What we wanted was to just surround the input element itself with the border. Instead, what we got was the border wrapping around the label as well! Assuming we absolutely must have that helpful label, we are going to need a different approach.

Lets set up our injection method:

```js
// demo.js
    renderedCallback() {
        if (!this._hasRendered) {
            this._hasRendered = true;
            const style = document.createElement('style');
            style.innerText = `
                lightning-input.target-element input {
                    border: 2px solid red;
                }
            `;
            this.template.querySelector('.target-element').appendChild(style);
        }
    }
```

The result:

<!-- EMBED IMG 2 HERE -->
![Base component Lightning-Input with internal input element styled.](/images/2022-10-10-css-overriding-in-lwc-p1-2.png){: style="padding: 0 20px 20px; max-width: 420px;" }

Thats more like it! Lets step through what we are doing.

1. Our injection code happens in the `renderedCallback` hook. This is because we know the component markup is rendered by the time this method is invoked.

2. We programmatically create a `style` element and set its `innerText` property to the CSS we wish to "inject" onto the page. You can define as many or as few CSS rules as you need. Just make sure the style rule(s) are as *specific* as possible! This will help prevent unintended targeting of other elements on the page (more on this later).

3. Using the LWC `template` property, we locate our target element (generally the LWC's root element) and then append our new `style` tag to it.

One additional best-practice to highlight here is the use of the `_hasRendered` flag. In an LWC, `renderedCallback` can be invoked many times as the component is compelled to update. The simple check ensures that we perform the injection only once to prevent littering the component with `style` tags that don't accomplish anything.

This technique has proven useful enough for our team that [we turned it into a utility method](https://github.com/tythonco/sfdx-project-template/blob/master/force-app/main/default/lwc/utils/styleTools.js) that any of our LWC's can import and use.

<br/>

### Respecting the Shadow

The style injection approach is certainly powerful. Maybe even too powerful? The danger here is that CSS delivered via injected `style` tags become effectively *global style rules*. That means the styles defined in such a way can affect *anything* within scope of the page's DOM tree. This includes parent elements as well!

That is a potential recipe for bugs and unintended consequences, the very scourges the Shadow DOM was created to combat. It is up to the developer to wield these techniques with great care.

What you don't need to inject, don't inject. When you do, *be specific*. If you have multiple instances of the same LWC that employs this tactic, be wary of them overriding each other.

In short, have fun but **be careful.**

<br/>

### Hope for the Future

This post outlined an approach for overriding the Shadow DOM encapsulation for specific circumstances that require it. In particular, we found it useful to exercise greater control over the styling of Salesforce's Base Components. The method used is powerful and flexible, but can easily run amok on the page.

The good news is that the situation for developers is still improving.

General support for style hooks has somewhat mitigated the circumstances where we would be forced to turn to a method like style injection. The limitation is that the component must expose the "style hooks" in its api, which the base components as of now don't all reliably provide.

There is also coming support of Light DOM, which is the ability to configure custom LWC to forgo Shadow DOM encapsulation when not needed. That is welcome flexibility, but [there are a number of limitations to keep in mind](https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.create_light_dom), including notable lack of support for the Base Components.

If all else fails, rest assured Tython stands ready to [lend a hand](mailto:support@tython.co)!
