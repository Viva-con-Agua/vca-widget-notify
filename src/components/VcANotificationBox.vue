<template>
  <div class="row" v-if="notifyStatus != '123deleted'">
    <div class="col s12 m12 transitionItem colEvent1">
      <div class="card grey white" v-bind:class="notifyStatus">
        <a class="" href="#" @click="changeStatusOfNotify(notifyId, 'deleted')">
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
          <div v-if="notifyMicroservice == 'WAVES'">
            <VcANotificationWaves
              :layoutParameter="notifyObject.layoutParameters"
              :type="notifyObject.type"
              :reason="notifyReason"
            ></VcANotificationWaves>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VcANotificationWaves from "./VcANotificationWaves";

export default {
  name: "VcANotificationBox",
  components: {
    VcANotificationWaves,
  },

  props: {
    notifyId: String,
    notifyDate: String,
    notifyIcon: String,
    notifyType: String,
    notifyObject: Object,
    notifyHeading: String,
    notifyActionLink: String,
    notifyStatus: String,
    notifyReason: String,
    notifyMicroservice: String,
  },

  mounted: function() {},

  methods: {
    changeStatusOfNotify: function(notifyId, status) {
      this.$parent.updateStatusofNotifies(notifyId, status);
    },
  },
};
</script>

<style scoped></style>
