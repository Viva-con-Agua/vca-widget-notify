<template>
  <div>
    <p>
      Text with info about Notification
      <b>{{ notifyObject.layoutParameter1 }}</b> with layoutparameters in
      between <b>{{ notifyObject.layoutParameter1 }}</b> in
    </p>
  </div>
</template>

<script>
export default {
  name: "VcANotificationTemplate",
  props: {
    notifyObject: {},
  },
  methods: {},
  mounted: function () {
    console.log(this.notifyObject);
    this.$parent.$refs.refNotifyHeading.innerHTML = this.notifyObject.layoutParameterTitle;
  },
};
</script>

<style scoped></style>
