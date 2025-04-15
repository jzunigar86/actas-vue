<template>
  <aside class="sidebar">
    <h4 class="sidebar-title">Mary 1.0</h4>
    <nav>
      <ul>
        <li><router-link to="/Dashboar" class="sidebar-link registrar">Registrar</router-link></li>
        <li><router-link to="/reportes" class="sidebar-link consultar">Consultar</router-link></li>
        <li><router-link to="/configuracion" class="sidebar-link reporte">Reporte</router-link></li>
      </ul>
    </nav>
  </aside>

  <div class="content">
    <!-- Tu contenido va aquí -->
    <p>                                         </p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
/* Sidebar horizontal */
.sidebar {
  width: 100%;
  height: 60px;
  background: #2c3e50;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  flex-wrap: wrap; /* permite que los botones bajen si no caben */
  gap: 10px;
}

/* Título Mary */
.sidebar-title {
  font-size: 1.0 rem;
  color: #ffffff;
  font-weight: bold;
  margin-right: 30px;
  white-space: nowrap;
}

/* Lista horizontal */
.sidebar ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-wrap: wrap;
}

/* Botones */
.sidebar li {
  margin: 0 10px;
}

/* Enlaces estilo botón con colores vivos */
.sidebar-link {
  color: white;
  text-decoration: none;
  font-size: 15px;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: bold;
  transition: background-color 0.3s ease;
  display: inline-block;
}

.sidebar-link.registrar {
  background-color: #ff4d4d; /* rojo vivo */
}

.sidebar-link.consultar {
  background-color: #00cc66; /* verde vivo */
}

.sidebar-link.reporte {
  background-color: #3399ff; /* azul vivo */
}

.sidebar-link:hover {
  opacity: 0.8;
}

/* Contenido principal */
.content {
  margin-top: 70px; /* para evitar que el menú lo tape */
  padding: 20px;
  box-sizing: border-box;
}

/* Responsive */
@media (max-width: 600px) {
  .sidebar {
    flex-direction: column;
    align-items: flex-start;
    height: auto;
    padding: 10px;
  }

  .sidebar ul {
    flex-direction: column;
    width: 100%;
  }

  .sidebar li {
    margin: 5px 0;
  }

  .content {
    margin-top: auto;
  }
}
</style>
