<!--

  * Description: Show My Tasks",

  * Author: Yao Shi",

  * Date: 2020/10/5",

!-->
<template>
<div class="wrapper">
    <h2>All Job</h2>
    <h3>You can click on each row to view the specific job details page</h3>
    <!-- create job button  !-->
    <vxe-button status="primary" content="Create Job" style="width:150px" @click="showCreateDialog()"></vxe-button>
    <br />
    <br />
    <!-- Filter buttons  !-->
    <vxe-button :status="buttons[0].vxeButtonText" :content="buttons[0].value" style="width:150px" @click="initData(buttons[0].status)"></vxe-button>
    <vxe-button :status="buttons[1].vxeButtonText" :content="buttons[1].value" style="width:150px" @click="initData(buttons[1].status)"></vxe-button>
    <vxe-button :status="buttons[2].vxeButtonText" :content="buttons[2].value" style="width:150px" @click="initData(buttons[2].status)"></vxe-button>
    <vxe-button :status="buttons[3].vxeButtonText" :content="buttons[3].value" style="width:150px" @click="initData(buttons[3].status)"></vxe-button>
    <vxe-button :status="buttons[4].vxeButtonText" :content="buttons[4].value" style="width:150px" @click="initData(buttons[4].status)"></vxe-button>
    <vxe-button :status="buttons[5].vxeButtonText" :content="buttons[5].value" style="width:150px" @click="initData(buttons[5].status)"></vxe-button>
    <br />
    <br />
    <!-- Data Table !-->
    <vxe-table align="center" border :loading="submitLoading" resizable ref="xTable" height="500" :data="list" @cell-click="cellDBLClickEvent">>
        <vxe-table-column field="id" title="Id" width="70" sortable></vxe-table-column>
        <vxe-table-column field="aircraft_id" title="Aircraft" width="80"></vxe-table-column>
        <vxe-table-column field="employee_name" title="Assinged to"></vxe-table-column>
        <vxe-table-column field="template_title" title="Template"></vxe-table-column>
        <vxe-table-column field="description" title="Description"></vxe-table-column>
        <vxe-table-column field="start_time" title="StartTime"></vxe-table-column>
        <vxe-table-column field="due_time" title="DueTime" sortable></vxe-table-column>
        <vxe-table-column field="end_time" title="EndTime"></vxe-table-column>
        <vxe-table-column field="planned_cost_time" title="PlannedHours"></vxe-table-column>
        <vxe-table-column field="actual_cost_time" title="ActualHours"></vxe-table-column>
        <vxe-table-column field="status" title="Status" sortable>
            <template v-slot="{ row }">
                <vxe-button :status="setStatus(row)" :content="setStatusText(row)" size="mediam" style="width:100px" @click="showDetails(row)"></vxe-button>
            </template>
        </vxe-table-column>
    </vxe-table>

    <!-- pager  !-->
    <vxe-pager :loading="submitLoading" :current-page="tablePage.currentPage" :page-size="tablePage.pageSize" :total="tablePage.totalResult" :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']" :page-sizes="[2, 6, 10]" @page-change="handlePageChange">
    </vxe-pager>

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
            //buttons
            buttons: this.GLOBAL.job_status,

            //Loading dialog
            submitLoading: true,

            //show create job dialog
            showEdit: false,

            //All jobs
            jobs: [],

            //Used to pager 
            tablePage: {
                currentPage: 1,
                pageSize: 10,
                totalResult: 0
            },

            //aircraft options for user to choose
            aircraftItems: [],

            //template options for user to choose
            templateItems: [],

            //duty manager options for user to choose
            managers: [],

            //Create job template
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
                    title: 'Job Information',
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
                    title: 'Assigned to',
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
                    title: 'StartDate',
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
                    title: 'DueDate',
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
                                content: 'Reset'
                            }
                        }]
                    }
                }
            ]
        };
    },
    watch: {},
    computed: {
        list() {
            //Create a new data set
            let result = new Array();
            //Calculate the start index according the current page
            let startIndex = (this.tablePage.currentPage - 1) * this.tablePage.pageSize;
            //Calculate the end index according the current page
            let endIndex = startIndex + this.tablePage.pageSize;
            //if the endex > original dataset length, let endIndex = this.tasks.length
            endIndex = endIndex > this.jobs.length ? this.jobs.length : endIndex
            let result_index = 0;
            for (let i = startIndex; i < endIndex; i++) {
                result[result_index] = this.jobs[i]
                result_index++
            }
            return result
        }
    },
    methods: {
        //Set button type
        setStatus(row) {
            return this.GLOBAL.getJobButtonType(row.status)
        },
        //Set button text
        setStatusText(row) {
            return this.GLOBAL.getJobStatus(row.status);
        },
        //Show create dialog
        showCreateDialog() {
            this.showEdit = true;
        },
        //Click event
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
        //init data
        initData(status) {
            //Get all jobs
            getAllJobs(0, status).then(res => {
                if (res.data.code == 200) {
                    this.jobs = res.data.data;
                    this.tablePage.totalResult = this.jobs.length;
                }
                this.submitLoading = false;
            })
            //Get all avaiable templates
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
            //get all managers
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
            //get all aircraft
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
        //Submit new job
        submitEvent() {
            this.submitLoading = true;
            createJob(this.formData).then(res => {
                this.submitLoading = false;
                if (res.data.code == 200) {
                    this.showEdit = false;
                    this.initData(-1);
                } else {
                    this.$XModal.message({
                        message: res.data.messag,
                        status: 'error'
                    })
                }
            })
        },
        //Handle change page
        handlePageChange({
            currentPage,
            pageSize
        }) {
            this.tablePage.currentPage = currentPage
            this.tablePage.pageSize = pageSize
        }
    },
    created() {
        this.initData(-1)
    },
    mounted() {}
};
</script>

<style scoped>
</style>
