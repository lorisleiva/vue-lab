# :arrow_up_down: Dragdrop directive

Directive that uses [Dragula](https://github.com/bevacqua/dragula) to reorder your lists using drag&drop. A drag&drop will:
* Reorders the DOM elements (by Dragula)
* Reorders the VueJS array that renders those elements
* Assign the `order` property of all items of that array to match the new order

![Demo screenshot](https://user-images.githubusercontent.com/3642397/36781978-bcc2f378-1c77-11e8-894c-cfec19f93f8a.png)

## Demo

* [CodePen](https://codepen.io/lorisleiva/pen/JpeBdr)
* [Blog article](http://lorisleiva.com/drag-drop-made-easy)

## Installation

Install dependencies
```
npm install dragula -D
npm install lodash -D
```
Copy/paste the code in a new `Dragdrop.js` file.

Add it to any component that needs it.
```js
import Dragdrop from './path/to/Dragdrop.js'

export default {
    directives: { Dragdrop },
}
```

## Usage

```html
<div v-dragdrop="chapters" order="order" :options="options">
    <div 
        v-for="chapter in chapters" :key="chapter.id"
        v-text="chapter.title"
    ></div>
</div>
```

## Options

| Attribute | Default | Description |
| - | - | - |
| `v-dragdrop="array"` | |  Tells the directive to initialize Dragula on this  container and to update our `array` accordingly. |
| `order` *(optional)* | *No order update* | Tells the directive which property of our items keeps track of its order. You can use dot notation to provide a nested property. E.g. `order="order"` will update `chapter.order` whilst `order="meta.order"` will update `chapter.meta.order`. |
| `options` *(optional)* | `{}` | Provides Dragula options. |
