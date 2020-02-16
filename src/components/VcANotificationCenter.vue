<template>
  <div v-if="this.$cookies.get('access_token')" style="width: 100% !important;">
    <div style="display: none !important">
      {{ $t("read.form.label.senderRoleName") }} i18 test
    </div>

    <a
      href="#"
      data-target="slide-out"
      class="sidenav-trigger"
      id="notificationCenter"
    >
      <i class="material-icons" id="notificationIcon">notifications_none</i>
      <small id="notificationBadge">{{ allNotifies.length }}</small>
    </a>

    <div>
      <ul
        id="slide-out"
        class="sidenav"
        style="background-color:#ededed !important;"
      >
        <div class="row" id="stickyTabBottom">
          <div class="col s12">
            <ul class>
              <li class="col s4">
                <div class="bottomEntry">
                  <a href="#test3">
                    <i class="material-icons" href="#">clear_all</i>
                    Alle löschen
                  </a>
                </div>
              </li>

              <li class="col s4">
                <div class="bottomEntry">
                  <a href="#test2">
                    <i class="material-icons" href="#">volume_up</i>
                    Sound: An
                  </a>
                </div>
              </li>

              <li class="col s4">
                <div class="bottomEntry">
                  <a href="#test1">
                    <i class="material-icons" href="#">settings</i>
                    Konfigurieren
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
</template>

<script>
import M from "materialize-css";
import "../assets/materialize.min.css";
import "../assets/app2.css";
import VcANotificationBox from "./VcANotificationBox";
import { ajaxx } from "./externalJs";

export default {
  name: "VcANotificationCenter",
  components: { VcANotificationBox },
  props: {
    vcaId: String,
    vcaId2: String,
    vcaType: String,
    isEmbedded: Boolean
  },
  data() {
    return {
      allNotifies: [],
      actionNotifies: [],
      messageNotifies: [],
      dateNotifies: []
    };
  },
  mounted: function() {
    addBadge();
    //console.log(this.$i18n.t);
    var auth;
    if (this.$cookies.get("access_token")) {
      auth = "Bearer " + this.$cookies.get("access_token");
    } else {
      auth = {};
    }
    //console.log(this.$cookies.get('access_token'));

    ajaxx("GET", "http://localhost:8005/v1/events/notify", {}, auth).then(
      function(events) {
        for (var i = 0; i < events.length; i++) {
          // var notifyType = "ACTION";
          var notiObj = events[i].notifyParameters;

          var newNotify = {
            notifyId: "placeholder",
            notifyDate: events[i].notifyCreatedAt,
            notifyObject: notiObj,
            notifyIcon: this.getIconName(events[i].notifyType),
            notifyType: events[i].notifyType,
            notifyHeading: "",
            notifyActionLink: events[i].notifyActionLink,
            notifyStatus: events[i].notifyStatus,
            notifyMicroservice: events[i].notifyMicroservice
          };

          this.allNotifies.push(newNotify);

          var newNotifyType = newNotify.notifyType.toUpperCase();
          console.log(newNotify);

          if (newNotifyType == "ACTION") {
            this.actionNotifies.push(newNotify);
          }

          if (newNotifyType == "MESSAGE") {
            this.messageNotifies.push(newNotify);
          }

          if (newNotifyType == "DATE") {
            this.dateNotifies.push(newNotify);
          }
        }
      }.bind(this)
    );
  },

  methods: {
    getIconName: function(category) {
      var categoryLowerCase = category.toLowerCase();
      if (categoryLowerCase == "action") {
        return "public";
      } else if (categoryLowerCase == "date") {
        return "date_range";
      } else if (categoryLowerCase == "message") {
        return "chat";
      } else {
        return "face";
      }
    }
  }
};

function ready(fn) {
  var d = document;
  d.readyState == "loading" ? d.addEventListener("DOMContentLoaded", fn) : fn();
}

ready(function() {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems, {
    edge: "right"
  });

  document.addEventListener("click", function(e) {
    if (e.target.className.indexOf("closeCard") != -1) {
      var classNamesArray = e.target.className.split(" ");
      var eventId = classNamesArray[0].replace("closeCard", "");
    }
  });

  window.onload = function() {
    var elem = document.querySelector(".tabs");
    var options = {};
    var instance = M.Tabs.init(elem, options);
  };
});

function addBadge() {
  // TODO: update badge counter
  /*
    ajax('GET', 'http://localhost:8005/v1/events/user/badge/' + userId, {}, {}).then(function (events) {
      document.getElementById('notificationBadge').innerHTML = events.notSeenCounter;
      if ((events.seenCounter + events.notSeenCounter) == 0) {
        document.getElementById('notificationIcon').innerHTML = "notifications_none";
      } else {
        document.getElementById('notificationIcon').innerHTML = "notifications";
      }
      document.getElementById("notificationCenter").style.display = "block";
    });
    */
}
</script>

<style></style>
