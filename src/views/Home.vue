<template>
<div id="home">
    <div id="bar">
        <img src="../assets/img/small_plane.png" width="28px" height="28px" />
        <font size="4" color="black" style="margin-left: 10px">AWM WORKSHOP</font>
    </div>
    <img src="../assets/img/new_plane.png" width="400px" height="400px" />
    <mybutton type="danger" fontSize="20px" width="200px" @click.native="toLogin('staff')">Staff</mybutton>
    <br />
    <br />
    <mybutton type="primary" fontSize="20px" width="200px" @click.native="toLogin('customer')">Customer</mybutton>
</div>
</template>

<script>
import mybutton from "../components/CustomButton";

export default {
    name: 'home',
    components: {
        mybutton,
    },
    methods: {
        onClickStaff() {
            this.$router.push("/login");
            this.$store.commit('isStaff', true);
        },
        onCLickCustomer() {
            this.$store.commit('isStaff', false);
        },
        toLogin(type) {
            this.$router.push({
                path: "/login",
                query: {
                    type
                }
            });

        }
    },
};
</script>

<style scoped>
#home {
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
    padding: 0%;
    margin: 0%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url("../assets/img/index_bg.png");
    background-size: 100% 100%;
    position: fixed;
}

#bar {
    text-align: center;
    color: #2c3e50;
    font-weight: bold;
    font-style: italic;
    align-items: right;
    filter: alpha(Opacity=100);
    -moz-opacity: 0.3;
    opacity: 0.5;
    z-index: 100;
    background-color: #ffffff;
    width: 100%;
    height: 38px;
    padding-left: 100px;
    padding-top: 5px;
    padding-bottom: 5px;
    display: flex;
    align-items: center;
    flex-direction: row;
}
</style>
