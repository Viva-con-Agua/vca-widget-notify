<template>
  <VcAFrame>
    <VcAColumn>
      <VcABox v-bind:title="title">
        <SetUpInfo v-if="page == 1" />
        <SetUpTest v-if="page == 2" @success="saveAPI" />
        <div v-if="page == 3">
          <p>
            Unter welchem Punkt sollen Notifications jedes Types eingeordnet
            werden?
          </p>
          <img src="../assets/classes.png" />
          <SetUpTypes
            v-for="(key, value) in categories"
            :key="value"
            :category="key"
            :name="value"
            @saveCategory="saveCategory"
          />
        </div>
        <div v-if="page == 4">
          <SetUpPipelines
            v-for="(item, index) in notifytypes"
            :key="index"
            :title="'Conditions for type ' + item"
            :notifytypes="item"
            :conditions="conditions[item]"
            :notifymatch="notifymatch[item]"
            :userparameter="userparameter"
            :Microservice="Microservice"
            @add-condition="addCondition"
            @delete-condition="deleteCondition"
            ref="pipelines"
          />
        </div>
        <SetUpWidget v-if="page == 5" />

        <div v-if="status == 'success'">
          <button @click="submitForm()" class="el-button el-button--success">
            Weiter
          </button>
        </div>
      </VcABox>
    </VcAColumn>
  </VcAFrame>
</template>

<script>
import { VcAFrame, VcAColumn, VcABox } from "vca-widget-base";
import "vca-widget-base/dist/vca-widget-base.css";
import "../assets/pool_event_style.css";
import "../assets/app2.css";
import "../assets/materialize.min.css";
import axios from "axios";
import SetUpInfo from "../components/SetUpInfo";
import SetUpTest from "../components/SetUpTest";
import SetUpTypes from "../components/SetUpTypes";
import SetUpPipelines from "../components/SetUpPipelines";
import SetUpWidget from "../components/SetUpWidget";

export default {
  name: "Send",
  components: {
    SetUpInfo: SetUpInfo,
    SetUpTest: SetUpTest,
    SetUpTypes: SetUpTypes,
    SetUpPipelines: SetUpPipelines,
    SetUpWidget: SetUpWidget,

    VcAFrame: VcAFrame,
    VcAColumn: VcAColumn,
    VcABox: VcABox,
  },

  data() {
    return {
      page: 1,
      title: "Set Up Notifications for Microservice",
      status: "success",
      backend: process.env.VUE_APP_BACKEND_DEV,
      Microservice: "",
      notifytypes: [],
      notifymatch: [],
      userparameter: [],
      categories: [],
      missing: [],
      conditions: {},
      config: "",
    };
  },
  mounted: function() {
    if (!this.$cookies.get("access_token")) {
      this.$router.push({ name: "home" });
    }
    this.config = this.$cookies.get("access_token");
  },
  methods: {
    submitForm() {
      if (this.page == 1) {
        this.nextPage();
        this.status = false;
      } else if (this.page == 2) {
        this.nextPage();
        axios
          .post(
            `${this.backend}/info`,
            {
              name: this.Microservice,
            },
            {
              headers: { Authorization: `Bearer ${this.config}` },
            }
          )
          .then(
            function(response) {
              var types = response.data.types;
              var filter = response.data.filter;
              var matching = response.data.matching;
              this.userparameter = response.data.userparameter;
              this.categories = response.data.categories;

              console.log(this.categories);

              for (var i = 0; i < types.length; i++) {
                this.notifytypes.push(types[i]);

                this.notifymatch[types[i]] = [];
                this.conditions[types[i]] = [];

                for (var j = 0; j < filter.length; j++) {
                  if (filter[j].type == types[i]) {
                    this.conditions[types[i]].push(filter[j]);
                  }
                }

                for (var n = 0; n < matching.length; n++) {
                  if (matching[n].type == types[i]) {
                    for (var k = 0; k < matching[n].parameter.length; k++) {
                      this.notifymatch[types[i]].push(matching[n].parameter[k]);
                    }
                  }
                }
              }
            }.bind(this)
          )
          .catch((e) => {
            console.log(e);
          });

        for (var i = 0; i < this.notifytypes.length; i++) {
          if (
            !this.categories[this.notifytypes[i]] ||
            this.categories[this.notifytypes[i]] == "null"
          ) {
            this.status = false;
          }
        }
      } else if (this.page == 3) {
        axios
          .post(
            `${this.backend}/saveCategories`,
            {
              Microservice: this.Microservice,
              types: this.categories,
            },
            { headers: { Authorization: `Bearer ${this.config}` } }
          )
          .then()
          .catch((e) => {
            console.log(e);
          });
        this.nextPage();
      } else if (this.page == 4) {
        console.log(this.missing);

        axios
          .post(
            `${this.backend}/saveConditions`,
            {
              Microservice: this.Microservice,
              conditions: this.conditions,
              types: this.notifytypes,
              missing: this.missing,
            },
            { headers: { Authorization: `Bearer ${this.config}` } }
          )
          .then()
          .catch((e) => {
            console.log(e);
          });

        this.status = false;
        this.nextPage();
      }
    },
    nextPage() {
      this.page = this.page + 1;
      console.log(this.page);

      switch (this.page) {
        case 2:
          this.title = "Test your API";
          break;
        case 3:
          this.title = "Choose categories for your Notifications";
          break;
        case 4:
          this.title = "Choose notification pipelines";
          break;
        case 5:
          this.title = "Create your own widget for Layout";
          break;
        default:
          this.title = "Set Up Notification";

          break;
      }
    },
    saveAPI(data) {
      this.status = "success";
      console.log(data);
      this.Microservice = data;
    },
    saveCategory(type, category) {
      this.categories[type] = category;
      console.log(this.categories);

      var ready = true;
      for (var i = 0; i < this.notifytypes.length; i++) {
        if (
          !this.categories[this.notifytypes[i]] ||
          this.categories[this.notifytypes[i]] == "null"
        ) {
          ready = false;
        }
      }

      if (ready == true) {
        this.status = "success";
      }
    },
    addCondition(name, description, requirement, item) {
      console.log(item);
      if (name.length > 0 && description.length > 0 && requirement.length > 0) {
        this.conditions[item].push({
          name: name,
          description: description,
          requirement: requirement,
        });
      }
    },
    deleteCondition(id, item) {
      var temp = this.conditions[item];

      temp = this.conditions[item].filter(function(condition) {
        return condition._id !== id;
      });

      this.$delete(this.conditions, item);
      this.missing.push(id);
      this.conditions[item] = temp;
      console.log(this.conditions[item]);
    },
  },
};
</script>
