<!--

  * Description: Title view, used to show a text with a specific style,

  * Author: Yao Shi",

  * Date: 2020/10/5",

!-->
<template>
<div id="app">
    <!--   Key  !-->
    <h2>{{title}}</h2>
    <!--   Value  !-->
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
