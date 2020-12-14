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
    <el-card>
      <el-form :model="form" :rules="rules" ref="form">
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

        <el-form-item :center="true" style="display: inline-block">
          <el-button
            type="primary"
            @click="submitForm('form')"
            :disabled="type == 'success' ? true : false"
            >Test</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import "vca-widget-base/dist/vca-widget-base.css";
import { Input, Form } from "element-ui";
import "../assets/pool_event_style.css";
import axios from "axios";

export default {
  name: "SetUpTest",
  components: {
    "el-input": Input,
    "el-form": Form,
  },

  data() {
    return {
      type: null,
      elapse: null,
      message: null,
      title: null,
      config: "",
      form: {
        name: "WAVES",
        api: "http://localhost:5000/waves/api/v1/notifications",
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
          this.testAPI();
        }
      });
    },
    cancel() {
      this.$emit("cancelled");
    },
    showAlert(type) {
      this.type = type;

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
      this.config = this.$cookies.get("access_token");

      axios
        .post(
          `${backend}/testAPI`,
          {
            name: this.form.name,
            api: this.form.api,
          },
          {
            headers: { Authorization: `Bearer ${this.config}` },
          }
        )
        .then((response) => {
          //   console.log(response);
          if (
            response.data.Microservice == true &&
            response.data.type == true &&
            response.data.date == true &&
            response.data.typeId == true &&
            response.data.validTill == true &&
            response.data.matchingParameters == true &&
            response.data.layoutParameters == true &&
            response.data.name == true
          ) {
            this.message =
              "API erreichbar und Daten in richtiger Form. Neue API in Datenbank gespeichert";
            this.title = "Test erfolgreich ";
            this.type = "success";
            this.$emit("success", this.form.name);
          } else if (response.data.name != true) {
            this.title =
              "API erreichbar, aber Name stimmt nicht mit Microservice Key überein";
            this.message = "Microservice Key: " + response.data.name;

            this.showAlert("error");
          } else {
            this.title = "API erreichbar, aber Daten nicht in richtiger Form";

            if (response.data.Microservice == true) {
              this.message = "Microservice Key: OK";
            } else {
              this.message = "Microservice Key: FALSE";
            }
            if (response.data.type == true) {
              this.message += ", type Key: OK";
            } else {
              this.message += ", type Key: FALSE";
            }
            if (response.data.date == true) {
              this.message += ", date Key: OK";
            } else {
              this.message += ", date Key: FALSE";
            }
            if (response.data.validTill == true) {
              this.message += ", validTill Key: OK";
            } else {
              this.message += ", validTill Key: FALSE";
            }
            if (response.data.typeId == true) {
              this.message += ", typeId Key: OK";
            } else {
              this.message += ", typeId Key: FALSE";
            }
            if (response.data.matchingParameters == true) {
              this.message += ", matchingParameters Key: OK";
            } else {
              this.message += ", matchingParameters Key: FALSE";
            }
            if (response.data.layoutParameters == true) {
              this.message += ", layoutParameters Key: OK";
            } else {
              this.message += ", layoutParameters Key: FALSE";
            }

            this.showAlert("error");
          }
        })
        .catch((e) => {
          console.log(e);
          this.message = e;
          this.title = "API nicht erreichbar";

          this.showAlert("error");
        });
    },
  },
};
</script>
