<template>
<div class="customer-index">

    <div class="left">
        <div class="l-herder">
            <div class="df con">
                <img class="head" src="https://res.cloudinary.com/mhmd/image/upload/v1556074849/avatar-1_tcnd60.png" alt="">
                <div>
                    <div class="fs20 fw700">{{user.account_name}}</div>
                    <div class="fs18 font-c">{{user.company_name}}</div>
                </div>
            </div>
        </div>

        <p class="main-f fw700">MAIN</p>

        <div class="tabs">
            <div class="tab-item" v-for="(item,index) in tabs" :key="index" @click="changeTab(index)" :class="{'active' : currentIndex === index}">
                <i class="iconfont tab-icon fw700" :class="[{'active' : currentIndex === index},  item.icon]"></i>
                {{item.name}}
            </div>
        </div>

        <div class="btn">
            <vxe-button status="danger" fontSize="20px" content="LogOut" style="width:100px" @click="onLogOut"></vxe-button>

        </div>

    </div>

    <div class="right">
        <div v-show="currentIndex === 0">
            <MyAircraft />
        </div>
        <div v-show="currentIndex === 1">
            <MyReceipt />
        </div>
        <div v-show="currentIndex === 2">cc</div>
        <div v-show="currentIndex === 3">dd</div>
    </div>

</div>
</template>

<script>
import MyAircraft from "@c/MyAircraft";
import mybutton from "@c/CustomButton";
import MyReceipt from "@c/MyReceipt";
import {
    mapState,
    mapActions
} from "vuex";
export default {
    name: "CustomerIndex",
    components: {
        MyAircraft,
        MyReceipt
    },
    props: {},
    data() {
        return {
            tabs: [{
                    name: "My Aircraft",
                    icon: "awmcollect",
                },
                {
                    name: "MyReceipt",
                    icon: "awmcard",
                },
                // {
                //     name: "cc",
                //     icon: "awmcard",
                // },
                // {
                //     name: "dd",
                //     icon: "awmHomehomepagemenu",
                // },
            ],
            currentIndex: 0
        };
    },
    computed: {
        ...mapState("login", ["user"]),
    },
    methods: {
        changeTab(index) {
            this.currentIndex = index;
        },
        onLogOut() {
            this.$store.commit("login/logoutHandle");
            this.$router.replace("/");
        }
    },
    created() {},
    mounted() {},
};
</script>

<style scoped>
.customer-index {
    display: flex;
}

.left {
    min-width: 272px;
}

.l-herder {
    background-color: #f8f9fa;
    padding: 24px 16px;
}

.con {
    display: flex;
    align-items: center;
}

.head {
    width: 55px;
    height: 55px;
    padding: 5px;
    background-color: #fff;
    border: 1px solid #dee2e6;
    border-radius: 5px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 15px;
}

.font-c {
    color: #6c757d;
}

.main-f {
    color: #aaa;
    padding: 24px 0 24px 16px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

.tabs {
    padding-left: 16px;
}

.tab-item {
    height: 40px;
    line-height: 40px;
    font-size: 22px;
    font-style: italic;
    color: #939699;
    cursor: pointer;
}

.tab-item.active {
    background-color: #f8f9fa;
    color: #3B3E41;
}

.tab-icon {
    font-size: 20px;
    margin-right: 18px;
    color: #6c757d;
}

.tab-icon.active {
    color: #007bff;
}

.right {
    width: calc(100vw - 272px);
    min-width: 800px;
    margin: 0 50px;
}

.btn {
    padding: 20px 0 0 16px;
    /* display: flex;
  justify-content: center; */
}

body {
    -webkit-font-smoothing: antialiased;
}
</style>
