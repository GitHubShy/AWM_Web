<template>
<div class="wrapper">
    <h2 @click="onClick">Workshop</h2>
</div>
</template>

<script>
import {
    getAircraft,
    getCustomerAircraft
} from "../../network/Workshop";

import {
    registerCustomer,
    login,
    getAllCustomer
} from "../../network/Customer";
export default {
    components: {},
    props: {},
    data() {
        return {
            formData: []
        };
    },
    watch: {},
    computed: {},
    methods: {
        onClick() {
            // this.formData = {
            //     account_name: '111',
            //     password: '123456',
            //     email: '333@gmail.com',
            //     first_name: '4444444',
            //     surname: 'ddd',
            //     portrait_url: '',
            //     phone: '123456789',
            //     company_name: 'apple',
            // }
            // registerCustomer(this.formData)

            //login('111', 123456)
            getAllCustomer();

        }
    },
    created() {},
    mounted() {}
};
</script>

<style scoped>
</style>
