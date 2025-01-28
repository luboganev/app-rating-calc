<script lang="ts">
import { defineComponent, ref } from 'vue';
import StarRatingCountInput from './StarRatingCountInput.vue';
import { createEmptyRatingsCountArray } from '../utils/ratingUtils';

export default defineComponent({
  name: 'StarRatingCollection',
  components: {
    StarRatingCountInput,
  },
  emits: ['update:ratings'],
  setup(_, { emit }) {
    const ratings = ref<number[]>(createEmptyRatingsCountArray());
    const ratingCountInputItems = ref();

    const updateRating = (index: number, newValue: number) => {
      ratings.value[index] = newValue;
      emit('update:ratings', ratings.value);
    };

    const reset = () => {
      ratingCountInputItems.value.forEach((item: (typeof StarRatingCountInput)) => {
        item.reset();
      });
    };

    return {
      ratings,
      updateRating,
      reset,
      ratingCountInputItems,
    };
  }
});
</script>

<template>
  <div v-for="i in 5" :key="i" class="ratingRow">
    <StarRatingCountInput :rating="i" :count="ratings[i - 1]"
      @update:count="updateRating(i - 1, $event)"
      ref="ratingCountInputItems"/>
  </div>
</template>

<style>
.ratingRow {
  margin-bottom: 1rem;
}
</style>
