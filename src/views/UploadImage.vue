<template>
<div id="home">
    <img :src="url" width="400" height="400" style="margin-top:50px" alt="">
    <input type="file" ref="clearFile" @change="getFile($event)" style="margin-top:50px">
    <br>
    <vxe-button status="success" content="Save" style="width:150px" @click="saveImg()"></vxe-button>
</div>
</template>

<script>
import {
    upload
} from "../network/Upload";
import {
    updatePortrait
} from "../network/Employee";
export default {
    components: {},
    props: {},
    data() {
        return {
            url: null
        };
    },
    watch: {},
    computed: {},
    methods: {
        getFile(event) {
            var file = event.target.files;
            for (var i = 0; i < file.length; i++) {
                let imgName = file[i].name;
                let size = file[i].size / 1024 / 1024;
                let idx = imgName.lastIndexOf(".");
                console.log(imgName, '----------------------')
                console.log(idx, '----------------------')
                console.log(size, '----------------------')

                if (size > 2) { //if size > 2mb
                    this.$XModal.message({
                        message: 'The size of this file > 2mb',
                        status: 'error'
                    })
                } else {
                    if (idx != -1) {
                        var ext = imgName.substr(idx + 1).toUpperCase();
                        ext = ext.toLowerCase();
                        if (ext != 'jpg' && ext != 'png') {
                            this.$XModal.message({
                                message: 'This is not a img file(.jpg/.png)',
                                status: 'error'
                            })
                        } else {
                            upload(file[i]).then(res => {
                                if (res.status == 200) {
                                    this.url = res.data.data.message;
                                }
                            })
                        }
                    } else {
                        this.$XModal.message({
                            message: 'Unkown file',
                            status: 'error'
                        })
                    }

                }

            }
        },
        saveImg() {
            updatePortrait(this.url).then(res => {
                if (res.status == 200) {
                    this.$XModal.message({
                        message: 'Success！',
                        status: 'success'
                    })
                } else {
                    this.$XModal.message({
                        message: 'error' + res.data.message,
                        status: 'error'
                    })
                }
            })
        }
    },
    created() {
        this.url = this.$route.query.url
    },
    mounted() {}
};
</script>

<style scoped>
#home {
    text-align: center;
    width: 100%;
    height: 100%;
    padding: 0%;
    margin: 0%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-size: 100% 100%;
    position: fixed;
}
</style>
