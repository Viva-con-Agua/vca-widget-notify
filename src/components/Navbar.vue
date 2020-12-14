<template>
  <el-menu background-color="#0a6b91" mode="horizontal">
    <el-menu-item padding:0 index="2-1">
      <a href="/">
        <img
          class="logo"
          src="https://pool2.vivaconagua.org/dispenser/images/drop_small.png"
        />
        <h3
          class="logo-text"
          style="float: left; margin-top: 0px; color: white; margin-left: 10px"
        ></h3>
      </a>
    </el-menu-item>
    <el-menu-item v-if="this.$cookies.get('access_token')" style="color: white">
      Logged In as: {{ this.$cookies.get("user_name") }}
    </el-menu-item>
    <el-menu-item
      v-if="this.$cookies.get('access_token')"
      style="padding: 0 10px 0px 10px; float: right"
    >
      <a href="/setup">
        <i class="material-icons" style="font-size: 30px; color: white">
          settings</i
        >
      </a>
    </el-menu-item>
    <el-menu-item
      v-if="this.$cookies.get('access_token')"
      style="padding: 0 10px 0px 10px; float: right"
    >
      <a href="/send">
        <i class="material-icons" style="font-size: 30px; color: white"> sms</i>
      </a>
    </el-menu-item>
    <el-menu-item
      v-if="this.$cookies.get('access_token')"
      style="padding: 0 10px 0px 10px; float: right"
    >
      <a href="/user">
        <i class="material-icons" style="font-size: 30px; color: white">
          person</i
        >
      </a>
    </el-menu-item>
  </el-menu>
</template>

<script>
import "../assets/materialize.min.css";
import vueCookies from "vue-cookies";

import Vue from "vue";

Vue.use(vueCookies);

export default {
  name: "Navbar",
  components: {},
};
</script>

<style>
.logo-text {
  display: none;
}

.logo {
  float: left;
  margin-top: 10px;
  margin-left: 10px;
  height: 35px;
}

.nav-container {
  margin-top: 1%;
}

@media only screen and (min-width: 768px) {
  .logo-text {
    display: block;
  }
  .logo {
    float: left;
    margin-top: 10px;
    margin-left: 10px;
    height: 35px;
  }
}
</style>
