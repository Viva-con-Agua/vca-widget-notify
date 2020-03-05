<template>
    <div class="row" v-if='notifyStatus != "123deleted"'>
        <div class="col s12 m12 transitionItem colEvent1">
            <div class="card grey white" v-bind:class=notifyStatus>
                <a class="" href="#" @click='changeStatusOfNotify(notifyObject.type, notifyObject.typeId, "deleted")'>
                    <i class="closeCard1 close material-icons right black-text">close</i>
                </a>
                <div class="card-content black-text">
                    <div class="cardIcon">
                        <i class="small material-icons">{{ notifyIcon }}</i>
                    </div>
                    <div class="cardTitle">
                        <a ref="refNotifyHeading"
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
import VcANotificationWaves from './VcANotificationWaves'
import VcANotificationCom from './VcANotificationCom'
import VcANotificationNec from './VcANotificationNec'
import VcANotificationApp from './VcANotificationApp'
import VcANotificationNews from './VcANotificationNews'
import VcANotificationSuggesty from './VcANotificationSuggesty'
import { ajaxx } from './externalJs'

export default {
  name: 'VcANotificationBox',
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

  mounted: function () {
  },

  methods: {
    changeStatusOfNotify: function (type, typeId, status) {
      var qry = []
      qry.push({ 'type': type, 'typeId': typeId, 'status': status })
      this.$parent.updateStatusofNotifies(qry)
      // console.log("changeStatusOf1notify");
      // console.log(this);
    }
  }
}
</script>

<style scoped></style>
