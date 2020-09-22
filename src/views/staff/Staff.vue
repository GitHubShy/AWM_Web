<template>
<div id="app">
    <div id="nav_bar">
        <router-link to="/staff/staffprofile">Profile</router-link>
        <router-link to="/staff/staffmanage">ManageStaff</router-link>
    </div>
    <router-view></router-view>
</div>
</template>

<script>
export default {
    components: {},
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
