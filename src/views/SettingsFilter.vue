<template>
  <div>
    <VcAFrame title="Set up Filter" hasContainer="true">
      <el-form :model="form" ref="form" class="columns-container">
        <VcAColumn>
          <VcABox
            v-for="(item, index) in notifytypes"
            :key="index"
            :title="item"
          >
            <el-table :data="notifyfilter[item]">
              <el-table-column type="index"></el-table-column>
              <el-table-column prop="name" label="name"> </el-table-column>
              <el-table-column prop="filter_matchingParameter" label="">
              </el-table-column>
              <el-table-column prop="filter_operator" label="filter">
              </el-table-column>
              <el-table-column prop="filter_userParameter" label="">
              </el-table-column>
            </el-table>

            <el-card style="margin-top: 30px">
              <ul style="display: flex;">
                <li style="margin-right: 10px">
                  <div class="box">
                    <select v-model="form.first[item]" style="display: unset;">
                      <option
                        v-for="(item2, index2) in notifymatch[item]"
                        :key="index2"
                        :label="item2"
                        :value="index2"
                      >
                      </option>
                    </select>
                  </div>
                </li>

                <li style="margin-right: 10px">
                  <div class="box">
                    <select
                      v-model="form.operator[item]"
                      style="display: unset;"
                    >
                      <option
                        v-for="(item2, index2) in operator"
                        :key="index2"
                        :label="item2"
                        :value="index2"
                      >
                      </option>
                    </select>
                  </div>
                </li>
                <li>
                  <div class="box">
                    <select v-model="form.second[item]" style="display: unset;">
                      <option
                        v-for="(item2, index2) in notifymatch[item]"
                        :key="index2"
                        :label="item2"
                        :value="index2"
                      >
                      </option>
                    </select>
                  </div>
                </li>
                <li>
                  <el-form-item
                    style="display: inline-block; margin-left: 10px"
                  >
                    <router-link class="el-button" to="/settingsfilter"
                      >Speichern
                    </router-link>
                  </el-form-item>
                </li>
              </ul>
            </el-card>
          </VcABox>
        </VcAColumn>
      </el-form>
    </VcAFrame>
  </div>
</template>

<script>
import { VcAFrame, VcAColumn, VcABox } from "vca-widget-base";
import "vca-widget-base/dist/vca-widget-base.css";
import { Form, Table, TableColumn } from "element-ui";
import "../assets/pool_event_style.css";
import axios from "axios";
import "../assets/app2.css";
import "../assets/materialize.min.css";

export default {
  name: "Send",
  components: {
    VcAFrame: VcAFrame,
    VcAColumn: VcAColumn,
    VcABox: VcABox,
    "el-form": Form,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },

  data() {
    return {
      notifytypes: [],
      notifyfilter: [],
      notifymatch: [],
      operator: ["==", "IN", ">", ">=", "<", ">="],

      form: {
        name: "",
        api: "",
        first: [],
        operator: [],
        second: [],
      },
    };
  },
  mounted: function() {
    const backend = process.env.VUE_APP_BACKEND_DEV;
    console.log(backend);

    axios
      .post(`${backend}/events/info`, {
        name: "waves",
      })
      .then(
        function(response) {
          var types = response.data.types;
          var filter = response.data.filter;
          var matching = response.data.matching;
          // var matching = response.data.matching;

          // console.log(response.data);
          // console.log(filter);
          console.log(matching);
          // console.log(this.matching);

          for (var i = 0; i < types.length; i++) {
            this.notifytypes.push(types[i]);
            this.notifyfilter[types[i]] = [];
            this.notifymatch[types[i]] = [];
            this.form.first[types[i]] = 0;
            this.form.operator[types[i]] = 0;
            this.form.second[types[i]] = 0;

            for (var j = 0; j < filter.length; j++) {
              if (filter[j].type == types[i]) {
                this.notifyfilter[types[i]].push(filter[j]);
              }
            }

            for (var n = 0; n < matching.length; n++) {
              // console.log(matching[n]);

              if (matching[n].type == types[i]) {
                for (var k = 0; k < matching[n].parameter.length; k++) {
                  this.notifymatch[types[i]].push(matching[n].parameter[k]);
                }
              }
            }
          }

          console.log(this.notifymatch);

          // this.notifytypes = response.data.types;
          // console.log(this.notifytypes);
        }.bind(this)
      )
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          console.log("valid");
        }
      });
    },
    cancel() {
      this.$emit("cancelled");
    },
  },
};
</script>
