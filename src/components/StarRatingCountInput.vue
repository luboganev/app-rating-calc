<script lang="ts">

import { defineComponent, ref, watch } from 'vue';
import IconStar from './icons/IconStar.vue';

export default defineComponent({
  name: 'StarRatingCountInput',
  components: {
    IconStar,
  },
  props: {
    ratingType: {
      type: Number,
      default: 5,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  emits: ['update:count'],
  setup(props, { emit }) {
    const ratingsCount = ref(props.count);

    watch(ratingsCount, (newVal) => {
      emit("update:count", newVal);
    })

    const reset = () => {
      ratingsCount.value = 0;
    }

    return {
      reset,
      ratingsCount,
    }
  }
});
</script>

<template>
  <div class="flexRow">
    <div class="flexFill"></div>
    <IconStar v-for="i in ratingType" :key="i" />
    <div class="flexFill"></div>
    <InputNumber v-model="ratingsCount" showButtons buttonLayout="horizontal" :min="0" fluid class="text-input">
      <template #incrementbuttonicon>
        <span class="pi pi-plus" />
      </template>
      <template #decrementbuttonicon>
        <span class="pi pi-minus" />
      </template>
    </InputNumber>
  </div>
</template>

<style scoped>
.text-input {
  margin-left: 1rem;
  max-width: 10rem;
  min-width: 10rem;
}
</style>
