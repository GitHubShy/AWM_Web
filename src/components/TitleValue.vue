<template>
<div id="app">
    <h2>{{title}}</h2>
    <font style=" font-family: cursive">{{value}}</font>
</div>
</template>

<script>
export default {
    name: "TitleValue",
    components: {},
    props: {
        title: {
            type: String,
            default: 'Undefined'
        },
        value: null,
    },
    data() {
        return {};
    },
    watch: {},
    computed: {},
    methods: {},
    created() {},
    mounted() {}
};
</script>

<style scoped>
</style>
