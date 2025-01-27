/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */
import "primeicons/primeicons.css";
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

// PrimeVue components
import Button from "primevue/button";
import Divider from 'primevue/divider';
import InputNumber from 'primevue/inputnumber';

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
      preset: Aura,
  },
});
app.component("Button", Button);
app.component("Divider", Divider);
app.component("InputNumber", InputNumber);
app.mount('#app');
