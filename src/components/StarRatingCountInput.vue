<script lang="ts">

import { defineComponent, ref } from 'vue';
import type { PropType } from 'vue'
import IconStar from './icons/IconStar.vue';

export default defineComponent({
  name: 'StarRatingCountInput',
  components: {
    IconStar,
  },
  props: {
    rating: {
      type: Number as PropType<number>,
      default: 5,
    },
    count: {
      type: Number as PropType<number>,
      default: 0,
    },
  },
  emits: ['update:count'],
  setup(_, { emit }) {
    const ratingsCountInput = ref();

    const onInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      let newValue = parseInt(target.value);


      // Check if newValue is a valid number and non-negative
      if (isNaN(newValue) || newValue < 0) {
        newValue = 0; // Reset value to 0 if it's invalid or negative
      }

      emit('update:count', newValue);

      // Update the input value to prevent entering invalid/negative numbers
      target.value = newValue.toString();
    }

    const reset = () => {
      ratingsCountInput.value.value = 0;
    }

    return {
      onInput,
      reset,
      ratingsCountInput,
    }
  }
});
</script>

<template>
  <div class="inline-container">
    <IconStar v-for="i in rating" :key="i" />
    <div class="filler"></div>
    <input type="number" :value="count" @input="onInput" class="text-input" min="0" ref="ratingsCountInput" />
  </div>
</template>

<style scoped>
.text-input {
  width: 80px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
}
</style>
