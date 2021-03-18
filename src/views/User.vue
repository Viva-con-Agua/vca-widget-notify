<template
  ><div>
    <UserContactData> VcA information box </UserContactData>

    <UserSubscribtions> VcA information box </UserSubscribtions>
  </div>
</template>

<script>
import UserSubscribtions from "../components/UserSubscribtions";
import UserContactData from "../components/UserContactData";

export default {
  name: "User",
  components: {
    UserSubscribtions,
    UserContactData,
  },
  mounted: function() {

  },
};
</script>
