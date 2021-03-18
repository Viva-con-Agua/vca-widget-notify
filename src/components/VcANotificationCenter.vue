<template>
  <div>
    <div style="width: 100% !important">
      <a
        href="#"
        data-target="slide-out"
        class="sidenav-trigger"
        id="notificationCenter"
      >
        <i class="material-icons"> notifications</i>

        <small id="notificationBadge" v-if="getNewMessageCounter() > 0">{{
          getNewMessageCounter()
        }}</small>
      </a>

      <div>
        <ul
          id="slide-out"
          class="sidenav"
          style="background-color: #ededed !important"
        >
          <div class="row" id="stickyTabBottom">
            <div class="col s12">
              <ul class>
                <li class="col s12">
                  <div class="bottomEntry">
                    <a href="#">- </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div class="row" id="stickyTab">
            <li>
              <div class="user-view">
                <h5
                  style="
                    text-align: center !important;
                    padding-bottom: 0px !important;
                    margin-bottom: 0px !important;
                    margin-top: 0px !important;
                  "
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
                    Projekte
                  </a>
                </li>

                <li class="tab col s3">
                  <a href="#tabMessage">
                    <i class="material-icons" href="#">chat</i>
                    Soziales
                  </a>
                </li>

                <li class="tab col s3">
                  <a href="#tabDate">
                    <i class="material-icons" href="#">date_range</i>
                    Aktionen
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
                :notifyReason="notify.notifyReason"
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
                :notifyReason="notify.notifyReason"
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
                :notifyReason="notify.notifyReason"
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
                :notifyReason="notify.notifyReason"
                :key="notify.notifyId"
              ></VcANotificationBox>
            </div>
          </div>

          <div style="height: 80px !important"></div>
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
import api from "../assets/apis.js";

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
    const backend = process.env.VUE_APP_BACKEND_DEV;
    console.log(backend);

    api.call
      .get(`${backend}/notifications`, {
      })
      .then(
        function(result) {
          console.log(result.data);

          for (var i = 0; i < result.data.length; i++) {
            var notiObj = result.data[i];

            var newNotify = {
              notifyId: notiObj.notification._id,
              notifyDate: notiObj.notification.date,
              notifyObject: notiObj.notification,
              notifyIcon: "",
              notifyType: notiObj.notifytype,
              notifyHeading: "",
              notifyActionLink: "#",
              notifyStatus: notiObj.status,
              notifyMicroservice: notiObj.notification.Microservice,
              notifyReason: notiObj.reason,
            };

            console.log(newNotify.notifyMicroservice);

            if (newNotify.notifyType == "Spenden & Projekte") {
              newNotify.notifyIcon = "public";
              this.actionNotifies.push(newNotify);
            }

            if (newNotify.notifyType == "Crew Info & Soziales") {
              newNotify.notifyIcon = "chat";
              this.messageNotifies.push(newNotify);
            }

            if (newNotify.notifyType == "Aktionen") {
              newNotify.notifyIcon = "date_range";
              this.dateNotifies.push(newNotify);
            }

            this.allNotifies.push(newNotify);
          }

          console.log(this.dateNotifies);
          console.log(this.messageNotifies);
          console.log(this.actionNotifies);
        }.bind(this)
      )
      .catch(function(error) {
        console.log(error.response.data.message);

        alert(error.response.data.message);
      });

    var elems = document.querySelectorAll(".sidenav");
    var ref = this;

    M.Sidenav.init(elems, {
      edge: "right",
      onCloseEnd: function() {
        ref.changeToSeen();
      },
    });

    document.addEventListener("click", function (e) {
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
  },
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

    refreshStatusOfEntry: function(id, status) {
      var type;
      for (var x = 0; x < this.allNotifies.length; x++) {
        if (this.allNotifies[x].notifyId == id) {
          type = this.allNotifies[x].notifyType;
          if (status == "deleted") {
            this.allNotifies.splice(x, 1);
          } else {
            this.allNotifies[x].notifyStatus = status;
          }
        }
      }

      console.log("refreshStatus");

      if (type == "action") {
        for (x = 0; x < this.actionNotifies.length; x++) {
          if (this.actionNotifies[x].notifyId == id) {
            type = this.actionNotifies[x].notifyType;
            if (status == "deleted") {
              this.actionNotifies.splice(x, 1);
            } else {
              this.actionNotifies[x].notifyStatus = status;
            }
          }
        }
      } else if (type == "message") {
        for (x = 0; x < this.messageNotifies.length; x++) {
          if (this.messageNotifies[x].notifyId == id) {
            type = this.messageNotifies[x].notifyType;
            if (status == "deleted") {
              this.messageNotifies.splice(x, 1);
            } else {
              this.messageNotifies[x].notifyStatus = status;
            }
          }
        }
      } else if (type == "date") {
        for (x = 0; x < this.dateNotifies.length; x++) {
          if (this.dateNotifies[x].notifyId == id) {
            type = this.dateNotifies[x].notifyType;
            if (status == "deleted") {
              this.dateNotifies.splice(x, 1);
            } else {
              this.dateNotifies[x].notifyStatus = status;
            }
          }
        }
      }
    },
    updateStatusofNotifies: function(id, status) {
      const backend = process.env.VUE_APP_BACKEND_DEV;

      api.call
        .post(`${backend}/updateStatus`, {
          ids: [id],
          status: status,
        })
        .then(
          function(response) {
            console.log(response.data);
          }.bind(this)
        )
        .catch((e) => {
          console.log(e);
        });
      this.refreshStatusOfEntry(id, status);
    },
    changeToSeen: function() {
      console.log("SEEN");
      var ids = [];
      for (var x = 0; x < this.allNotifies.length; x++) {
        this.allNotifies[x].notifyStatus = "seen";
        ids.push(this.allNotifies[x].notifyId);
      }
      for (x = 0; x < this.actionNotifies.length; x++) {
        this.actionNotifies[x].notifyStatus = "seen";
      }
      for (x = 0; x < this.messageNotifies.length; x++) {
        this.messageNotifies[x].notifyStatus = "seen";
      }
      for (x = 0; x < this.dateNotifies.length; x++) {
        this.dateNotifies[x].notifyStatus = "seen";
      }

      // const backend = process.env.VUE_APP_BACKEND_DEV;
      // axios
      //   .post(`${backend}/events/updateStatus`, {
      //     ids: ids,
      //     status: "seen",
      //     user: this.$cookies.get("user_id"),
      //   })
      //   .then(
      //     function (response) {
      //       console.log(response.data);
      //     }.bind(this)
      //   )
      //   .catch((e) => {
      //     console.log(e);
      //   });
    },
  },
};
</script>

<style></style>
