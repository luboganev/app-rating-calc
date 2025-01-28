<script setup lang="ts">
import { ref } from 'vue';
import StarRatingCountInput from './StarRatingCountInput.vue';

const props = defineProps<{
  ratings: Array<number>;
}>();

const emit = defineEmits<{
  (event: 'update:ratings', ratings: Array<number>): void;
}>();

const ratingsCount = ref<Array<number>>(props.ratings);
const ratingCountInputItems = ref();

const updateRating = (index: number, newValue: number) => {
  ratingsCount.value[index] = newValue;
  emit('update:ratings', ratingsCount.value);
};

const reset = () => {
  ratingCountInputItems.value.forEach((item: (typeof StarRatingCountInput)) => {
    item.reset();
  });
};

defineExpose({ reset });
</script>

<template>
  <div v-for="i in 5" :key="i" class="ratingRow">
    <StarRatingCountInput :ratingType="i" :count="ratingsCount[i - 1]" @update:count="updateRating(i - 1, $event)"
      ref="ratingCountInputItems" />
  </div>
</template>

<style>
.ratingRow {
  margin-bottom: 1rem;
}
</style>
