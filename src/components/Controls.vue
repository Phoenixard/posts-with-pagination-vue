<template>
  <div class="controls">
    <div class="controls__inner">
      <div class="controls__col">
        <span class="controls__label">Elements per page:</span>
        <select
          class="controls__select"
          v-model="elementsPerPage"
          @change="changeQuantity"
        >
          <option
            class="controls__option"
            v-for="element in elementsOnPageConfig"
            :key="element"
            :value="element"
          >
            {{ element }}
          </option>
        </select>
      </div>
      <div class="controls__col">
        <span class="controls__label">Elements in pagination:</span>
        <select
          class="controls__select"
          v-model="elementsInPagination"
          @change="changeQuantityPagination"
        >
          
            <option
            v-for="element in elementsInPaginationConfig"
              :key="element"
              :value="element"
              class="controls__option"

            >
              {{ element }}
            </option>
        
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  elementsPerPage: {
    type: Number,
    default: 10
  },
  elementsInPagination: {
    type: Number,
    default: 5
  }
})

const emit = defineEmits([ 'changeElementsPerPage', 'changeElementsInPagination' ])

const elementsPerPage = ref(props.elementsPerPage)
const elementsInPagination = ref(props.elementsInPagination)

const elementsOnPageConfig = [ 5, 10, 20, 50 ]
const elementsInPaginationConfig = [ 3, 5, 7 ]

const changeQuantity = () => {
  emit('changeElementsPerPage', elementsPerPage.value)
}

const changeQuantityPagination = () => {
  emit('changeElementsInPagination', elementsInPagination.value)
}
</script>

<style lang="scss">
.controls {
  &__inner {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    background: #e7e7e7;
    padding: 10px;
    justify-content: center;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 10px;
      padding: 10px;
    }
  }

  &__col {
    display: flex;
    flex-direction: column;
    gap: 5px;

    @media (max-width: 768px) {
      width: 100%;
      max-width: 320px;
      margin: 0 auto;
    }
  }

  &__label {
    font-weight: bold;

    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  &__select {
    font-size: 16px; 
    padding: 5px 10px;

    @media (max-width: 768px) {
      font-size: 12px;
      padding: 3px 5px;
    }

    &:focus {
      outline: none;
    }
  }

  &__option {
    font-size: 14px;
    user-select: none;
    -webkit-tap-highlight-color: transparent;

    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
}
</style>