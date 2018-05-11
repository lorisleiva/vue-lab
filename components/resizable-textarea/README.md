# :scroll: ResizableTextarea component

Renderless component that wraps any textarea to resize it based on its content.

![Demo screenshot](https://user-images.githubusercontent.com/3642397/39928168-e55fc4fa-5534-11e8-8f13-a274910b7d6f.gif)

## Demo

* [CodePen](https://codepen.io/lorisleiva/pen/XqqKKP)
* [Blog article](http://lorisleiva.com/renderless-resizable-textarea)

## Installation

Copy/paste the code in a new `ResizableTextarea.js` file.

Add it to any component that needs it.
```js
import ResizableTextarea from './path/to/ResizableTextarea.js'

export default {
    components: { ResizableTextarea },
}
```

## Usage

```html
<resizable-textarea>
    <textarea></textarea>
</resizable-textarea>
```
