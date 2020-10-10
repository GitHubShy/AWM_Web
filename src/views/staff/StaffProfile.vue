<template>
<div id="app">
    <!-- <div id="topbar">
        <img id="portrait" :src="getPortrait" />
        <div id="info">
            <h2 class="title">Full Name</h2>
            <font class="value">{{getFullName}}</font>
            <h2 class="title">AccountName</h2>
            <font class="value">{{result.account_name}}</font>
            <h2 class="title">Title</h2>
            <font class="value">{{getTitle}}</font>
        </div>
        <div id="info">
            <h2 class="title">Phone</h2>
            <font class="value">{{result.phone}}</font>

            <h2 class="title">Payment</h2>
            <font class="value">{{getPayment}}</font>

            <h2 class="title">Birth</h2>
            <font class="value">{{result.birth_year}}</font>
        </div>

        <div id="info">
            <h2 class="title">TFN</h2>
            <font class="value">{{result.tax_file_number}}</font>
            <h2 class="title">Email</h2>
            <font class="value">{{result.email}}</font>
        </div>

        <img id="clock" @click="clock" src="../../assets/img/clock.jpg" />

    </div>

    <h2 class="bigtitle">Attendances</h2>

    <vxe-table :align="allAlign" :data="tableData">
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column field="date" title="Date" sortable></vxe-table-column>
        <vxe-table-column field="on_time" title="On-Time"></vxe-table-column>
        <vxe-table-column field="off_time" title="Off-Time"></vxe-table-column>
        <vxe-table-column field="work_hours" title="Work-Hours" :formatter="formatterWorkHours"></vxe-table-column>
    </vxe-table> -->

    <!--<h2 id="name">{{getFullName}}</h2>
    <img id="email" src="../../assets/img/facebook.png" />
    <button id="update" @click="update">Update My Profile</button>
    <div id="detail">

        <h2>AccountName</h2>
        <font style=" font-family: cursive">{{result.account_name}}</font>
        <br /><br /><br />

        <h2>Title</h2>
        <font style=" font-family: cursive">{{getTitle}}</font>
        <br /><br /><br />

        <h2>Email</h2>
        <font style=" font-family: cursive">{{result.email}}</font>
        <br /><br /><br />

        <h2>Phone</h2>
        <font style=" font-family: cursive">{{result.phone}}</font>
        <br /><br /><br />

        <h2>Payment</h2>
        <font style=" font-family: cursive">{{getPayment}}</font>
        <br /><br /><br />

        <h2>Birth</h2>
        <font style=" font-family: cursive">{{result.birth_year}}</font>
        <br /><br /><br />

        <h2>TFN</h2>
        <font style=" font-family: cursive">{{result.tax_file_number}}</font>
        <TitleValue title='AccountName' :value="result.account_name"></TitleValue>
        <TitleValue title='Title' :value="getTitle"></TitleValue>
        <TitleValue title='Email' :value="result.email"></TitleValue>
        <TitleValue title='Phone' :value="result.phone"></TitleValue>
        <TitleValue title='Payment' :value="getPayment"></TitleValue>
        <TitleValue title='Birth' :value="result.birth_year"></TitleValue>
        <TitleValue title='TFN' :value="result.tax_file_number"></TitleValue>

        <input type="file" accept=".png,.img" @change="getFile($event)"> 
        </div>-->


    <div class="pro-box">
        <div class="pro-left">
            <img :src="getPortrait" alt="" >
            <h4>{{getFullName}}</h4>
            <p>{{getTitle}}</p>
            <p>Newcastle, AUS</p>
            <div class="pro-but">
                <el-button type="primary">Clock on</el-button>
                <el-button class="pro-but-two">Clock Off</el-button>
            </div>
        </div>
        <div class="pro-right">
            <div class="pro-datas">
                <div>
                    <div>Full Name</div>
                    <div>{{getFullName}}</div>
                </div>
                <div>
                    <div>Email</div>
                    <div>{{result.email}}</div>
                </div>
                <div>
                    <div>Phone</div>
                    <div>{{result.phone}}</div>
                </div>
                <div>
                    <div>Birth</div>
                    <div>{{result.birth_year}}</div>
                </div>
                <div>
                    <div>AccountName</div>
                    <div>{{result.account_name}}</div>
                </div>
            </div>
            <div class="pro-list">
                <div class="pro-status">
                    <div class="status-title">Task Status</div>
                    <div class="progress-text">Job ID- 001</div>
                    <el-progress :percentage="50" :show-tex="false"></el-progress>
                    <div class="progress-text">Job ID- 001</div>
                    <el-progress :percentage="50" :show-tex="false"></el-progress>
                    <div class="progress-text">Job ID- 001</div>
                    <el-progress :percentage="50" :show-tex="false"></el-progress>
                    <div class="progress-text">Job ID- 001</div>
                    <el-progress :percentage="50" :show-tex="false"></el-progress>
                    <div class="progress-text">Job ID- 001</div>
                    <el-progress :percentage="50" :show-tex="false"></el-progress>
                    <div class="progress-text">Job ID- 001</div>
                    <el-progress :percentage="50" :show-tex="false"></el-progress>
                    <div class="progress-text">Job ID- 001</div>
                    <el-progress :percentage="50" :show-tex="false"></el-progress>
                </div>
                <div class="pro-stam">
                    <div class="stam-title">Time Stamp</div>
                   <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Clock on</th>
                                <th>Clocked Off</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(t,i) of tableData" :key="i">
                                <td>{{t.date}}</td>
                                <td>{{t.on_time}}</td>
                                <td>{{t.off_time}}</td>
                            </tr>
                            
                        </tbody>
                   </table>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<style >
    
</style>
<script>
import TitleValue from "../../components/TitleValue";
import {
    request
} from "../../network/request";
import {
    getSpecificEmployee,
    clock,
    getAttendance
} from "../../network/Employee";
export default {
    components: {
        // TitleValue,
    },
    props: {},
    data() {
        return {
            result: {
                id: null,
                first_name: null,
                surname: null,
                title: null,
                email: null,
                phone: null,
                payment_rate: null,
                birth_year: null,
                tax_file_number: null,
                portrait_url: "https://res.cloudinary.com/mhmd/image/upload/v1556074849/avatar-1_tcnd60.png"
            },
            allAlign: 'center',
            tableData: [],
            file: null
        };
    },
    watch: {},
    computed: {
        getPayment() {
            return this.result.payment_rate + '/hour'
        },
        getFullName() {
            return this.result.first_name + ' ' + this.result.surname
        },
        getTitle() {
            if (this.result.title == 99) {
                return 'Super Administrator';
            } else if (this.result.title == 1) {
                return 'Manager';
            } else {
                return 'Engineer';

            }
        },
        getPortrait() {
            if (this.result.portrait_url == null) {
                return 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601960184628&di=01658bf6cba790308114151a8dfc9bdb&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F9662a766b2e14418b22ed6e8185913c3e7562ab455df-j8mU0R_fw658';
            } else {
                return this.result.portrait_url;

            }
        }
    },
    methods: {
        formatterWorkHours({
            cellValue
        }) {
            let item = cellValue + 'hours'
            return item
        },
        update() {

        },
        // getFile(event) {
        //     let formData = new window.FormData()
        //     formData.append('file', event.target.files[0])
        //     console.log(formData)
        //     upload(formData);
        // },
        clock() {
            clock().then(res => {
                getAttendance('').then(res => {
                    console.log(res)
                    if (res.status == 200) {
                        this.tableData = res.data.data;
                    }
                })
            })
        }
    },
    created() {
        getSpecificEmployee('').then(res => {
                this.result = res.data.data;
                localStorage.setItem('id', this.result.id);
                localStorage.setItem('title', this.result.title);
                this.$store.commit('setStaffInfo', res.data.data);
                console.log(this.result)
            }),
            getAttendance('').then(res => {
                if (res.status == 200) {
                    this.tableData = res.data.data;
                }
            })
            this.clock()
    },
    mounted() {},
};
</script>

<style scoped>
div{
    box-sizing: border-box;
}
.pro-box{
    display: flex;
    min-height: 100vh;
    background: linear-gradient(to right, #599fd9, #c2e59c);
    justify-content: center;
    padding: 80px 0;
}
.pro-left{
    width: 350px;
    height: 380px;
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
}
.pro-left h4{
    font-size: 1.5rem;
    margin: 15px 0;
}
.pro-left p{
    color: #6c757d;
}
.pro-left img{
    width: 150px;
    height: 150px;
    border-radius: 50%;
    display: block;
    margin: 0 auto;
}
.pro-but{
    display: flex;
    align-items: center;
    justify-content: center;
}
.pro-but-two{
    border: 1px solid #007bff;
}
.pro-right{
    width: 730px;
    margin-left: 30px;
    /* background: #fff; */
    border-radius: 10px;
}
.pro-datas{
    background: #fff;
    border-radius: 10px;
    padding: 0 15px;
}
.pro-datas>div{
    padding: 15px 0;
    border-bottom: 1px solid #ddd;
    display: flex;
}
.pro-datas>div div:nth-child(1){
    font-size: 18px;
    font-weight: bold;
    margin-right: 100px;
    min-width: 100px;
}
.pro-datas>div div:nth-child(2){
    color: #6c757d;
}
.pro-list{
    display: flex;
    align-content: center;
    justify-content: space-between;
    margin-top:50px;
    
}
.pro-status,.pro-stam{
    border-radius: 5px;
    background: #fff;
    padding: 15px;
    width: 340px;
}
.status-title{
    font-size: 16px;
    font-weight: bold;
}
.progress-text{
    font-size: 12px;
    margin-top: 10px;
}
.pro-stam{
    padding: 0;
}
.stam-title{
    background: rgba(0,0,0,.03);
    padding: 15px;
}
.pro-stam table{
    width: 100%;
    line-height: 40px;
}
.pro-stam td{
    text-align: center;
    border-top: 1px solid #ddd;
}
#app {
    width: 100%;
    height: 100%;
    align-items: stretch;
    background-image: unset;
    background-color: white;
}

#topbar {
    width: 100%;
    height: 400px;
    display: flex;
    padding-left: 100px;
    flex-direction: row;
    background-color: black;
}

#portrait {
    width: 300px;
    height: 300px;
    margin-top: 50px;
    margin-bottom: 50px;
    border-radius: 50%;
}

#info {
    height: 300px;
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 50px;
    margin-left: 50px;
}

#detail {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 500px;
}

#name {
    font-family: cursive;
    position: absolute;
    top: 60px;
    color: white;
}

#update {
    font-family: "Gill Sans", sans-serif;
    border: 1px solid #fd4733;
    width: 180px;
    height: 40px;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscaimg/le;
    position: absolute;
    color: white;
    border-radius: 20px;
    background: #fd4733;
    right: 500px;
    top: 170px;
}

#email {
    width: 30px;
    height: 30px;
    position: absolute;
    left: 640px;
    top: 170px;
}

.value {
    font-family: cursive;
    color: white;
    font-size: 27px;
}

.title {
    color: white;
    font-size: 15px;
}

.bigtitle {
    color: black;
    font-size: 30px;
}

#clock {
    width: 150px;
    height: 150px;
    margin-top: 125px;
    margin-bottom: 125px;
    margin-left: 100px;
    border-radius: 50%;
}
</style>
