<template>
  <div>
    <el-card>
      <form>
        <p>{{ name }}</p>
        <select
          class="browser-default"
          v-model="categoryRef"
          @change="select()"
        >
          <option :value="null" selected disabled>Select Category</option>
          <option v-for="item in categories" :key="item">
            {{ item }}
          </option>
        </select>
      </form>
    </el-card>
  </div>
</template>

<script>
import "vca-widget-base/dist/vca-widget-base.css";
import "../assets/pool_event_style.css";

export default {
  name: "SetUpTypes",

  data() {
    return {
      categories: ["Aktionen", "Crew Info & Soziales", "Spenden & Projekte"],
      categoryRef: this.category,
    };
  },
  mounted: function () {
    console.log(this.name);
  },
  props: {
    name: String,
    category: String,
  },
  methods: {
    select() {
      this.$emit("saveCategory", this.name, this.categoryRef);
    },
  },
};
</script>
