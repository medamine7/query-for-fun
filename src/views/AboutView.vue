<template>
  <div class="about-view">
    <h1>
      Query for fun. Created by
      <a href="http://baladi.codes/" target="_blank">Mohamed Amine Baladi</a>.
    </h1>
  </div>
</template>

<style lang="scss" scoped>
.about-view {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  h1 {
    font-weight: normal;
    font-size: 18px;
  }

  a {
    color: var(--main-green);
    text-decoration: underline;
  }
}
</style>
