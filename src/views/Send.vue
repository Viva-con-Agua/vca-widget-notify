<template>
  <div>
    <VcAFrame title="Send new Notification" hasContainer="true">
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        class="columns-container"
      >
        <VcAColumn>
          <VcABox :expand="true" :first="true" title="API's">
            <ul style="display: flex;">
              <li>
                <el-switch
                  :active-value="1"
                  :inactive-value="0"
                  v-model="form.email_send"
                ></el-switch>
              </li>
              <li>
                <el-form-item label="Email" prop="email">
                  <el-input v-model="form.email"></el-input>
                </el-form-item>
              </li>
            </ul>
            <ul style="display: flex;">
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
            </ul>
          </VcABox>
        </VcAColumn>
        <VcAColumn>
          <VcABox :expand="true" :first="false" title="Message">
            <el-form-item label="Message" prop="message">
              <el-input v-model="form.message" type="textarea"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('form')"
                >Send</el-button
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
      form: {
        email: "nicola@schulze-sulingen.de",
        push: "eH8Dmpkh7",
        telegram: "943400998",
        email_send: 0,
        push_send: 0,
        telegram_send: 0,
        message: "",
      },
      rules: {
        message: [
          {
            required: true,
            message: "Please input message",
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
          console.log(this.form.message);

          if (this.form.telegram_send) {
            console.log("Telegram");
            this.sendTelegram();
          }
          if (this.form.push_send) {
            console.log("Push");
            this.sendPush();
          }
          if (this.form.email_send) {
            console.log("Email");
            this.sendEmail();
          }
        }
      });
    },
    cancel() {
      this.$emit("cancelled");
    },
    sendPush() {
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      axios({
        method: "POST",
        url: `${proxyurl}http://wirepusher.com/send?id=${this.form.push}&title=NEWS&message=${this.form.message}`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
        },
      })
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    sendTelegram() {
      const proxyurl = "https://cors-anywhere.herokuapp.com/";

      const botToken = process.env.VUE_APP_BOT_TOKEN;
      const chatID = this.form.telegram;
      console.log(process.env.VUE_APP_BOT_TOKEN);

      axios
        .post(
          `${proxyurl}https://api.telegram.org/bot${botToken}/sendMessage?`,
          {
            chat_id: chatID,
            text: this.form.message,
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
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
