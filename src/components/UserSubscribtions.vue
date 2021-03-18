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
                <th>description</th>

                <th v-for="key in apis" :key="key">{{ key }}</th>
              </tr>
              <tr v-for="param in pipelines" :key="param.name">
                <td>
                  <b>{{ param.description }}</b>
                </td>
                <td v-for="key in apis" :key="key">
                  <label>
                    <input
                      type="checkbox"
                      class="filled-in"
                      :checked="checkbox[key][param.name]"
                      @input="checkbox[key][param.name] = $event.target.checked"
                      :id="param.name"
                    />
                    <span></span>
                  </label>
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
        </VcAColumn>
      </el-form>
    </VcAFrame>
  </div>
</template>

<script>
import { VcAFrame, VcAColumn, VcABox } from "vca-widget-base";
import "vca-widget-base/dist/vca-widget-base.css";
import "../assets/pool_event_style.css";
import "../assets/app2.css";
import { Form } from "element-ui";
import api from "../assets/apis.js";



export default {
  name: "Userfilter",
  components: {
    VcAFrame: VcAFrame,
    VcAColumn: VcAColumn,
    VcABox: VcABox,
    "el-form": Form,
  },

  data() {
    return {
      userparameter: {},
      pipelines: {},
      apis: {},
      form: {},
      checkbox: {},
      rules: {},
      config: "",
    };
  },
  mounted: function() {

    const backend = process.env.VUE_APP_BACKEND_DEV;

    //GET userdata
    api.call
      .get(`${backend}/user`, {
      })
      .then(
        function(response) {
          this.userparameter = response.data;
          this.apis = Object.keys(this.userparameter.filter);

          console.log("apis");
          console.log(this.apis);
        }.bind(this)
      )
      .catch((e) => {
        console.log("ERR");

        console.log(e);
      });

    //GET possible pipelines the user can subscribe to
    api.call
      .get(`${backend}/filter`, {})
      .then(
        function(response) {
          this.pipelines = response.data;

          for (const [endpoint, value] of Object.entries(
            this.userparameter.filter
          )) {
            this.checkbox[endpoint] = {};

            //on WEBSITE everything is subscribed to by default
            //for other APIs everything is not by default
            this.pipelines.forEach((pipeline) => {
              if (endpoint == "website") {
                if (!(pipeline.name in value)) {
                  this.checkbox[endpoint][pipeline.name] = true;
                } else {
                  this.checkbox[endpoint][pipeline.name] = value[pipeline.name];
                }
              } else {
                if (!(pipeline.name in value)) {
                  this.checkbox[endpoint][pipeline.name] = false;
                } else {
                  this.checkbox[endpoint][pipeline.name] = value[pipeline.name];
                }
              }
            });
          }
          console.log("checkbox");
          console.log(this.checkbox);
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
          console.log(this.checkbox);

          //Change userparameter
          for (const [endpoint, value] of Object.entries(this.checkbox)) {
            for (const [pipeline, bool] of Object.entries(value)) {
              this.userparameter.filter[endpoint][pipeline] = bool;
            }
          }
          console.log(this.userparameter);

          const backend = process.env.VUE_APP_BACKEND_DEV;
          const config = this.config;
          console.log(config);
          api.call
            .post(
              `${backend}/updateUser`,
              {
                user: this.userparameter,
              },
              {
              }
            )
            .then(() => {
              window.location.reload(true);
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
