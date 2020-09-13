<template>
  <div>
    <p>
      Es gibt Neuigkeiten in folgenden Event, dass du beobachtest:
      <b>{{ notifyObject.poolEventName }}</b>
    </p>
  </div>
</template>

<script>
export default {
  name: "VcANotificationNews",
  props: {
    notifyObject: {
      type: Object
    }
  },
  methods: {},
  mounted: function() {
    this.$parent.$refs.refNotifyHeading.innerHTML = this.notifyObject.newsType;
  }
};
</script>

<style scoped></style>
