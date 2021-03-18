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
                <label>
                  <input
                    type="checkbox"
                    class="filled-in"
                    :checked="checkbox[param.name]"
                    @input="checkbox[param.name] = $event.target.checked"
                    :id="param.name"
                  />
                  <span></span>
                </label>
              </li>
              <li>
                <el-form-item label="temp">
                  <span slot="label">{{ param.name }}</span>
                  <el-input v-model="values[param.name]"></el-input>
                </el-form-item>
              </li>
            </ul>

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
import "../assets/materialize.min.css";
import api from "../assets/apis.js";


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
      form: {},
      rules: {},
      config: "",
      apis: {},
      userparameter: {},
      checkbox: {},
      values: {
        email: "nicola@schulze-sulingen.de",
        wireshark: "eH8Dmpkh7",
        telegram: "943400998",
      },
    };
  },
  mounted: function() {


    const backend = process.env.VUE_APP_BACKEND_DEV;

    var userApis;

    //GET userdata
    api.call
      .get(`${backend}/user`, {
      })
      .then(
        function(response) {
          this.userparameter = response.data;
          userApis = response.data.filter;
        }.bind(this)
      )
      .catch((e) => {
        console.log(e);
      });

    api.call
      .get(`${backend}/apis`, {})
      .then(
        function(response) {
          this.apis = response.data;
          console.log("User APIS");
          console.log(this.userApis);
          console.log("Possible APIS");
          console.log(this.apis);

          this.apis.forEach((endpoint) => {
            console.log(endpoint.name);

            if (
              endpoint.name in userApis &&
              !(userApis[endpoint.name] == "") &&
              userApis[endpoint.name].contact_data
            ) {
              this.checkbox[endpoint.name] = true;
              this.values[endpoint.name] = userApis[endpoint.name].contact_data;
            } else {
              this.checkbox[endpoint.name] = false;
            }
          });
          console.log("checkbox");
          console.log(this.checkbox);
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
          console.log(this.checkbox);
          console.log(this.values);

          //Change userparameter
          for (const [name, value] of Object.entries(this.checkbox)) {
            if (value == true) {
              if (this.values[name] != "") {
                if (name in this.userparameter.filter) {
                  this.userparameter.filter[name].contact_data = this.values[
                    name
                  ];
                } else {
                  this.userparameter.filter[name] = {};
                  this.userparameter.filter[name].contact_data = this.values[
                    name
                  ];
                }
              }
            } else {
              if (name in this.userparameter.filter) {
                delete this.userparameter.filter[name];
              }
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
    // sendPush() {
    //   const proxyurl = "https://cors-anywhere.herokuapp.com/";
    //   axios({
    //     method: "POST",
    //     url: `${proxyurl}http://wirepusher.com/send?id=${this.form.push}&title=NEWS&message=${this.form.message}`,
    //     headers: {
    //       "Access-Control-Allow-Origin": "*",
    //       "Content-type": "application/json",
    //     },
    //   })
    //     .then((response) => {
    //       console.log(response);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },
    // sendTelegram() {
    //   const proxyurl = "https://cors-anywhere.herokuapp.com/";
    //   const botToken = process.env.VUE_APP_BOT_TOKEN;
    //   const chatID = this.form.telegram;
    //   console.log(process.env.VUE_APP_BOT_TOKEN);
    //   axios
    //     .post(
    //       `${proxyurl}https://api.telegram.org/bot${botToken}/sendMessage?`,
    //       {
    //         chat_id: chatID,
    //         text: this.form.message,
    //       }
    //     )
    //     .then((response) => {
    //       console.log(response);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },
    // sendEmail() {
    //     var transporter = nodemailer.createTransport({
    //       host: process.env.MAIL_HOST,
    //       port: 465,
    //       secure: true,
    //       auth: {
    //         user: process.env.MAIL_USER,
    //         pass: process.env.MAIL_PASSWORD,
    //       },
    //     });
    //     var mailOptions = {
    //       from: process.env.MAIL_USER,
    //       to: this.form.email,
    //       subject: "NEW MESSAGE",
    //       text: this.form.message,
    //     };
    //     transporter.sendMail(mailOptions, function(error, info) {
    //       if (error) {
    //         console.log(error);
    //       } else {
    //         console.log("Email sent: " + info.response);
    //       }
    //     });
    //     console.log(mailOptions);
    // },
  },
};
</script>
