<template>
  <div id="app">
      <!--
    <a
      style="text-decoration: none;"

      :href="`${isDev?authUrlDev:authUrlProduction}/drops/oauth2/code/get?client_id=${isDev?clientIdDev:clientIdProduction}&response_type=code&state=${isDev?`${frontendDev}${this.$router.history.current.path}`:`${frontendProduction}${this.$router.history.current.path}`}&redirect_uri=${isDev?redirectDev:redirectProduction}`"

    >

      <li v-if="!this.$cookies.get('access_token')" class="profile-item">
        login
      </li>
    </a>
    -->

    <VcANotificationCenter>
      VcA information box
    </VcANotificationCenter>
  </div>
</template>

<script>
import VcANotificationBox from './components/VcANotificationBox.vue'
import VcANotificationCenter from './components/VcANotificationCenter'
import vueCookies from 'vue-cookies'

import Vue from 'vue'
import VcANotificationWaves from './components/VcANotificationWaves'
Vue.use(vueCookies)

export default {
  name: 'app',
  components: {
    VcANotificationWaves,
    VcANotificationCenter,
    VcANotificationBox
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

@import "https://fonts.googleapis.com/icon?family=Material+Icons";
</style>
