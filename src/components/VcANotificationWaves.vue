<template>
  <div>
    <p>
      Die Aktion <b>{{ notifyObject.eventName }}</b> wurde in deiner Region
      hinzugefügt. Sie findet am <b>{{ notifyObject.eventDate }}</b> in
      <b>{{ notifyObject.eventCity }} </b>statt und ist
      <b>{{ notifyObject.poolEventDistanceKm }} km</b> von dir entfernt.
    </p>
  </div>
</template>

<script>
export default {
  name: "VcANotificationWaves",
  props: {
    notifyObject: {
      type: Object,
    },
  },
  methods: {},
  mounted: function() {
    this.$parent.$refs.refNotifyHeading.innerHTML = this.notifyObject.eventName;
  },
};
</script>

<style scoped></style>
