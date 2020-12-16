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
            <h5>Where du you want to recieve Notifications?</h5>

            <ul style="display: flex;" v-for="param in apis" :key="param.name">
              <li>
                <el-switch
                  :active-value="true"
                  :inactive-value="false"
                  v-model="checks[param.name]"
                ></el-switch>
              </li>
              <li>
                <el-form-item label="temp">
                  <span slot="label">{{ param.name }}</span>
                  <el-input v-model="values[param.name]"></el-input>
                </el-form-item>
              </li>
            </ul>
            <!--<ul style="display: flex;">
              <li>
                <el-switch
                  :active-value="1"
                  :inactive-value="0"
                  v-model="form.push_send"
                ></el-switch>
              </li>
              <li>
                <el-form-item label="Push" prop="push">
                  <el-input v-model="form.push"></el-input>
                </el-form-item>
              </li>
            </ul>
            <ul style="display: flex;">
              <li>
                <el-switch
                  :active-value="1"
                  :inactive-value="0"
                  v-model="form.telegram_send"
                ></el-switch>
              </li>
              <li>
                <el-form-item label="Telegram" prop="telegram">
                  <el-input v-model="form.telegram"></el-input>
                </el-form-item>
              </li>
            </ul>-->

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
import { Input, Form } from "element-ui";
import "../assets/pool_event_style.css";
import axios from "axios";
// import nodemailer from "nodemailer";

export default {
  name: "Usersetting",
  components: {
    VcAFrame: VcAFrame,
    VcAColumn: VcAColumn,
    VcABox: VcABox,
    "el-input": Input,
    "el-form": Form,
  },

  data() {
    return {
      form: {
        email: "nicola@schulze-sulingen.de",
        push: "eH8Dmpkh7",
        telegram: "943400998",
      },
      rules: {
        email: [
          {
            required: true,
            message: "Please input message",
            trigger: "blur",
          },
        ],
      },
      config: "",
      apis: {},
      userparameter: {},
      checks: [],
      values: {
        email: "nicola@schulze-sulingen.de",
        wireshark: "eH8Dmpkh7",
        telegram: "943400998",
      },
    };
  },
  mounted: function() {
    if (!this.$cookies.get("access_token")) {
      this.$router.push({ name: "home" });
    }
    const backend = process.env.VUE_APP_BACKEND_DEV;
    this.config = this.$cookies.get("access_token");

    axios
      .get(`${backend}/user`, {
        headers: { Authorization: `Bearer ${this.config}` },
      })
      .then(
        function(response) {
          var userdata = response.data;
          this.userparameter = userdata;
        }.bind(this)
      )
      .catch((e) => {
        console.log(e);
      });

    axios
      .get(`${backend}/apis`, {})
      .then(
        function(response) {
          this.apis = response.data;
          // this.checks= ;

          console.log(this.userparameter);
          console.log(this.apis);

          for (var j = 0; j < this.apis.length; j++) {
            // this.values[this.apis[j].name] = "";
            if (
              this.apis[j].name in this.userparameter.filter &&
              !(this.userparameter.filter.key == "")
            ) {
              this.checks[this.apis[j].name] = true;
            } else {
              this.checks[this.apis[j].name] = false;
            }
          }
          console.log("values");
          console.log(this.checks);
          console.log("values");

          console.log(this.values);
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
          this.userparameter.apis = this.checks;

          // const backend = process.env.VUE_APP_BACKEND_DEV;
          // const config = this.config;
          // console.log(config);
          // axios
          //   .post(
          //     `${backend}/updateAPIs`,
          //     {
          //       user: this.userparameter,
          //     },
          //     {
          //       headers: { Authorization: `Bearer ${this.config}` },
          //     }
          //   )
          //   .then(() => {
          //     this.$router.push({ name: "home" });
          //   })
          //   .catch((e) => {
          //     console.log(e);
          //   });
        }
      });
    },
    cancel() {
      this.$emit("cancelled");
    },
    sendPush() {
      // const proxyurl = "https://cors-anywhere.herokuapp.com/";
      // axios({
      //   method: "POST",
      //   url: `${proxyurl}http://wirepusher.com/send?id=${this.form.push}&title=NEWS&message=${this.form.message}`,
      //   headers: {
      //     "Access-Control-Allow-Origin": "*",
      //     "Content-type": "application/json",
      //   },
      // })
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
    },
    sendTelegram() {
      // const proxyurl = "https://cors-anywhere.herokuapp.com/";
      // const botToken = process.env.VUE_APP_BOT_TOKEN;
      // const chatID = this.form.telegram;
      // console.log(process.env.VUE_APP_BOT_TOKEN);
      // axios
      //   .post(
      //     `${proxyurl}https://api.telegram.org/bot${botToken}/sendMessage?`,
      //     {
      //       chat_id: chatID,
      //       text: this.form.message,
      //     }
      //   )
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
    },
    sendEmail() {
      //   var transporter = nodemailer.createTransport({
      //     host: process.env.MAIL_HOST,
      //     port: 465,
      //     secure: true,
      //     auth: {
      //       user: process.env.MAIL_USER,
      //       pass: process.env.MAIL_PASSWORD,
      //     },
      //   });
      //   var mailOptions = {
      //     from: process.env.MAIL_USER,
      //     to: this.form.email,
      //     subject: "NEW MESSAGE",
      //     text: this.form.message,
      //   };
      //   transporter.sendMail(mailOptions, function(error, info) {
      //     if (error) {
      //       console.log(error);
      //     } else {
      //       console.log("Email sent: " + info.response);
      //     }
      //   });
      //   console.log(mailOptions);
    },
  },
};
</script>
