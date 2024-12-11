import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Opcional para funcionalidad JS como modales o dropdowns


const app = createApp(App);

// Instalar Pinia
app.use(createPinia());

app.mount('#app');
