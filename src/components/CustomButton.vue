<!--

  * Description: A Customer button,

  * Author: Yao Shi",

  * Date: 2020/10/5",

!-->
<template>
<div id="CustomButton">
    <!--   button  !-->
    <button :class="['button','button-'+ type]" :style="{fontSize:fontSize,width:width,height:height}">
        <slot></slot>
    </button>
</div>
</template>

<script>
export default {
    name: "CustomButton",
    components: {},
    //button attributs for different sytles
    props: {
        type: String,
        fontSize: {
            type: String,
            default: "20px"
        },
        width: {
            type: String,
            default: "100px"
        },
        height: {
            type: String,
            default: "40px"
        }
    },
    data() {
        return {};
    },
    watch: {},
    computed: {

    },
    methods: {},
    created() {},
    mounted() {},
};
</script>

<style scoped>
.button {
    border: 1px solid #ccc;
    border-radius: 10px;
    color: white;
    font-weight: bold;
}

.button.button-default {
    background: #fff;
    color: black;
}

.button.button-primary {
    background: #409eff;
}

.button.button-success {
    background: #67c23a;
}

.button.button-infomation {
    background: #909399;
}

.button.button-warning {
    background: #e6c23a;
}

.button.button-danger {
    background: #f56c6c;
}
</style>
