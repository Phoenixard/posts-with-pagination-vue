<template>
  <h1>Posts with pagination</h1>
  <Controls
    v-model:perPage="perPage"
    v-model:inPagination="inPagination"
    />
  <List
    :currentPage="currentPage"
    :perPage="perPage"
    :data="data"
  />
  <Pagination
    :currentPage="currentPage"
    :perPage="perPage"
    :elementsCount="data.length"
    :inPagination="inPagination"
    @changePage="onChangePage"
  />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import List from "../components/List.vue"
import Pagination from "../components/Pagination.vue"
import Controls from "../components/Controls.vue";

const router = useRouter()
const route = useRoute()

const data = ref([])
const perPage = ref(5)
const inPagination = ref(5)
const currentPage = ref(1)

const pageId = computed({
  get() {
    return route.query.pageId ?? ''
  },
  set(pageId) {
    router.replace({ query: { pageId } })
  }
})

const onChangePage = (newPage) => {
  currentPage.value = newPage
  pageId.value = newPage
}

const availableElements = computed(() => {
  return data.value.length / perPage.value
})

const fetchList = () => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => {
      data.value = json
    })
    .catch(error => {
      console.log(error);
    })
}

onMounted(() => {
  if (pageId.value && pageId.value > availableElements.value) {
    currentPage.value = 1
  }
  if (pageId.value && pageId.value < availableElements.value) {
    currentPage.value = Number(pageId.value)
  }
  fetchList()
})
</script>