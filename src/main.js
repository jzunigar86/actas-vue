import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importamos el router correctamente

import Sidebar from './components/Sidebar.vue';
import Navbar from './components/Navbar.vue';
import './assets/styles.css';

const app = createApp(App);

app.component('Sidebar', Sidebar);
app.component('Navbar', Navbar);

app.use(router); // Asegúrate de usar el router

app.mount('#app');
