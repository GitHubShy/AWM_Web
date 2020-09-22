<template>
<div id="app">
    <div id="topbar">

    </div>
    <h2 id="name">George Bush</h2>
    <img id="portrait" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2813630019,3804632314&fm=11&gp=0.jpg" alt="aaa">
    <img id="email" src="../../assets/img/em.png">
    <button id="update">Update My Profile</button>
</div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {};
    },
    watch: {},
    computed: {},
    methods: {},
    created() {},
    mounted() {}
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
    width: 320px;
    height: 320px;
    position: absolute;
    top: 150px;
    border-radius: 50%
}

#name {
    font-family: cursive;
    position: absolute;
    top: 60px;
    color: white
}

#update {
    font-family: "Gill Sans", sans-serif;
    border: 1px solid #FD4733;
    width: 180px;
    height: 40px;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscaimg/le;
    position: absolute;
    color: white;
    border-radius: 20px;
    background: #FD4733;
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
