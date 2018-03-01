# :bookmark_tabs: InputFile component

Provides a simple wrapper to the native `<input type="file">` for aesthetic purposes.

![Demo screenshot](https://user-images.githubusercontent.com/3642397/36842316-9f355466-1d4b-11e8-8551-037c7390b9b9.png)

## Demo

* [CodePen](https://codepen.io/lorisleiva/pen/VQgdgP)

## Installation

Copy/paste the code in a new `InputFile.vue` file.

Add it to any component that needs it.
```js
import InputFile from './path/to/InputFile.vue'

export default {
    components: { InputFile },
}
```

## Usage

```html
<input-file name="my_files" multiple>
  Browse...
</input-file>
```

## Options

| Attribute | Default | Description |
| - | - | - |
| `$slots.default` | 'Select...' | The text displayed on the button. |
| `name` | | The name attribute given to the hidden input of type `file`. |
| `multiple` | | Allows multiple file selection when provided. |
