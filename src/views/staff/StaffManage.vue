<!--

  * Description: Manage all Staff",

  * Author: Yao Shi",

  * Date: 2020/10/2",

!-->
<template>
<div id="app">
    <!-- Set tips: perission toast  !-->
    <h2>{{setTips}}</h2>

    <!--Control butons  !-->
    <vxe-toolbar>
        <template v-slot:buttons style="margin-left:20px">
            <vxe-button icon="fa fa-plus" @click="insertEvent()">Add</vxe-button>
            <vxe-button @click="exportDataEvent()">Export</vxe-button>
            <vxe-button @click="printEvent()">Print</vxe-button>
            <vxe-input v-model="filterName" type="search" placeholder="Key Words" style="margin-left:20px"></vxe-input>
        </template>
    </vxe-toolbar>

    <!--tables  !-->
    <vxe-table border resizable highlight-hover-row ref="xTable" :export-config="{}" height="500" :data="list" @cell-dblclick="cellDBLClickEvent">
        <vxe-table-column type="seq" width="60" v-if="false"></vxe-table-column>
        <vxe-table-column field="id" title="ID" width="60" sortable></vxe-table-column>
        <vxe-table-column field="title" title="Title" :formatter="formatterTitle" sortable></vxe-table-column>
        <vxe-table-column field="account_name" title="AccountName" type="html"></vxe-table-column>
        <vxe-table-column field="first_name" title="FirstName" type="html"></vxe-table-column>
        <vxe-table-column field="surname" title="Surname" type="html"></vxe-table-column>
        <vxe-table-column field="email" title="Email" type="html"></vxe-table-column>
        <vxe-table-column field="tax_file_number" title="TFN" type="html"></vxe-table-column>
        <vxe-table-column field="payment_rate" title="Payment" :formatter="formatterPayment" sortable type="html"></vxe-table-column>
        <vxe-table-column field="phone" title="Phone" type="html"></vxe-table-column>
        <vxe-table-column field="gender" title="Gender" :formatter="formatterSex"></vxe-table-column>

        <vxe-table-column title="Action" width="200" show-overflow>
            <template v-slot="{ row }">
                <vxe-button type="text" @click="editEvent(row)">Edit</vxe-button>
                <vxe-button type="text" @click="removeEvent(row)">Delete</vxe-button>
            </template>
        </vxe-table-column>
    </vxe-table>

    <!-- pager  !-->
    <vxe-pager :loading="submitLoading" :current-page="tablePage.currentPage" :page-size="tablePage.pageSize" :total="tablePage.totalResult" :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']" :page-sizes="[2, 4, 6, 10]" @page-change="handlePageChange">
    </vxe-pager>

    <!-- creating staff dialog  !-->
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

import XEUtils from 'xe-utils'

import {
    updateEmployee,
    createEmployee,
    getAllEmployee
} from "../../network/Employee";

export default {
    computed: {
        setTips() {
            if (localStorage.getItem("title") == '99') {
                return 'Your have the permission to add, edit and delete employee'
            } else {
                return 'You have the only permission to edit yourself'
            }
        },
        isAdministrator() {
            return localStorage.getItem("title") == '99'
        },
        //Filter data key search words or change page data
        list() {
            //Create a new data set
            let result = new Array();
            //Calculate the start index according the current page
            let startIndex = (this.tablePage.currentPage - 1) * this.tablePage.pageSize;
            //Calculate the end index according the current page
            let endIndex = startIndex + this.tablePage.pageSize;
            //if the endex > original dataset length, let endIndex = this.tasks.length
            endIndex = endIndex > this.tableData.length ? this.tableData.length : endIndex
            let result_index = 0;
            for (let i = startIndex; i < endIndex; i++) {
                result[result_index] = this.tableData[i]
                result_index++
            }
            console.log(result)
            const filterName = XEUtils.toString(this.filterName).trim().toLowerCase()
            console.log(filterName)
            if (filterName) {
                const filterRE = new RegExp(filterName, 'gi')
                const searchProps = ['account_name', 'first_name', 'surname', 'email', 'tax_file_number', 'payment_rate', 'phone', 'id']
                const rest = result.filter(item => searchProps.some(key => XEUtils.toString(item[key]).toLowerCase().indexOf(filterName) > -1))
                return rest.map(row => {
                    const item = Object.assign({}, row)
                    searchProps.forEach(key => {
                        item[key] = XEUtils.toString(item[key]).replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
                    })
                    return item
                })
            }
            return result
        }
    },
    data() {
        return {
            //Key Search Words
            filterName: '',
            submitLoading: false,

            //Staff data
            tableData: [],

            //Used to pager 
            tablePage: {
                currentPage: 1,
                pageSize: 10,
                totalResult: 0
            },
            //Select row
            selectRow: null,
            showEdit: false,
            //sex list key value
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
            //Sava parameters for a new staff
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

            //Form rules
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
            //Form items
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
                this.tablePage.totalResult = this.tableData.length;
            }
        })
    },
    methods: {
        //format sex
        formatterSex({
            cellValue
        }) {
            let item = this.sexList.find(item => item.value === cellValue)
            return item ? item.label : 'mmale'
        },
        //format payment
        formatterPayment({
            cellValue
        }) {
            let item = cellValue + '/hour'
            return item
        },
        //format title
        formatterTitle({
            cellValue
        }) {
            let item = this.titleList.find(item => item.value === cellValue)
            return item ? item.label : 'Engineer'
        },
        //visible
        visibleMethod({
            data
        }) {
            return data.flag1 === 'Y'
        },
        //Handle click on a row
        cellDBLClickEvent({
            row
        }) {
            this.editEvent(row)
        },
        //Insert a row
        insertEvent() {
            if (this.isAdministrator) {
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
            } else {
                this.$XModal.message({
                    message: 'You do not have the  permission to add employee',
                    status: 'error'
                })

            }

        },
        //edit a row
        editEvent(row) {
            if (localStorage.getItem("id") == row.id || this.isAdministrator) {
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
            } else {
                this.$XModal.message({
                    message: 'You only allowed to edit yourselfe',
                    status: 'error'
                })
            }
        },
        //remove a row
        removeEvent(row) {
            if (this.isAdministrator) {
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
                                // this.$refs.xTable.remove(row)
                                getAllEmployee().then(res => {
                                    if (res.data.code == 200) {
                                        this.tableData = res.data.data;
                                        this.tablePage.totalResult = this.tableData.length;
                                    }
                                })
                            } else {
                                this.$XModal.message({
                                    message: 'Can not delete this emplyee,because he has related tasks or attendaces',
                                    status: 'error'
                                })
                            }
                        }).catch(err => {
                            this.$XModal.message({
                                message: 'Can not delete this emplyee,because he has related tasks or attendaces',
                                status: 'error'
                            })
                        });

                    }
                })
            } else {
                this.$XModal.message({
                    message: 'You do not have the permission to delete employee',
                    status: 'error'
                })
            }

        },

        //submit a new staff
        submitEvent() {
            this.submitLoading = true;
            if (this.selectRow) {
                updateEmployee(this.formData).then(res => {
                    this.submitLoading = false
                    if (res.data.code == 200) {
                        this.showEdit = false
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
                    if (res.data.code == 200) {
                        this.showEdit = false
                        this.formData = res.data.data;
                        this.$XModal.message({
                            message: 'Creating new employee successfully',
                            status: 'success'
                        })
                        // his.$refs.xTable.insert(this.formData)
                        getAllEmployee().then(res => {
                            if (res.data.code == 200) {
                                this.tableData = res.data.data;
                                this.tablePage.totalResult = this.tableData.length;
                            }
                        })
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
        },
        //Export data
        exportDataEvent() {
            this.$refs.xTable.exportData({
                type: 'csv'
            })
        },
        //Print data
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
    }
}
</script>

<style scoped>
#app {
    height: 100%;
    width: 100%;
}

.keyword-lighten {
    color: #000;
    background-color: #FFFF00;
}
</style>
