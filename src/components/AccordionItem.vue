<template>
<div :id="groupId + '-' + item.id" class="accordion-item" :class="{'is-active': item.active}">
    <dt class="accordion-item-title">
        <button @click="toggle" class="accordion-item-trigger">
            <p class="accordion-item-title-text" style="font-size: 12px; margin-bottom: 0px;">{{item.title}}</p>
            <span class="accordion-item-trigger-icon"></span>
        </button>
    </dt>
    <transition
            name="accordion-item"
            @enter="startTransition"
            @after-enter="endTransition"
            @before-leave="startTransition"
            @after-leave="endTransition">
        <dd v-if="item.active" class="accordion-item-details">
            <div v-html="item.description" class="accordion-item-details-inner"></div>
        </dd>
    </transition>
</div>
</template>

<script>
    export default {
        name: "AccordionItem",
        props: ['item', 'multiple', 'groupId'],
        methods: {
            toggle(event) {

                    this.$parent.$children.forEach((item) => {
                        console.error(item);
                        if (item.$el.id === event.currentTarget.parentElement.parentElement.id) item.item.active = !item.item.active
                        else item.item.active = false
                    })

            },

            startTransition(el) {
                el.style.height = el.scrollHeight + 'px'
            },

            endTransition(el) {
                el.style.height = ''
            }
        }
    }
</script>

<style scoped>


    .btn-action-delete {
        color: #cc4b37;
        cursor: pointer;
    }

    .accordion.box{
        padding: 0px !important;
    }
    .accordion div:not(:last-child) {
        border-bottom: 1px solid rgba(10, 10, 10, 0.1);
    }

    .accordion div:last-child .accordion-item-details {
        border-radius: 5px;
    }

    .accordion dd {
        margin-left: 0;
        padding:20px;
    }

    .accordion-item-trigger,
    .accordion-item-details-inner {
        padding: 0.75rem 1.25rem;
    }

    .accordion-item-title {
        position: relative;
        padding:10px;
    }
    .accordion-item-title h4 {
        font-size: 1.25rem;
        margin-bottom: 0;
        padding-right: 1.25rem;
    }

    .accordion-item-trigger {
        width: 100%;
        text-align: left;
        background-color: transparent;
        border: none;
    }

    .accordion-item-trigger-icon {
        font-size: 8px;
        display: block;
        position: absolute;
        top: 0;
        right: 1.25rem;
        bottom: 0;
        margin: auto;
        width: 12px;
        height: 12px;
        border-right: 2px solid #363636;
        border-bottom: 2px solid #363636;
        transform: translateY(-4px) rotate(45deg);
        transition: transform 0.2s ease;
    }


    .accordion-item-trigger-icon.is-active {
        transform: translateY(4px) rotate(225deg);
    }

    .accordion-item-details {
        overflow: hidden;
        background-color: whitesmoke;
    }

    .accordion-item-enter-active, .accordion-item-leave-active {
        will-change: height;
        transition: height 0.2s ease;
    }
    .accordion-item-enter, .accordion-item-leave-to {
        height: 0 !important;
    }



</style>