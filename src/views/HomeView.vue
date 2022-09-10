<template>
  <div class="home-view">
    <div class="home-view__main">
      <CodeEditor @submit="runQuery" :default-value="queries[0].content" />
      <div class="home-view__results" ref="resultsRef">
        <div class="home-view__loading" v-if="isLoading">
          <img src="/spinner.png" alt="loading" />
          <h6>Loading...</h6>
        </div>
        <div class="home-view__no-data" v-else-if="noData">
          <img src="/no-data.svg" alt="no data" />
          <h6>No data was found, try a different query.</h6>
        </div>
        <template v-else-if="queryData.length">
          <div class="home-view__table-header">
            <h4>
              Table: <span>{{ activeTable }}</span>
            </h4>
            <ul class="home-view__pagination">
              <li
                :class="{ disabled: pageDetails.active <= 1 }"
                @click="goPrev"
              >
                &lt;
              </li>
              <li
                v-for="index in pageDetails.total"
                :key="'page' + index"
                @click="setPage(index)"
                :class="{ active: pageDetails.active === index }"
              >
                {{ index }}
              </li>
              <li
                :class="{ disabled: pageDetails.active >= pageDetails.total }"
                @click="goNext"
              >
                &gt;
              </li>
            </ul>
          </div>
          <div
            class="home-view__table"
            ref="tableRef"
            @scroll="handleTableScroll"
          >
            <data-table :data="queryData" />
          </div>
        </template>
      </div>
    </div>
    <div class="home-view__suggestions">
      <h3>My Queries</h3>
      <div class="home-view__cards">
        <the-card
          @submit="runQuery"
          class="home-view__card"
          v-for="(query, index) in queries"
          :key="'card' + index"
          :config="{
            title: query.name,
            content: query.content,
            author: query.author,
          }"
        ></the-card>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, nextTick, reactive, ref, watch } from "vue";
import CodeEditor from "@/components/CodeEditor.vue";
import TheCard from "@/components/TheCard.vue";
import queries, { getDataByQuery } from "@/data/queries";
import DataTable from "@/components/DataTable.vue";
import { useQueryStore } from "@/stores/query";
import { sleep } from "@/utils/promise";
import { paginate } from "@/utils/array";

const PER_PAGE = 100;

export default {
  components: {
    CodeEditor,
    TheCard,
    DataTable,
  },
  setup() {
    let rawData;
    const queryState = useQueryStore();
    const queryData = ref([]);
    const isLoading = computed(() => queryState.isLoading);
    const activeTable = ref("");
    const tableRef = ref(null);
    const pageDetails = reactive({
      active: 1,
      total: 1,
    });
    const resultsRef = ref(null);
    const noData = ref(false);

    const runQuery = async (query) => {
      if (isLoading.value) return;

      queryState.setLoading(true);
      noData.value = false;
      resetPageDetails();

      const result = getDataByQuery(query);
      if (!result) {
        await sleep(2000);
        queryState.setActive(0);
        noData.value = true;
        queryState.setLoading(false);
        return;
      }

      const { data, table, id } = result;
      rawData = data;
      queryState.setActive(id);

      const paginated = paginate(rawData, pageDetails.active, PER_PAGE);
      queryData.value = paginated.data;

      pageDetails.active = paginated.page;
      pageDetails.total = paginated.totalPages;

      activeTable.value = table;
      await sleep(2000);
      queryState.setLoading(false);
      nextTick(handleTableScroll);
    };

    const handleTableScroll = () => {
      const {
        scrollWidth = 0,
        scrollLeft = 0,
        offsetWidth = 0,
      } = tableRef.value;

      if (scrollLeft + offsetWidth >= scrollWidth)
        resultsRef.value.classList.remove("scroll-right");
      else resultsRef.value.classList.add("scroll-right");

      if (tableRef.value.scrollLeft <= 0)
        resultsRef.value.classList.remove("scroll-left");
      else resultsRef.value.classList.add("scroll-left");
    };

    const goPrev = () => {
      if (pageDetails.active <= 1) return;
      pageDetails.active--;
    };

    const goNext = () => {
      if (pageDetails.active >= pageDetails.total) return;
      pageDetails.active++;
    };

    const setPage = (page) => {
      pageDetails.active = page;
    };

    const resetPageDetails = () => {
      pageDetails.active = 1;
      pageDetails.total = 1;
    };

    watch(
      () => pageDetails.active,
      () => {
        const paginated = paginate(rawData, pageDetails.active, PER_PAGE);
        queryData.value = paginated.data;
      }
    );

    return {
      queries,
      isLoading,
      queryData,
      activeTable,
      runQuery,
      handleTableScroll,
      resultsRef,
      noData,
      pageDetails,
      tableRef,
      goPrev,
      goNext,
      setPage,
    };
  },
};
</script>

<style lang="scss" scoped>
.home-view {
  display: flex;
  height: 100%;
  overflow: hidden;

  &__main {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
  }

  &__suggestions {
    width: 400px;
    border-left: 1px solid var(--vt-c-divider-light-1);
    background: #1d1d1d;
    overflow: hidden;
    overflow-y: auto;
    padding-bottom: 100px;

    h3 {
      margin: 0;
      padding: 10px 20px;
      font-weight: bold;
      border-bottom: 1px solid var(--vt-c-divider-light-1);
    }
  }

  &__cards {
    padding: 0 10px;
  }

  &__card {
    margin-top: 20px;
  }

  &__results {
    flex: 1;
    border-top: 1px solid var(--vt-c-divider-light-1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;

    h4 {
      font-size: 24px;
      padding: 10px 20px;
      font-weight: bold;

      span {
        font-family: monospace;
        margin-left: 10px;
      }
    }

    &:before,
    &:after {
      content: "";
      position: absolute;
      top: 60px;
      bottom: 0;
      width: 80px;
      z-index: 1;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
    }

    &:before {
      right: 0;
      background: linear-gradient(to left, #181818, transparent);
    }

    &:after {
      left: 0;
      background: linear-gradient(to right, #181818, transparent);
    }

    &.scroll-left:after {
      opacity: 1;
    }

    &.scroll-right:before {
      opacity: 1;
    }
  }

  &__loading,
  &__no-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;

    h6 {
      font-size: 24px;
      margin-top: 30px;
    }

    img {
      width: 60px;
    }
  }

  &__loading {
    img {
      animation: spin infinite 0.8s linear;
      width: 40px;
    }

    h6 {
      margin-top: 10px;
    }
  }

  &__table {
    overflow: auto;
    flex: 1;
  }

  &__table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__pagination {
    margin-right: 20px;
    display: flex;
    align-items: center;
    gap: 10px;

    li {
      background-color: var(--vt-c-divider-dark-2);
      padding: 5px;
      height: 22px;
      width: 22px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 2px;
      cursor: pointer;
      transition: background-color 0.2s ease;
      font-weight: bold;
      user-select: none;

      &.active {
        background: #050505;
        pointer-events: none;
        cursor: default;
      }

      &.disabled {
        pointer-events: none;
        cursor: default;
        opacity: 0.5;
      }
    }
  }
}
</style>
