<template>


    <div class="row" v-if='notifyStatus != "123deleted"'>


        <div class="col s12 m12 transitionItem colEvent1">
            <div class="card grey white" v-bind:class=notifyStatus ref="card-status">




                <a class='dropdown-trigger' href='#'
                   :data-target="'dropdown-'+notifyObject.typeId+'-'+notifyObject.type+'-'+notifyTab"
                   @click='closeText()'>
                    <i class="closeCard1 close material-icons right black-text" @click='changeStatusOfNotify(notifyObject.type, notifyObject.typeId, "deleted")'>close</i>
                </a>


                <!-- Dropdown Trigger

               <a class='dropdown-trigger' href='#'
                  :data-target="'dropdown-'+notifyObject.typeId+'-'+notifyObject.type+'-'+notifyTab"
                  @click='closeText()'>
                   <i class="closeCard1 close material-icons right black-text" @click='closeText()'>more_vert</i>
               </a>
           -    ->

                <!-- Dropdown Structure
                <ul :id="'dropdown-'+notifyObject.typeId+'-'+notifyObject.type+'-'+notifyTab" class='dropdown-content'>
                    <li>
                        <a href="#" @click='changeStatusOfNotify(notifyObject.type, notifyObject.typeId, "seen")'>
                            Als gelesen markieren
                        </a>
                    </li>
                    <li>
                        <a href="#" @click='changeStatusOfNotify(notifyObject.type, notifyObject.typeId, "deleted")'>
                            Löschen
                        </a>
                    </li>

                    <li class="divider" tabindex="-1"></li>

                    <li v-for="userAction in notifyActions">
                        <a :href=userAction.actionLink>{{userAction.actionButton}}</a>
                    </li>

                </ul>
-->

                <!--
                <a class="" href="#" @click='changeStatusOfNotify(notifyObject.type, notifyObject.typeId, "deleted")'>
                    <i class="closeCard1 close material-icons right black-text">close</i>
                </a>
                -->


                <div class="card-content black-text" @click='openText()'>
                    <div class="cardIcon">
                        <i class="small material-icons">{{ notifyIcon }}</i>
                        <i class="small material-icons" id="badgeNotify">brightness_1</i>
                    </div>
                    <div class="cardTitle">
                        <a class="primaryAction" v-if="notifyPrimaryActionLink.length != 0" ref="refNotifyHeading"
                           onclick="return true;" :href="notifyPrimaryActionLink">
                            {{ notifyHeading }}
                        </a>

                        <a class="withoutPrimaryAction" v-else ref="refNotifyHeading" onclick="return true;">
                            {{ notifyHeading }}
                        </a>


                        <p class="cardDate">{{ notifyDate }}</p>
                        <i style="" ref="expandIcon" class="small material-icons expandIcon">expand_more</i>
                    </div>
                </div>


                <div class="card-action" @click='openText()'>
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


                <ul class="collapsible" @click='openText()'>
                    <li class="card-action">

                        <div class="collapsible-body" ref="collapsible-body">
                            <p ref="collapsibleContent">
                                <!--
                                Die Bewerbungsfrist endet am 05.09.2020. Gesucht werden insgesamt 10 Supporter. Es werden Pfandbecher gesammelt und Informationsstände organisiert.

                            -->
                            </p>

                            <div class="card-action-notify" v-if="notifyActions.length>0">
                                <a v-for="userAction in notifyActions" :href=userAction.actionLink>{{userAction.actionButton}}</a>
                            </div>

                        </div>
                    </li>
                </ul>
               <!-- <div>
                    <a href="#" class="openText card-action" ref="openTextRef" @click='openText()'>Mehr</a>
                </div>
                -->

               <i style="display:none !important;" ref="expandIcon5" class="small material-icons expandIcon" @click='openText()'>expand_more</i>

                <!--
                <div class="card-action" v-if="notifyActions.length>0">
                    <a v-for="userAction in notifyActions" :href=userAction.actionLink>{{userAction.actionButton}}</a>
                </div>
                -->

            </div>
        </div>
    </div>
</template>

<script>
  import M from 'materialize-css'
  import '../assets/materialize.min.css'
  import VcANotificationWaves from './VcANotificationWaves'
  import VcANotificationCom from './VcANotificationCom'
  import VcANotificationNec from './VcANotificationNec'
  import VcANotificationApp from './VcANotificationApp'
  import VcANotificationNews from './VcANotificationNews'
  import VcANotificationSuggesty from './VcANotificationSuggesty'


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
      notifyPrimaryActionLink: String,
      notifyStatus: String,
      notifyMicroservice: String,
      notifyActions: Array,
      notifyPlace: String,
      notifyTab: String
    },

    mounted: function () {
      /*
      var elems23 = this.$el.querySelectorAll('.dropdown-trigger');
      // console.log(elems23);
      console.log(this);
      var instances4 = M.Dropdown.init(elems23, {});
*/

      var elems5 = document.querySelectorAll('.collapsible');
      var instances5 = M.Collapsible.init(elems5, {});

    },

    methods: {
      closeText: function () {
      },
      openText: function () {
        var tinst = this.$el.querySelectorAll('.collapsible');
        var instance = M.Collapsible.getInstance(tinst[0]);

        var elem = this.$el.querySelectorAll('.collapsible li');

        if (elem[0].className.includes("active")) {
          instance.close(0);
          this.$refs.expandIcon.innerHTML = "expand_more";

          var qry = [];
          var notifyEntry = {};
          notifyEntry.type = this.notifyObject.type;
          notifyEntry.typeId = this.notifyObject.typeId;
          notifyEntry.status = "seen";
          qry.push(notifyEntry);
          this.$parent.updateStatusofNotifies(qry, true);


        var notifyEntry={};
          notifyEntry.type = this.notifyObject.type;
          notifyEntry.typeId = this.notifyObject.typeId;
          notifyEntry.status = "seen";

          //this.$parent.refreshStatusOfEntry(notifyEntry);

        } else {
          //this.notifyStatus="open";
          instance.open(0);
          this.$refs.expandIcon.innerHTML = "expand_less";
          //this.changeStatusOfNotify(this.notifyObject.type, this.notifyObject.typeId, "seen");


          var qry = [];
          var notifyEntry = {};
          notifyEntry.type = this.notifyObject.type;
          notifyEntry.typeId = this.notifyObject.typeId;
          notifyEntry.status = "seen";
          qry.push(notifyEntry);
          this.$parent.updateStatusofNotifies(qry, false);

          var qry2 = [];
          var notifyEntry2 = {};
          notifyEntry2.type = this.notifyObject.type;
          notifyEntry2.typeId = this.notifyObject.typeId;
          notifyEntry2.status = "opened";
          qry2.push(notifyEntry2);
          this.$parent.refreshStatusOfEntry(notifyEntry2);


         // this.$parent.refreshStatusOfEntry(notifyEntry);
        //  console.log(this);



          //this.$refs.openTextRef.innerHTML="Weniger";
        }


      },
      changeStatusOfNotify: function (type, typeId, status) {
        var qry = []
        qry.push({'type': type, 'typeId': typeId, 'status': status})
        this.$parent.updateStatusofNotifies(qry, true)

        if (status == "deleted") {
          M.Toast.dismissAll();
          M.toast({html: "Benachrichtigung wurde gelöscht."});
        }

      }
    }
  }
</script>

<style scoped></style>
