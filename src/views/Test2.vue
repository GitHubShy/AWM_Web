<template>
<div class="wrapper">

    <h2>{{message}}</h2>

    <h2>{{getEmployeeTitle(type)}}</h2>

    <input type="file" ref="clearFile" @change="getFile($event)">

</div>
</template>

<script>
import {
    upload
} from "../network/Upload";
export default {
    components: {},
    props: {},
    data() {
        return {
            message: 'INFT6900 AWM SYSTEM',
            type: 0
        };
    },
    watch: {},
    computed: {},
    methods: {
        getEmployeeTitle(type) {
            if (type == 0) {
                return 'Super Administrator'
            } else {
                return 'Manager'
            }
        },
        getFile(event) {
            var file = event.target.files;
            for (var i = 0; i < file.length; i++) {
                var imgName = file[i].name;
                console.log(imgName, '----------------------')
                // var idx = imgName.lastIndexOf(".");
                // if (idx != -1) {
                //     var ext = imgName.substr(idx + 1).toUpperCase();
                //     ext = ext.toLowerCase();
                //     if (ext != 'pdf' && ext != 'doc' && ext != 'docx') {

                //     } else {
                //         this.addArr.push(file[i]);
                //     }
                // } else {

                // }
                upload(file[i])
            }
        }
    },
    created() {},
    mounted() {}
};
</script>

<style scoped>
</style>
