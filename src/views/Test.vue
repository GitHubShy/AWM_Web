<template>
<div id="test">
    <button @click="method1">Get Aircraft</button>
    <button @click="method2">Get Customer Aircraft</button>
    <button @click="method3">register Aircraft</button>
    <button @click="method4">register Components</button>
    <button @click="method5">register Customer</button>
    <button @click="method6">Customer Login</button>
    <button @click="method7">Get All Customers</button>
    <pre>{{result}}</pre>
</div>
</template>

<script>
import {
    getAircraft,
    getCustomerAircraft,
    registerAircraft,
    registerComponents
} from "../network/Workshop";

import {
    registerCustomer,
    login,
    getAllCustomer
} from "../network/Customer";
export default {
    components: {},
    props: {},
    data() {
        return {
            result: null,
            aircraft: {
                type: 'B747',
                registration: 'B-5375',
                serial: '123463',
                total_flight_time: 3333,
                maintenance_cycle: 5000,
                last_modify_time: '2019-12-02',
                customer_id: 1,
                //aircraft_pic: null,
                status: 99,
            },
            components: [{
                    type: 1,
                    registration: 'E0001',
                    provider: 'General Electric Company',
                    maintenance_cycle: 5000,
                    last_modify_time: '2020-12-22',
                    aircraft_id: 1,
                    pic: null,
                },
                {
                    type: 2,
                    registration: 'W0001',
                    provider: 'Rolls-Royce Plc Company',
                    maintenance_cycle: 5000,
                    last_modify_time: '2020-12-25',
                    aircraft_id: 1,
                    pic: null,
                },
            ]

        };
    },
    watch: {},
    computed: {},
    methods: {
        method1() {
            getAircraft(1).then(res => {
                this.result = res;
            })
        },
        method2() {
            getCustomerAircraft('1').then(res => {
                this.result = res;
            })
        },
        method3() {
            registerAircraft(this.aircraft).then(res => {
                this.result = res;
            })
        },
        method4() {
            registerComponents(this.components).then(res => {
                this.result = res;
            })
        },
        method5() {
            this.formData = {
                account_name: '1111',
                password: '123456',
                email: '333@gmail.com',
                first_name: '4444444',
                surname: 'ddd',
                portrait_url: '',
                phone: '123456789',
                company_name: 'apple',
            }
            registerCustomer(this.formData).then(res => {
                this.result = res;
            })

        },
        method6() {
            this.formData = {
                account_name: '1111',
                password: '123456',
                email: '333@gmail.com',
                first_name: '4444444',
                surname: 'ddd',
                portrait_url: '',
                phone: '123456789',
                company_name: 'apple',
            }
            login('1111', '123456').then(res => {
                this.result = res;
            })
        },
        method7() {
            getAllCustomer().then(res => {
                this.result = res;
            })

        },

    },
    created() {},
    mounted() {}
};
</script>

<style scoped>
</style>
