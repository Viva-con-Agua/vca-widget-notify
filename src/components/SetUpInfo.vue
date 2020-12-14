<template>
  <el-card>
    <p>
      Needed: An <b>API</b> where Notify can Send <b>GET</b> Requests to and get
      an Array of Notifications back in the following form.
    </p>
    <p>
      [{ <br />
      <b>Microservice: </b>name of Service,<br />
      <b>type: </b>type of Notification*,<br />
      <b>date: </b>current date and time,<br />
      <b>validTill: </b>when the notification becomes irrelevant,<br />
      <b>typeId: </b>id which together with type should make the notification
      unique,<br />
      <b>layoutParameters: </b>parameters needed for displaying all important
      information,<br />
      <b>matchingParameters: </b>parameters needed for matching the notification
      to interested users<br />
      }]
    </p>

    <p>
      *if your Microservice sends out different types of Notifications which
      should be filtered and displayed differently, you can differentiate them
      with this parameter and choose different options for each type.
    </p>

    <p>
      Example API:
      <a
        href="https://github.com/Viva-con-Agua/waves-backend/blob/notify/controller/notificationController.js"
      >
        notificationController for Waves Microservice
      </a>
    </p>
  </el-card>
</template>

   <script>
import "../assets/materialize.min.css";

export default {
  name: "SetUpInfo",
};
</script>
             
            