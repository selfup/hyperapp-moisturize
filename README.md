_[Hyperapp](https://github.com/hyperapp/hyperapp) 1.0.1_

# Moisturize your app today!

Don't we all just love the word _moist_? Apprently not, but we also cringe at dynamically _upgrading_ immutable stores.

So I present: `hyperapp-moisturize` :tada:

After much deliberation on the Hyperapp repo itself ([Dynamic actions: How to add new actions at runtime? #533](https://github.com/hyperapp/hyperapp/issues/533)) we decided that a HOA (Higher Order App) was the way to go for Dynamically loading anything (focus on actions) into a Hyperapp.

### Polyfills for Production

Please use a polyfill for `Object.assign` in production when using this package :pray:

The idea is that if you need to dynamically import, or if you are routing, you should already be using webpack or rollup/parcel (no dynamic import) for your app anyways :guitar:

### Install

CDN: 
```html
<script src="https://unpkg.com/hyperapp-moisturize"></script>
```

```js
console.log(hyperappMoisturize);
console.log(window.hyperappMoisturize);
```

Node:
```bash
npm install --save hyperapp-moisturize
```

### Purpose

To dynamically change the state / actions / root view of your app!

If you read [this issue](https://github.com/hyperapp/hyperapp/issues/533) you will discover that there is more to this type of HOA than just dynamic actions!

[**Caveats**](https://github.com/hyperapp/hyperapp/issues/533#issuecomment-355764579)

This just means that for people building out dev tools like `hyperapp-logger` or `hyperapp-redux-devtools` need to know:

> we could have the dev tools look for typeof `payload.action === 'function' && payload.data` and then expand the payload so dynamic actions look normal

Not a big deal :smile:

I also add a property to the updated actions `.moisturizedOriginalName` for dev tools to look out for.

_Eventually we will figure out a convention_ :joy:

### How to use

_Assuming you have dynamic imports already set up in your project_

```js
import moisturize from 'hyperapp-moisturize';

const main = moisturize(app)(state, actions, view, document.body);

import('./thing.js')
  .then(({ state, actions, view }) => {
    main.updateApp({ state, actions, view });
  });
```

That's it! Bam!

You don't have to pass all three options for it to work:

```js
// JUST ONE

main.updateApp({ actions });

// OR TWO

main.updateApp({ state, actions });

// OR THREE

main.updateApp({ state, actions, view })
```

### Example CodePen

https://codepen.io/selfup/pen/gooojE?editors=0010
