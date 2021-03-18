<template>
  <div>
    <!-- <a
      v-if="!this.$cookies.get('io')"
      class="profile-item"
      style="text-decoration: none"
      :href="`${redirectDev}`"
    >
      <div>
        {{ "LOGIN" }}
      </div>
    </a> -->
    <!--<a
      v-if="!this.$cookies.get('access_token')"
      class="profile-item"
      style="text-decoration: none;"
      :href="
        `${
          isDev ? authUrlDev : authUrlProduction
        }/drops/oauth2/code/get?client_id=${
          isDev ? clientIdDev : clientIdProduction
        }&response_type=code&state=${
          isDev
            ? `${frontendDev}${this.$router.history.current.path}`
            : `${frontendProduction}${this.$router.history.current.path}`
        }&redirect_uri=${isDev ? redirectDev : redirectProduction}`
      "
    >
      <div>
        login
      </div>
    </a>-->


      <VcANotificationCenter> VcA information box </VcANotificationCenter>

      <br />
    </div>
</template>

<!-- <script src="https://unpkg.com/vue"></script>
<script src="node_modules/heart-spinner/dist/heart-spinner.js"></script> -->
<script>
import VcANotificationCenter from "../components/VcANotificationCenter";
// import Spinner from "heart-spinner";

// import VcANotificationCenter from "vca-widget-notify-new";
import vueCookies from "vue-cookies";
// import app from "vca-widget-notify-new";

import Vue from "vue";
Vue.use(vueCookies);

// console.log(this.$cookies.get("access_token"));

export default {
  name: "home",
  components: {
    // VcANotificationWaves,
    VcANotificationCenter,
    // VcANotificationBox
  },
  data() {
    return {

    };
  },
  mounted() {

  },
};
</script>
