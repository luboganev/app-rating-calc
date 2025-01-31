<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed } from 'vue';
import StarRatingCollection from '@/components/StarRatingCollection.vue';

import { calculateAverageRating, sumRatingCounts, createRatingsCountArray } from '@/utils/ratingUtils';
import { useRouter, useRoute } from 'vue-router';
import type { Router, LocationQueryValue } from 'vue-router';

function replaceQueryParams(router: Router, currentRatings: Array<number>, neededRatings: Array<number>) {
  router.replace({
    path: router.currentRoute.value.path,
    query: {
      current: currentRatings.join(','),
      needed: neededRatings.join(','),
    }
  });
}

function parseUrlRatingsOrFallback(value: string | LocationQueryValue[] | null, fallback: Array<number>): Array<number> {
  if (typeof value === 'string') {
    return value.split(',').map(Number);
  } else {
    return fallback;
  }
}

function createAccordionTitle(title: string, ratings: Array<number>) {
  const totalRatings = ratings.reduce((acc: number, rating: number) => acc + rating, 0);
  if (totalRatings > 0) {
    return `${title} (${totalRatings})`;
  }
  return title;
}

const router = useRouter();
const route = useRoute();
await router.isReady();
const urlCurrentRatings = parseUrlRatingsOrFallback(route.query.current, createRatingsCountArray());
const urlNeededRatings = parseUrlRatingsOrFallback(route.query.needed, createRatingsCountArray());

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

const averageRating = computed(() => calculateAverageRating(sumRatingCounts(current.value, needed.value)));

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

const currentRatingsTitle = computed(() => {
  return createAccordionTitle('Past ratings', current.value);
});
const neededRatingsTitle = computed(() => {
  return createAccordionTitle('Future ratings', needed.value);
});

const accordionContentStyle = {
  'content': {
    style: {
      padding: '0px',
      backgroundColor: 'transparent',
    }
  }
}
const accordionHeaderStyle = {
  'root': {
    style: {
      backgroundColor: 'transparent',
      margin: '0px'
    }
  }
}
</script>

<template>
  <div id="app">
    <h1>Ratings calculator</h1>
    <p>This tools helps you assess how many future positive ratings it would take to raise the average lifetime app rating based on its existing past
      ratings.
    </p>
    <h3>Lifetime rating</h3>
    <h1>{{ averageRating.toFixed(3) }}</h1>
    <Accordion multiple expandIcon="pi pi-pencil" collapseIcon="pi pi-chevron-up">
      <AccordionPanel value="0">
        <AccordionHeader :pt="accordionHeaderStyle">{{ currentRatingsTitle }}</AccordionHeader>
        <AccordionContent :pt="accordionContentStyle">
          <div class="flexRow sectionHeader">
            <p class="flexFill">
              Enter your current app ratings here.
            </p>
            <Button @click="resetCurrent" severity="danger" size="small" outlined label="Clear" />
          </div>
          <StarRatingCollection @update:ratings="updateCurrent" :ratings="current" ref="currentRatings" />
        </AccordionContent>
      </AccordionPanel>
      <AccordionPanel value="1">
        <AccordionHeader :pt="accordionHeaderStyle">{{ neededRatingsTitle }}</AccordionHeader>
        <AccordionContent :pt="accordionContentStyle">
          <div class="flexRow sectionHeader">
            <p class="flexFill">
              Enter potential new ratings and see how they would impact the lifetime average.
            </p>
            <Button @click="resetNeeded" severity="danger" size="small" outlined label="Clear" />
          </div>
          <StarRatingCollection @update:ratings="updateNeeded" :ratings="needed" ref="neededRatings" />
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
    <p>Author: <a href="https://luboganev.dev/about">Lyubomir Ganev</a></p>
    <p>Code available: <a href="https://github.com/luboganev/app-rating-calc"><span class="pi pi-github"></span> GitHub</a></p>
  </div>
</template>

<style scoped>
#app {
  max-width: 480px;
  min-width: 240px;
  margin: 0 auto;
  padding: 16px;
  font-weight: normal;
}

Button {
  margin-left: 8px;
}

.sectionHeader {
  margin-bottom: 16px;
}
</style>
