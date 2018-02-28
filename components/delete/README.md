# :wastebasket: Delete component

Provides a convenient way for the user to confirm something that needs to be delete. This is useful when you don't want users to delete elements by mistake but don't want to bother them with a modal neither.

![Demo screenshot](https://user-images.githubusercontent.com/3642397/36788432-24397a0c-1c8e-11e8-9c9f-2c872c515124.png)

## Demo

* [CodePen](codepen_url) TODO
* [Blog article](http://lorisleiva.com/are-you-sure)

## Installation

Install dependencies
```
npm install axios -D
npm install font-awesome -D
```
Copy/paste the code in a new `Delete.vue` file.

Add it to any component that needs it.
```js
import Delete from './path/to/Delete.vue'

export default {
    components: { Delete },
}
```

## Usage

```html
<delete
    :url="/api/resource/1"
    @delete="deleteResource(1)"
></delete>
```

## Options

| Attribute | Default | Description |
| - | - | - |
| `url` | *No API call* | The API endpoint used to delete the item. |
| `deleteDelay` | 500 | Delay in milliseconds to wait between the moment the item has been deleted by the API and the time we raise the `@delete` event. This enables the user to see some "deleted" feedback before the component disappears. |
| `confirmText` | 'Are you sure?' | The confirmation text prompted to the user. |
| `successText` | 'Deleted' | The text shown when the item has been successfully deleted. |
| `errorText` | 'Something went wrong!' | The text shown when an error occurs. |

## Events

| Event | Arguments | Description |
| - | - | - |
| `@delete` | | Called when the item has been successfully deleted by the API endpoint. |
