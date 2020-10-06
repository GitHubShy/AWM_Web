<template>
<div id="staff">
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
#staff {
    background-color: white;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    position: fixed;
}
</style>
