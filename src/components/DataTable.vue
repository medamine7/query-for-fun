<template>
  <table class="data-table">
    <tr>
      <th v-for="(column, i) in columns" :key="'column' + i">
        {{ column }}
      </th>
    </tr>
    <tr v-for="(record, j) in records" :key="'records' + j">
      <td v-for="(entry, k) in record" :key="'records' + k">{{ entry }}</td>
    </tr>
  </table>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    data: {
      type: Array,
      require: true,
    },
  },
  setup(props) {
    const columns = Object.keys(props.data[0]);
    const records = computed(() =>
      props.data.map((record) => Object.values(record))
    );

    return {
      columns,
      records,
    };
  },
};
</script>

<style lang="scss" scoped>
.data-table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  border-radius: 4px;
  border-collapse: collapse;
  font-family: var(--main-font-family);

  td,
  th {
    border: 1px solid var(--vt-c-divider-light-1);
    text-align: left;
    padding: 8px;
    white-space: nowrap;
  }

  th {
    font-weight: bold;
    background: #101010;
  }

  tr:nth-child(even) {
    background-color: var(--vt-c-divider-light-1);
  }
}
</style>
