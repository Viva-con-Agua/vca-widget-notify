<template>
  <div>
    <VcAFrame hasContainer="true">
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        class="columns-container"
      >
        <VcAColumn>
          <VcABox title="User Settings">
            <h5>What Notifications do you want to recieve?</h5>

            <!--<table>
              <tr v-for="param3 in apis" :key="param3.name">
                <th>{{ param3.name }}</th>
              </tr>
              <tr v-for="param in filter" :key="param.name">
                <td>
                  <b>{{ param.description }}</b>
                </td>
              </tr>

              <tr v-for="param2 in apis" :key="param2.name">
                <td>
                  <el-switch
                    v-model="checks[param2.name][param.name]"
                  ></el-switch>
                </td>
              </tr>
            </table>-->

            <br />
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')"
                >Save</el-button
              >
            </el-form-item>
          </VcABox>
          <VcABox title="User Data">
            <table>
              <tr v-for="(param, key) in userparameter" :key="key">
                <td>
                  <b>{{ key }}</b>
                </td>
                <td>
                  {{ param }}
                </td>
              </tr>
            </table>
          </VcABox>
        </VcAColumn>
      </el-form>
    </VcAFrame>
  </div>
</template>

<script>
import { VcAFrame, VcAColumn, VcABox } from "vca-widget-base";
import axios from "axios";
import "vca-widget-base/dist/vca-widget-base.css";
import "../assets/pool_event_style.css";
import "../assets/app2.css";
import { Form } from "element-ui";
import vueCookies from "vue-cookies";

import Vue from "vue";

Vue.use(vueCookies);

export default {
  name: "Userfilter",
  components: {
    VcAFrame: VcAFrame,
    VcAColumn: VcAColumn,
    VcABox: VcABox,
    "el-form": Form,
    // "el-switch": Switch,
  },

  data() {
    return {
      userparameter: {},
      filter: {},
      apis: {},

      form: {},
      checks: {},
      checksMail: {},
      rules: {},
      config: "",
    };
  },
  mounted: function() {
    if (!this.$cookies.get("access_token")) {
      this.$router.push({ name: "home" });
    }
    const backend = process.env.VUE_APP_BACKEND_DEV;
    this.config = this.$cookies.get("access_token");

    console.log(this.config);
    axios
      .get(`${backend}/user`, {
        headers: { Authorization: `Bearer ${this.config}` },
      })
      .then(
        function(response) {
          var userdata = response.data;
          console.log("filter");
          console.log(userdata.filter);
          this.apis = userdata.filter;
          this.userparameter = userdata;

          // for (var j = 0; j < this.apis.length; j++) {
          //   this.checks[apis[j].name] = "";
          // }
        }.bind(this)
      )
      .catch((e) => {
        console.log(e);
      });

    axios
      .get(`${backend}/filter`, {})
      .then(
        function(response) {
          this.filter = response.data;

          for (var j = 0; j < this.filter.length; j++) {
            if (this.filter[j].name == "website") {
              if (!(this.filter[j].name in this.userparameter.filter)) {
                this.checks[this.userparameter.filter.name][
                  this.filter[j].name
                ] = true;
              } else {
                this.checks[this.userparameter.filter.name][
                  this.filter[j].name
                ] = false;
              }
            } else {
              if (!(this.filter[j].name in this.userparameter.filter)) {
                this.checks[this.userparameter.filter][
                  this.filter[j].name
                ] = false;
              } else {
                this.checks[this.userparameter.filter][
                  this.filter[j].name
                ] = true;
              }
            }
          }
          console.log("checks");
          console.log(this.checks);
        }.bind(this)
      )
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          console.log("Submit");
          this.userparameter.filter = this.checks;
          this.userparameter.email = this.checksMail;

          const backend = process.env.VUE_APP_BACKEND_DEV;
          const config = this.config;
          console.log(config);
          axios
            .post(
              `${backend}/updateUser`,
              {
                user: this.userparameter,
              },
              {
                headers: { Authorization: `Bearer ${this.config}` },
              }
            )
            .then(() => {
              this.$router.push({ name: "home" });
            })
            .catch((e) => {
              console.log(e);
            });
        }
      });
    },
  },
};
</script>
