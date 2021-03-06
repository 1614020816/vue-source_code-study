<template>
    <div>
        <slot name="label"></slot>
    </div>
</template>


<script>
export default {
    props: {
        label: String,
        prop: String,
    },
    beforeCreate() {
        this.$parent.columns.push(this);
    },
    beforeDestroy() {
        const index = this.$parent.columns.indexOf(this);
        if (index > -1) {
            this.$parent.columns.splice(index, 1);
        }
    },
}
</script>
