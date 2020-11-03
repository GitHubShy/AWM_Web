<template>
<div class="wrapper">
    <h2>All Aircraft</h2>
    <vxe-button status="primary" content="Create Aircraft" style="width:150px" @click="showEdit=true"></vxe-button>
    <vxe-button status="success" content="Flying" style="width:150px"></vxe-button>
    <vxe-button status="warning" content="Need Maintain" style="width:150px"></vxe-button>
    <vxe-button status="danger" content="Maintaining" style="width:150px"></vxe-button>
    <!-- <vxe-button status="info" content="Need Confirm" style="width:150px"></vxe-button> -->
    <br />
    <br />
    <vxe-table border :loading="submitLoading" resizable ref="xTable" height="500" :data="aircraft" :edit-config="{trigger: 'manual', mode: 'row'}">
        <vxe-table-column field="id" title="id" width="60"></vxe-table-column>
        <vxe-table-column field="aircraft_pic" title="Pic" width="120">
            <template v-slot="{ row }">
                <img v-if="row.aircraft_pic" :src="row.aircraft_pic" style="width: 100px;">
                <span v-else></span>
            </template>
        </vxe-table-column>
        <vxe-table-column field="type" title="Type" width="60"></vxe-table-column>
        <vxe-table-column field="registration" title="Registration"></vxe-table-column>
        <vxe-table-column field="serial" title="Serial"></vxe-table-column>
        <vxe-table-column field="maintenance_cycle" title="ServiceCycle" :formatter="formatterTimer" :edit-render="{name: '$input', props: {type: 'input'}}"></vxe-table-column>
        <vxe-table-column field="last_modify_time" title="LastService"></vxe-table-column>
        <vxe-table-column field="next_modify_time" title="NextService"></vxe-table-column>
        <vxe-table-column field="status" title="Status">
            <template v-slot="{ row }">
                <vxe-button :status="setStatus(row)" :content="setStatusText(row)" size="mediam" style="width:100px" @click="goToDetails(row)"></vxe-button>
            </template>
        </vxe-table-column>
        <vxe-table-column title="Action" width="170">
            <template v-slot="{ row }">
                <template v-if="$refs.xTable.isActiveByRow(row)">
                    <vxe-button @click="saveRowEvent(row)">Save</vxe-button>
                    <vxe-button @click="cancelRowEvent(row)">Cancel</vxe-button>
                </template>
                <template v-else>
                    <vxe-button @click="editRowEvent(row)">Edit Timer</vxe-button>
                </template>
            </template>
        </vxe-table-column>
    </vxe-table>

    <vxe-modal v-model="showEdit" title='Create Aircraft' width="800" min-width="600" min-height="300" :loading="submitLoading" resize destroy-on-close>
        <template v-slot>
            <vxe-form :data="formData" :items="formItems" :rules="formRules" title-align="right" title-width="100" @submit="submitEvent"></vxe-form>
        </template>
    </vxe-modal>
</div>
</template>

<script>
import {
    getAircraft,
    registerAircraft,
    updateAircraft
} from "../../network/Workshop";
import {
    getAllCustomer
} from "../../network/Customer";
export default {
    components: {},
    props: {},
    data() {
        return {
            allAlign: null,
            aircraft: [],
            showEdit: false,
            submitLoading: true,
            formData: {
                type: null,
                registration: null,
                serial: null,
                total_flight_time: null,
                maintenance_cycle: null,
                last_modify_time: null,
                customer_id: null,
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
                serial: [{
                    required: true,
                    message: 'Please enter serial'
                }, ],
                total_flight_time: [{
                    required: true,
                    message: 'Please enter total_flight_time'
                }, ],
                maintenance_cycle: [{
                    required: true,
                    message: 'Please enter maintenance_cycle'
                }, ],
                last_modify_time: [{
                    required: true,
                    message: 'Please enter last_modify_time'
                }, ],
                customer_id: [{
                    required: true,
                    message: 'Please enter customer_id'
                }, ],
            },
            formItems: [{
                    title: 'Create Aircraft',
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
                    field: 'serial',
                    title: 'Serial',
                    span: 12,
                    itemRender: {
                        name: '$input',
                    }
                },
                {
                    field: 'total_flight_time',
                    title: 'Total_flight_time',
                    span: 12,
                    itemRender: {
                        name: '$input',
                        props: {
                            type: 'number',
                            // placeholder: 'Pleas choose start date'
                        }
                    }
                },
                {
                    field: 'maintenance_cycle',
                    title: 'Maintenance_cycle',
                    span: 12,
                    itemRender: {
                        name: '$input',
                        props: {
                            type: 'number',
                            // placeholder: 'Pleas choose start date'
                        }
                    }
                },
                {
                    field: 'last_modify_time',
                    title: 'Last_modify_time',
                    span: 12,
                    itemRender: {
                        name: '$input',
                        props: {
                            type: 'date',
                            placeholder: 'Pleas choose due date'
                        }
                    }
                },
                {
                    field: 'customer_id',
                    title: 'Customer_id',
                    span: 12,
                    itemRender: {
                        name: '$select',
                        options: [{
                                label: "Engine Overhaul",
                                value: 1
                            },
                            {
                                label: "Engine Overhaul",
                                value: 1
                            },
                            {
                                label: "Engine Overhaul",
                                value: 1
                            },
                        ]
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
            // aircraft: [{
            //     type: null,
            //     registration: null,
            //     serial: null,
            //     total_flight_time: null,
            //     maintenance_cycle: null,
            //     last_modify_time: null,
            //     customer_id: null,
            //     aircraft_pic: null,
            //     status: null,
            // }],
        };
    },
    watch: {},
    computed: {

    },
    methods: {
        async submitEvent() {
            await registerAircraft(this.formData);
            this.showEdit = false;
        },
        setStatus(row) {
            if (row.status == 0) {
                return 'success'
            } else if (row.status == 1) {
                return 'warning'
            } else if (row.status == 2) {
                return 'danger'
            }
        },
        goToDetails(row) {
            this.$router.push({
                path: '/staff/workshop/aircraftdetails',
                query: {
                    id: row.id
                }
            });
        },
        editRowEvent(row) {
            this.$refs.xTable.setActiveRow(row)
        },
        cancelRowEvent(row) {
            const xTable = this.$refs.xTable
            xTable.clearActived().then(() => {
                xTable.revertData(row)
            })
        },
        saveRowEvent(row) {
            this.$refs.xTable.clearActived().then(() => {
                this.loading = true
                updateAircraft(row).then(res => {
                    this.loading = false
                    if (res.data.code == 200) {
                        this.$XModal.message({
                            message: 'Success！',
                            status: 'success'
                        })

                    } else {
                        this.$XModal.message({
                            message: res.data.message,
                            status: 'error'
                        })
                    }
                    getAircraft(0).then(res => {
                        if (res.data.code == 200) {
                            this.aircraft = res.data.data;
                        }
                    });
                })

            })
        },
        setStatusText(row) {
            if (row.status == 0) {
                return 'Flying'
            } else if (row.status == 1) {
                return 'Need'
            } else if (row.status == 2) {
                return 'Maintain'
            }
        },
        formatterTimer({
            cellValue
        }) {
            let item = cellValue + 'hours'
            return item
        }
    },
    created() {
        getAircraft(0).then(res => {
            if (res.data.code == 200) {
                this.aircraft = res.data.data;
            }
            this.submitLoading = false;
        });
        getAllCustomer().then(res => {
            let arr = res.data.data;
            arr.forEach(t => {
                t.label = t.first_name + " " + t.surname
                t.value = t.id
            });
            this.formItems[7].itemRender.options = arr;
        })
    },
    mounted() {}
};
</script>

<style scoped>
</style>
