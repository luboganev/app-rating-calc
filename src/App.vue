<script lang="ts" setup>
  import Main from './components/Main.vue';
</script>

<template>
  <Suspense>
    <template #default>
      <Main />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
