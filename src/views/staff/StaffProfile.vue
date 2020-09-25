<template>
<div id="app">
    <div id="topbar"></div>
    <h2 id="name">{{getFullName}}</h2>
    <img id="portrait" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2813630019,3804632314&fm=11&gp=0.jpg" alt="aaa" />
    <img id="email" src="../../assets/img/facebook.png" />
    <button id="update">Update My Profile</button>
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
        <!-- <TitleValue title='AccountName' :value="result.account_name"></TitleValue>
        <TitleValue title='Title' :value="getTitle"></TitleValue>
        <TitleValue title='Email' :value="result.email"></TitleValue>
        <TitleValue title='Phone' :value="result.phone"></TitleValue>
        <TitleValue title='Payment' :value="getPayment"></TitleValue>
        <TitleValue title='Birth' :value="result.birth_year"></TitleValue>
        <TitleValue title='TFN' :value="result.tax_file_number"></TitleValue> -->
    </div>
</div>
</template>

<script>
import TitleValue from "../../components/TitleValue";
import {
    request
} from "../../network/request";
export default {
    components: {
        // TitleValue,
    },
    props: {},
    data() {
        return {
            result: {
                first_name: null,
                surname: null,
                title: null,
                email: null,
                phone: null,
                payment_rate: null,
                birth_year: null,
                tax_file_number: null,
            }
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
        }
    },
    methods: {},
    created() {
        request({
            method: 'post',
            url: "/awm_server/employee/getEmployee",
            data: {
                id: ''
            }
        }).then(res => {
            this.result = res.data.data;
            console.log(this.result)
        })
    },
    mounted() {},
};
</script>

<style scoped>
#app {
    width: 100%;
    height: 100%;
    background-image: unset;
    background-color: white;
}

#topbar {
    width: 100%;
    height: 300px;
    background-color: black;
}

#portrait {
    width: 300px;
    height: 300px;
    position: absolute;
    top: 150px;
    border-radius: 50%;
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
</style>
