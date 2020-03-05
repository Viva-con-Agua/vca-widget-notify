<template>
    <div>
        <a
                style="text-decoration: none;"
                :href="`${isDev?authUrlDev:authUrlProduction}/drops/oauth2/code/get?client_id=${isDev?clientIdDev:clientIdProduction}&response_type=code&state=${isDev?`${frontendDev}`:`${frontendProduction}`}&redirect_uri=${isDev?redirectDev:redirectProduction}`"
        >

           <!--  v-if="!this.$cookies.get('access_token')" class="profile-item">-->
            <li class="profile-item"> login </li>
           <!--  -->
        </a>

            <!--
        :href="`https://stage.vivaconagua.org/drops/oauth2/code/get?client_id=notify&response_type=code&state=${'http://localhost:8080'}&redirect_uri=http://localhost:8005/v1/events/oauth`"
         -->

        <div v-if="this.$cookies.get('access_token')" style="width: 100% !important;">
            <div style="display: none !important">
                {{ $t("read.form.label.senderRoleName") }} i18 test
            </div>

            <a href="#" data-target="slide-out" class="sidenav-trigger" id="notificationCenter">
                <!--  <i class="material-icons" id="notificationIcon">{{getNotifyIcon()}}</i>-->

                <!--<i class="material-icons" v-if="allNotifies.length == 0"> notifications_none</i>
                <i class="material-icons" v-if="allNotifies.length > 0"> notifications</i>-->

                <i class="material-icons"> {{getNotifyIcon()}}</i>

                <small id="notificationBadge">{{ getNewMessageCounter() }}</small>
            </a>

            <div>
                <ul id="slide-out" class="sidenav" style="background-color:#ededed !important;">



                    <div class="row" id="stickyTabBottom">
                        <div class="col s12">
                            <ul class>

                                <li class="col s7">
                                    <div class="bottomEntry">
                                        <a href="#" class="sidenav-close" @click='changeStatusOfAllNotifies("seen")'>
                                            <i class="material-icons" href="#">done</i>
                                            Alle als gelesen markieren
                                        </a>
                                    </div>
                                </li>

                                <li class="col s5">
                                    <div class="bottomEntry">
                                        <a href="#" class="sidenav-close" @click='changeStatusOfAllNotifies("deleted")'>
                                            <i class="material-icons" href="#">delete</i>
                                            Alle löschen
                                        </a>
                                    </div>
                                </li>


                            </ul>
                        </div>
                    </div>

                    <div class="row" id="stickyTab">
                        <li>
                            <div class="user-view">
                                <h5
                                        style="text-align:center !important; padding-bottom: 0px !important; margin-bottom: 0px !important; margin-top:0px !important;"
                                >
                                    Benachrichtigungen
                                </h5>
                            </div>
                        </li>

                        <div class="col s12">
                            <ul class="tabs">
                                <li class="tab col s3">
                                    <a href="#tabAll">
                                        <i class="material-icons" href="#">view_column</i>
                                        Alle
                                    </a>
                                </li>

                                <li class="tab col s3">
                                    <a href="#tabAction">
                                        <i class="material-icons" href="#">public</i>
                                        Aktion
                                    </a>
                                </li>

                                <li class="tab col s3">
                                    <a href="#tabMessage">
                                        <i class="material-icons" href="#">chat</i>
                                        Nachricht
                                    </a>
                                </li>

                                <li class="tab col s3">
                                    <a href="#tabDate">
                                        <i class="material-icons" href="#">date_range</i>
                                        Termin
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div id="notificationContent">


                        <div id="tabAll" class="col s12">
                            <div class="noNotifies" v-if="this.allNotifies.length == 0">
                                <i class="medium material-icons">sentiment_satisfied</i><br>
                               <a> Alles erledigt für heute! <br>Keine Benachrichtigungen vorhanden!</a>
                            </div>


                            <VcANotificationBox
                                    v-for="notify in allNotifies"
                                    :notifyId="notify.notifyId"
                                    :notifyHeading="notify.notifyHeading"
                                    :notifyIcon="notify.notifyIcon"
                                    :notifyType="notify.notifyType"
                                    :notifyActionLink="notify.notifyActionLink"
                                    :notifyStatus="notify.notifyStatus"
                                    :notifyDate="notify.notifyDate"
                                    :notifyMicroservice="notify.notifyMicroservice"
                                    :notifyObject="notify.notifyObject"
                            ></VcANotificationBox>
                        </div>

                        <div id="tabAction" class="col s12">

                            <div class="noNotifies" v-if="this.actionNotifies.length == 0">
                                <i class="medium material-icons">sentiment_satisfied</i><br>
                                <a> Alles erledigt für heute! <br>Keine Benachrichtigungen vorhanden!</a>
                            </div>

                            <VcANotificationBox
                                    v-for="notify in actionNotifies"
                                    :notifyId="notify.notifyId"
                                    :notifyHeading="notify.notifyHeading"
                                    :notifyIcon="notify.notifyIcon"
                                    :notifyType="notify.notifyType"
                                    :notifyActionLink="notify.notifyActionLink"
                                    :notifyStatus="notify.notifyStatus"
                                    :notifyDate="notify.notifyDate"
                                    :notifyMicroservice="notify.notifyMicroservice"
                                    :notifyObject="notify.notifyObject"
                            ></VcANotificationBox>
                        </div>
                        <div id="tabMessage" class="col s12">

                            <div class="noNotifies" v-if="this.messageNotifies.length == 0">
                                <i class="medium material-icons">sentiment_satisfied</i><br>
                                <a> Alles erledigt für heute! <br>Keine Benachrichtigungen vorhanden!</a>
                            </div>

                            <VcANotificationBox
                                    v-for="notify in messageNotifies"
                                    :notifyId="notify.notifyId"
                                    :notifyHeading="notify.notifyHeading"
                                    :notifyIcon="notify.notifyIcon"
                                    :notifyType="notify.notifyType"
                                    :notifyActionLink="notify.notifyActionLink"
                                    :notifyStatus="notify.notifyStatus"
                                    :notifyDate="notify.notifyDate"
                                    :notifyMicroservice="notify.notifyMicroservice"
                                    :notifyObject="notify.notifyObject"
                            ></VcANotificationBox>
                        </div>
                        <div id="tabDate" class="col s12">

                            <div class="noNotifies" v-if="this.dateNotifies.length == 0">
                                <i class="medium material-icons">sentiment_satisfied</i><br>
                                <a> Alles erledigt für heute! <br>Keine Benachrichtigungen vorhanden!</a>
                            </div>

                            <VcANotificationBox
                                    v-for="notify in dateNotifies"
                                    :notifyId="notify.notifyId"
                                    :notifyHeading="notify.notifyHeading"
                                    :notifyIcon="notify.notifyIcon"
                                    :notifyType="notify.notifyType"
                                    :notifyActionLink="notify.notifyActionLink"
                                    :notifyStatus="notify.notifyStatus"
                                    :notifyDate="notify.notifyDate"
                                    :notifyMicroservice="notify.notifyMicroservice"
                                    :notifyObject="notify.notifyObject"
                            ></VcANotificationBox>
                        </div>
                    </div>

                    <div style="height:80px !important;"></div>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import M from 'materialize-css'
import '../assets/materialize.min.css'
import '../assets/app2.css'
import VcANotificationBox from './VcANotificationBox'
import { ajaxx } from './externalJs'

export default {
  name: 'VcANotificationCenter',
  components: { VcANotificationBox },
  props: {
    vcaId: String,
    vcaId2: String,
    vcaType: String,
    isEmbedded: Boolean
  },
  data () {
    return {
      isDev: process.env.VUE_APP_ENV === 'dev',
      authUrlDev: process.env.VUE_APP_OAUTH_DEV,
      authUrlProduction: process.env.VUE_APP_OAUTH_PRODUCTION,
      serverUrlDev: process.env.VUE_APP_SERVER_DEV,
      serverUrlProduction: process.env.VUE_APP_SERVER_PRODUCTION,
      clientIdDev: process.env.VUE_APP_CLIENT_ID_DEV,
      clientIdProduction: process.env.VUE_APP_CLIENT_ID_PRODUCTION,
      redirectDev: process.env.VUE_APP_REDIRECT_DEV,
      redirectProduction: process.env.VUE_APP_REDIRECT_PRODUCTION,
      frontendDev: process.env.VUE_APP_FRONTEND_DEV,
      frontendProduction: process.env.VUE_APP_FRONTEND_PRODUCTION,

      allNotifies: [],
      actionNotifies: [],
      messageNotifies: [],
      dateNotifies: [],

      openedNotificationCenterCounter: 0

    }
  },
  mounted: function () {


    var elems = document.querySelectorAll('.sidenav')
    var instances = M.Sidenav.init(elems, {
      edge: 'right'
    })

    var elements = document.getElementsByClassName("sidenav-close");
    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener('click', this.markAllNotificationsAsRead, false);
    }

    var elements2 = document.getElementsByClassName("sidenav-overlay");
    for (var i = 0; i < elements2.length; i++) {
      elements2[i].addEventListener('click', this.markAllNotificationsAsRead, false);
    }

    document.addEventListener('click', function (e) {
      if (e.target.className.indexOf('closeCard') != -1) {
        var classNamesArray = e.target.className.split(' ')
        var eventId = classNamesArray[0].replace('closeCard', '')
      }
    })

    window.onload = function () {
      var elem = document.querySelector('.tabs')
      var options = {}
      var instance = M.Tabs.init(elem, options)
    }

    const dotenv = require('dotenv');
    dotenv.config();

    // console.log(this.$i18n.t);
    var auth
    if (this.$cookies.get('access_token')) {
      auth = 'Bearer ' + this.$cookies.get('access_token')
    } else {
      auth = {}
    }

    // console.log(this.$cookies.get('access_token'));
    ajaxx('GET', (this.isDev?this.serverUrlDev:this.serverUrlProduction) + '/v1/events/notify', {}, auth).then(
   // ajaxx('GET', 'http://localhost:8005/v1/events/notify', {}, auth).then(
      function (events) {
        console.log(events)
        for (var i = 0; i < events.length; i++) {
          // var notifyType = "ACTION";
          var notiObj = events[i].notifyParameters

          var newNotify = {
            notifyId: 'placeholder',
            notifyDate: events[i].notifyCreatedAt,
            notifyObject: notiObj,
            notifyIcon: 'public',
            // notifyType: "ACTION",
            notifyType: events[i].notifyType,
            notifyHeading: '',
            notifyActionLink: events[i].notifyActionLink,
            notifyStatus: events[i].notifyStatus,
            notifyMicroservice: events[i].notifyMicroservice
          }

          this.allNotifies.push(newNotify)

          var newNotifyType = newNotify.notifyType.toUpperCase()
          // console.log(newNotify);

          if (newNotifyType == 'ACTION') {
            this.actionNotifies.push(newNotify)
          }

          if (newNotifyType == 'MESSAGE') {
            this.messageNotifies.push(newNotify)
          }

          if (newNotifyType == 'DATE') {
            this.dateNotifies.push(newNotify)
          }
        }
      }.bind(this)
    )
  },

  methods: {
    getNewMessageCounter: function () {
      var newMessageCounter = 0
      for (var x = 0; x < this.allNotifies.length; x++) {
        if (this.allNotifies[x].notifyStatus == 'new') {
          newMessageCounter++
        }
      }
      return newMessageCounter
    },
    markAllNotificationsAsRead: function () {
      this.changeStatusOfAllNotifies("seen");

      /*
      if(this.openedNotificationCenterCounter>0){
        this.changeStatusOfAllNotifies("seen")
      }
      this.openedNotificationCenterCounter++;
      */
    },
    getNotifyIcon: function () {
      for(var i = 0; i < this.allNotifies.length; i++){
        if(this.allNotifies[i].notifyStatus != 'deleted'){
          return  'notifications';
        }
      }

      return 'notifications_none';
    },
    existsUndeletedNotify: function (array) {
      for(var i = 0; i < array.length; i++){
        if(this.allNotifies[i].notifyStatus != 'deleted'){
          return true;
        }
      }

      return false;
    },
    getIconName: function (category) {
      var categoryLowerCase = category.toLowerCase()
      if (categoryLowerCase == 'action') {
        return 'public'
      } else if (categoryLowerCase == 'date') {
        return 'date_range'
      } else if (categoryLowerCase == 'message') {
        return 'chat'
      } else {
        return 'face'
      }
    },
    refreshStatusOfEntry: function (notifyEntry) {
      var notifyType = notifyEntry.type;
      var typeId = notifyEntry.typeId;
      var notifyStatus = notifyEntry.status;

      console.log("neuer Status: " +notifyType+ " " + typeId+ " " + notifyEntry.status);

      console.log(this.allNotifies.length)

      // ALL NOTIFIES
      for (var x = 0; x < this.allNotifies.length; x++) {
        if (this.allNotifies[x].notifyObject.type == notifyType &&
            this.allNotifies[x].notifyObject.typeId == typeId) {

          if(notifyStatus != 'deleted') {
            this.allNotifies[x].notifyStatus = notifyStatus
          } else {
            this.allNotifies.splice(x, 1);
            break;
          }
        }
      }

      // ACTION NOTIFIES
      for (var x = 0; x < this.actionNotifies.length; x++) {
        if (this.actionNotifies[x].notifyObject.type == notifyType &&
          this.actionNotifies[x].notifyObject.typeId == typeId) {

          if(notifyStatus != 'deleted') {
            this.actionNotifies[x].notifyStatus = notifyStatus
          } else {
            this.actionNotifies.splice(x, 1);
            break;
          }
        }
      }

      // DATE NOTIFIES
      for (var x = 0; x < this.dateNotifies.length; x++) {
        if (this.dateNotifies[x].notifyObject.type == notifyType &&
          this.dateNotifies[x].notifyObject.typeId == typeId) {

          if(notifyStatus != 'deleted') {
            this.dateNotifies[x].notifyStatus = notifyStatus
          } else {
            this.dateNotifies.splice(x, 1);
            break;
          }
        }
      }

      // MESSAGE NOTIFIES
      for (var x = 0; x < this.messageNotifies.length; x++) {
        if (this.messageNotifies[x].notifyObject.type == notifyType &&
          this.messageNotifies[x].notifyObject.typeId == typeId) {

          if(notifyStatus != 'deleted') {
            this.messageNotifies[x].notifyStatus = notifyStatus
          } else {
            this.messageNotifies.splice(x, 1);
            break;
          }
        }
      }
        /**
      // ACTION NOTIFIES
      for (var x = 0; x < this.actionNotifies.length; x++) {
        if (this.actionNotifies[x].notifyObject.type == notifyType &&
          this.actionNotifies[x].notifyObject.typeId == typeId &&
          this.actionNotifies[x].notifyStatus != 'deleted') {
          this.actionNotifies[x].notifyStatus = notifyStatus
        }
      }

      // DATE NOTIFIES
      for (var x = 0; x < this.dateNotifies.length; x++) {
        if (this.dateNotifies[x].notifyObject.type == notifyType &&
          this.dateNotifies[x].notifyObject.typeId == typeId &&
          this.dateNotifies[x].notifyStatus != 'deleted') {
          this.dateNotifies[x].notifyStatus = notifyStatus
        }
      }

      // MESSAGE NOTIFIES
      for (var x = 0; x < this.messageNotifies.length; x++) {
        if (this.messageNotifies[x].notifyObject.type == notifyType &&
          this.messageNotifies[x].notifyObject.typeId == typeId &&
          this.messageNotifies[x].notifyStatus != 'deleted') {
          this.messageNotifies[x].notifyStatus = notifyStatus
        }
      }
         */
    },
    updateStatusofNotifies: function (qry) {

     // ajaxx('DELETE', 'http://localhost:8005/v1/events/', qry).then(function (events) {
      ajaxx('DELETE', (this.isDev?this.serverUrlDev:this.serverUrlProduction) + '/v1/events/', qry).then(function (events) {
        if (events) {
          if (events.success) {
            for (var x = 0; x < qry.length; x++) {
              this.refreshStatusOfEntry(qry[x])
            }
          }
        }
      }.bind(this))
    },

    changeStatusOfAllNotifies: function (newStatus) {
      var qry = []
      for (var x = 0; x < this.allNotifies.length; x++) {
        qry.push({
          'type': this.allNotifies[x].notifyObject.type,
          'typeId': this.allNotifies[x].notifyObject.typeId,
          'status': newStatus
        })
      }
      console.log(qry.length)
      this.updateStatusofNotifies(qry)
    }
  }
}

function ready (fn) {
  var d = document
  d.readyState == 'loading' ? d.addEventListener('DOMContentLoaded', fn) : fn()
}

ready(function () {


  var myFunction = function() {
    alert("hello");
  };






})

function addBadge () {
  console.log("hi")
}



</script>

<style></style>
