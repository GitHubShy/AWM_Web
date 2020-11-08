<!--

  * Description: Base view/sidebar view for workshop page buttons.

  * Author: Yao Shi",

  * Date: 2020/10/2",

!-->
<template>
<div class="workshop">
    <!-- Vertical navbar -->
    <div class="vertical-nav" id="sidebar">
        <!-- image -->
        <img :src="getPortrait" alt="..." width="65" class="mr-3 rounded-circle img-thumbnail shadow-sm">
        <!-- full name -->
        <h4 class="m-0">{{getFullName}}</h4>
        <p class="font-weight-light text-muted mb-0">{{getTitle}}</p>
        <!-- aircraftlist page -->
        <router-link to="/staff/workshop/aircraftlist" tag="font" size="4" color="black" style="margin-top: 15px;cursor: pointer">Aircraft Management</router-link>
        <!-- joblist page -->
        <router-link to='/staff/workshop/joblist' tag="font" size="4" color="black" style="margin-top: 15px;cursor: pointer">Job Management</router-link>
        <!-- customerlist page -->
        <router-link to="/staff/workshop/customerlist" tag="font" size="4" color="black" style="margin-top: 15px;cursor: pointer">Customer Management</router-link>
        <!-- myTasksList page -->
        <router-link to="/staff/workshop/myTasksList" tag="font" size="4" color="black" style="margin-top: 15px;cursor: pointer">My Tasks</router-link>
    </div>
    <router-view class="router_view"></router-view>
</div>
</template>

<script>
import {
    getSpecificEmployee,
    clock,
    getAttendance
} from "../../network/Employee";
export default {
    components: {},
    props: {},
    data() {
        return {
            formData: [],
            //Staff data
            staff: {
                id: null,
                first_name: null,
                surname: null,
                title: null,
                email: null,
                phone: null,
                payment_rate: null,
                birth_year: null,
                tax_file_number: null,
                portrait_url: 'https://res.cloudinary.com/mhmd/image/upload/v1556074849/avatar-1_tcnd60.png'
            },
        };
    },
    watch: {},
    computed: {
        //get full name
        getFullName() {
            return this.staff.first_name + ' ' + this.staff.surname
        },
        //get title
        getTitle() {
            if (this.staff.title == 99) {
                return 'Super Administrator';
            } else if (this.staff.title == 1) {
                return 'Manager';
            } else {
                return 'Engineer';

            }
        },
        //get image
        getPortrait() {
            if (this.staff.portrait_url == null) {
                return 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601960184628&di=01658bf6cba790308114151a8dfc9bdb&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F9662a766b2e14418b22ed6e8185913c3e7562ab455df-j8mU0R_fw658';
            } else {
                return this.staff.portrait_url;

            }
        }
    },
    methods: {
        onClick() {

        }
    },
    created() {
        //get employee
        getSpecificEmployee('').then(res => {
            this.staff = res.data.data
        })

    },
    mounted() {}
};
</script>

<style scoped>
.workshop {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    background-color: white;
    min-height: 100vh;
    overflow-x: hidden;
}

.vertical-nav {
    min-width: 17rem;
    width: 17rem;
    height: 100vh;
    padding-top: 25px;
    background: rgb(245, 240, 222);
    background: -webkit-linear-gradient(to top, rgb(194, 232, 255), white);
    background: linear-gradient(to top, rgb(194, 232, 255), white);
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 6px 3px 10px rgba(0, 0, 0, 0.3);
    transition: all 0.4s;
}

.router_view {
    width: 100%;
    height: 100vh;
    margin-left: 50px;
}

.router-link-active {
    color: #fd4733;
}
</style>
