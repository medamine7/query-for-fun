<template>
  <div class="card">
    <div class="card__title">
      {{ config.title }} <span @click="runQuery">►</span>
    </div>
    <code class="card__content language-sql">{{ config.content }}</code>
    <div class="card__author">{{ config.author }}</div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import Prism from "prismjs";
import "prismjs/components/prism-sql";
import "prismjs/themes/prism-tomorrow.css";

export default {
  props: {
    config: {
      required: true,
    },
  },
  setup(props, context) {
    const content = ref(props.config.content);

    onMounted(() => {
      Prism.highlightAll();
    });

    const runQuery = () => {
      context.emit("submit", props.config.content);
    };

    return {
      content,
      runQuery,
    };
  },
};
</script>

<style lang="scss" scoped>
.card {
  height: 200px;
  background: var(--color-background);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vt-c-divider-light-1);
  background: #181818;

  &__title {
    border-bottom: 1px solid var(--vt-c-divider-light-1);
    padding: 10px 20px;
    color: var(--main-green);
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      cursor: pointer;
    }
  }

  &__content {
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 0;
    background: #181818;
    flex-shrink: 1;
    overflow: hidden;
    white-space: pre-line;

    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 60px;
      background: linear-gradient(to top, #181818, transparent);
      pointer-events: none;
    }
  }

  &__author {
    margin-top: auto;
    padding: 10px 20px;
    border-top: 1px solid var(--vt-c-divider-light-1);
    display: flex;
    align-items: center;
    flex-shrink: 0;

    &:before {
      content: "";
      width: 15px;
      height: 15px;
      background: url("/user.png");
      background-repeat: no-repeat;
      background-size: contain;
      margin-right: 20px;
    }
  }
}
</style>
