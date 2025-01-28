<!-- eslint-disable vue/no-reserved-component-names -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import StarRatingCollection from '@/components/StarRatingCollection.vue';
import { calculateAverageRating, sumRatingCounts, createRatingsCountArray } from '@/utils/ratingUtils';
import { useRouter, useRoute, Router } from 'vue-router';

function replaceQueryParams(router: Router, currentRatings: Array<number>, neededRatings: Array<number>) {
  router.replace({
    path: router.currentRoute.value.path,
    query: {
      current: currentRatings.join(','),
      needed: neededRatings.join(','),
    }
  });
}

export default defineComponent({
  name: 'Main',
  components: {
    StarRatingCollection,
  },
  async setup() {
    const router = useRouter();
    const route = useRoute();
    await router.isReady();
    const urlCurrentRatings = route.query.current?.split(',')?.map(Number) ?? createRatingsCountArray();
    const urlNeededRatings = route.query.needed?.split(',')?.map(Number) ?? createRatingsCountArray();

    const current = ref<Array<number>>(createRatingsCountArray(urlCurrentRatings));
    const needed = ref<Array<number>>(createRatingsCountArray(urlNeededRatings));

    const currentRatings = ref();
    const neededRatings = ref();

    const updateCurrent = (ratings: Array<number>) => {
      current.value = [...ratings];
      replaceQueryParams(router, ratings, needed.value);
    };
    const updateNeeded = (ratings: Array<number>) => {
      needed.value = [...ratings];
      replaceQueryParams(router, current.value, ratings);
    };

    const averageRating = computed(() => calculateAverageRating(
      sumRatingCounts(current.value, needed.value)
    ));

    const resetCurrent = () => {
      current.value = createRatingsCountArray();
      currentRatings.value.reset();
      replaceQueryParams(router, current.value, needed.value);
    };

    const resetNeeded = () => {
      needed.value = createRatingsCountArray();
      neededRatings.value.reset();
      replaceQueryParams(router, current.value, needed.value);
    };

    return {
      current,
      needed,
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
    <StarRatingCollection @update:ratings="updateCurrent" :ratings="current" ref="currentRatings" />
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
    <StarRatingCollection @update:ratings="updateNeeded" :ratings="needed" ref="neededRatings" />
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
