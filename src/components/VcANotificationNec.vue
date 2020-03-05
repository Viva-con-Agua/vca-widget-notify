<template>
  <div>
    <p>
      Die Aktion <b>{{ notifyObject.poolEventName }}</b> steht kurz bevor und
      braucht noch Helfer. Sie findet am
      <b>{{ notifyObject.poolEventDate }}</b> in
      <b>{{ notifyObject.poolEventCity }}</b> statt.
    </p>
  </div>
</template>

<script>
export default {
  name: 'VcANotificationWaves',
  props: {
    notifyObject: {
      type: Object
    }
  },
  methods: {},
  mounted: function () {
    this.$parent.$refs.refNotifyHeading.innerHTML = this.notifyObject.poolEventName
  }
}
</script>

<style scoped></style>
