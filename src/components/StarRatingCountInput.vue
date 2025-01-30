<script setup lang="ts">
import { ref, watch } from 'vue';
import { useWindowSize } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    ratingType: number;
    count: number;
  }>(),
  {
    ratingType: 5,
    count: 0,
  }
);

const starsCount = ref(props.ratingType);

const emit = defineEmits<{
  (event: 'update:count', count: number): void;
}>();

const ratingsCount = ref(props.count);

watch(ratingsCount, (newVal) => {
  emit("update:count", newVal);
})

const reset = () => {
  ratingsCount.value = 0;
}

defineExpose({ reset });

const { width: availableWidth } = useWindowSize()
</script>

<template>
  <div class="flexRow">
    <Rating v-if="availableWidth > 320" v-model="starsCount" readonly disabled :stars="5" />
    <div v-else>
      <h3 class="small-screen-stars">{{ starsCount }} <span class="pi pi-star-fill" /></h3>
    </div>
    <div class="flexFill"/>
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
.small-screen-stars {
  margin: 0px;
  color: var(--p-primary-color);
}
.text-input {
  margin-left: 8px;
  max-width: 160px;
  min-width: 100px;
}
</style>
