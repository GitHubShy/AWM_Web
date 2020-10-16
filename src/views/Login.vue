<template>
<div class="login">
    <!-- <h2>Log in</h2>
    <div id="acount_name">
        <img src="../assets/img/user.png" width="30px" height="30px" />
        <input class="input" type="text" placeholder="Account Name" style="margin-left: 10px" v-model="account_name" />
    </div>
    <div id="password">
        <img src="../assets/img/password.png" width="30px" height="30px" />
        <input class="input" type="password" placeholder="password" style="margin-left: 10px" v-model="password" />
    </div>
    <mybutton type="primary " fontSize="20px" width="150px" style="margin-top: 20px" @click.native="LonIn">Log in</mybutton> -->
    <div class="logo">
        <img src="@a/img/small_plane.png" style="width:28px;height:28px;vertical-align: middle;" />
        <font size="4" color="black" style="margin-left: 10px;font-weight: bold;font-style: italic;">AWM WORKSHOP</font>
    </div>

    <div class="contaniner">
        <div class="header">
            <div class="name">Log in</div>
            <div class="sign cp" @click="dialogFormVisible = true" v-if="type === 'customer'">Sign up</div>
        </div>

        <!-- 登录 start -->
        <el-form label-width="80px" label-position="top">
            <el-form-item>
                <el-input placeholder="AccountName" v-model="account_name" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="password" placeholder="Passeword" v-model="password" clearable></el-input>
                <div class="fc cp" @click="forgotWord">Forgot your password?</div>
            </el-form-item>

            <el-form-item>
                <el-button style="width: 100%;" type="primary" @click="login">Log in</el-button>
            </el-form-item>
        </el-form>
        <!-- 登录 end -->

        <!-- 注册 start -->
        <el-dialog title="Sign up" :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                <div class="df">
                    <el-form-item class="flex1" label="AccountName" prop="account_name">
                        <el-input v-model="ruleForm.account_name" placeholder="Please input account name"></el-input>
                    </el-form-item>
                    <el-form-item class="flex1" label="Password" prop="password">
                        <el-input v-model="ruleForm.password" placeholder="Please input password"></el-input>
                    </el-form-item>
                </div>

                <div class="df">
                    <el-form-item class="flex1" label="Email" prop="email">
                        <el-input v-model="ruleForm.email" placeholder="Please input email"></el-input>
                    </el-form-item>
                    <el-form-item class="flex1" label="FirstName" prop="first_name">
                        <el-input v-model="ruleForm.first_name" placeholder="Please input first name"></el-input>
                    </el-form-item>
                </div>

                <div class="df">
                    <el-form-item class="flex1" label="Surname" prop="surname">
                        <el-input v-model="ruleForm.surname" placeholder="Please input surname"></el-input>
                    </el-form-item>
                    <el-form-item class="flex1" label="PortrsitUrl" prop="portrsit_url">
                        <el-input v-model="ruleForm.portrsit_url" placeholder="Please input portrsit url"></el-input>
                    </el-form-item>
                </div>

                <div class="df">
                    <el-form-item class="flex1" label="Phone" prop="phone">
                        <el-input v-model="ruleForm.phone" placeholder="Please input phone"></el-input>
                    </el-form-item>
                    <el-form-item class="flex1" label="CompanyName" prop="company_name">
                        <el-input v-model="ruleForm.company_name" placeholder="Please input company name"></el-input>
                    </el-form-item>
                </div>

                <el-form-item label-width="0" class="flex-jc mt20">
                    <el-button type="primary" @click="submitForm('ruleForm')">submit</el-button>
                    <el-button @click="resetForm('ruleForm')">reset</el-button>
                </el-form-item>

            </el-form>
        </el-dialog>
        <!-- 注册 end -->

        <!-- Forget password -->
        <el-dialog title="Forget Password" :visible.sync="forgetPasswordialogVisible">
            <el-form label-width="120px">
                <div class="df">
                    <el-form-item class="flex1" label="Account Name" prop="account_name">
                        <el-input v-model="forgetPasswordAcc" placeholder="Please input account name"></el-input>
                    </el-form-item>
                </div>

                <el-form-item label-width="0" class="flex-jc mt20">
                    <el-button type="primary" @click="resetPassword()">Reset Password</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>

    <div class="bottom-box">© 2020 AWM Inc. <a href="">Terms</a></div>
</div>
</template>

<script>
import mybutton from "../components/CustomButton";
import {
    request
} from "../network/request";
import {
    registerCustomer,
    customerLogin
} from "../network/Customer";
import {
    employeeLogin
} from "../network/Employee";
import {
    resetPassWord
} from "../network/Message"
export default {
    name: "Login",
    components: {
        // mybutton,
    },
    props: {},
    data() {
        return {
            type: '', //登陆类型
            account_name: "",
            password: "",

            dialogFormVisible: false,
            forgetPasswordialogVisible: false,

            forgetPasswordAcc: '',

            ruleForm: {
                account_name: '',
                password: '',
                email: '',
                first_name: '',
                surname: '',
                phone: '',
                company_name: ''
            },
            rules: {
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
                    },
                    {
                        type: 'email',
                        message: 'Please enter the correct email format'
                    }
                ],
                first_name: [{
                    required: true,
                    message: 'Please input first name'
                }, ],
                surname: [{
                    required: true,
                    message: 'Please input surname'
                }, ],
                phone: [{
                    required: true,
                    message: 'Please input phone'
                }, ],
                company_name: [{
                    required: true,
                    message: 'Please input company name'
                }, ],
            }
        };
    },
    watch: {},
        // beforeRouteUpdate(to, from, next) {
        //     this.$store.commit("login/logoutHandle");
        //     next();
        // },
    computed: {
        
    },
    methods: {
        async login() {
            let fun = this.type === 'staff' ? employeeLogin : customerLogin;
            let {
                account_name,
                password
            } = this;
            let parmas = {
                account_name,
                password
            }
            let res = await fun(parmas);
            console.log(res, '=====================');
            let {
                code,
                message
            } = res.data;
            if (code === 200) {
                this.$message({
                    message,
                    type: 'success',
                });
                this.$store.commit("login/loginSuccessHandle", {
                    token: res.data.data.token
                });
                let user = this.type === 'staff' ? '/staff' : res.data.data.customer;
                this.$store.commit("login/userSave", { user });

                let path = this.type === 'staff' ? '/staff' : '/customer_index';
                this.$router.push({
                    path
                });
            } else {
                this.$message({
                    message,
                    type: 'error',
                });
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let {
                        account_name,
                        password,
                        email,
                        first_name,
                        surname,
                        portrsit_url,
                        phone,
                        company_name
                    } = this.ruleForm;

                    let params = {
                        account_name,
                        password,
                        email,
                        first_name,
                        surname,
                        portrsit_url,
                        phone,
                        company_name
                    };
                    console.log(this.ruleForm);
                    registerCustomer(params).then(res => {
                        console.log(res, '----------------------');
                        let {
                            code,
                            data,
                            message
                        } = res.data;
                        if (code === 200) {
                            this.dialogFormVisible = false;
                            this.$message({
                                message,
                                type: 'success',
                            });
                        } else {
                            this.$message({
                                message,
                                type: 'error'
                            });
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        forgotWord() {
            this.forgetPasswordialogVisible = true;
        },

        resetPassword() {
            resetPassWord(this.forgetPasswordAcc, this.type === 'staff' ? 0 : 1).then(res => {
                console.log(res.data);
                let {
                    code,
                    data,
                    message
                } = res.data;
                if (code === 200) {
                    this.forgetPasswordialogVisible = false;
                    this.$message({
                        message,
                        type: 'success',
                    });
                } else {
                    this.$message({
                        message,
                        type: 'error'
                    });
                }
            }).catch(err => {

            })
        }

    },
    created() {
        this.$store.commit("login/logoutHandle");
        this.type = this.$route.query.type;
        this.$store.commit("login/typeSave", {
            type: this.type
        });
    },
    mounted() {},
};
</script>

<style scoped>
.login {
    height: 100vh;
    background-image: url("../assets/img/index_bg.png");
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.logo {
    position: fixed;
    top: 20px;
    left: 40px;
}

.contaniner {
    width: 500px;
    height: 300px;
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
    box-sizing: border-box;
    /* position: absolute;

left: 50%;

top: 45%;

transform: translate(-50%, -50%); */
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
}

.name {
    font-size: 20px;
    color: #5D6268;
}

.sign {
    font-size: 15px;
    color: #409EFF;
}

.bottom-box {
    width: 100%;
    position: absolute;
    bottom: 80px;
    text-align: center;
    color: #8e939c;
    font-family: RalewaySemiBold, Helvetica, sans-serif;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: .5px;
}

.bottom-box a {
    color: #8e939c;
}
</style><style scoped>
/* #login {
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
} */
</style>
