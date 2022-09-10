<template>
  <div class="code-editor">
    <div class="code-editor__editor">
      <Editor
        height="100%"
        width="100%"
        theme="vs-dark"
        defaultLanguage="pgsql"
        language="pgsql"
        :value="value"
        :options="{ fontSize: '16px', fontFamily: 'monospace' }"
        :onChange="syncValue"
      />
    </div>
    <div class="code-editor__button">
      <button
        @click="runQuery"
        :style="{ cursor: isLoading ? 'default' : 'pointer' }"
      >
        <template v-if="isLoading">
          <img src="/spinner.png" alt="loading" /> Running...</template
        >
        <template v-else>► Run query</template>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, unref, watch } from "vue";
import Editor from "@guolao/vue-monaco-editor";
import { useQueryStore } from "@/stores/query";
import { getData } from "@/data/queries";

export default {
  components: {
    Editor,
  },
  props: {
    defaultValue: {
      default: "// Some comment",
    },
  },
  setup(props, context) {
    const value = ref(props.defaultValue);
    const queryState = useQueryStore();
    const isLoading = computed(() => queryState.isLoading);
    const active = computed(() => queryState.active);

    const runQuery = async () => {
      context.emit("submit", unref(value));
    };

    const syncValue = (input) => {
      value.value = input;
    };

    watch(active, (newVal, oldVal) => {
      if (oldVal === newVal || !newVal) return;

      const query = getData("id", unref(active));
      value.value = query.content;
    });

    return {
      runQuery,
      syncValue,
      isLoading,
      value,
    };
  },
};
</script>

<style lang="scss" scoped>
.code-editor {
  padding: 20px;

  &__editor {
    height: 200px;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  &__button {
    button {
      width: 100px;
      height: 30px;
      background: var(--main-green);
      color: #fff;
      border: none;
      margin-top: 20px;
      cursor: pointer;
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;

      img {
        width: 20px;
        height: 20px;
        object-fit: contain;
        margin-right: 5px;
        animation: spin infinite 0.8s linear;
      }
    }
  }
}
</style>
