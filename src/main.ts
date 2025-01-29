

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
import Rating from 'primevue/rating';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';

createApp(App)
  .use(router)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
    },
    ripple: true,
  })
  .component("Button", Button)
  .component("Divider", Divider)
  .component("InputNumber", InputNumber)
  .component("Rating", Rating)
  .component("Accordion", Accordion)
  .component("AccordionPanel", AccordionPanel)
  .component("AccordionHeader", AccordionHeader)
  .component("AccordionContent", AccordionContent)
  .mount('#app');
