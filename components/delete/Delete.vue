
<template>

    <!-- Positioning parent. -->
    <div class="d-flex justify-content-end align-items-center">

        <!-- Message. -->
        <transition name="fade">
            <span 
                v-if="showMessage"
                v-text="message"
                class="mr-1"
                :class="messageClass"
            ></span>
        </transition>

        <!-- Close icon. -->
        <i 
            v-show="status !== 'success'"
            class="fa fa-close" 
            :class="{'fa-spin': status === 'loading', red: status !== 'idle'}"
            @click="click"
        ></i>
    </div>
</template>

<script>
export default {
    props: {
        url: String,
        deleteDelay: { type: Number, default: 500 },
        confirmText: { type: String, default: "Are you sure?" },
        successText: { type: String, default: "Deleted" },
        errorText: { type: String, default: "Something went wrong!" },
    },

    data() {
        return {
            status: 'idle',
        }
    }, 

    methods: {
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

        onSuccess() {
            this.status = 'success';
            setTimeout(() => {
                this.$emit('delete');
            }, this.deleteDelay);
        },

        onError() {
            this.status = 'error';
            this.timeout('error');
        },

        timeout(initialStatus) {
            setTimeout(() => {
                if (this.status === initialStatus) {
                    this.status = 'idle';
                }
            }, 3000);
        }
    },

    computed: {
        showMessage() {
            return ['confirm', 'success', 'error'].includes(this.status);
        },

        message() {
            return this[this.status + 'Text'] || '';
        },

        messageClass() {
            return this.status === 'confirm' ? 'text-muted' : 'text-danger';
        }
    }
}
</script>

<style>
    /* Fontawesome. */
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
