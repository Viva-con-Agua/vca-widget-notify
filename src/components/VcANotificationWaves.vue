<template>
    <div>

        <p>Die Veranstaltung <b>{{notifyObject.poolEventName}}</b>  wurde in deiner Region hinzugefügt. Sie findet am {{notifyObject.poolEventDate}} in
            {{notifyObject.poolEventCity}} statt.</p>
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
  methods: {

  },
  mounted: function () {
    //this.$parent.$refs.refNotifyHeading.innerHTML = this.notifyObject.poolEventName;
    this.$parent.$refs.refNotifyHeading.innerHTML = "Aktion";
    this.$parent.$refs.collapsibleContent.innerHTML = "Die Bewerbungsfrist endet am " + this.notifyObject.poolEventApplicationEndDate+ " um "+this.notifyObject.poolEventApplicationEndTime.substring(0, this.notifyObject.poolEventApplicationEndTime.length-3)+" Uhr. Wir suchen fleißige Helfer, die uns beim " + this.notifyObject.poolEventVcaActivities+" unterstützen.";


    // {{notifyObject.poolEventName}}
    // {{notifyObject.poolEventDistanceKm}}
  }
}

</script>

<style scoped>
</style>
