<template>
  <div class="layout">
    <div class="layout__sidebar">
      <img src="/logo.svg" alt="logo" />
      <the-menu></the-menu>
    </div>
    <div class="layout__header">
      <h5>&lt;/&gt;</h5>
      <div>
        <h4>QUERY ENGINE</h4>
        <p>You can run a query to search for data</p>
      </div>
    </div>
    <div class="layout__content">
      <slot />
    </div>
  </div>
</template>

<script>
import TheMenu from "./TheMenu.vue";

export default {
  components: {
    TheMenu,
  },
  setup() {},
};
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  display: grid;
  grid-template-areas:
    "sidebar header"
    "sidebar main "
    "sidebar main ";

  grid-template-columns: 100px 1fr;
  grid-template-rows: 120px;

  &__sidebar {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    border-right: 1px solid var(--vt-c-divider-light-1);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-area: sidebar;

    img {
      width: 100px;
      margin-top: 20px;
    }
  }

  &__header {
    height: 100%;
    grid-area: header;
    border-bottom: 1px solid var(--vt-c-divider-light-1);
    padding: 10px 30px;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    h4 {
      font-weight: bold;
      letter-spacing: 4px;
      font-size: 1.75rem;
      line-height: 28px;
    }

    h5 {
      margin-right: 10px;
      font-weight: bold;
      letter-spacing: 4px;
      font-size: 2.1rem;
      display: flex;
      position: relative;
      bottom: 6px;
    }
  }

  &__content {
    grid-area: main;
    overflow: hidden;
  }
}
</style>
