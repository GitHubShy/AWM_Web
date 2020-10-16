<template>
  <div class="wrapper">
    <h2>All Arircraft</h2>
    <vxe-button
      status="success"
      content="Flying"
      style="width: 150px"
    ></vxe-button>
    <vxe-button
      status="warning"
      content="Need Maintain"
      style="width: 150px"
    ></vxe-button>
    <vxe-button
      status="danger"
      content="Maintaining"
      style="width: 150px"
    ></vxe-button>
    <vxe-button
      status="info"
      content="Need Confirm"
      style="width: 150px"
    ></vxe-button>
    <br />
    <br />
    <vxe-table border resizable ref="xTable" height="500" :data="aircraft">
      <vxe-table-column field="aircraft_pic" title="Pic" width="120">
        <template v-slot="{ row }">
          <img
            v-if="row.aircraft_pic"
            :src="row.aircraft_pic"
            style="width: 100px"
          />
          <span v-else></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="type" title="Type" width="60"></vxe-table-column>
      <vxe-table-column
        field="registration"
        title="Registration"
      ></vxe-table-column>
      <vxe-table-column field="serial" title="Serial"></vxe-table-column>
      <vxe-table-column
        field="maintenance_cycle"
        title="Maintenance_cycle"
      ></vxe-table-column>
      <vxe-table-column
        field="last_modify_time"
        title="LastSerice"
      ></vxe-table-column>
      <vxe-table-column
        field="next_modify_time"
        title="nextService"
      ></vxe-table-column>
      <vxe-table-column field="status" title="Status">
        <template v-slot="{ row }">
          <vxe-button
            :status="setStatus(row)"
            :content="setStatusText(row)"
            size="mediam"
            style="width: 100px"
            @click="showDetails(row)"
          ></vxe-button>
        </template>
      </vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
import { getAircraft, getCustomerAircraft } from "@n/Workshop";
import { mapState, mapActions } from "vuex";
export default {
  components: {},
  props: {},
  data() {
    return {
      allAlign: null,
      aircraft: [],
    };
  },
  watch: {},
  computed: {
    ...mapState("login", ["type", "user"]),
  },
  methods: {
    setStatus(row) {
      if (row.status == 0) {
        return "success";
      } else if (row.status == 1) {
        return "warning";
      } else if (row.status == 2) {
        return "danger";
      } else {
        return "info";
      }
    },
    setStatusText(row) {
      if (row.status == 0) {
        return "Flying";
      } else if (row.status == 1) {
        return "Need";
      } else if (row.status == 2) {
        return "Maintain";
      } else {
        return "Confirm";
      }
    },
    showDetails(row) {
      console.log(1111111111111111);
      // this.$router.push({
      //   path: "/staff/workshop/aircraftdetails",
      //   query: {
      //     id: row.id,
      //   },
      // });
    },
    async getAircraftList() {
      let fun = this.type === "staff" ? getAircraft : getCustomerAircraft;
      // let fun = getAircraft;
      let res = await fun(this.user.id);
      // let res = await fun(0);
      console.log(res, "=====================");
      let { code, message, data } = res.data;
      if (code === 200) {
        this.aircraft = res.data.data;
      } else {
        this.$message({
          message,
          type: "error",
        });
      }
    },
  },
  created() {
    this.getAircraftList();
  },
  mounted() {},
};
</script>

<style scoped>
</style>
