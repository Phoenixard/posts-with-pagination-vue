<template>
  <div class="pagination">
    <div
      v-for="element in pagination"
      :key="element"
    >
      <button
      class="pagination__element"
        @click="$emit('changePage', element)"
        :class="{ 'pagination__element--active': element === currentPage }"
      >
        {{ element }}
      </button>

    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'

const emit = defineEmits(['changePage'])
const props = defineProps({
  currentPage: {
    type: Number,
    default: 1
  },
  perPage: {
    type: Number,
    default: 10
  },
  elementsCount: {
    type: Number,
    default: 100
  },
  inPagination: {
    type: Number,
    default: 5
  }
})

const availableElements = computed(() => {
  return props.elementsCount / props.perPage
})

let i = 0
let j = 0
let flag = false
const addPage = (arr) => {

			if (i % 2) {
				let newIndex = props.currentPage + j;

				if (!(newIndex > availableElements.value-1) && newIndex !== availableElements.value) {
					arr.push(newIndex)
				}

			} else {
				let newIndex = props.currentPage - j;
				let counter = (props.inPagination - 1) / 2;

				if (!(newIndex < counter) && newIndex !== availableElements.value && newIndex !== 1) {
					arr.unshift(newIndex)
				}
				flag = true
			}

			if (flag) {
				flag = false
				j = j+1
			} else {
				flag = false
			}

			i++

			if (arr.length < props.inPagination) {
				addPage(arr)
			} else {
				i = 0
				j = 0
			}
		}

const pagination = computed(() => {
  let pagination = []

  if (availableElements.value < (props.inPagination + 2)) {
    for (let i = 1; i <= availableElements.value; i++) {
      pagination.push(i)
    }
  }
  else {
    addPage(pagination)
    pagination.unshift(1)
    pagination.push(availableElements.value)
  }

  return pagination
})

watch(
  () => props.perPage,
  () => {
    if (props.currentPage > availableElements.value) {
      emit('changePage', 1)
    }
  }
)
</script>

<style lang="scss">
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  &__element {
    @media screen and (max-width: 768px) {
      font-size: 12px;
      padding: 4px 7px;
    }
  }

  &__element--active {
    outline: 2px solid #41b883;
  }
}
</style>