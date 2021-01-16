<template>
    <div>
        <div style="margin-bottom:50px !important;">
            <a
                    style="text-decoration: none;"
                    :href="`${isDev?authUrlDev:authUrlProduction}/drops/oauth2/code/get?client_id=${isDev?clientIdDev:clientIdProduction}&response_type=code&state=${isDev?`${frontendDev}`:`${frontendProduction}`}&redirect_uri=${isDev?redirectDev:redirectProduction}`"
            >

                <!--  v-if="!this.$cookies.get('access_token')" class="profile-item">-->
                <li class="profile-item"> login </li>
                <!--  -->
            </a>
        </div>



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

                <small v-if="getNewMessageCounter()>0"  id="notificationBadge">{{ getNewMessageCounter() }}</small>


            </a>

            <div>
                <ul id="slide-out" class="sidenav">

                    <div class="row" id="stickyTabBottom">

                        <div class="col s12">
                            <ul class>

                                <li class="col s6">
                                    <div class="bottomEntry" id="readAll">
                                        <a v-if="this.getNewMessageCounter()>0"  href="#" class="sidenav-close" @click='changeStatusOfAllNotifies("seen")'>
                                            Alle als gelesen markieren
                                        </a>
                                        <a v-else href="#" class="sidenav-close-no-action disabled">
                                            Alle als gelesen markieren
                                        </a>
                                    </div>
                                </li>

                                <li class="col s3">
                                    <div class="bottomEntry" id="deleteAll">

                                        <a v-if="allNotifies.length != 0"  href="#" class="sidenav-close" @click='changeStatusOfAllNotifies("deleted")'>
                                            Alle löschen
                                        </a>
                                        <a v-else href="#" class="sidenav-close-no-action disabled">
                                            Alle löschen
                                        </a>

                                    </div>
                                </li>

                                <li class="col s3">
                                    <div class="bottomEntry" id="configNotification">
                                        <a href="#" class="sidenav-close" @click='changeStatusOfAllNotifies("deleted")'>
                                            Konfigurieren
                                        </a>
                                    </div>
                                </li>


                            </ul>
                        </div>



                        <div class="col s12" style="display:none !important;">
                            <ul class>

                                <li class="col s7">
                                    <div class="bottomEntry">
                                        <a href="#" class="sidenav-close read" @click='changeStatusOfAllNotifies("seen")'>
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
                                <h5>
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

                                <li class="tab col s3" :class="{ 'disabled' : this.actionNotifies.length == 0}">
                                    <a href="#tabAction">
                                        <i class="material-icons" href="#">public</i>
                                        Aktion
                                    </a>
                                </li>

                                <li class="tab col s3" :class="{ 'disabled' : this.messageNotifies.length == 0}">
                                    <a href="#tabMessage">
                                        <i class="material-icons" href="#">chat</i>
                                        Nachricht
                                    </a>
                                </li>

                                <li class="tab col s3" :class="{ 'disabled' : this.dateNotifies.length == 0}">
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
                                <i class="medium material-icons">sentiment_satisfied</i>
                               <a> Alles erledigt für heute! <br>Keine Benachrichtigungen vorhanden!</a>
                            </div>


                            <VcANotificationBox
                                    v-for="notify in allNotifies"
                                    :notifyId="notify.notifyId"
                                    :notifyHeading="notify.notifyHeading"
                                    :notifyIcon="notify.notifyIcon"
                                    :notifyType="notify.notifyType"
                                    :notifyPrimaryActionLink="notify.notifyPrimaryActionLink"
                                    :notifyStatus="notify.notifyStatus"
                                    :notifyDate="notify.notifyDate"
                                    :notifyMicroservice="notify.notifyMicroservice"
                                    :notifyObject="notify.notifyObject"
                                    :notifyActions="notify.notifyActions"
                                    :notifyTab="'tab-all'"
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
                                    :notifyPrimaryActionLink="notify.notifyPrimaryActionLink"
                                    :notifyStatus="notify.notifyStatus"
                                    :notifyDate="notify.notifyDate"
                                    :notifyMicroservice="notify.notifyMicroservice"
                                    :notifyObject="notify.notifyObject"
                                    :notifyActions="notify.notifyActions"
                                    :notifyTab="'tab-action'"
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
                                    :notifyPrimaryActionLink="notify.notifyPrimaryActionLink"
                                    :notifyStatus="notify.notifyStatus"
                                    :notifyDate="notify.notifyDate"
                                    :notifyMicroservice="notify.notifyMicroservice"
                                    :notifyObject="notify.notifyObject"
                                    :notifyActions="notify.notifyActions"
                                    :notifyTab="'tab-message'"
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
                                    :notifyPrimaryActionLink="notify.notifyPrimaryActionLink"
                                    :notifyStatus="notify.notifyStatus"
                                    :notifyDate="notify.notifyDate"
                                    :notifyMicroservice="notify.notifyMicroservice"
                                    :notifyObject="notify.notifyObject"
                                    :notifyActions="notify.notifyActions"
                                    :notifyTab="'tab-date'"
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



    var elems2 = document.querySelectorAll('.dropdown-trigger');
    var instances2 = M.Dropdown.init(elems2, {});

    var elems = document.querySelectorAll('.sidenav')
    var instances = M.Sidenav.init(elems, {
      edge: 'right'
    })

    var elements = document.getElementsByClassName("sidenav-close read");
    for (var i = 0; i < elements.length; i++) {
      //elements[i].addEventListener('click', this.markAllNotificationsAsRead, false);
    }

    var elements2 = document.getElementsByClassName("sidenav-overlay");
    for (var i = 0; i < elements2.length; i++) {
      //elements2[i].addEventListener('click', this.markAllNotificationsAsRead, false);
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
       // console.log(events)
        for (var i = 0; i < events.length; i++) {
          // var notifyType = "ACTION";
          var notiObj = events[i].notifyParameters;



          var notifyDateText = "";
          if(events[i].notifyCreatedAt == 0){
            notifyDateText = "Heute"
          } else if(events[i].notifyCreatedAt == 1){
            notifyDateText = "Vor einem Tag"
          } else if (events[i].notifyCreatedAt  > 1 && events[i].notifyCreatedAt < 7){
            notifyDateText = "Vor " + events[i].notifyCreatedAt  + " Tagen";
          } else if (events[i].notifyCreatedAt  >= 7 && events[i].notifyCreatedAt < 14){
            notifyDateText = "Vor einer Woche";
          } else if (events[i].notifyCreatedAt  >= 14){
            var weeks = parseInt(events[i].notifyCreatedAt/7)+"";
            notifyDateText = "Vor "+weeks+" Wochen";
          }

          var notifyActionsR = [];
          if(events[i].notifyActions != null){
            notifyActionsR = events[i].notifyActions;
          }

          var notifyPrimaryActionLink = "";
          if(events[i].notifyActions != null){
            notifyPrimaryActionLink = events[i].notifyPrimaryActionLink;
          }



          var newNotify = {
            notifyId: 'placeholder',
            notifyDate: notifyDateText,
            notifyObject: notiObj,
            notifyIcon: 'public',
            notifyActions: notifyActionsR,
            // notifyType: "ACTION",
            notifyType: events[i].notifyType,
            notifyHeading: '',
            notifyPrimaryActionLink: notifyPrimaryActionLink,
            notifyStatus: events[i].notifyStatus,
            notifyMicroservice: events[i].notifyMicroservice
          }


         // console.log(newNotify.notifyActions);


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
     // console.log("MARK ALL AS READ");
      this.changeStatusOfAllNotifies("seen");

      /*
      if(this.openedNotificationCenterCounter>0){
        this.changeStatusOfAllNotifies("seen")
      }
      this.openedNotificationCenterCounter++;
      */
    },
    getNotifyIcon: function () {
      return "notifications_none";

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

      //console.log("new status: " +notifyType+ " " + typeId+ " " + notifyEntry.status);

     // console.log(this.allNotifies.length)

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

     // console.log(this.allNotifies);

    },
    updateStatusofNotifies: function (qry, refresh) {

     // console.log(qry);

     // ajaxx('DELETE', 'http://localhost:8005/v1/events/', qry).then(function (events) {
      ajaxx('DELETE', (this.isDev?this.serverUrlDev:this.serverUrlProduction) + '/v1/events/', qry).then(function (events) {
        if (events) {
          if (events.success && refresh) {
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
      //console.log(qry.length)
     // console.log(qry);
      this.updateStatusofNotifies(qry,true);
      if(qry.length>0 && newStatus=="seen"){
        M.Toast.dismissAll();
        M.toast({html:"Alle Benachrichtigungen wurden als gelesen markiert."});
      }
      if(qry.length>0 && newStatus=="deleted"){
        M.Toast.dismissAll();
        M.toast({html:"Alle Benachrichtigungen wurden gelöscht."});
      }

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

}



</script>

<style></style>
