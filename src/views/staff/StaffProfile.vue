<!--

  * Description: Shows employee information for the profile currently logged in, this includes Employee Meta information, Task Status and Clock on functionality.

  * Author: Yao Shi",

  * Date: 2020/10/2",

!-->
<template>
<div id="app">
    <div class="pro-box">
        <div class="pro-left">
            <!-- image -->
            <img :src="getPortrait" alt="" @click="updateImg()">
            <!-- full name -->
            <h4>{{getFullName}}</h4>
            <!-- employee title -->
            <p>{{getTitle}}</p>
            <p>Newcastle, AUS</p>
            <div class="pro-but">
                <!-- clock function -->
                <el-button type="primary" @click="clock()">Clock</el-button>
                <!-- go to salary -->
                <el-button class="pro-but-two " @click="salary()">Salary</el-button>
            </div>
        </div>
        <div class="pro-right">
            <div class="pro-datas">
                <div>
                    <!-- full name -->
                    <div>Full Name</div>
                    <div>{{getFullName}}</div>
                </div>
                <div>
                    <!-- email -->
                    <div>Email</div>
                    <div>{{result.email}}</div>
                </div>
                <div>
                    <!-- phone -->
                    <div>Phone</div>
                    <div>{{result.phone}}</div>
                </div>
                <div>
                    <!-- birth -->
                    <div>Birth</div>
                    <div>{{result.birth_year}}</div>
                </div>
                <div>
                    <!-- account name -->
                    <div>AccountName</div>
                    <div>{{result.account_name}}</div>
                </div>
            </div>
            <div class="pro-list">
                <div class="pro-status">
                    <div class="status-title">Task Status</div>
                    <!-- task status table -->
                    <div v-for="(item,key) of subTasks" :key="key">
                        <div class="progress-text">Task ID - {{subTasks[key].id}}</div>
                        <el-progress :percentage="subTasks[key].percentage" :show-tex="false"></el-progress>
                    </div>
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
                            <!-- time stamp -->
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
import {
    getTasksForEmployee
} from "../../network/Workshop";

export default {
    components: {
        // TitleValue,
    },
    props: {},
    data() {
        return {
            //profile data
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
            subTasks: null,
            file: null
        };
    },
    watch: {},
    computed: {
        //format payment
        getPayment() {
            return this.result.payment_rate + '/hour'
        },
        //get full name
        getFullName() {
            return this.result.first_name + ' ' + this.result.surname
        },
        //get title
        getTitle() {
            if (this.result.title == 99) {
                return 'Super Administrator';
            } else if (this.result.title == 1) {
                return 'Manager';
            } else {
                return 'Engineer';

            }
        },
        //get prortrait
        getPortrait() {
            if (this.result.portrait_url == null) {
                return 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601960184628&di=01658bf6cba790308114151a8dfc9bdb&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F9662a766b2e14418b22ed6e8185913c3e7562ab455df-j8mU0R_fw658';
            } else {
                return this.result.portrait_url;

            }
        }
    },
    methods: {
        //format working hours
        formatterWorkHours({
            cellValue
        }) {
            let item = cellValue + 'hours'
            return item
        },
        //update img
        updateImg() {
            this.$router.push({
                path: '/uploadimage',
                query: {
                    type: 0,
                    url: this.result.portrait_url
                }
            });
        },
        //clock 
        clock() {
            clock().then(res => {
                getAttendance('').then(res => {
                    console.log(res)
                    if (res.status == 200) {
                        this.tableData = res.data.data;
                    }
                })
            })
        },
        //go to salary
        salary() {
            this.$router.push({
                path: '/staff/salary'
            });
        }
    },
    created() {
        //get employee info
        getSpecificEmployee('').then(res => {
                this.result = res.data.data;
                localStorage.setItem('id', this.result.id);
                localStorage.setItem('title', this.result.title);
                this.$store.commit('setStaffInfo', res.data.data);
                console.log(this.result)
            }),
            //get attendace
            getAttendance('').then(res => {
                if (res.status == 200) {
                    this.tableData = res.data.data;
                }
            }),
            //Get tasks status
            getTasksForEmployee(localStorage.getItem('id')).then(res => {
                if (res.data.code == 200) {
                    this.subTasks = res.data.data;
                }
            })
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
    min-width: 120px;
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
.pro-list2{
    display: flex;
    align-content: center;
    justify-content: space-between;
    margin-top:50px;
    width: 700px;
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
