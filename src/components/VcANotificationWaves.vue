<template>
  <div>
    <span v-html="text"> </span>
  </div>
</template>

<script>
export default {
  name: "VcANotificationWaves",
  data() {
    return {
      text: "",
    };
  },
  props: {
    layoutParameter: Object,
    type: String,
    reason: String,
  },
  methods: {},
  mounted: function () {
    console.log(this.reason);
    var d = new Date(this.layoutParameter.eventDate);
    var datestring =
      d.getDate() +
      "-" +
      (d.getMonth() + 1) +
      "-" +
      d.getFullYear() +
      " " +
      d.getHours() +
      ":" +
      d.getMinutes();
    if (this.type == "event" && this.reason == "location") {
      this.text =
        `<p>
        Die Aktion <b>` +
        this.layoutParameter.eventName +
        `</b> wurde in deiner Region
        hinzugefügt. Sie findet am <b>` +
        datestring +
        `</b> in
        <b>` +
        this.layoutParameter.eventCity +
        ` </b>statt.
      </p>`;
      this.$parent.$refs.refNotifyHeading.innerHTML = this.layoutParameter.eventName;
    } else if (this.type == "event" && this.reason == "crew") {
      this.text =
        `<p>
        Neue Aktion <b>` +
        this.layoutParameter.eventName +
        `</b> in deiner Crew. Sie findet am <b>` +
        datestring +
        ` </b>statt.
      </p>`;
      this.$parent.$refs.refNotifyHeading.innerHTML = this.layoutParameter.eventName;
    } else if (this.type == "application" && this.reason == "own") {
      this.text =
        `    <p>
        Deine Bewerbung zum Event
        <b>` +
        this.layoutParameter.poolEventName +
        `</b> wurde geprüft. Der neue Status
        ist <b>` +
        this.layoutParameter.applicationState +
        `</b>
      </p>`;
      this.$parent.$refs.refNotifyHeading.innerHTML = this.layoutParameter.applicationState;
    } else if (this.type == "comment" && this.reason == "invested") {
      this.text =
        `  <p>
        <b>` +
        this.layoutParameter.userName +
        `
      </b> hat einen neuen Kommentar geschrieben in folgenden Event, dass du beobachtest:
      <b>` +
        this.layoutParameter.poolEventName +
        `</b>`;
      this.$parent.$refs.refNotifyHeading.innerHTML = this.layoutParameter.Text.substring(
        0,
        25
      );
    }
  },
};
</script>

