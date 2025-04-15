import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';
import ReportsView from '../views/ReportsView.vue';
import ConfiguracionView from '../views/ConfiguracionView.vue'; // Nueva vista

const routes = [
  { path: '/Dashboar', component: DashboardView },
  { path: '/reportes', component: ReportsView },
  { path: '/configuracion', component: ConfiguracionView }, // Nueva ruta
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;