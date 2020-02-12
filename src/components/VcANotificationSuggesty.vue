<template>
    <div>

        <p>Die Aktion <b>{{notifyObject.poolEventName}}</b> wurde hinzugefügt. Du erhältst diese Meldung, weil
            du <b>{{notifyObject.poolEventFavoriteArtist}}</b> als favorisierten Künstler hinterlegt hast.
            Die Veranstaltung findet am <b>{{notifyObject.poolEventDate}}</b> in <b>{{notifyObject.poolEventCity}}</b>
            statt.</p>
    </div>

</template>

<script>
export default {
  name: 'VcANotificationSuggesty',
  props: {
    notifyObject: {
      type: Object
    }
  },
  methods: {

  },
  mounted: function () {
    this.$parent.$refs.refNotifyHeading.innerHTML=this.notifyObject.poolEventName;
  }
}

</script>

<style scoped>
</style>
