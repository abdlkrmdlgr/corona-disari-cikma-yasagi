<template>
    <dl class="accordion box" role="presentation">
        <AccordionItem
                v-for="item in content"
                :multiple="multiple"
                :item="item"
                :groupId="groupId"
                :key="item.id">
        </AccordionItem>
    </dl>
</template>
<script>
    import AccordionItem from "./AccordionItem";
    export default {
        name: "CustomAccordion",
        components: {
            AccordionItem
        },
        props: {
            content: {
                type: Array,
                required: true
            },
            multiple: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                groupId: null
            }
        },
        mounted() {
            this.groupId = this.$el.id
        },
    }
</script>

<style scoped></style>