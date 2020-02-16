<template>
  <div class="row">
    <div class="col s12 m12 transitionItem colEvent1">
      <div
        class="card grey white"
        v-bind:class="{ seen: notifyStatus != 'new' }"
      >
        <a
          class=""
          href="#"
          @click.prevent="
            deleteNotification(notifyObject.type, notifyObject.typeId)
          "
        >
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
          <div v-if="notifyMicroservice == 'WAVES.Comment'">
            <VcANotificationCom
              :notifyObject="notifyObject"
            ></VcANotificationCom>
          </div>
          <div v-if="notifyMicroservice == 'WAVES.Application'">
            <VcANotificationApp
              :notifyObject="notifyObject"
            ></VcANotificationApp>
          </div>
          <div v-if="notifyMicroservice == 'WAVES.News'">
            <VcANotificationNews
              :notifyObject="notifyObject"
            ></VcANotificationNews>
          </div>
          <div v-if="notifyMicroservice == 'SUGGESTY'">
            <VcANotificationSuggesty
              :notifyObject="notifyObject"
            ></VcANotificationSuggesty>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VcANotificationWaves from "./VcANotificationWaves";
import VcANotificationCom from "./VcANotificationCom";
import VcANotificationNec from "./VcANotificationNec";
import VcANotificationApp from "./VcANotificationApp";
import VcANotificationNews from "./VcANotificationNews";
import VcANotificationSuggesty from "./VcANotificationSuggesty";
import { ajaxx } from "./externalJs";

export default {
  name: "VcANotificationBox",
  components: {
    VcANotificationWaves,
    VcANotificationNec,
    VcANotificationSuggesty,
    VcANotificationCom,
    VcANotificationApp,
    VcANotificationNews
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
    notifyMicroservice: String
  },

  mounted: function() {},

  methods: {
    deleteNotification: function(type, typeId) {
      ajaxx(
        "POST",
        "http://localhost:8005/v1/events/delete/" + type + "/" + typeId,
        {}
      ).then(function(events) {
        console.log(events);
      });
    }
  }
};
</script>

<style scoped></style>
