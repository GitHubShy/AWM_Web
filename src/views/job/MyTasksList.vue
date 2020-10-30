<template>
<div class="wrapper">

    <h2>My Tasks</h2>

    <vxe-button @click="exportDataEvent()">Export</vxe-button>
    <vxe-button @click="printEvent()">Print</vxe-button>
    <br>
    <br>

    <vxe-table border show-overflow keep-source resizable :loading="loadingDialog" ref="xTable" height="500" :data="tasks" :edit-config="{trigger: 'manual', mode: 'row'}">
        <vxe-table-column field="job_id" title="Id" width="60"></vxe-table-column>
        <vxe-table-column field="description" title="Description"></vxe-table-column>
        <vxe-table-column field="start_time" title="StartTime"></vxe-table-column>
        <vxe-table-column field="due_time" title="DueTime"></vxe-table-column>
        <vxe-table-column field="end_time" title="EndTime"></vxe-table-column>
        <vxe-table-column field="planned_cost_time" title="PlannedHours"></vxe-table-column>
        <vxe-table-column field="actual_cost_time" title="ActualHours"></vxe-table-column>
        <vxe-table-column field="percentage" title="Percentage" :edit-render="{name: '$input', props: {type: 'number'}}"></vxe-table-column>
        <vxe-table-column field="materials" title="Materials" width="200" :edit-render="{name: '$input', props: {type: 'input'}}"></vxe-table-column>
        <vxe-table-column field="status" title="Status" :edit-render="{name: '$select', options: status}"></vxe-table-column>
        <vxe-table-column field="status" title="Status">
            <template v-slot="{ row }">
                <vxe-button :status="setStatus(row)" :content="setStatusText(row)" size="small" style="width:80px" @click="showDetails(row)"></vxe-button>
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
                </template>
            </template>
        </vxe-table-column>
    </vxe-table>

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
            loadingDialog: true,
            tasks: [],
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
    computed: {},
    methods: {
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
        getTasksForEmployee(localStorage.getItem('id')).then(res => {
            if (res.data.code == 200) {
                this.tasks = res.data.data;
            }
            this.loadingDialog = false;
        })
    },
    mounted() {}
};
</script>

<style scoped>
</style>
