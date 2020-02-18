<template>
    <div>

        <div v-if="notifyObject.poolEventRecursionDepth > 0">
            <p>Die Veranstaltung mit dem Künstler <b>{{notifyObject.poolEventFavoriteArtist}}</b> könnte
                dir gefallen. Die Veranstaltung findet am <b>{{notifyObject.poolEventDate}}</b> in <b>{{notifyObject.poolEventCity}}</b>
                statt. Du erhältst diese Meldung, weil
            du <b>{{notifyObject.poolEventArtistHeuristicName}}</b> als favorisierten Künstler hinterlegt hast. </p>

        </div>



        <div v-if="notifyObject.poolEventRecursionDepth == 0">
            <p>Eine Veranstaltung mit deinem favorisierten Künstler
                <b>{{notifyObject.poolEventFavoriteArtist}}</b> wurde hinzugefügt.
                Die Veranstaltung findet am <b>{{notifyObject.poolEventDate}}</b> in <b>{{notifyObject.poolEventCity}}</b>
                statt. </p>
        </div>



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
