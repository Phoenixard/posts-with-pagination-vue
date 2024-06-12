<template>
  <div class="list">
    <div
      v-for="element in listToShow"
      :key="element"
      class="list__item"
    >
      <div class="list__item-title">{{ element.title }}</div>
      <div class="list__item-body">{{ element.body }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  perPage: {
    type: Number,
    default: 10
  },
  currentPage: {
    type: Number,
    default: 1
  },
  data: {
    type: Array,
    default: () => []
  },
})

const listToShow = computed(() => {
  return props.data.slice((props.currentPage - 1) * props.perPage, props.currentPage * props.perPage)
})
</script>

<style lang="scss">
.list {
  &__item {
    text-align: left;
    margin-bottom: 10px;
    padding: 20px;
    background: #e7e7e7;
    border-left: 5px solid #41b883;
    &:last-child {
      margin-bottom: 0;
    }

    @media screen and (max-width: 768px) {
      padding: 10px;
    }
  }
  &__item-title {
    font-weight: bold;
    text-transform: capitalize;
    font-size: 20px;
    
    @media screen and (max-width: 768px) {
      font-size: 16px;
    }
  }
  &__item-body {
    @media screen and (max-width: 768px) {
      font-size: 14px;
    }
  }
}
</style>