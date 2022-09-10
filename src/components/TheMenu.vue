<template>
  <ul>
    <router-link
      v-for="(item, index) in menu"
      :key="index + 'link'"
      :to="item.path"
      active-class="active"
    >
      <li>
        <component :is="item.icon"></component>
        <span>{{ item.name }}</span>
      </li>
    </router-link>
  </ul>
</template>

<script>
import homeIcon from "./icons/homeIcon.vue";
import aboutIcon from "./icons/aboutIcon.vue";

export default {
  setup() {
    const menu = [
      { name: "Home", icon: homeIcon, path: "/" },
      { name: "About", icon: aboutIcon, path: "/about" },
    ];

    return {
      menu,
    };
  },
};
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 60px;

  a {
    margin-top: 40px;

    &.active {
      color: var(--main-green);

      svg {
        fill: var(--main-green);
      }
    }
  }

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: color 0.4s ease;

    svg {
      height: 25px;
      width: 25px;
      object-fit: contain;
      transition: fill 0.4s ease;
    }

    span {
      font-size: 14px;
      margin-top: 4px;
    }
  }
}
</style>
