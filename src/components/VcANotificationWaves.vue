<template>
    <div>

        <p>Die Aktion <b>{{notifyObject.poolEventName}}</b> wurde in deiner Region hinzugefügt. Sie findet am
            <b>{{notifyObject.poolEventDate}}</b> in <b>{{notifyObject.poolEventCity}}
            </b>statt und ist <b>{{notifyObject.poolEventDistanceKm}} km</b>  von dir entfernt.</p>
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
    this.$parent.$refs.refNotifyHeading.innerHTML=this.notifyObject.poolEventName;
  }
}

</script>

<style scoped>
</style>
