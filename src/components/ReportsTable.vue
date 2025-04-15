<template>
    <div class="reports-table">
      <h2>Reportes</h2>
      <table>
        <thead>
          <tr>
            <th v-for="(col, index) in columns" :key="index">{{ col }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in data" :key="index">
            <td v-for="(value, colIndex) in row" :key="colIndex">{{ value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      columns: Array, // Las columnas de la tabla
      data: Array, // Los datos que vienen de Google Sheets
    },
  };
  </script>
  
  <style scoped>
  .reports-table {
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  th {
    background: #2c3e50;
    color: white;
  }
  </style>
  