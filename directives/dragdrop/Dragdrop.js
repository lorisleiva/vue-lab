// npm install dragula -D
import dragula from 'dragula';

// npm install lodash -D (Only used in the `reorder` helper method)
import { set } from 'lodash';

// Map drake instances to their data structure globally in order to destroy them later.
let arrays = [];
let drakes = [];

export default {
    // When the directive is first bound to the container.
    bind (container, binding, vnode) {

        // Get the `order` attribute if it exists.
        let orderProperty = vnode.data.attrs ? vnode.data.attrs.order : undefined;
    
        // Get the `options` attribute if it exists.
        let options = vnode.data.attrs ? vnode.data.attrs.options : undefined;
        
        // Get the array of items to update.
        let items = binding.value || [];
        
        // Keep track of the last dragging index to do some reordering.
        let dragIndex;

        // Use dragula on the container.
        let drake = dragula([container], options)
        
            // When we drag an item, memorize its index.
            .on('drag', (el, source) => {
                dragIndex = findDomIndex(source, el);
            })
            
            // When we drop an item, reorder the array and update the order properties.
            .on('drop', (el, target) => {
            
                // Move the dragged and dropped item from `dragIndex` to the new index.
                move(items, dragIndex, findDomIndex(target, el));
                
                // If the container has a `order` attribute, use it to reorder them.
                if (orderProperty) reorder(items, orderProperty);
            });

        // Map the items with the drake instance.
        addDrake(items, drake);
    },

    // When the directive is unbound from the container.
    unbind (container, binding, vnode) {

        // Retrieve the drake instance and kill it.
        let drake = getDrake(binding.value);
        if (drake) drake.destroy();
    }
}

/**
 * Find the index of a DOM element within a given container.
 */
function findDomIndex(container, el) {
    return Array.prototype.indexOf.call(container.children, el);
}

/**
 * Move an array item from one index to another.
 * The given array is transformed, not returned.
 */
function move(array, fromIndex, toIndex) {
    array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
}

/**
 * Reorder the items of an array from 0 to `array.length`.
 * The new order is stored on the given `orderProperty`.
 * The given array is transformed, not returned.
 */
function reorder(array, orderProperty) {
    let newOrder = 0;
    array.forEach(item => { set(item, orderProperty, newOrder++) })
}

/**
 * Register a drake instance based on the reference of the given array.
 */
function addDrake(array, drake) {
    if (arrays.indexOf(array) >= 0) return;
    arrays.push(array);
    drakes.push(drake);
}

/**
 * Retrieve a drake instance based on the reference of the given array.
 */
function getDrake(array) {
    let drakeIndex = arrays.indexOf(array);
    if (drakeIndex >= 0) return drakes[drakeIndex];
}