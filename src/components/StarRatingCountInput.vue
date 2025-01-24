<script lang="ts">

import { defineComponent, PropType } from 'vue';
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
  methods: {
    onInput(event: Event) {
      const target = event.target as HTMLInputElement;
      let newValue = parseInt(target.value);

      // Check if newValue is a valid number and non-negative
      if (isNaN(newValue) || newValue < 0) {
        newValue = 0; // Reset value to 0 if it's invalid or negative
      }

      this.$emit('update:count', newValue);

      // Update the input value to prevent entering invalid/negative numbers
      target.value = newValue.toString();
    },
  },
});
</script>

<template>
  <div class="inline-container">
    <IconStar v-for="i in rating" :key="i" />
    <div class="filler"></div>
    <input type="number" :value="count" @input="onInput" class="text-input" min="0" />
  </div>
</template>

<style scoped>
.inline-container {
  display: flex;
  /* Use Flexbox for horizontal alignment */
  align-items: center;
  /* Center items vertically */
  gap: 10px;
  /* Space between the input and the button */
}

.filler {
  flex: 1;
}

.text-input {
  width: 80px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  /* Ensures padding is included in total width */
}
</style>
