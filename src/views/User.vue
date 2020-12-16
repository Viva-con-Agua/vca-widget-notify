<template
  ><div>
    <!--<Usersetting> VcA information box </Usersetting>-->

    <Userfilter> VcA information box </Userfilter>
  </div>
</template>

<script>
import Userfilter from "../components/Userfilter";
// import Usersetting from "../components/Usersetting";

export default {
  name: "User",
  components: {
    Userfilter,
    // Usersetting,
  },
  mounted: function() {
    if (!this.$cookies.get("access_token")) {
      this.$router.push({ name: "home" });
    }
  },
};
</script>
