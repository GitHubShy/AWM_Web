<!--

  * Description: Creates the Salary Table for the employee profile currently logged in.,

  * Author: Yao Shi",

  * Date: 2020/10/2",

!-->
<template>
<div class="wrapper">
    <div style="width: 1000px;margin-top:100px">
        <vxe-toolbar>
            <template v-slot:buttons>
                <!-- export  !-->
                <vxe-button @click="exportSelectEvent">Export Checked</vxe-button>
                <!-- print  !-->
                <vxe-button @click="printSelectEvent">Print Checked</vxe-button>
            </template>
        </vxe-toolbar>
        <!-- table  !-->
        <vxe-table resizable border="inner" width="auto" ref="xTree" :tree-config="{children: 'daily_salary', expandAll: true}" :data="tableData">
            <vxe-table-column type="checkbox" width="60"></vxe-table-column>
            <vxe-table-column field="date" title="Date" tree-node></vxe-table-column>
            <vxe-table-column field="on_time" title="On Time"></vxe-table-column>
            <vxe-table-column field="off_time" title="Off Time"></vxe-table-column>
            <vxe-table-column field="work_hours" title="Worked Hours" :formatter="formatterHours"></vxe-table-column>
            <vxe-table-column field="payment_rate" title="Payment Rate" :formatter="formatterPayment"></vxe-table-column>
            <vxe-table-column field="salary" title="Salary" :formatter="formatterSalary"></vxe-table-column>
        </vxe-table>
    </div>
</div>
</template>

<script>
import {
    getMonthlySalary
} from "../../network/Employee";

export default {
    components: {},
    props: {},
    data() {
        return {
            tableData: null
        };
    },
    watch: {},
    computed: {},
    methods: {
        //format working hours
        formatterHours({
            cellValue
        }) {
            let item = cellValue + 'hours'
            return item
        },
        //format payment 
        formatterPayment({
            cellValue
        }) {
            let item = "$" + cellValue + '/hour'
            return item
        },
        //format salary
        formatterSalary({
            cellValue
        }) {
            let item = "$" + cellValue
            return item
        },
        //print function
        printSelectEvent() {
            this.$refs.xTree.print({
                data: this.$refs.xTree.getCheckboxRecords()
            })
        },
        //export function
        exportSelectEvent() {
            this.$refs.xTree.exportData({
                data: this.$refs.xTree.getCheckboxRecords()
            })
        }
    },
    created() {
        //get salary data
        getMonthlySalary().then(res => {
            if (res.data.code == 200) {
                this.tableData = res.data.data;
            }
        })
    },
    mounted() {}
};
</script>

<style scoped>
.wrapper {
    display: flex;
    min-height: 100vh;
    background: linear-gradient(to right, #599fd9, #c2e59c);
    justify-content: center;
}
</style>
