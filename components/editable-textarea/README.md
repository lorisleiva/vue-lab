# :memo: EditableTextarea component

Renderless controlable component that updates the content of a textarea.

![Demo screenshot](https://user-images.githubusercontent.com/3642397/40798547-972480f0-650b-11e8-9d4f-ca8e2d44ba74.png)

## Demo

* [CodePen](https://codepen.io/lorisleiva/pen/LrVPKE)
* [Blog article](http://lorisleiva.com/renderless-editable-textarea)

## Installation

Install dependencies
```bash
npm install lodash -D
```

Copy/paste the code in a new `EditableTextarea.js` file.

Add it to any component that needs it.
```js
import EditableTextarea from './path/to/EditableTextarea.js'

export default {
    components: { EditableTextarea },
}
```

## Usage

```html
<editable-textarea ref="editor">
    <textarea></textarea>
</editable-textarea>
```

```js
// Wrap selection between '**'
this.$refs.editor.wrapWith('**')

// If selection is empty, adds **placeholder**
this.$refs.editor.wrapWith('**', 'placeholder')
```