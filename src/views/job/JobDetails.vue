<template>
<div class="wrapper">
    <h2>Job Details</h2>
    <br />
    <br />
    <vxe-button status="primary" content="Create Task" size="mediam" @click="createTask()"></vxe-button>
    <br />
    <br />
    <vxe-table border show-overflow keep-source resizable ref="xTable" height="500" :data="subTasks" :edit-config="{trigger: 'manual', mode: 'row'}">
        <vxe-table-column field="employee_id" title="Assinged to" :edit-render="{name: '$select', options: engineers}"></vxe-table-column>
        <vxe-table-column field="description" title="Description"></vxe-table-column>
        <vxe-table-column field="start_time" title="StartTime" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
        <vxe-table-column field="due_time" title="DueTime" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
        <vxe-table-column field="end_time" title="EndTime"></vxe-table-column>
        <vxe-table-column field="planned_cost_time" title="PlannedHours"></vxe-table-column>
        <vxe-table-column field="actual_cost_time" title="ActualHours"></vxe-table-column>
        <vxe-table-column field="status" title="Status">
            <template v-slot="{ row }">
                <vxe-button :status="setStatus(row)" :content="setStatusText(row)" size="mediam" style="width:100px" @click="showDetails(row)"></vxe-button>
            </template>
        </vxe-table-column>
        <vxe-table-column title="Action" width="260">
            <template v-slot="{ row }">
                <template v-if="$refs.xTable.isActiveByRow(row)">
                    <vxe-button @click="saveRowEvent(row)">Save</vxe-button>
                    <vxe-button @click="cancelRowEvent(row)">Cancel</vxe-button>
                </template>
                <template v-else>
                    <vxe-button @click="editRowEvent(row)">Edit</vxe-button>
                </template>
            </template>
        </vxe-table-column>
    </vxe-table>

    <vxe-modal v-model="showCreate" title='CreateTask' width="800" min-width="600" min-height="300" :loading="submitLoading" resize destroy-on-close>
        <template v-slot>
            <vxe-form :data="createTaskData" :items="createTaskItems" :rules="formRules" title-align="right" title-width="100" @submit="submitTask"></vxe-form>
        </template>
    </vxe-modal>
</div>
</template>

<script>
import {
    getAllSubTasks,
    updateSubTask,
    getAllSubTaskType,
    createSubTask
} from "../../network/Workshop";

import {
    getEmployeeByType
} from "../../network/Employee";

export default {
    components: {},
    props: {},
    data() {
        return {
            showCreate: false,
            submitLoading: false,
            subTasks: null,
            engineers: [],
            subTaskType: [],
            updateForm: {
                id: null,
                employee_id: null,
                start_time: null,
                due_time: null,
            },
            createTaskData: {
                job_id: null,
                aircraft_id: null,
                sub_task_type_id: null,
                employee_id: null,
                start_time: null,
                due_time: null
            },
            createTaskItems: [{
                    title: 'Task information',
                    span: 24,
                    titleAlign: 'left',
                    titleWidth: 200,
                    titlePrefix: {
                        icon: 'fa fa-address-card-o'
                    }
                },
                {
                    field: 'sub_task_type_id',
                    title: 'TaskType',
                    span: 12,
                    itemRender: {
                        name: '$select',
                        options: []
                    }
                },
                {
                    field: 'employee_id',
                    title: 'AssignTo',
                    span: 12,
                    itemRender: {
                        name: '$select',
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
            ],
            formRules: {
                sub_task_type_id: [{
                    required: true,
                    message: 'Please choose a task'
                }, ],
                employee_id: [{
                    required: true,
                    message: 'Please assing to a employee'
                }, ],
                start_time: [{
                    required: true,
                    message: 'Please choose start time'
                }, ],
                due_time: [{
                    required: true,
                    message: 'Please choose end time'
                }, ],
            },
        };
    },
    watch: {},
    computed: {},
    methods: {
        setStatus(row) {
            if (row.status == 1) {
                return 'success'
            } else if (row.status == 5) {
                return 'warning'
            } else if (row.status == 3) {
                return 'danger'
            } else if (row.status == 4) {
                return 'info'
            } else {
                return 'primary'
            }
        },

        setStatusText(row) {
            if (row.status == 1) {
                return 'Started'
            } else if (row.status == 5) {
                return 'Finished'
            } else if (row.status == 3) {
                return 'OverDue'
            } else if (row.status == 4) {
                return 'Confirm'
            } else {
                return 'Created'
            }
        },

        formatterEmployeeName({
            cellValue
        }) {
            let item = this.engineers.find(item => item.value === cellValue)
            return item ? item.label : 'Not assigned'
        },

        editRowEvent(row) {
            this.$refs.xTable.setActiveRow(row)
        },

        saveRowEvent(row) {
            this.$refs.xTable.clearActived().then(() => {
                this.loading = true
                updateSubTask(row).then(res => {
                    this.loading = false
                    if (res.data.code == 200) {
                        this.$XModal.message({
                            message: 'Success！',
                            status: 'success'
                        })

                    }
                })

            })
        },

        cancelRowEvent(row) {
            const xTable = this.$refs.xTable
            xTable.clearActived().then(() => {
                // 还原行数据
                xTable.revertData(row)
            })
        },

        createTask() {
            this.showCreate = true;
        },

        submitTask() {
            createSubTask(this.createTaskData).then(res => {
                this.submitLoading = false;
                if (res.data.code == 200) {
                    getAllSubTasks(this.$route.query.id).then(res => {
                        if (res.data.code == 200) {
                            this.subTasks = res.data.data;
                        }
                    })
                    this.showCreate = false;
                    this.$XModal.message({
                        message: 'Success！',
                        status: 'success'
                    })
                }
            })
        }
    },
    created() {
        this.createTaskData.job_id = this.$route.query.id;
        this.createTaskData.aircraft_id = this.$route.query.aircraft_id;
        getAllSubTasks(this.$route.query.id).then(res => {
            if (res.data.code == 200) {
                this.subTasks = res.data.data;
            }
        })

        //Get all employees used for assigning task
        getEmployeeByType(-1).then(res => {
            this.result = res.data.data;

            for (let i = 0; i < this.result.length; i++) {
                let modelItem = {};
                modelItem["label"] = this.result[i].name;
                modelItem["value"] = this.result[i].id;
                this.engineers[i] = modelItem;
            }
            this.createTaskItems[2].itemRender.options = this.engineers;
        })

        //Get all sub task type used for creating sub task
        getAllSubTaskType().then(res => {
            this.result = res.data.data;
            for (let i = 0; i < this.result.length; i++) {
                let modelItem = {};
                modelItem["label"] = this.result[i].title;
                modelItem["value"] = this.result[i].id;
                this.subTaskType[i] = modelItem;
            }
            this.createTaskItems[1].itemRender.options = this.subTaskType;
        })
    },
    mounted() {}
};
</script>

<style scoped>
</style>
