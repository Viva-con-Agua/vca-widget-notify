<template>
  <div>
    <VcABox>
      <table v-if="conditions.length > 0">
        <tr style="display: table; width: 100%">
          <th style="text-align: center">name</th>
          <th style="text-align: center">description</th>
          <th style="text-align: center">requirement</th>
        </tr>
        <SetUpFilterEntry
          v-for="(condition, index) in conditions"
          :key="index"
          :name="condition.name"
          :description="condition.description"
          :requirement="condition.requirement"
          :id="condition._id"
          @on-delete="deleteCondition"
        />
      </table>

      <p v-else>bisher keine Conditions eingestellt</p>

      <el-card style="margin-top: 30px">
        <form>
          <input
            v-model="name"
            type="text"
            class="form-control"
            placeholder="Name for Pipeline (unique)"
          />
          <input
            v-model="description"
            type="text"
            class="form-control"
            placeholder="Description (displayed in user menu)"
          />
          <input
            v-model="requirement"
            type="text"
            class="form-control"
            placeholder="Condition in javascript code"
          />
        </form>

        <button
          @click="addCondition(name, description, requirement)"
          class="btn"
        >
          add
        </button>
      </el-card>
      <div>
        <span v-if="!readMoreActivated">Info zu möglichen Parametern</span>
        <i
          class="material-icons"
          style="font-size: 30px"
          v-if="!readMoreActivated"
          @click="activateReadMore()"
          >expand_more</i
        >
        <span v-if="readMoreActivated">
          <ul
            class="list-group"
            style="display: inline-block"
            title="Data from matchingParameter"
          >
            <h5>Data from matchingParameter</h5>
            <p>Benutzen mit notification.{parameterName}</p>

            <li v-for="(param, index) in notifymatch" :key="index">
              {{ param }}
            </li>
          </ul>

          <ul
            class="list-group"
            style="display: inline-block"
            title="Data form user Database"
          >
            <h5>Data from user Database</h5>
            <p>Benutzen mit user.{parameterName}</p>

            <li v-for="(param, index) in userparameter" :key="index">
              {{ param }}
            </li>
          </ul>
          <i
            class="material-icons"
            style="font-size: 30px"
            v-if="readMoreActivated"
            @click="activateReadMore()"
          >
            close</i
          >
        </span>
      </div>
    </VcABox>
  </div>
</template>

<script>
import SetUpFilterEntry from "../components/SetUpFilterEntry";
import { VcABox } from "vca-widget-base";
import "vca-widget-base/dist/vca-widget-base.css";
import "../assets/pool_event_style.css";
import "../assets/app2.css";
import "../assets/materialize.min.css";

export default {
  name: "SetUpPipelines",
  components: {
    VcABox: VcABox,
    SetUpFilterEntry,
  },

  data() {
    return {
      name: "",
      description: "",
      requirement: "",
      readMoreActivated: false,
    };
  },
  props: {
    Microservice: String,
    notifytypes: String,
    conditions: Array,
    notifymatch: Array,
    userparameter: Array,
  },
  mounted: function() {
    console.log(this.conditions);
    console.log(this.notifymatch);
  },
  methods: {
    addCondition(name, description, requirement) {
      this.name = "";
      this.description = "";
      this.requirement = "";
      this.$emit(
        "add-condition",
        name,
        description,
        requirement,
        this.notifytypes
      );
    },
    deleteCondition(id) {
      this.$emit("delete-condition", id, this.notifytypes);
    },
    activateReadMore() {
      console.log(this.readMoreActivated);
      if (this.readMoreActivated == false) {
        this.readMoreActivated = true;
      } else {
        this.readMoreActivated = false;
      }
    },
  },
};
</script>
