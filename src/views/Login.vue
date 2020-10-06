<template>
<div id="login">
    <h2>Log in</h2>
    <div id="acount_name">
        <img src="../assets/img/user.png" width="30px" height="30px" />
        <input class="input" type="text" placeholder="Account Name" style="margin-left: 10px" v-model="account_name" />
    </div>
    <div id="password">
        <img src="../assets/img/password.png" width="30px" height="30px" />
        <input class="input" type="password" placeholder="password" style="margin-left: 10px" v-model="password" />
    </div>
    <mybutton type="primary " fontSize="20px" width="150px" style="margin-top: 20px" @click.native="LonIn">Log in</mybutton>
</div>
</template>

<script>
import mybutton from "../components/CustomButton";
import {
    request
} from "../network/request";
export default {
    name: "Login",
    components: {
        mybutton,
    },
    props: {},
    data() {
        return {
            account_name: "",
            password: ""
        };
    },
    watch: {},
    computed: {},
    methods: {
        LonIn() {
            request({
                method: 'post',
                url: "/employee/login",
                data: {
                    account_name: this.account_name,
                    password: this.password
                }
            }).then(res => {
                if (res.data.code == 200) {
                    localStorage.setItem('token', res.data.data.token);
                    console.log('11111111111' + localStorage.getItem('token'))
                    this.$store.commit('setToken', res.data.data.token);
                    this.$router.push("/staff");
                }
            })
        },
    },
    created() {

    },
    mounted() {},
};
</script>

<style scoped>
#login {
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
    padding-top: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url("../assets/img/index_bg.png");
    background-size: 100% 100%;
    position: fixed;
}

#acount_name {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

#password {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.input {
    outline-style: none;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 18px 18px;
    width: 300px;
    font-size: 12px;
}

#child2 {
    float: right;
    height: 100%;
    display: flex;
    align-items: center;
    background-color: sandybrown;
}
</style>
