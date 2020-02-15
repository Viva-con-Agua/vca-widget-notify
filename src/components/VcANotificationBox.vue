<template>
  <div class="row">
    <div class="col s12 m12 transitionItem colEvent1">
      <div
        class="card grey white"
        v-bind:class="{ seen: notifyStatus != 'new' }"
      >
        <a class="" href="#">
          <i class="closeCard1 close material-icons right black-text">close</i>
        </a>
        <div class="card-content black-text">
          <div class="cardIcon">
            <i class="small material-icons">{{ notifyIcon }}</i>
          </div>
          <div class="cardTitle">
            <a
              ref="refNotifyHeading"
              onclick="return true;"
              :href="notifyActionLink"
              >{{ notifyHeading }}</a
            >
            <p>{{ notifyDate }}</p>
          </div>
        </div>
        <div class="card-action">
          <div v-if="notifyMicroservice == 'WAVES.Distance'">
            <VcANotificationWaves
              :notifyObject="notifyObject"
            ></VcANotificationWaves>
          </div>
          <div v-if="notifyMicroservice == 'WAVES.Necessity'">
            <VcANotificationNec
              :notifyObject="notifyObject"
            ></VcANotificationNec>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VcANotificationWaves from "./VcANotificationWaves";
import VcANotificationNec from "./VcANotificationNec";
export default {
  name: "VcANotificationBox",
  components: { VcANotificationWaves, VcANotificationNec },
  props: {
    notifyId: String,
    notifyDate: String,
    notifyIcon: String,
    notifyType: String,
    notifyObject: Object,
    notifyHeading: String,
    notifyActionLink: String,
    notifyStatus: String,
    notifyMicroservice: String
  },

  mounted: function() {},

  methods: {}
};
</script>

<style scoped></style>
