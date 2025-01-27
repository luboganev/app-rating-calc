import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

// PrimeVue components
import Button from "primevue/button";
import Divider from 'primevue/divider';

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
      preset: Aura,
  },
});
app.component("Button", Button);
app.component("Divider", Divider);
app.mount('#app');
