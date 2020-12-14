<template>
  <tr style="display: table; width: 100%; font-size: x-small">
    <td style="text-align: center">
      {{ name }}
    </td>
    <td style="text-align: center">
      {{ description }}
    </td>
    <td style="text-align: center">
      {{ requirement }}
    </td>
    <td style="text-align: right">
      <button @click="$emit('on-delete', id)" class="btn">
        <i class="material-icons" style="font-size: 20px; color: white">
          delete</i
        >
      </button>
    </td>
  </tr>
</template>

<script>
import "../assets/materialize.min.css";

export default {
  name: "SetUpFilterEntry",

  props: {
    id: String,
    name: String,
    description: String,
    requirement: String,
  },
};
</script>
