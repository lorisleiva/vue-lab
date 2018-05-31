import { startsWith, endsWith } from 'lodash'

export default {
    methods: {
        getContent() {
            return {
                text: this.$el.value,
                start: this.$el.selectionStart,
                end: this.$el.selectionEnd,
            }
        },
        updateContent(text, start, end) {
            this.$el.value = text
            triggerEvent(this.$el, 'input')

            this.$el.selectionStart = start
            this.$el.selectionEnd = end
            this.$el.focus()

            return text
        },
        wrapWith(pattern, placeholder) {
            let { text, start, end } = this.getContent()
            let { before, selection, after } = cutTextWithSelection(text, start, end)
            let wrappedContent = selection || placeholder || ''

            // Exception for bold and italic
            let keepItalicPattern = pattern === '*'
                && endsWith(before, '**') && !endsWith(before, '***')
                && startsWith(after, '**') && !startsWith(after, '***')

            let removePattern = endsWith(before, pattern)
                && startsWith(after, pattern)
                && !keepItalicPattern

            before = removePattern ? before.slice(0, - pattern.length) : before + pattern
            after = removePattern ? after.slice(pattern.length) : pattern + after

            return this.updateContent(
                before + wrappedContent + after,
                before.length,
                before.length + wrappedContent.length,
            )
        },
    },
    render() {
        return this.$slots.default[0]
    },
}

function cutTextWithSelection(text, start, end) {
    return {
        before: text.substring(0, start),
        selection: text.substring(start, end),
        after: text.substring(end, text.length),
    }
}

function triggerEvent(el, type) {
    if ('createEvent' in document) {
        // modern browsers, IE9+
        var e = document.createEvent('HTMLEvents')
        e.initEvent(type, false, true)
        el.dispatchEvent(e)
    } else {
        // IE 8
        var e = document.createEventObject()
        e.eventType = type
        el.fireEvent('on' + e.eventType, e)
    }
}