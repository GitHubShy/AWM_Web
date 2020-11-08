<!--

  * Description: Lists existing Customers in the database.

  * Author: Yao Shi",

  * Date: 2020/10/2",

!-->
<template>
<div class="wrapper">
    <h2>All Customers</h2>
    <!-- Cusomer tables -->
    <vxe-table border resizable ref="xTable" height="500" :data="customer">
        <vxe-table-column field="aircraft_pic" title="Pic" width="120">
            <template v-slot="{ row }">
                <img v-if="row.portrait_url" :src="row.portrait_url" style="width: 100px" />
                <span v-else></span>
            </template>
        </vxe-table-column>
        <vxe-table-column field="account_name" title="Account Name"></vxe-table-column>
        <vxe-table-column field="first_name" title="First Name"></vxe-table-column>
        <vxe-table-column field="surname" title="Surname"></vxe-table-column>
        <vxe-table-column field="email" title="Email"></vxe-table-column>
        <vxe-table-column field="phone" title="Phone"></vxe-table-column>
        <vxe-table-column field="company_name" title="Company Name"></vxe-table-column>
        <vxe-table-column field="status" title="Action">
            <template v-slot="{ row }">
                <vxe-button status="success" content="Message" size="mediam" style="width: 100px" @click="showMessageDialog(row)"></vxe-button>
            </template>
        </vxe-table-column>
    </vxe-table>

    <!-- send message dialog -->
    <vxe-modal v-model="showEdit" title="Send Email Message" width="800" min-width="600" min-height="300" :loading="submitLoading" resize destroy-on-close>
        <template v-slot>
            <vxe-form :data="message" :items="formItems" :rules="formRules" title-align="right" title-width="100" @submit="sendMessage"></vxe-form>
        </template>
    </vxe-modal>
</div>
</template>

<script>
import {
    getAllCustomer
} from "../../network/Customer";
import {
    sendMessage
} from "../../network/Message";
export default {
    components: {},
    props: {},
    data() {
        return {
            submitLoading: false,
            showEdit: false,
            customer: [],
            //Messge content
            message: {
                account_name: "",
                subject: "",
                content: "",
            },
            //form rules
            formRules: {
                subject: [{
                    required: true,
                    message: "Please input subject",
                }, ],
                content: [{
                    required: true,
                    message: "Please input password",
                }, ],
            },
            //form items
            formItems: [{
                    title: "Send Message",
                    span: 24,
                    titleAlign: "left",
                    titleWidth: 200,
                    titlePrefix: {
                        icon: "fa fa-address-card-o",
                    },
                },
                {
                    field: "subject",
                    title: "Subject",
                    span: 12,
                    itemRender: {
                        name: "$input",
                        props: {
                            placeholder: "Please input Subject",
                        },
                    },
                },
                {
                    field: "content",
                    title: "Content",
                    span: 12,
                    itemRender: {
                        name: "$input",
                        props: {
                            placeholder: "Please input Content",
                        },
                    },
                },
                {
                    align: "center",
                    span: 24,
                    titleAlign: "left",
                    itemRender: {
                        name: "$buttons",
                        children: [{
                                props: {
                                    type: "submit",
                                    content: "Submit",
                                    status: "primary",
                                },
                            },
                            {
                                props: {
                                    type: "reset",
                                    content: "reset",
                                },
                            },
                        ],
                    },
                },
            ],
        };
    },
    watch: {},
    computed: {},
    methods: {
        //Send message function
        sendMessage() {
            this.submitLoading = true;
            sendMessage(
                    0,
                    this.message.account_name,
                    this.message.subject,
                    this.message.content
                )
                .then((res) => {
                    this.submitLoading = false;
                    if (res.data.code == 200) {
                        this.$XModal.message({
                            message: "Send Success!",
                            status: "success",
                        });
                        this.showEdit = false;
                    } else {
                        this.$XModal.message({
                            message: "Send Failed!",
                            status: "error",
                        });
                    }
                })
                .catch((err) => {
                    this.submitLoading = false;
                    this.$XModal.message({
                        message: "Error:" + err,
                        status: "error",
                    });
                });
        },
        //show send messge dialog
        showMessageDialog(row) {
            this.message = {
                account_name: row.account_name,
                subject: "",
                content: "",
            };
            this.showEdit = true;
        },
    },
    created() {
        getAllCustomer().then((res) => {
            if (res.data.code == 200) {
                this.customer = res.data.data;
            }
        });
    },
    mounted() {},
};
</script>

<style scoped>
</style>
