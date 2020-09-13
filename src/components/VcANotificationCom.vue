<template>
  <div>
    <p>
      Jemand hat auf deinen Kommentar zum Event
      <b>{{ notifyObject.poolEventName }}</b> reagiert.
    </p>
  </div>
</template>

<script>
export default {
  name: "VcANotificationCom",
  props: {
    notifyObject: {
      type: Object
    }
  },
  methods: {},
  mounted: function() {
    this.$parent.$refs.refNotifyHeading.innerHTML = this.notifyObject.commentResponse;
  }
};
</script>

<style scoped></style>
