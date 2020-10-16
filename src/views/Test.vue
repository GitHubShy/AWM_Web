<template>
<div id="test">
    <button @click="method1">Get Aircraft</button>
    <button @click="method2">Get Customer Aircraft</button>
    <button @click="method3">register Aircraft</button>
    <button @click="method4">register Components</button>
    <button @click="method5">register Customer</button>
    <button @click="method6">Customer Login</button>
    <button @click="method7">Get All Customers</button>
    <button @click="method12">Get Customer</button>
    <button @click="method8">Get All Jobs</button>
    <button @click="method9">Create job</button>
    <button @click="method10">getAvailableTemplates</button>
    <button @click="method11">getEmployeeByType</button>
    <pre>{{result}}</pre>
</div>
</template>

<script>
import {
    getAircraft,
    getCustomerAircraft,
    registerAircraft,
    registerComponents,
    getAllJobs,
    createJob,
    getAvailableTemplates
} from "../network/Workshop";

import {
    registerCustomer,
    login,
    getAllCustomer,
    getCustomer
} from "../network/Customer";

import {
    getEmployeeByType
} from "../network/Employee";
export default {
    components: {},
    props: {},
    data() {
        return {
            job: null,
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
        method8() {
            getAllJobs(0).then(res => {
                this.result = res;
            })

        },
        method9() {
            this.job = {
                aircraft_id: 1,
                employee_id: 1,
                description: 'Job created from Test.vue',
                start_time: '2020-10-15',
                due_time: '2020-11-20',
            }
            createJob(this.job).then(res => {
                this.result = res;
            })
        },
        method10() {
            getAvailableTemplates().then(res => {
                this.result = res.data.data;
                let list = [];
                for (let i = 0; i < this.result.length; i++) {
                    let modelItem = {};
                    modelItem["label"] = this.result[i].title;
                    modelItem["value"] = this.result[i].id;
                    list[i] = modelItem;
                }
                this.result = list;
                console.log(list);
            })

        },
        method11() {
            getEmployeeByType(1).then(res => {
                this.result = res;
                let list = [];
                // for (let i = 0; i < this.result.length; i++) {
                //     let modelItem = {};
                //     modelItem["label"] = this.result[i].title;
                //     modelItem["value"] = this.result[i].id;
                //     list[i] = modelItem;
                // }
                // this.result = list;
                // console.log(list);
            })

        },
        method12() {
            getCustomer(1).then(res => {
                this.result = res;
                // let list = [];
                // for (let i = 0; i < this.result.length; i++) {
                //     let modelItem = {};
                //     modelItem["label"] = this.result[i].title;
                //     modelItem["value"] = this.result[i].id;
                //     list[i] = modelItem;
                // }
                // this.result = list;
                // console.log(list);
            })

        },

    },
    created() {},
    mounted() {}
};
</script>

<style scoped>
</style>
