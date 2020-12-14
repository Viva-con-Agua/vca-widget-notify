<template>
  <div class="card" style="text-align: center">
    <div
      class="card grey white"
      style="width: 70%"
      title="Create Widget for Layout"
    >
      <a href="#">
        <i class="closeCard1 close material-icons right black-text">close</i>
      </a>
      <div class="card-content black-text">
        <div class="cardIcon">
          <i class="small material-icons">{{ notifyIcon }}</i>
        </div>
        <div class="cardTitle">
          <a ref="refNotifyHeading">{{ notifyHeading }}</a>
          <p>{{ notifyDate }}</p>
        </div>
      </div>
      <div class="card-action">
        <VcANotificationTemplate
          :notifyObject="notifyObject"
        ></VcANotificationTemplate>
      </div>
    </div>

    <div>
      <a
        href="https://github.com/Viva-con-Agua/vca-widget-notify/tree/master/src/components/VcANotificationTemplate.vue"
        >Download template</a
      >
    </div>
  </div>
</template>

<script>
import VcANotificationTemplate from "../components/VcANotificationTemplate";

export default {
  name: "SetUpWidget",
  components: {
    VcANotificationTemplate,
  },

  data() {
    return {
      notifyObject: {
        layoutParameterTitle: "layoutParameterTitle",
        layoutParameter1: "layoutParameter1",
        layoutParameter2: "layoutParameterTitle",
      },
      notifyDate: "01.01.1997",
      notifyIcon: "public",
      notifyHeading: "",
    };
  },

  methods: {},
};
</script>