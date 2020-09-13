<template>
  <div>
    <!--<p>{{ authUrlDev }}</p>-->
    <a
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
    </a>

    <div v-else style="padding:50px 0px 0px 0px;">
      <!--<div>Access-Token: {{ this.$cookies.get("access_token") }}</div>-->

      <VcANotificationCenter>
        VcA information box
      </VcANotificationCenter>

      <br />
    </div>
  </div>
</template>

<script>
import VcANotificationCenter from "../components/VcANotificationCenter";
import vueCookies from "vue-cookies";

import Vue from "vue";

Vue.use(vueCookies);

export default {
  name: "app",
  components: {
    // VcANotificationWaves,
    VcANotificationCenter,
    // VcANotificationBox
  },
  data() {
    return {
      isDev: process.env.VUE_APP_ENV === "dev",
      authUrlDev: process.env.VUE_APP_OAUTH_DEV,
      authUrlProduction: process.env.VUE_APP_OAUTH_PRODUCTION,
      clientIdDev: process.env.VUE_APP_CLIENT_ID_DEV,
      clientIdProduction: process.env.VUE_APP_CLIENT_ID_PRODUCTION,
      redirectDev: process.env.VUE_APP_REDIRECT_DEV,
      redirectProduction: process.env.VUE_APP_REDIRECT_PRODUCTION,
      frontendDev: process.env.VUE_APP_FRONTEND_DEV,
      frontendProduction: process.env.VUE_APP_FRONTEND_PRODUCTION,
    };
  },
  mounted() {
    console.log(process.env.VUE_APP_ENV);
  },
};
</script>
