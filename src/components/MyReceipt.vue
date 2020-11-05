<!--

  * Description: Show My receipts for a customer",

  * Author: Yao Shi",

  * Date: 2020/10/5",

!-->
<template>
<div class="wrapper">
    <h2>My Receipts</h2>
    <!--   Receipts table  !-->
    <div style="width: 100%; height: 300px">
        <vxe-table border :loading="submitLoading" width="auto" :data="receipts">
            <vxe-table-column field="crn" title="CRN" width="200"></vxe-table-column>
            <vxe-table-column field="create_time" title="CreateTime" width="200"></vxe-table-column>
            <vxe-table-column field="delivery_time" title="DeliveryTime" width="200"></vxe-table-column>
            <vxe-table-column field="price" title="Price" width="200"></vxe-table-column>
        </vxe-table>
    </div>
</div>
</template>

<script>
import {
    getReceipts
} from "../network/Customer";
export default {
    components: {},
    props: {},
    data() {
        return {
            //loading dialog
            submitLoading: false,
            //receipt list
            receipts: null
        };
    },
    watch: {},
    computed: {},
    methods: {},
    created() {
        //Get receipt from server
        getReceipts().then(res => {
            if (res.data.code == 200) {
                this.receipts = res.data.data;
            }
        })
    },
    mounted() {}
};
</script>

<style scoped>
</style>
