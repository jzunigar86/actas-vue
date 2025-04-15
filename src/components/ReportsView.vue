<template>
    <div class="reports-view">
      <ReportsTable :columns="columns" :data="tableData" />
    </div>
  </template>
  
  <script>
  import ReportsTable from '@/components/ReportsTable.vue';
  import fetchGoogleSheetData from '@/utils/fetchGoogleSheetData'; // Importamos la función para obtener datos
  
  export default {
    components: { ReportsTable },
    data() {
      return {
        columns: [],
        tableData: [],
      };
    },
    async created() {
      const { columns, data } = await fetchGoogleSheetData();
      this.columns = columns;
      this.tableData = data;
    },
  };
  </script>
  
  <style scoped>
  .reports-view {
    padding: 20px;
  }
  </style>
  