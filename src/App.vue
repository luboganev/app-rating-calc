<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import StarRatingCountInput from './components/StarRatingCountInput.vue';
import { calculateAverageRating, sumRatingCounts } from './utils/ratingUtils';

export default defineComponent({
  name: 'App',
  components: {
    StarRatingCountInput,
  },
  setup() {
    const currentCountValues = ref<number[]>(new Array(5).fill(0));
    const neededCountValues = ref<number[]>(new Array(5).fill(0));

    const updateCountCurrent = (index: number, newValue: number) => {
      currentCountValues.value[index] = newValue;
    };
    const updateCountNeeded = (index: number, newValue: number) => {
      currentCountValues.value[index] = newValue;
    };

    const averageRating = computed(() => calculateAverageRating(
      sumRatingCounts(currentCountValues.value, neededCountValues.value)
    ));

    return {
      currentCountValues,
      neededCountValues,
      updateCountCurrent,
      updateCountNeeded,
      averageRating,
    };
  }
});
</script>

<template>
  <div id="app">
    <div class="app-container">
      <hr>
      <h2>Existing ratings</h2>
      <hr>
      <div v-for="i in 5" :key="i" class="rating-row">
        <StarRatingCountInput :rating="i" :count="currentCountValues[i - 1]" @update:count="updateCountCurrent(i - 1, $event)" />
      </div>
      <hr>
      <h2>New ratings</h2>
      <hr>
      <div v-for="i in 5" :key="i" class="rating-row">
        <StarRatingCountInput :rating="i" :count="neededCountValues[i - 1]" @update:count="updateCountNeeded(i - 1, $event)" />
      </div>
      <hr>
      <h2>New rating: {{ averageRating }}</h2>
      <hr>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 8px;
}

/* Limit the width of the app and center it */
.app-container {
  max-width: 480px;
  /* Set the maximum width */
  margin: 0 auto;
  /* Center the container */
  padding: 8px;
  /* Optional padding for content spacing */
}

.rating-row {
  margin-bottom: 10px;
  /* Space between rows */
}

p {
  font-size: 18px;
  margin-top: 8px;
}
</style>
