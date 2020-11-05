<!--

  * Description Show My Tasks",

  * Author Yao Shi",

  * Date 2020/10/5",

!-->
<template>
<div class="wrapper">

    <h2>My Tasks</h2>
    <!--  export and print button  !-->
    <vxe-button @click="exportDataEvent()">Export</vxe-button>
    <vxe-button @click="printEvent()">Print</vxe-button>
    <br>
    <br>
    <!-- table  !-->
    <vxe-table border show-overflow keep-source resizable :loading="loadingDialog" ref="xTable" height="500" :data="list" :edit-config="{trigger: 'manual', mode: 'row'}">
        <vxe-table-column field="job_id" title="Job Id" width="80"></vxe-table-column>
        <vxe-table-column field="description" title="Description" width="200"></vxe-table-column>
        <vxe-table-column field="start_time" title="StartTime"></vxe-table-column>
        <vxe-table-column field="due_time" title="DueTime"></vxe-table-column>
        <vxe-table-column field="end_time" title="EndTime"></vxe-table-column>
        <vxe-table-column field="planned_cost_time" title="PlannedHours"></vxe-table-column>
        <vxe-table-column field="actual_cost_time" title="ActualHours"></vxe-table-column>
        <vxe-table-column field="percentage" title="Percentage" :edit-render="{name: '$input', props: {type: 'number'}}" :formatter="formatterPercentage"></vxe-table-column>
        <vxe-table-column field="materials" title="Materials" width="200" :edit-render="{name: '$input', props: {type: 'input'}}"></vxe-table-column>
        <vxe-table-column field="status" title="Status" :edit-render="{name: '$select', options: status}"></vxe-table-column>
        <vxe-table-column title="Action" width="170">
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
    <!-- pager  !-->
    <vxe-pager :loading="loadingDialog" :current-page="tablePage.currentPage" :page-size="tablePage.pageSize" :total="tablePage.totalResult" :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']" :page-sizes="[2, 6, 10]" @page-change="handlePageChange">
    </vxe-pager>

</div>
</template>

<script>
import {
    getTasksForEmployee,
    updateSubTask
} from "../../network/Workshop";

export default {
    components: {},
    props: {},
    data() {
        return {
            //Loading dialog
            loadingDialog: true,

            //My task list

            tasks: [],

            //Used to pager 
            tablePage: {
                currentPage: 1,
                pageSize: 10,
                totalResult: 0
            },
            //Task status
            status: [{
                    label: 'Created',
                    value: 0
                },
                {
                    label: 'Started',
                    value: 1
                },
                {
                    label: 'OverDue',
                    value: 3
                },
                {
                    label: 'Finished',
                    value: 5
                },
            ],
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
            endIndex = endIndex > this.tasks.length ? this.tasks.length : endIndex
            let result_index = 0;
            for (let i = startIndex; i < endIndex; i++) {
                result[result_index] = this.tasks[i]
                result_index++
            }
            return result
        }
    },
    methods: {
        //Let a row can be edited 
        editRowEvent(row) {
            this.$refs.xTable.setActiveRow(row)
        },
        //Cancle the row edit status
        cancelRowEvent(row) {
            const xTable = this.$refs.xTable
            xTable.clearActived().then(() => {
                xTable.revertData(row)
            })
        },
        //Save the new row status
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

                    } else {
                        this.$XModal.message({
                            message: res.data.message,
                            status: 'error'
                        })
                    }
                    getTasksForEmployee(localStorage.getItem('id')).then(res => {
                        if (res.data.code == 200) {
                            this.tasks = res.data.data;
                        }
                    })
                })

            })
        },
        //format the the percentage 
        formatterPercentage({
            cellValue
        }) {
            let item = cellValue + '%'
            return item
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
        getTasksForEmployee(localStorage.getItem('id')).then(res => {
            if (res.data.code == 200) {
                this.tasks = res.data.data;
                this.tablePage.totalResult = this.tasks.length;
            }
            this.loadingDialog = false;
        })
    },
    mounted() {}
};
</script>

<style scoped>
</style>
