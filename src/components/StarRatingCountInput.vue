<script setup lang="ts">
import { ref, watch } from 'vue';
import IconStar from './icons/IconStar.vue';

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
