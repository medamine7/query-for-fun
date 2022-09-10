import { defineStore } from "pinia";

export const useQueryStore = defineStore("query", {
  state: () => ({
    isLoading: false,
    active: 0,
  }),
  actions: {
    setLoading(value) {
      this.isLoading = value;
    },
    setActive(id) {
      this.active = id;
    },
  },
});
