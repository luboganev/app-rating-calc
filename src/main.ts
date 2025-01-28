

import "primeicons/primeicons.css";
import './assets/main.css'
import { router } from './router/router'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

// PrimeVue components
import Button from "primevue/button";
import Divider from 'primevue/divider';
import InputNumber from 'primevue/inputnumber';

createApp(App)
.use(router)
.use(PrimeVue, {
  theme: {
      preset: Aura,
  },
})
.component("Button", Button)
.component("Divider", Divider)
.component("InputNumber", InputNumber)
.mount('#app');
