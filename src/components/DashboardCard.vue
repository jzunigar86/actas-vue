<template>
    <div class="card">
      <h3>{{ title }}</h3>
      <p>{{ value }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: ["title", "value"]
  };
  </script>
  
  <style scoped>
  .card {
    background: white;
    padding: 20px;
    margin: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
  </style>
  