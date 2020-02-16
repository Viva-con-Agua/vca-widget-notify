<template>
  <div>
    <p>
      Deine Bewerbung zum Event
      <b>{{ notifyObject.poolEventName }}</b> wurde geprüft. DDer neue Status
      ist <b>{{ notifyObject.applicationState }}</b>
    </p>
  </div>
</template>

<script>
export default {
  name: "VcANotificationApp",
  props: {
    notifyObject: {
      type: Object
    }
  },
  methods: {},
  mounted: function() {
    this.$parent.$refs.refNotifyHeading.innerHTML = this.notifyObject.applicationState;
  }
};
</script>

<style scoped></style>
