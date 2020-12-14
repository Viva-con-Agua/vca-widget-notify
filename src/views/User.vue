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

            <table>
              <tr>
                <th>name</th>
                <th>website</th>
                <th>email</th>
              </tr>
              <tr v-for="param in filter" :key="param.name">
                <td>
                  <b>{{ param.description }}</b>
                </td>
                <td>
                  <el-switch v-model="checks[param.name]"></el-switch>
                </td>
                <td>
                  <el-switch v-model="checksMail[param.name]"></el-switch>
                </td>
              </tr>
            </table>

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
import { Form, Switch } from "element-ui";
import vueCookies from "vue-cookies";

import Vue from "vue";

Vue.use(vueCookies);

export default {
  name: "User",
  components: {
    VcAFrame: VcAFrame,
    VcAColumn: VcAColumn,
    VcABox: VcABox,
    "el-form": Form,
    "el-switch": Switch,
  },

  data() {
    return {
      userparameter: {},
      filter: {},
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
          this.userparameter = userdata;
          this.checks = this.userparameter.filter;
          this.checksMail = this.userparameter.email;
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
            if (!(this.filter[j].name in this.userparameter.filter)) {
              this.checks[this.filter[j].name] = true;
            }
          }
          console.log("checks");
          console.log(this.checks);

          for (var l = 0; l < this.filter.length; l++) {
            if (!(this.filter[l].name in this.userparameter.email)) {
              this.checksMail[this.filter[l].name] = false;
            }
          }
          console.log("checksMail");
          console.log(this.checksMail);
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
