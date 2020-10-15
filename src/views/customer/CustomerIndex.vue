<template>
  <div class="customer-index">

    <div class="left">
      <div class="l-herder">
        <div class="df con"> 
          <img class="head" src="https://res.cloudinary.com/mhmd/image/upload/v1556074849/avatar-1_tcnd60.png" alt="">
          <div>
            <div class="fs20 fw700">kkkk</div>
            <div class="fs18 font-c">uuuuu</div>
          </div>
        </div>
      </div>

      <p class="main-f fw700">MAIN</p>

      <div class="tabs">
        <div class="tab-item" 
             v-for="(item,index) in tabs" 
             :key="index" 
             @click="changeTab(index)"
             :class="{'active' : currentIndex == index}">
          <i class="iconfont tab-icon fw700" :class="[{'active' : currentIndex == index},  item.icon]"></i>
          {{item.name}}
        </div>
      </div>

    </div>

    <div>
      <div v-show="currentIndex === 0">aa</div>
      <div v-show="currentIndex === 1">bb</div>
      <div v-show="currentIndex === 2">cc</div>
      <div v-show="currentIndex === 3">dd</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomerIndex",
  components: {},
  props: {},
  data() {
    return {
      tabs: [
        {
          name: "aa",
          icon: "awmcollect",
        },
        {
          name: "bb",
          icon: "awmcard",
        },
        {
          name: "cc",
          icon: "awmcard",
        },
        {
          name: "dd",
          icon: "awmHomehomepagemenu",
        },
      ],
      currentIndex: 0
    };
  },
  methods: {
    changeTab(index) {
      this.currentIndex = index;
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
  width: 272px;
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
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
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
</style>
