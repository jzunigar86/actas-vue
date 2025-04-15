<template>
    <div class="dashboard">
      <h2>Bienvenido al Dashboard</h2>
      <DashboardCard title="Usuarios" value="150" />
      <DashboardCard title="Ventas" value="$12,000" />
    </div>
  </template>
  
  <script>
  import DashboardCard from "@/components/DashboardCard.vue";
  
  export default {
    components: {
      DashboardCard
    }
  };
  </script>
  
  <style scoped>
  .dashboard {
    margin-left: 220px;
    padding: 20px;
  }
  </style>
  