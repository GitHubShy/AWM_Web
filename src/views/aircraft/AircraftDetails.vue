<template>
<div class="wrapper">
    <h2>Aircraft Details</h2>
    <br />
    <h4>Basic Information</h4>
    <div id="basic">
        <img id="pic" :src="this.aircraft.aircraft_pic" />
        <div id="info">
            <h2 class="title">Type</h2>
            <font class="value">{{this.aircraft.type}}</font>
            <h2 class="title">Registration</h2>
            <font class="value">{{this.aircraft.registration}}</font>
            <h2 class="title">Serial</h2>
            <font class="value">{{this.aircraft.serial}}</font>
        </div>
        <div id="info">
            <h2 class="title">Total Flight Time</h2>
            <font class="value">{{this.aircraft.total_flight_time}}hours</font>
            <h2 class="title">Maintenance Cycle</h2>
            <font class="value">{{this.aircraft.maintenance_cycle}}hours</font>
            <h2 class="title">Last Modify Time</h2>
            <font class="value">{{this.aircraft.last_modify_time}}</font>
        </div>
    </div>
    <h4>Customer Information</h4>
    <div id="customerinfo">
        <h2 class="title">Name</h2>
        <font class="value">{{getFullName}}</font>
        <h2 class="title">Email</h2>
        <font class="value">{{customer.email}}</font>
        <h2 class="title">Company</h2>
        <font class="value">{{customer.company_name}}</font>
    </div>
    <br />
    <br />
    <h4>Component Information</h4>
    <vxe-button status="primary" content="Create Component" style="width:150px" @click="showEdit=true"></vxe-button>
    <vxe-table border resizable ref="xTable" height="500" :data="aircraft.components">
        <vxe-table-column field="pic" title="Pic" width="120">
            <template v-slot="{ row }">
                <img v-if="row.pic" :src="row.pic" style="width: 100px;">
                <span v-else></span>
            </template>
        </vxe-table-column>
        <vxe-table-column field="type" title="Type" width="120" :formatter="formatterComponentType"></vxe-table-column>
        <vxe-table-column field="registration" title="Registration"></vxe-table-column>
        <vxe-table-column field="provider" title="Provider"></vxe-table-column>
        <vxe-table-column field="maintenance_cycle" title="Maintenance_cycle"></vxe-table-column>
        <vxe-table-column field="last_modify_time" title="Last Serice Time"></vxe-table-column>
    </vxe-table>
    <vxe-modal v-model="showEdit" title='Create Component' width="800" min-width="600" min-height="300" :loading="submitLoading" resize destroy-on-close>
        <template v-slot>
            <vxe-form :data="formData" :items="formItems" :rules="formRules" title-align="right" title-width="100" @submit="submitEvent"></vxe-form>
        </template>
    </vxe-modal>
</div>
</template>

<script>
import {
    getAircraft,
    registerComponents
} from "../../network/Workshop";
import {
    getCustomer
} from "../../network/Customer";
export default {
    components: {},
    props: {},
    data() {
        return {
            aircraft: {
                id: null,
                type: null,
                registration: null,
                serial: null,
                total_flight_time: null,
                maintenance_cycle: null,
                last_modify_time: null,
                customer_id: null,
                aircraft_pic: null,
                status: null,
                components: []
            },
            customer: {
                first_name: null,
                surname: null,
            },
            showEdit:false,
            submitLoading: false,
            formData: {
                type: null,
                registration: null,
                provider: null,
                maintenance_cycle: null,
                last_modify_time: null,
                aircraft_id: null,
            },
            formRules: {
                type: [{
                    required: true,
                    message: 'Please enter type'
                }, ],
                registration: [{
                    required: true,
                    message: 'Please enter registration'
                }, ],
                provider: [{
                    required: true,
                    message: 'Please enter provider'
                }, ],
                maintenance_cycle: [{
                    required: true,
                    message: 'Please enter maintenance_cycle'
                }, ],
                last_modify_time: [{
                    required: true,
                    message: 'Please enter last_modify_time'
                }, ],
               
            },
            formItems: [{
                    title: 'Create Component',
                    span: 24,
                    titleAlign: 'left',
                    titleWidth: 200,
                    titlePrefix: {
                        icon: 'fa fa-address-card-o'
                    }
                },
                {
                    field: 'type',
                    title: 'Type',
                    span: 12,
                    itemRender: {
                        name: '$input',
                    }
                },
                {
                    field: 'registration',
                    title: 'Registration',
                    span: 12,
                    itemRender: {
                        name: '$input',
                    }
                },

                {
                    field: 'provider',
                    title: 'Provider',
                    span: 12,
                   itemRender: {
                        name: '$input',
                    }
                },
                {
                    field: 'maintenance_cycle',
                    title: 'Maintenance_cycle',
                    span: 12,
                     itemRender: {
                        name: '$input',
                        props:{
                             type: 'number',
                        }
                    }
                },
                {
                    field: 'last_modify_time',
                    title: 'Last_modify_time',
                    span: 12,
                     itemRender: {
                        name: '$input',
                        props:{
                             type: 'date',
                        }
                    }
                },

                {
                    align: 'center',
                    span: 24,
                    titleAlign: 'left',
                    itemRender: {
                        name: '$buttons',
                        children: [{
                            props: {
                                type: 'submit',
                                content: 'Create',
                                status: 'primary'
                            }
                        }, {
                            props: {
                                type: 'reset',
                                content: 'reset'
                            }
                        }]
                    }
                }
            ]

        };
    },
    watch: {},
    computed: {
        setComponentType() {
            if (localStorage.getItem("title") == '99') {
                return 'Your have the permission to add, edit and delete employee'
            } else {
                return 'You have the only permission to edit yourself'
            }
        },
        getFullName() {
            return this.customer.first_name + ' ' + this.customer.surname
        },
    },
    methods: {
        async submitEvent(){
            await registerComponents(this.formData);
            this.showEdit=false;
        },
        formatterComponentType({
            cellValue
        }) {
            let type = 'undefined';
            if (cellValue == 1) {
                type = 'Engine'
            } else if (cellValue == 2) {
                type = 'Wing'
            } else if (cellValue == 3) {
                type = 'Fuselage'
            } else if (cellValue == 4) {
                type = 'Avionics System'
            } else if (cellValue == 5) {
                type = 'Landing Gear'
            }
            return type;
        },
    },
    created() {
        this.formData.aircraft_id=this.$route.query.id;
        getAircraft(this.$route.query.id).then(res => {
            if (res.data.code == 200) {
                this.aircraft = res.data.data[0];
                getCustomer(this.aircraft.customer_id).then(res => {
                    if (res.data.code == 200) {
                        this.customer = res.data.data;
                    }
                })
            }
        });

    },
    mounted() {}
};
</script>

<style scoped>
#basic {
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: white;
}

#pic {
    width: auto;
    height: 120px;
    align-self: center;
}

#info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 50px;
}

#customerinfo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.value {
    font-family: cursive;
    color: black;
    font-size: 27px;
}

.title {
    color: black;
    font-size: 15px;
}
</style>
