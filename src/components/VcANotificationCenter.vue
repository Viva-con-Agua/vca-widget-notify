<template>
  <div>
    <div style="width: 100% !important;">
      <a
        href="#"
        data-target="slide-out"
        class="sidenav-trigger"
        id="notificationCenter"
      >
        <i class="material-icons" v-if="allNotifies.length == 0">
          notifications_none</i
        >
        <i class="material-icons" v-if="allNotifies.length > 0">
          notifications</i
        >

        <small id="notificationBadge">{{ getNewMessageCounter() }}</small>
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
                <li class="col s12">
                  <div class="bottomEntry">
                    <a
                      href="#test3"
                      @click="changeStatusOfAllNotifies('deleted')"
                      >-
                      <i class="material-icons" href="#">clear_all</i>
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
                :key="notify.notifyId"
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
                v-bind:key="notify.notifyId"
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
                :key="notify.notifyId"
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
                :key="notify.notifyId"
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
import M from "materialize-css";
import "../assets/materialize.min.css";
import "../assets/app2.css";
import VcANotificationBox from "./VcANotificationBox";
import axios from "axios";
// import Vue from "vue";

export default {
  name: "VcANotificationCenter",
  components: { VcANotificationBox },
  props: {
    vcaId: String,
    vcaId2: String,
    vcaType: String,
    isEmbedded: Boolean,
  },
  data() {
    return {
      allNotifies: [],
      actionNotifies: [],
      messageNotifies: [],
      dateNotifies: [],
    };
  },
  mounted: function() {
    //console.log(this.$i18n.t);
    var auth;
    if (this.$cookies.get("access_token")) {
      auth = "Bearer " + this.$cookies.get("access_token");
    } else {
      auth = {};
    }
    //console.log(this.$cookies.get('access_token'));
    const oauth = process.env.VUE_APP_BACKEND_DEV;
    console.log(oauth);

    axios
      .get(`${oauth}/events/notify`, {
        // .get("http://localhost:8005/v1/events/notify", {
        headers: {
          authorization: auth,
        },
      })
      .then(
        function(events) {
          console.log(events.data);

          for (var i = 0; i < events.data.length; i++) {
            var notiObj = events.data[i].notifyParameters;

            var newNotify = {
              notifyId: i.toString(),
              notifyDate: events.data[i].notifyCreatedAt,
              notifyObject: notiObj,
              notifyIcon: "public",
              notifyType: events.data[i].notifyType,
              notifyHeading: "",
              notifyActionLink: events.data[i].notifyActionLink,
              notifyStatus: events.data[i].notifyStatus,
              notifyMicroservice: events.data[i].notifyMicroservice,
            };

            this.allNotifies.push(newNotify);
            console.log(newNotify);

            var newNotifyType = newNotify.notifyType.toUpperCase();
            //console.log(newNotify);

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
      )
      .catch(function(error) {
        console.log(error.response.data.message);

        alert(error.response.data.message);
      });
  },
  //   ajaxx("GET", "http://localhost:8005/v1/events/notify", {}, auth)
  //     .then(
  //       function(events) {

  //       }.bind(this)
  //     )
  //     .fail(function(jqXHR, textStatus, errorThrown) {
  //       console.log("Promise catch: " + textStatus);
  //     });
  // },

  methods: {
    getNewMessageCounter: function() {
      var newMessageCounter = 0;
      for (var x = 0; x < this.allNotifies.length; x++) {
        if (this.allNotifies[x].notifyStatus == "new") {
          newMessageCounter++;
        }
      }
      return newMessageCounter;
    },
    // testfunction: function() {
    //   console.log("TEST");
    // },
    // refreshStatusOfEntry: function(notifyEntry) {
    //   var notifyType = notifyEntry.type;
    //   var typeId = notifyEntry.typeId;
    //   var notifyStatus = notifyEntry.status;
    //   console.log("neuer Status", notifyStatus);
    //   console.log("refreshStatus");

    //   // ALL NOTIFIES
    //   var newAllNotifies = [];
    //   for (var x = 0; x < this.allNotifies.length; x++) {
    //     if (
    //       this.allNotifies[x].notifyObject.type == notifyType &&
    //       this.allNotifies[x].notifyObject.typeId == typeId
    //     ) {
    //       this.allNotifies[x].notifyStatus = notifyStatus;

    //       if (!notifyStatus == "deleted") {
    //         newAllNotifies.push(this.allNotifies[x]);
    //       }
    //     } else {
    //       newAllNotifies.push(this.allNotifies[x]);
    //     }
    //   }
    //   this.allNotifies = newAllNotifies;

    //   // ACTION NOTIFIES
    //   var newActionNotifies = [];
    //   for (var x = 0; x < this.actionNotifies.length; x++) {
    //     if (
    //       this.actionNotifies[x].notifyObject.type == notifyType &&
    //       this.actionNotifies[x].notifyObject.typeId == typeId
    //     ) {
    //       this.actionNotifies[x].notifyStatus = notifyStatus;

    //       if (!notifyStatus == "deleted") {
    //         newActionNotifies.push(this.actionNotifies[x]);
    //       }
    //     } else {
    //       newActionNotifies.push(this.actionNotifies[x]);
    //     }
    //   }
    //   this.actionNotifies = newActionNotifies;

    //   // MESSAGE NOTIFIES
    //   var newMessageNotifies = [];
    //   for (var x = 0; x < this.messageNotifies.length; x++) {
    //     if (
    //       this.messageNotifies[x].notifyObject.type == notifyType &&
    //       this.messageNotifies[x].notifyObject.typeId == typeId
    //     ) {
    //       this.messageNotifies[x].notifyStatus = notifyStatus;

    //       if (!notifyStatus == "deleted") {
    //         newMessageNotifies.push(this.messageNotifies[x]);
    //       }
    //     } else {
    //       newMessageNotifies.push(this.messageNotifies[x]);
    //     }
    //   }
    //   this.messageNotifies = newMessageNotifies;

    //   // DATE NOTIFIES
    //   var newDateNotifies = [];
    //   for (var x = 0; x < this.dateNotifies.length; x++) {
    //     if (
    //       this.dateNotifies[x].notifyObject.type == notifyType &&
    //       this.dateNotifies[x].notifyObject.typeId == typeId
    //     ) {
    //       this.dateNotifies[x].notifyStatus = notifyStatus;

    //       if (!notifyStatus == "deleted") {
    //         newDateNotifies.push(this.dateNotifies[x]);
    //       }
    //     } else {
    //       newDateNotifies.push(this.dateNotifies[x]);
    //     }
    //   }
    //   this.dateNotifies = newDateNotifies;
    // },
    // updateStatusofNotifies: function(qry) {
    //   var request = "http://localhost:8005/v1/events/";
    //   ajaxx("DELETE", request, qry).then(
    //     function(events) {
    //       if (events) {
    //         if (events.success) {
    //           for (var x = 0; x < qry.length; x++) {
    //             // refreshStatusOfEntry(qry[x]);
    //             //refreshStatusOfEntry(qry[x]);
    //             this.refreshStatusOfEntry(qry[x]);
    //           }

    //           /*
    //           if(status="deleted"){
    //             this.allNotifies = [];
    //             this.dateNotifies = [];
    //             this.actionNotifies = [];
    //             this.messageNotifies = [];
    //           } else {
    //             for(var x = 0; x < this.allNotifies.length; x++){
    //               this.allNotifies[x].notifyStatus = newStatus;
    //             }
    //           }
    //           */
    //         }
    //       }
    //     }.bind(this)
    // );
  },

  // changeStatusOfAllNotifies: function(newStatus) {
  //   var qry = [];
  //   for (var x = 0; x < this.allNotifies.length; x++) {
  //     qry.push({
  //       type: this.allNotifies[x].notifyObject.type,
  //       typeId: this.allNotifies[x].notifyObject.typeId,
  //       status: newStatus
  //     });
  //   }
  //   console.log(qry.length);
  //   this.updateStatusofNotifies(qry);
  // }
  // }
};

function ready(fn) {
  var d = document;
  d.readyState == "loading" ? d.addEventListener("DOMContentLoaded", fn) : fn();
}

ready(function() {
  var elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems, {
    edge: "right",
  });

  document.addEventListener("click", function(e) {
    if (e.target.className.indexOf("closeCard") != -1) {
      var classNamesArray = e.target.className.split(" ");
      classNamesArray[0].replace("closeCard", "");
    }
  });

  window.onload = function() {
    var elem = document.querySelector(".tabs");
    var options = {};
    M.Tabs.init(elem, options);
  };
});
</script>

<style></style>
