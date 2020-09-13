<template>
  <div>
    <el-alert
      :type="type"
      :title="title"
      :description="message"
      :center="true"
      effect="dark"
      v-if="type"
    >
    </el-alert>
    <VcAFrame
      title="Set up New Microservice for Notifications"
      hasContainer="true"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        class="columns-container"
      >
        <VcAColumn>
          <VcABox :expand="true" :first="true" title="Basic Data">
            <el-form-item label="Name" prop="name">
              <el-input
                v-model="form.name"
                :disabled="type == 'success' ? true : false"
              ></el-input>
            </el-form-item>

            <el-form-item label="API" prop="api">
              <el-input
                v-model="form.api"
                :disabled="type == 'success' ? true : false"
              ></el-input>
            </el-form-item>

            <el-form-item :center="true" style="display: inline-block;">
              <el-button
                type="primary"
                @click="submitForm('form')"
                :disabled="type == 'success' ? true : false"
                >Test</el-button
              >
            </el-form-item>

            <el-form-item
              style="display: inline-block; margin-left: 50px"
              v-if="this.type == 'success'"
            >
              <router-link
                class="el-button"
                :class="[type ? 'el-button--' + type : 'success']"
                to="/settingsfilter"
                >Weiter
              </router-link>
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
import { Input, Form } from "element-ui";
import "../assets/pool_event_style.css";
import axios from "axios";
// import nodemailer from "nodemailer";

export default {
  name: "Send",
  components: {
    // VueGoogleAutocomplete,
    VcAFrame: VcAFrame,
    VcAColumn: VcAColumn,
    VcABox: VcABox,
    "el-input": Input,
    "el-form": Form,
    // VcAInfoBox: VcAInfoBox,
  },

  data() {
    return {
      type: null,
      elapse: null,
      message: null,
      title: null,
      form: {
        name: "waves",
        api: "http://localhost:5000/waves/api/v1",
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input name",
            trigger: "blur",
          },
        ],
        api: [
          {
            required: true,
            message: "Please input api",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          console.log(this.form.name);

          this.testAPI();
        }
      });
    },
    cancel() {
      this.$emit("cancelled");
    },
    showAlert(type) {
      this.type = type;

      console.log(type);
      let timer = this.showAlert.timer;
      if (timer) {
        clearTimeout(timer);
      }
      this.showAlert.timer = setTimeout(() => {
        this.type = null;
      }, 6000);

      this.elapse = 1;
      let t = this.showAlert.t;
      if (t) {
        clearInterval(t);
      }

      this.showAlert.t = setInterval(() => {
        if (this.elapse === 3) {
          this.elapse = 0;
          clearInterval(this.showAlert.t);
        } else {
          this.elapse++;
        }
      }, 1000);
    },
    testAPI() {
      const backend = process.env.VUE_APP_BACKEND_DEV;
      console.log(backend);

      axios
        .post(`${backend}/events/test`, {
          name: this.form.name,
          api: this.form.api,
        })
        .then((response) => {
          console.log(response);
          this.message =
            "Test erfolgreich. API erreichbar und Daten in richtiger Form. Typen von Notifications: " +
            response.data.types;
          this.title = "SUCCESS";
          this.type = "success";
        })
        .catch((e) => {
          console.log(e);
          this.message = "Test nicht erfolgreich. " + e;
          this.title = "ERROR";

          this.showAlert("error");
        });
    },
  },
};
</script>
