<template>
<div class="wrapper">

    <h2>{{message}}</h2>

    <h2>{{getEmployeeTitle(type)}}</h2>
    
</div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {
            message: 'INFT6900 AWM SYSTEM',
            type: 0
        };
    },
    watch: {},
    computed: {},
    methods: {
        getEmployeeTitle(type) {
            if (type == 0) {
                return 'Super Administrator'
            } else {
                return 'Manager'
            }
        }
    },
    created() {},
    mounted() {}
};
</script>

<style scoped>
</style>
