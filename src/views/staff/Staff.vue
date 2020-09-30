<template>
<div id="app">
    <TopBar rightFirstText='Profile' rightFirstLink='/staff/staffprofile' rightSecondText='Staff' rightSecondLink='/staff/staffmanage' rightThirdText='Workshop' rightThirdLink='/staff/workshop' />
    <router-view></router-view>
</div>
</template>

<script>
import TopBar from "../../components/TopBar";
export default {
    components: {
        TopBar,
    },
    props: {},
    data() {
        return {};
    },
    watch: {},
    computed: {},
    methods: {},
    created() {

    },
    mounted() {}
};
</script>

<style scoped>
#nav_bar {
    width: 100%;
    height: 48px;
    display: flex;
    flex-direction: row;
    background-color: white;
    text-align: center;
    align-items: center;
}
</style>
