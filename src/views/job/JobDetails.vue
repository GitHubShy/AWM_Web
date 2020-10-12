<template>
<div class="wrapper">
    <h2>Job Details</h2>
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
</div>
</template>

<script>
import {
    getAllSubTasks,
    updateSubTask
} from "../../network/Workshop";

import {
    getEmployeeByType
} from "../../network/Employee";

export default {
    components: {},
    props: {},
    data() {
        return {
            subTasks: null,
            engineers: [],
            updateForm: {
                id: null,
                employee_id: null,
                start_time: null,
                due_time: null,
            }
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
                            message: '保存成功！',
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
        }
    },
    created() {
        getAllSubTasks(this.$route.query.id).then(res => {
            if (res.data.code == 200) {
                this.subTasks = res.data.data;
            }
        })
        getEmployeeByType(-1).then(res => {
            this.result = res.data.data;

            for (let i = 0; i < this.result.length; i++) {
                let modelItem = {};
                modelItem["label"] = this.result[i].name;
                modelItem["value"] = this.result[i].id;
                this.engineers[i] = modelItem;
            }
        })
    },
    mounted() {}
};
</script>

<style scoped>
</style>
