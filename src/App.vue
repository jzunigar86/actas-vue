<template>
  <Navbar />
  <Sidebar />
  <router-view></router-view> <!-- Este es el que está fallando -->
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
import Navbar from "./components/Navbar.vue";

export default {
  components: {
    Sidebar,
    Navbar
  }
};
</script>
