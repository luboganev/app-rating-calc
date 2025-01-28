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
    <h1>Ratings calculator</h1>
    <p>This tools helps you assess how much effort it is to raise the average app rating based on its existing ratings.
      You can find the code on
      <a href="https://github.com/luboganev/app-rating-calc"><span class="pi pi-github"></span> GitHub</a>
    </p>
    <Divider />
    <div class="flexRow sectionHeader">
      <div class="flexFill">
        <h3>Current</h3>
        Enter your current app ratings here.
      </div>
      <Button @click="resetCurrent" label="Reset" />
    </div>
    <StarRatingCollection @update:ratings="updateCurrent" ref="currentRatings" />
    <Divider />
    <h3>Lifetime rating: {{ averageRating.toFixed(3) }}</h3>
    <Divider />
    <div class="flexRow sectionHeader">
      <div class="flexFill">
        <h3>New</h3>
        Enter potential new ratings and see how they would impact the lifetime average.
      </div>
      <Button @click="resetNeeded" label="Reset" />
    </div>
    <StarRatingCollection @update:ratings="updateNeeded" ref="neededRatings" />
    <Divider />
  </div>
</template>

<style scoped>
#app {
  max-width: 30rem;
  min-width: 18rem;
  margin: 0 auto;
  padding: 1rem;
  font-weight: normal;
}

Button {
  margin-left: 0.5rem;
}

.sectionHeader {
  margin-bottom: 1rem;
}
</style>
