<template>
    <div>
        <input 
            ref="hidden-input"
            class="d-none" 
            type="file" 
            :name="name" 
            :multiple="isMultiple"
            autocomplete="off" 
            @change="inputFileChanged" 
        >
            
        <div class="input-group">
            <input 
                class="form-control"
                type="text" 
                v-model="fileNames" 
                readonly
                @click="triggerInputClick" 
            >

            <span class="input-group-append">
                <button 
                    class="btn btn-outline-secondary" 
                    type="button" 
                    @click="triggerInputClick"
                >
                    <slot>Select...</slot>
                </button>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['name', 'multiple'],

    data() {
        return {
            fileNames: ''
        }
    },

    computed: {
        isMultiple() {
            return typeof this.multiple !== 'undefined';
        }
    },

    methods: {
        triggerInputClick(event) {
            this.$refs['hidden-input'].click();
        },

        inputFileChanged(event) {
            this.$emit('change', event.target.files);
            this.updateText(event);
        },

        updateText(event) {
            let fileNames = '';
            let selectedFiles = event.target.files;


            for (var i = 0; i < selectedFiles.length; i++) {
                fileNames += selectedFiles[i].name + ', ';
            }

            fileNames = fileNames.replace(/,\s*$/, '');

            this.fileNames = fileNames;
        }
    }
}
</script>

<style>
    .form-control, .btn-outline-secondary {
        border-color: #868e96 !important;
    }
</style>
