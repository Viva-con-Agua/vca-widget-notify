<template>
    <div>

        <div v-if="notifyObject.poolEventRecursionDepth > 0">
            <p> Die Veranstaltung <b>{{notifyObject.poolEventName}}</b> mit dem Künstler {{notifyObject.poolEventFavoriteArtist}} könnte
                dir gefallen, weil du {{notifyObject.poolEventArtistHeuristicName}} als Favorit hinterlegt hast. Sie findet am {{notifyObject.poolEventDate}} in {{notifyObject.poolEventCity}}
                statt. </p>

        </div>

        <div v-if="notifyObject.poolEventRecursionDepth == 0">
            <p>Die Veranstaltung <b>{{notifyObject.poolEventName}}</b>  mit deinem favorisierten Künstler
               {{notifyObject.poolEventFavoriteArtist}} wurde hinzugefügt.
                Sie findet am {{notifyObject.poolEventDate}} in
                {{notifyObject.poolEventCity}}
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
    methods: {},
    mounted: function () {
      //this.$parent.$refs.refNotifyHeading.innerHTML = this.notifyObject.poolEventName
      this.$parent.$refs.refNotifyHeading.innerHTML = "Aktion";
      this.$parent.$refs.collapsibleContent.innerHTML = "Die Bewerbungsfrist endet am " + this.notifyObject.poolEventApplicationEndDate+ " um "+this.notifyObject.poolEventApplicationEndTime.substring(0, this.notifyObject.poolEventApplicationEndTime.length-3)+" Uhr. Wir suchen fleißige Helfer, die uns beim " + this.notifyObject.poolEventVcaActivities+" unterstützen.";




    }
  }

</script>

<style scoped>
</style>
