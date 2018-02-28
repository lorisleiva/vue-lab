
<template>

    <!-- 
        Flex container: 
        Wrapper that contains and positions the message and the close icon. 
    -->
    <div class="d-flex justify-content-end align-items-center">

        <!-- 
            Message: 
            The text we show the user, its color and whether we show it or not depend on the status. 
            These are calculated inside computed properties below.  
        -->
        <transition name="fade">
            <span 
                v-if="showMessage"
                v-text="message"
                class="mr-1"
                :class="messageClass"
            ></span>
        </transition>

        <!-- 
            Close icon: 
            We always show the icon unless the element has been successfully deleted.
            We make it spin when loading.
            We make it red when not idle.
        -->
        <i 
            v-show="status !== 'success'"
            class="fa fa-close" 
            :class="{'fa-spin': status === 'loading', red: status !== 'idle'}"
            @click="click"
        ></i>
    </div>
</template>

<script>

// If axios is not already used globally.
import axios from 'axios';

export default {
    props: {
        url: String,
        deleteDelay: { type: Number, default: 500 },

        // Optional props to allow parent components to customize the texts.
        confirmText: { type: String, default: "Are you sure?" },
        successText: { type: String, default: "Deleted" },
        errorText: { type: String, default: "Something went wrong!" },
    },

    data() {
        return {
            // Keep track of the current status of the component.
            status: 'idle',
        }
    }, 

    methods: {
        // State transition table.
        click() {
            switch (this.status) {
                case 'idle':
                case 'error':
                    this.status = 'confirm';
                    this.timeout('confirm');
                    break;
                case 'confirm':
                    this.status = 'loading';
                    this.submit();
                    break;
            }
        },

        // Send API call to delete the item if an url is provided.
        submit() {
            Promise.all([
                // Real promise.
                this.url ? axios.delete(this.url).catch(_ => new Error) : null,

                // Promise ensuring at least 300ms of execution. 
                new Promise((resolve, _) => setTimeout(resolve, 300))
            ])

            // Succeeds or fails based on axios's return value only.
            .then(([value]) => value instanceof Error ? this.onError() : this.onSuccess());
        },

        // API call went successfully, or no URL was provided.
        onSuccess() {
            this.status = 'success';
            setTimeout(() => {
                this.$emit('delete');
            }, this.deleteDelay);
        },

        // API call failed.
        onError() {
            this.status = 'error';
            this.timeout('error');
        },

        // Ensure inactivity from the user leads back to an `idle` status.
        timeout(initialStatus) {
            setTimeout(() => {
                if (this.status === initialStatus) {
                    this.status = 'idle';
                }
            }, 3000);
        }
    },

    computed: {
        // We show a message on states: `confirm`, `success` or `error`.
        showMessage() {
            return ['confirm', 'success', 'error'].includes(this.status);
        },

        // Dynamically retrieve the text from the props.
        message() {
            return this[this.status + 'Text'] || '';
        },

        // The message text is gray on `confirm` state, red otherwise.
        messageClass() {
            return this.status === 'confirm' ? 'text-muted' : 'text-danger';
        }
    }
}
</script>

<style lang="scss">
    
    // If font-awesome has not been imported globally, e.g. in your `app.scss`.
    $fa-font-path: "~font-awesome/fonts";
    @import "~font-awesome/scss/font-awesome";

    /* Fontawesome styling. */
    .fa { cursor: pointer; color: #aaa; }
    .fa:hover { color: #555; }
    .fa.red { color: #CC0044; }
    .fa.red:hover { color: #AA0022; }

    /* Fade transition. */
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
