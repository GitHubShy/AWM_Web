<template>
<div class="wrapper">
    <h2>Job Details</h2>
    <vxe-button status="primary" content="Create Task" size="mediam" @click="createTask()"></vxe-button>
    <vxe-button status="success" content="Save As My Template" size="mediam" @click="showCreateTemplateDialog()"></vxe-button>
    <vxe-button @click="showCloseJobDialog = true">Close</vxe-button>
    <vxe-modal v-model="showCloseJobDialog" title='Checklist'>
        <template v-slot>
            <div style='font-size: 20px;'>Please confirm the following checklist:</div>
            <div style='font-size: 20px;'>1:Only the manager who is responsible for this job could close this job</div>
            <div style='font-size: 20px;'>2:All sub tasks have been finished</div>
            <div style='font-size: 20px;'>3:All sub tasks have been tested successfully</div>
            <div style='font-size: 20px;'>---------------------------------------------</div>
            <div style='font-size: 20px;'>After close, an invoice will be sent to the customer</div>
            <br>
            <vxe-button status="danger" content="Close" @click="close()"></vxe-button>
        </template>
    </vxe-modal>
    <vxe-button @click="exportDataEvent()" style="margin-left:10px">Export</vxe-button>
    <vxe-button @click="printEvent()">Print</vxe-button>
    <br />
    <br />
    <vxe-table border show-overflow keep-source resizable ref="xTable" height="300" :data="subTasks" :edit-config="{trigger: 'manual', mode: 'row'}">
        <vxe-table-column field="employee_id" title="Assinged to" :edit-render="{name: '$select', options: engineers}"></vxe-table-column>
        <vxe-table-column field="description" title="Description"></vxe-table-column>
        <vxe-table-column field="start_time" title="StartTime" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
        <vxe-table-column field="due_time" title="DueTime" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
        <vxe-table-column field="end_time" title="EndTime"></vxe-table-column>
        <vxe-table-column field="planned_cost_time" title="PlannedHours"></vxe-table-column>
        <vxe-table-column field="actual_cost_time" title="ActualHours"></vxe-table-column>
        <vxe-table-column field="percentage" title="Percentage" :formatter="formatterPercentage"></vxe-table-column>
        <vxe-table-column field="materials" title="Materials"></vxe-table-column>
        <vxe-table-column field="status" title="Status">
            <template v-slot="{ row }">
                <vxe-button :status="setStatus(row)" :content="setStatusText(row)" size="mediam" style="width:100px" @click="showDetails(row)"></vxe-button>
            </template>
        </vxe-table-column>
        <vxe-table-column title="Action" width="170">
            <template v-slot="{ row }">
                <template v-if="$refs.xTable.isActiveByRow(row)">
                    <vxe-button @click="saveRowEvent(row)">Save</vxe-button>
                    <vxe-button @click="cancelRowEvent(row)">Cancel</vxe-button>
                </template>
                <template v-else>
                    <vxe-button @click="editRowEvent(row)">Edit</vxe-button>
                    <vxe-button @click="removeEvent(row)">Delete</vxe-button>
                </template>
            </template>
        </vxe-table-column>
    </vxe-table>

    <h2>Comments</h2>
    <br />
    <vxe-button status="success" content="Create Comment" size="mediam" @click="createComment()"></vxe-button>
    <br />
    <br />
    <vxe-table border height="300" :data="comments">
        <vxe-table-column field="employee_name" title="Author"></vxe-table-column>
        <vxe-table-column field="content_time" title="Date"></vxe-table-column>
        <vxe-table-column field="content" title="Content"></vxe-table-column>
    </vxe-table>

    <vxe-modal v-model="showCreate" title='CreateTask' width="800" min-width="600" min-height="300" :loading="submitLoading" resize destroy-on-close>
        <template v-slot>
            <vxe-form :data="createTaskData" :items="createTaskItems" :rules="formRules" title-align="right" title-width="100" @submit="submitTask"></vxe-form>
        </template>
    </vxe-modal>

    <vxe-modal v-model="showTemplate" title='CreateTemplate' width="800" min-width="600" min-height="300" :loading="submitLoading" resize destroy-on-close>
        <template v-slot>
            <vxe-form :data="createTemplateData" :items="createTemplateItems" :rules="templateFormRules" title-align="right" title-width="100" @submit="createTemplate"></vxe-form>
        </template>
    </vxe-modal>

    <vxe-modal v-model="showCreateComment" title='CreateComment' width="800" min-width="600" min-height="300" :loading="submitLoading" resize destroy-on-close>
        <template v-slot>
            <vxe-form :data="createCommentData" :items="createCommentItems" :rules="commentFormRules" title-align="right" title-width="100" @submit="submitComment"></vxe-form>
        </template>
    </vxe-modal>

</div>
</template>

<script>
import {
    getAllSubTasks,
    updateSubTask,
    getAllSubTaskType,
    createSubTask,
    deleteSubTask,
    createNewTemplate,
    updateJob,
    getJob,
    getComment,
    createComment
} from "../../network/Workshop";

import {
    getEmployeeByType
} from "../../network/Employee";

export default {
    components: {},
    props: {},
    data() {
        return {
            showCloseJobDialog: false,
            showCreate: false,
            showTemplate: false,
            submitLoading: false,
            showCreateComment: false,
            job: null,
            comments: null,
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
            createTemplateData: {
                employee_id: null,
                title: null,
                description: null,
                subTaskTypeIds: null
            },
            createCommentData: {
                employee_id: null,
                job_id: null,
                content: null
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
            createTemplateItems: [{
                    title: 'Template information',
                    span: 24,
                    titleAlign: 'left',
                    titleWidth: 200,
                    titlePrefix: {
                        icon: 'fa fa-address-card-o'
                    }
                },
                {
                    field: 'title',
                    title: 'TemplateTitle',
                    span: 12,
                    itemRender: {
                        name: '$input',
                        props: {
                            placeholder: 'Please input Template title'
                        }
                    }
                },
                {
                    field: 'description',
                    title: 'TemplateDescription',
                    span: 12,
                    itemRender: {
                        name: '$input',
                        props: {
                            placeholder: 'Please input Template Description'
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
                        }]
                    }
                }
            ],
            createCommentItems: [{
                    field: 'content',
                    title: 'Content',
                    span: 24,
                    itemRender: {
                        name: '$input',
                        props: {
                            placeholder: 'Please input content'
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
                                content: 'Submit',
                                status: 'primary'
                            }
                        }]
                    }
                }
            ],
            templateFormRules: {
                title: [{
                    required: true,
                    message: 'Please input a title'
                }, ],
                description: [{
                    required: true,
                    message: 'Please input a description'
                }, ]
            },
            commentFormRules: {
                Content: [{
                    required: true,
                    message: 'Please input content'
                }, ]
            },
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
    computed: {
        isClosed() {
            return this.job.status == 5;
        }
    },
    methods: {
        setStatus(row) {
            return this.GLOBAL.getTaskButtonType(row.status)
        },

        setStatusText(row) {
            return this.GLOBAL.getTaskStatus(row.status);
        },

        formatterPercentage({
            cellValue
        }) {
            let item = cellValue + '%'
            return item
        },

        formatterEmployeeName({
            cellValue
        }) {
            let item = this.engineers.find(item => item.value === cellValue)
            return item ? item.label : 'Not assigned'
        },

        //Enable row activite
        editRowEvent(row) {
            if (this.isClosed) {
                this.$XModal.message({
                    message: 'This job has been closed',
                    status: 'error'
                })
            } else {
                this.$refs.xTable.setActiveRow(row)

            }
        },

        //Update task
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
                        getAllSubTasks(this.$route.query.id).then(res => {
                            if (res.data.code == 200) {
                                this.subTasks = res.data.data;
                            }
                        })
                    }
                })

            })
        },
        //Restore row
        cancelRowEvent(row) {
            const xTable = this.$refs.xTable
            xTable.clearActived().then(() => {
                xTable.revertData(row)
            })
        },

        //Close this job
        close() {
            if (localStorage.getItem("id") != this.job.employee_id) { //Only the manager who are responsible for this job can close this job
                this.$XModal.message({
                    message: 'You are not the manager who are responsible for this job',
                    status: 'error'
                })
            } else {
                this.job.status = 5;
                this.showCloseJobDialog = false;
                updateJob(this.job).then(res => {
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
                })

            }
        },

        //Show create task dialog
        createTask() {
            if (this.isClosed) {
                this.$XModal.message({
                    message: 'This job has been closed',
                    status: 'error'
                })
            } else {
                this.showCreate = true;

            }
        },

        //Show create comment dialog
        createComment() {
            this.showCreateComment = true;
        },

        //Create a New Task
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
        },

        //Remove Task
        removeEvent(row) {
            if (this.isClosed) {
                this.$XModal.message({
                    message: 'This job has been closed',
                    status: 'error'
                })
            } else {
                this.$XModal.confirm('Are you sure to delete this task?').then(type => {
                    if (type === 'confirm') {
                        deleteSubTask(row.id).then(res => {
                            this.submitLoading = false
                            this.showEdit = false
                            if (res.data.code == 200) {
                                this.$XModal.message({
                                    message: 'delete sub task successfully',
                                    status: 'success'
                                })
                                this.$refs.xTable.remove(row)
                            } else {
                                this.$XModal.message({
                                    message: 'Error:' + res.data.message,
                                    status: 'error'
                                })
                            }
                        }).catch(err => {
                            this.$XModal.message({
                                message: 'Error:' + err,
                                status: 'error'
                            })
                        });

                    }
                })

            }

        },
        //Show Create Template Dialog
        showCreateTemplateDialog() {
            this.showTemplate = true;
        },
        //Create Template Dialog
        createTemplate() {
            let subTaskTypeIds = [];
            for (let i = 0; i < this.subTasks.length; i++) {
                subTaskTypeIds[i] = this.subTasks[i].sub_task_type_id
            }
            this.createTemplateData.employee_id = localStorage.getItem('id');
            this.createTemplateData.subTaskTypeIds = subTaskTypeIds;
            createNewTemplate(this.createTemplateData).then(res => {
                this.showTemplate = false
                this.showEdit = false
                if (res.data.code == 200) {
                    this.$XModal.message({
                        message: 'Create new template successfully',
                        status: 'success'
                    })
                } else {
                    this.$XModal.message({
                        message: 'Error:' + res.data.message,
                        status: 'error'
                    })
                }
            })
        },
        submitComment() {
            createComment(this.createCommentData).then(res => {
                this.showCreateComment = false
                this.showEdit = false
                if (res.data.code == 200) {
                    this.$XModal.message({
                        message: 'Create comment successfully',
                        status: 'success'
                    })
                    getComment(this.$route.query.id).then(res => {
                        if (res.data.code == 200) {
                            this.comments = res.data.data;
                        }
                    })

                } else {
                    this.$XModal.message({
                        message: 'Error:' + res.data.message,
                        status: 'error'
                    })
                }
            })
        },
        //Export data
        exportDataEvent() {
            this.$refs.xTable.exportData({
                type: 'csv'
            })
        },
        printEvent() {
            this.$refs.xTable.print()
        },
    },
    created() {

        this.createTaskData.job_id = this.$route.query.id;
        this.createTaskData.aircraft_id = this.$route.query.aircraft_id;

        this.createCommentData.job_id = this.$route.query.id;

        getJob(this.$route.query.id).then(res => {
            if (res.data.code == 200) {
                this.job = res.data.data;
            }
        })
        getAllSubTasks(this.$route.query.id).then(res => {
            if (res.data.code == 200) {
                this.subTasks = res.data.data;
            }
        })
        getComment(this.$route.query.id).then(res => {
            if (res.data.code == 200) {
                this.comments = res.data.data;
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
