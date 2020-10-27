<template>
<div class="wrapper">
    <h2>All Job</h2>
    <vxe-button status="primary" content="Create Job" style="width:150px" @click="showCreateDialog()"></vxe-button>
    <br />
    <br />
    <vxe-button status="primary" content="Created" style="width:150px"></vxe-button>
    <vxe-button status="success" content="Started" style="width:150px"></vxe-button>
    <vxe-button status="danger" content="Over Due" style="width:150px"></vxe-button>
    <vxe-button status="warning" content="Need Close" style="width:150px"></vxe-button>
    <vxe-button status="info" content="Closed" style="width:150px"></vxe-button>
    <br />
    <br />
    <vxe-table border :loading="submitLoading" resizable ref="xTable" height="700" :data="jobs" @cell-click="cellDBLClickEvent">>
        <vxe-table-column field="id" title="JobId" width="60"></vxe-table-column>
        <vxe-table-column field="aircraft_id" title="Aircraft" width="80"></vxe-table-column>
        <vxe-table-column field="employee_name" title="Assinged to"></vxe-table-column>
        <vxe-table-column field="template_title" title="Template"></vxe-table-column>
        <vxe-table-column field="description" title="Description"></vxe-table-column>
        <vxe-table-column field="start_time" title="StartTime"></vxe-table-column>
        <vxe-table-column field="due_time" title="DueTime"></vxe-table-column>
        <vxe-table-column field="end_time" title="EndTime"></vxe-table-column>
        <vxe-table-column field="planned_cost_time" title="PlannedHours"></vxe-table-column>
        <vxe-table-column field="actual_cost_time" title="ActualHours"></vxe-table-column>
        <vxe-table-column field="status" title="Status">
            <template v-slot="{ row }">
                <vxe-button :status="setStatus(row)" :content="setStatusText(row)" size="mediam" style="width:100px" @click="showDetails(row)"></vxe-button>
            </template>
        </vxe-table-column>
    </vxe-table>

    <vxe-modal v-model="showEdit" title='Create Job' width="800" min-width="600" min-height="300" :loading="submitLoading" resize destroy-on-close>
        <template v-slot>
            <vxe-form :data="formData" :items="formItems" :rules="formRules" title-align="right" title-width="100" @submit="submitEvent"></vxe-form>
        </template>
    </vxe-modal>
</div>
</template>

<script>
import {
    getAllJobs,
    createJob,
    getAvailableTemplates
} from "../../network/Workshop";

import {
    getEmployeeByType
} from "../../network/Employee";

import {
    getAircraft
} from "../../network/Workshop";

export default {
    components: {},
    props: {},
    data() {
        return {

            submitLoading: true,

            //show create job dialog
            showEdit: false,

            //All jobs
            jobs: [],

            //aircraft options for user to choose
            aircraftItems: [],

            //template options for user to choose
            templateItems: [],

            //duty manager options for user to choose
            managers: [],

            formData: {
                aircraft_id: null,
                description: null,
                template_id: null,
                employee_id: null,
                start_time: null,
                due_time: null
            },

            //rules for validating 
            formRules: {
                aircraft_id: [{
                    required: true,
                    message: 'Please choose a aircraft'
                }, ],
                template_id: [{
                    required: true,
                    message: 'Please choose a template'
                }, ],
                employee_id: [{
                    required: true,
                    message: 'Please choose a manager in charge of this job'
                }, ],
                description: [{
                    required: true,
                    message: 'Please input description'
                }, ],
            },

            //items for showing in the create job dialog
            formItems: [{
                    title: 'Job information',
                    span: 24,
                    titleAlign: 'left',
                    titleWidth: 200,
                    titlePrefix: {
                        icon: 'fa fa-address-card-o'
                    }
                },
                {
                    field: 'aircraft_id',
                    title: 'Aircraft',
                    span: 12,
                    itemRender: {
                        name: '$select',
                        options: []
                    }
                },
                {
                    field: 'template_id',
                    title: 'Template',
                    span: 12,
                    itemRender: {
                        name: '$select',
                        options: []
                    }
                },

                {
                    field: 'employee_id',
                    title: 'Assign to',
                    span: 12,
                    itemRender: {
                        name: '$select',
                        options: []
                    }
                },
                {
                    field: 'description',
                    title: 'Description',
                    span: 12,
                    itemRender: {
                        name: '$input',
                        options: []
                    }
                },
                {
                    field: 'start_time',
                    title: 'Start_Date',
                    span: 12,
                    itemRender: {
                        name: '$input',
                        props: {
                            type: 'date',
                            placeholder: 'Pleas choose start date'
                        }
                    }
                },
                {
                    field: 'due_time',
                    title: 'Due_Date',
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
    computed: {},
    methods: {
        setStatus(row) {
            if (row.status == 1) {
                return 'success'
            } else if (row.status == 5) {
                return 'info'
            } else if (row.status == 3) {
                return 'danger'
            } else if (row.status == 4) {
                return 'warning'
            } else {
                return 'primary'
            }
        },
        setStatusText(row) {
            if (row.status == 1) {
                return 'Started'
            } else if (row.status == 5) {
                return 'Closed'
            } else if (row.status == 3) {
                return 'OverDue'
            } else if (row.status == 4) {
                return 'Confirm'
            } else {
                return 'Created'
            }
        },
        showCreateDialog() {
            this.showEdit = true;
        },

        cellDBLClickEvent({
            row
        }) {
            this.$router.push({
                path: '/staff/workshop/jobdetails',
                query: {
                    job: row,
                    id: row.id,
                    aircraft_id: row.aircraft_id
                }
            });
        },

        initData() {
            getAllJobs(0).then(res => {
                if (res.data.code == 200) {
                    this.jobs = res.data.data;
                }
                this.submitLoading = false;
            })
            getAvailableTemplates().then(res => {
                this.result = res.data.data;

                for (let i = 0; i < this.result.length; i++) {
                    let modelItem = {};
                    modelItem["label"] = this.result[i].title;
                    modelItem["value"] = this.result[i].id;
                    this.templateItems[i] = modelItem;
                }
                this.formItems[2].itemRender.options = this.templateItems;
            })

            getEmployeeByType(1).then(res => {
                this.result = res.data.data;

                for (let i = 0; i < this.result.length; i++) {
                    let modelItem = {};
                    modelItem["label"] = this.result[i].name;
                    modelItem["value"] = this.result[i].id;
                    this.managers[i] = modelItem;
                }
                this.formItems[3].itemRender.options = this.managers;
            })

            getAircraft(0).then(res => {
                if (res.data.code == 200) {
                    this.result = res.data.data;
                    for (let i = 0; i < this.result.length; i++) {
                        let modelItem = {};
                        modelItem["label"] = this.result[i].id;
                        modelItem["value"] = this.result[i].id;
                        this.aircraftItems[i] = modelItem;
                    }
                    this.formItems[1].itemRender.options = this.aircraftItems;
                }
            })
        },

        submitEvent() {
            this.submitLoading = true;
            createJob(this.formData).then(res => {
                this.submitLoading = false;
                if (res.data.code == 200) {
                    this.showEdit = false;
                    this.initData();
                } else {
                    this.$XModal.message({
                        message: res.data.messag,
                        status: 'error'
                    })
                }
            })
        },

    },
    created() {
        this.initData()
    },
    mounted() {}
};
</script>

<style scoped>
</style>
