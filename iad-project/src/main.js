// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// PrimeVue imports
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Paginator from 'primevue/paginator'

// Firebase
import { auth } from './firebase/init'
import { onAuthStateChanged } from 'firebase/auth'

let app

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App)
      .use(router)
      .use(PrimeVue, { theme: { preset: Aura } })
      .component('DataTable', DataTable)
      .component('Column', Column)
      .component('Paginator', Paginator)
      .mount('#app')
  }
})
