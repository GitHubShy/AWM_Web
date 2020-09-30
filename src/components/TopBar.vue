<template>
<div id="TopBar">

    <div id="LeftDiv">
        <img src="../assets/img/small_plane.png" width="28px" height="28px" />
        <font size="4" color="black" style="margin-left: 10px">AWM WORKSHOP</font>
    </div>
    <div id="RightDiv">
        <mybutton type="danger" fontSize="20px" width="100px" @click.native="onLogOut">Log out</mybutton>
        <router-link :to="rightFirstLink" tag="font" size="4" color="black" style="margin-right: 20px;cursor: pointer">{{rightFirstText}}</router-link>
        <router-link :to="rightSecondLink" tag="font" size="4" color="black" style="margin-right: 20px;cursor: pointer">{{rightSecondText}}</router-link>
        <router-link :to="rightThirdLink" tag="font" size="4" color="black" style="margin-right: 20px;cursor: pointer">{{rightThirdText}}</router-link>
    </div>

</div>
</template>

<script>
import mybutton from "../components/CustomButton";

export default {
    name: 'TopBar',
    components: {
        mybutton
    },
    props: {
        rightFirstText: null,
        rightFirstLink: null,
        rightSecondText: null,
        rightSecondLink: null,
        rightThirdText: null,
        rightThirdLink: null
    },
    data() {
        return {};
    },
    watch: {},
    computed: {
        ifShowThirdText() {
            return this.rightThirdText == null
        }
    },
    methods: {
        onLogOut() {
            localStorage.removeItem('token')
            this.$router.replace("/");
        }
    },
    created() {},
    mounted() {},
};
</script>

<style scoped>
#TopBar {
    text-align: center;
    color: #2c3e50;
    font-weight: bold;
    font-style: italic;
    background-color: white;
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    flex-direction: row;
}

#LogOut {
    position: absolute;
    right: 10px;
}

#LeftDiv {
    height: 100%;
    width: 40%;
    display: flex;
    align-items: center;
    flex-direction: row;
    padding-left: 30px;
}

#RightDiv {
    height: 100%;
    width: 60%;
    display: flex;
    align-items: center;
    padding-right: 30px;
    flex-direction: row-reverse;
}

.router-link-active {
    color: #fd4733;
}
</style>
