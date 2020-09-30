<template>
<div id="app">
    <vxe-toolbar>
        <template v-slot:buttons>
            <vxe-button icon="fa fa-plus" @click="insertEvent()">Add</vxe-button>
        </template>
    </vxe-toolbar>
    <vxe-table border resizable row-key highlight-hover-row ref="xTable" height="500" :data="tableData" @cell-dblclick="cellDBLClickEvent">
        <vxe-table-column type="seq" width="60" v-if="false"></vxe-table-column>
        <vxe-table-column field="id" title="ID" width="60" sortable></vxe-table-column>
        <vxe-table-column field="title" title="Title" :formatter="formatterTitle" sortable></vxe-table-column>
        <vxe-table-column field="account_name" title="AccountName"></vxe-table-column>
        <vxe-table-column field="first_name" title="FirstName"></vxe-table-column>
        <vxe-table-column field="surname" title="Surname"></vxe-table-column>
        <vxe-table-column field="email" title="Email"></vxe-table-column>
        <vxe-table-column field="tax_file_number" title="TFN"></vxe-table-column>
        <vxe-table-column field="payment_rate" title="Payment" :formatter="formatterPayment" sortable></vxe-table-column>
        <vxe-table-column field="phone" title="Phone"></vxe-table-column>
        <vxe-table-column field="gender" title="Gender" :formatter="formatterSex"></vxe-table-column>

        <!-- Unnecessary to display the following messages -->
        <!-- <vxe-table-column field="password" title="Password"></vxe-table-column> -->
        <!-- <vxe-table-column field="age" title="Age"></vxe-table-column> -->
        <!-- <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column> -->
        <!-- <vxe-table-column field="birth_year" title="Birth" show-overflow></vxe-table-column> -->

        <vxe-table-column title="Action" width="200" show-overflow>
            <template v-slot="{ row }">
                <vxe-button type="text" @click="editEvent(row)">Edit</vxe-button>
                <vxe-button type="text" @click="removeEvent(row)">Delete</vxe-button>
            </template>
        </vxe-table-column>
    </vxe-table>

    <vxe-modal v-model="showEdit" :title="selectRow ? 'Edit&Save' : 'New&Save'" width="800" min-width="600" min-height="300" :loading="submitLoading" resize destroy-on-close>
        <template v-slot>
            <vxe-form :data="formData" :items="formItems" :rules="formRules" title-align="right" title-width="100" @submit="submitEvent"></vxe-form>
        </template>
    </vxe-modal>

</div>
</template>

<script>
import {
    request
} from "../../network/request";

import {
    updateEmployee,
    createEmployee,
    getAllEmployee
} from "../../network/Employee";

export default {
    data() {
        return {
            submitLoading: false,
            tableData: [],
            selectRow: null,
            showEdit: false,
            sexList: [{
                    label: 'male',
                    value: 0
                },
                {
                    label: 'Female',
                    value: 1
                }
            ],
            titleList: [{
                    label: 'Engineer',
                    value: 0
                },
                {
                    label: 'Manager',
                    value: 1
                },
                {
                    label: 'Super Administrator',
                    value: 99
                }
            ],
            formData: {
                id: null,
                account_name: null,
                tax_file_number: null,
                password: null,
                payment_rate: null,
                phone: null,
                first_name: null,
                surname: null,
                title: null,
                gender: null,
                birth_year: null,
                email: null,
            },
            formRules: {
                account_name: [{
                        required: true,
                        message: 'Please input account name'
                    },
                    {
                        min: 3,
                        max: 10,
                        message: 'The length must be between 3 and 10'
                    }
                ],
                password: [{
                        required: true,
                        message: 'Please input password'
                    },
                    {
                        min: 6,
                        max: 20,
                        message: 'The length must be between 6 and 20'
                    }
                ],
                email: [{
                    required: true,
                    message: 'Please input email'
                }],
                payment_rate: [{
                    required: true,
                    message: 'Please input payment rate'
                }],
                first_name: [{
                    required: true,
                    message: 'Please input first name'
                }],
                surname: [{
                    required: true,
                    message: 'Please input surname'
                }],
                title: [{
                    required: true,
                    message: 'Please choose title'
                }]
            },
            formItems: [{
                    title: 'Basic information',
                    span: 24,
                    titleAlign: 'left',
                    titleWidth: 200,
                    titlePrefix: {
                        icon: 'fa fa-address-card-o'
                    }
                },
                {
                    field: 'account_name',
                    title: 'AccountName',
                    span: 12,
                    itemRender: {
                        name: '$input',
                        props: {
                            placeholder: 'Please input account name'
                        }
                    }
                },
                {
                    field: 'first_name',
                    title: 'FirstName',
                    span: 12,
                    itemRender: {
                        name: '$input',
                        props: {
                            placeholder: 'Please input First name'
                        }
                    }
                },
                {
                    field: 'surname',
                    title: 'Surname',
                    span: 12,
                    itemRender: {
                        name: '$input',
                        props: {
                            placeholder: 'Please input surname'
                        }
                    }
                },
                {
                    field: 'password',
                    title: 'Password',
                    span: 12,
                    itemRender: {
                        name: '$input',
                        props: {
                            placeholder: 'Please input password'
                        }
                    }
                },
                {
                    field: 'email',
                    title: 'Email',
                    span: 12,
                    itemRender: {
                        name: '$input',
                        props: {
                            placeholder: 'Please input email'
                        }
                    }
                },

                {
                    field: 'payment_rate',
                    title: 'Payment',
                    span: 12,
                    itemRender: {
                        name: '$input',
                        props: {
                            type: 'number',
                            placeholder: 'Please input payment rate'
                        }
                    }
                },
                {
                    field: 'title',
                    title: 'Title',
                    span: 12,
                    itemRender: {
                        name: '$select',
                        options: []
                    }
                },

                // {
                //     field: 'age',
                //     title: 'Age',
                //     span: 12,
                //     itemRender: {
                //         name: '$input',
                //         props: {
                //             type: 'number',
                //             placeholder: '请输入年龄'
                //         }
                //     }
                // },
                // {
                //     field: 'flag1',
                //     title: '是否单身',
                //     span: 12,
                //     itemRender: {
                //         name: '$radio',
                //         options: [{
                //             label: '是',
                //             value: 'Y'
                //         }, {
                //             label: '否',
                //             value: 'N'
                //         }]
                //     }
                // },
                {
                    title: 'Other information',
                    span: 24,
                    titleAlign: 'left',
                    titleWidth: 200,
                    titlePrefix: {
                        message: '请填写必填项',
                        icon: 'fa fa-info-circle'
                    }
                },
                {
                    field: 'gender',
                    title: 'Gender',
                    span: 12,
                    itemRender: {
                        name: '$select',
                        options: []
                    }
                },
                {
                    field: 'tax_file_number',
                    title: 'TFN',
                    span: 12,
                    itemRender: {
                        name: '$input',
                        props: {
                            type: 'number',
                            placeholder: 'Please input tax file number'
                        }
                    }
                },
                {
                    field: 'phone',
                    title: 'Phone',
                    span: 12,
                    itemRender: {
                        name: '$input',
                        props: {
                            type: 'number',
                            placeholder: 'Please input phone number'
                        }
                    }
                },
                // {
                //     field: 'num',
                //     title: 'Number',
                //     span: 12,
                //     itemRender: {
                //         name: '$input',
                //         props: {
                //             type: 'number',
                //             placeholder: '请输入数值'
                //         }
                //     }
                // },
                {
                    field: 'birth_year',
                    title: 'Birth',
                    span: 12,
                    itemRender: {
                        name: '$input',
                        props: {
                            type: 'date',
                            placeholder: 'Pleas choose date'
                        }
                    }
                },
                // {
                //     field: 'address',
                //     title: 'Address',
                //     span: 24,
                //     titleSuffix: {
                //         message: '提示信息！！',
                //         icon: 'fa fa-question-circle'
                //     },
                //     itemRender: {
                //         name: '$textarea',
                //         props: {
                //             autosize: {
                //                 minRows: 2,
                //                 maxRows: 4
                //             },
                //             placeholder: '请输入地址'
                //         }
                //     }
                // },
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
                        }, {
                            props: {
                                type: 'reset',
                                content: 'reset'
                            }
                        }]
                    }
                }
            ]
        }
    },
    created() {
        this.formItems[9].itemRender.options = this.sexList;
        this.formItems[7].itemRender.options = this.titleList
        // this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
        getAllEmployee().then(res => {
            if (res.data.code == 200) {
                this.tableData = res.data.data;
            }
        })
    },
    methods: {
        formatterSex({
            cellValue
        }) {
            let item = this.sexList.find(item => item.value === cellValue)
            return item ? item.label : 'mmale'
        },
        formatterPayment({
            cellValue
        }) {
            let item = cellValue + '/hour'
            return item
        },
        formatterTitle({
            cellValue
        }) {
            let item = this.titleList.find(item => item.value === cellValue)
            return item ? item.label : 'Engineer'
        },
        visibleMethod({
            data
        }) {
            return data.flag1 === 'Y'
        },
        cellDBLClickEvent({
            row
        }) {
            this.editEvent(row)
        },
        insertEvent() {
            this.formData = {
                account_name: '',
                password: '',
                email: '',
                tax_file_number: '',
                payment_rate: '',
                first_name: '',
                surname: '',
                phone: '',
                gender: '',
                birth_year: '',
                title: ''
            }
            this.selectRow = null
            this.showEdit = true
        },
        editEvent(row) {
            this.formData = {
                id: row.id,
                account_name: row.account_name,
                password: row.password,
                email: row.email,
                tax_file_number: row.tax_file_number,
                payment_rate: row.payment_rate,
                first_name: row.first_name,
                surname: row.surname,
                phone: row.phone,
                birth_year: row.birth_year,
                title: row.title,
                gender: row.gender
            }
            this.selectRow = row
            this.showEdit = true
        },
        removeEvent(row) {
            this.$XModal.confirm('Are you sure to delete this employee?').then(type => {
                if (type === 'confirm') {
                    request({
                        method: 'post',
                        url: "/employee/deleteEmployee",
                        // data: JSON.stringify(this.formData)
                        data: {
                            id: row.id,
                        }
                    }).then(res => {
                        this.submitLoading = false
                        this.showEdit = false
                        if (res.data.code == 200) {
                            this.$XModal.message({
                                message: 'delete employee successfully',
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
        },
        submitEvent() {
            this.submitLoading = true;
            if (this.selectRow) {
                updateEmployee(this.formData).then(res => {
                    this.submitLoading = false
                    this.showEdit = false
                    if (res.data.code == 200) {
                        this.$XModal.message({
                            message: 'Update employee successfully',
                            status: 'success'
                        })
                        Object.assign(this.selectRow, this.formData)
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

            } else {
                createEmployee(this.formData).then(res => {
                    this.submitLoading = false
                    this.showEdit = false
                    if (res.data.code == 200) {
                        this.formData = res.data.data;
                        this.$XModal.message({
                            message: 'Creating new employee successfully',
                            status: 'success'
                        })
                        this.$refs.xTable.insert(this.formData)
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

            // setTimeout(() => {
            //     this.submitLoading = false
            //     this.showEdit = false
            //     if (this.selectRow) {
            //         this.$XModal.message({
            //             message: '保存成功',
            //             status: 'success'
            //         })
            //         Object.assign(this.selectRow, this.formData)
            //     } else {
            //         this.$XModal.message({
            //             message: '新增成功',
            //             status: 'success'
            //         })
            //         this.$refs.xTable.insert(this.formData)
            //     }
            // }, 500)
        }
    }
}
</script>

<style scoped>
#app {
    background-color: white;
    background-image: unset;
    height: 100%;
    width: 100%;
    align-items: stretch;
}
</style>
