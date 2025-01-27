<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import StarRatingCollection from './components/StarRatingCollection.vue';
import { calculateAverageRating, sumRatingCounts, createEmptyRatingsCountArray } from './utils/ratingUtils';

export default defineComponent({
  name: 'App',
  components: {
    StarRatingCollection,
  },
  setup() {
    const current = ref<number[]>(createEmptyRatingsCountArray());
    const needed = ref<number[]>(createEmptyRatingsCountArray());
    const currentRatings = ref();
    const neededRatings = ref();

    const updateCurrent = (ratings: number[]) => {
      current.value = [...ratings];
    };
    const updateNeeded = (ratings: number[]) => {
      needed.value = [...ratings];
    };

    const averageRating = computed(() => calculateAverageRating(
      sumRatingCounts(current.value, needed.value)
    ));

    const resetCurrent = () => {
      current.value = createEmptyRatingsCountArray();
      currentRatings.value.reset();
    };

    const resetNeeded = () => {
      needed.value = createEmptyRatingsCountArray();
      neededRatings.value.reset();
    };

    return {
      updateCurrent,
      updateNeeded,
      resetCurrent,
      resetNeeded,
      averageRating,
      currentRatings,
      neededRatings,
    };
  }
});
</script>

<template>
  <div id="app">
    <h2>Ratings calculator</h2>
    <Divider />
    <div class="inline-container">
      <h2>Current</h2>
      <div class="filler"></div>
      <Button @click="resetCurrent" label="Reset" />
    </div>
    <Divider />
    <StarRatingCollection @update:ratings="updateCurrent" ref="currentRatings" />
    <Divider />
    <div class="inline-container">
      <h2>New</h2>
      <div class="filler"></div>
      <Button @click="resetNeeded" label="Reset" />
    </div>
    <Divider />
    <StarRatingCollection @update:ratings="updateNeeded" ref="neededRatings"/>
    <Divider />
    <h2>Averate rating: {{ averageRating.toFixed(3) }}</h2>
    <Divider />
  </div>
</template>
