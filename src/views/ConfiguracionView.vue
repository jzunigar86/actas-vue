<template>
  <div class="dashboard-container">
    <h1>REPORTES DE ACTAS</h1>

    <!-- Menú de selección de tablas -->
    <div class="menu">
      <button @click="showTable('lugares')">IED con Más Actas</button>
      <button @click="showTable('tipos')">Cantidad Segun Tipo</button>
      <button @click="showTable('compromisos')">Compromisos</button>
      <button @click="showTable('lugaresPorTipo')">IED por Tipo de Acta</button>
      <button @click="downloadFullReport">Informe Completo</button>
    </div>

    <!-- Tablas de reporte -->
    <div v-if="activeTable === 'lugares'" class="table-container">
      <h2>INSTITUCIONES EDUCATIVAS </h2>
      <table>
        <thead>
          <tr>
            <th>LUGAR</th>
            <th>TOTAL DE ACTAS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(lugar, index) in top5Lugares" :key="index">
            <td>{{ lugar.nombre }}</td>
            <td>{{ lugar.cantidad }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td><strong>TOTAL</strong></td>
            <td><strong>{{ totalLugares }}</strong></td>
          </tr>
        </tfoot>
      </table>
    </div>

    <div v-if="activeTable === 'tipos'" class="table-container">
      <h2>CANTIDAD POR TIPO DE ACTA</h2>
      <table>
        <thead>
          <tr>
            <th>TIPO DE ACTA</th>
            <th>TOTAL</th>
            <th>PORCENTAJE</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cantidad, tipo) in cantidadPorTipoActa" :key="tipo">
            <td>{{ tipo }}</td>
            <td>{{ cantidad }}</td>
            <td>{{ ((cantidad / totalActas) * 100).toFixed(2) }}%</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td><strong>TOTAL</strong></td>
            <td><strong>{{ totalActas }}</strong></td>
            <td><strong>100%</strong></td>
          </tr>
        </tfoot>
      </table>
    </div>

    <div v-if="activeTable === 'compromisos'" class="table-container">
      <h2>ACTAS CON FECHA DE COMPROMISOS</h2>
      <table>
        <thead>
          <tr>
            <th>CÓDIGO DE ACTA</th>
            <th>OBJETIVO</th>
            <th>COMPROMISO</th>
            <th>FECHA DE COMPROMISO</th>
            <th>LUGAR</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in actasConCompromisos" :key="index">
            <td>{{ row.codigoUnico }}</td>
            <td>{{ row.objetivo }}</td>
            <td>{{ row.descripcion1 }}</td>
            <td>{{ row.fechaPrevista1 }}</td>
            <td>{{ row.lugar }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td><strong>TOTAL</strong></td>
            <td><strong>{{ totalActasConCompromisos }}</strong></td>
          </tr>
        </tfoot>
      </table>
    </div>

    <div v-if="activeTable === 'lugaresPorTipo'" class="table-container">
      <h2>LUGARES POR TIPO DE ACTA</h2>
      <div v-for="(lugares, tipo) in lugaresPorTipoActa" :key="tipo">
        <h3>{{ tipo }}</h3>
        <table>
          <thead>
            <tr>
              <th>LUGAR</th>
              <th>CANTIDAD</th>
              <th>PORCENTAJE</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(lugar, index) in lugares" :key="index">
              <td>{{ lugar.nombre }}</td>
              <td>{{ lugar.cantidad }}</td>
              <td>{{ ((lugar.cantidad / totalActasPorTipo(tipo)) * 100).toFixed(2) }}%</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td><strong>TOTAL</strong></td>
              <td><strong>{{ totalActasPorTipo(tipo) }}</strong></td>
              <td><strong>100%</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>

    <!-- Botón de descarga de informe de sesión -->
    <button class="download-btn" @click="downloadSessionReport">DESCARGAR INFORME DE SESIÓN</button>
  </div>
</template>


<script>
import { ref, computed, onMounted } from "vue";
import fetchGoogleSheetData from "@/services/fetchGoogleSheetData.js";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {
  setup() {
    const data = ref([]);
    const activeTable = ref('lugares'); // Tabla activa por defecto

    // Computed properties para obtener las cantidades y totales
    const lugarCount = computed(() => {
      return data.value.reduce((acc, row) => {
        acc[row.lugar] = (acc[row.lugar] || 0) + 1;
        return acc;
      }, {});
    });

    const cantidadPorTipoActa = computed(() => {
      return data.value.reduce((acc, row) => {
        acc[row.acta] = (acc[row.acta] || 0) + 1;
        return acc;
      }, {});
    });

    const totalActas = computed(() => {
      return Object.values(cantidadPorTipoActa.value).reduce((sum, val) => sum + val, 0);
    });

    const actasConCompromisos = computed(() => {
      return data.value.filter(row => row.fechaPrevista1 && row.descripcion1);
    });

    const totalActasConCompromisos = computed(() => {
      return actasConCompromisos.value.length;
    });

    const top5Lugares = computed(() => {
      return Object.entries(lugarCount.value)
        .map(([nombre, cantidad]) => ({ nombre, cantidad }))
        .sort((a, b) => b.cantidad - a.cantidad)
        .slice(0);
    });

    const lugaresPorTipoActa = computed(() => {
      const lugares = data.value.reduce((acc, row) => {
        if (!acc[row.acta]) {
          acc[row.acta] = [];
        }
        const existingLugar = acc[row.acta].find(l => l.nombre === row.lugar);
        if (existingLugar) {
          existingLugar.cantidad += 1;
        } else {
          acc[row.acta].push({ nombre: row.lugar, cantidad: 1 });
        }
        return acc;
      }, {});
      return lugares;
    });

    const totalLugares = computed(() => {
      return top5Lugares.value.reduce((sum, lugar) => sum + lugar.cantidad, 0);
    });

    // Función para cambiar la tabla activa
    const showTable = (table) => {
      activeTable.value = table;
    };

    // Función para calcular el total de lugares por tipo de acta
    const totalActasPorTipo = (tipo) => {
      const lugares = lugaresPorTipoActa.value[tipo];
      return lugares ? lugares.reduce((sum, lugar) => sum + lugar.cantidad, 0) : 0;
    };

    // Función para generar el PDF del informe
    const generateReport = (dataToDownload) => {
      const doc = new jsPDF();

      const addTableToPDF = (title, tableData, headers, showTotal = false, totalValue = 0) => {
        doc.text(title, 14, doc.autoTable.previous.finalY + 20 || 20);
        if (showTotal) {
          tableData.push(["TOTAL", totalValue]);
        }
        doc.autoTable({
          head: [headers],
          body: tableData,
          startY: doc.autoTable.previous.finalY + 30 || 30
        });
      };

      // Generar las tablas en el PDF
      if (dataToDownload.top5Lugares) {
        addTableToPDF('IED LUGARES CON MÁS ACTAS',
          dataToDownload.top5Lugares.map(row => [row.nombre, row.cantidad]), ['LUGAR', 'TOTAL DE ACTAS'], true, dataToDownload.totalLugares);
      }

      if (dataToDownload.cantidadPorTipoActa) {
        addTableToPDF('CANTIDAD POR TIPO DE ACTA',
          Object.entries(dataToDownload.cantidadPorTipoActa).map(([tipo, cantidad]) => [tipo, cantidad, `${((cantidad / dataToDownload.totalActas) * 100).toFixed(2)}%`]),
          ['TIPO DE ACTA', 'TOTAL', 'PORCENTAJE'], true, dataToDownload.totalActas);
      }

      if (dataToDownload.actasConCompromisos) {
        addTableToPDF('ACTAS CON FECHA DE COMPROMISOS',
          dataToDownload.actasConCompromisos.map(row => [row.codigoUnico, row.objetivo, row.descripcion1, row.fechaPrevista1, row.lugar]),
          ['CÓDIGO DE ACTA', 'OBJETIVO', 'COMPROMISO', 'FECHA DE COMPROMISO', 'LUGAR'], true, dataToDownload.totalActasConCompromisos);
      }

      if (dataToDownload.lugaresPorTipoActa) {
        Object.entries(dataToDownload.lugaresPorTipoActa).forEach(([tipo, lugares]) => {
          addTableToPDF(`IED PARA EL TIPO DE ACTA: ${tipo}`,
            lugares.map(lugar => [lugar.nombre, lugar.cantidad, `${((lugar.cantidad / totalActasPorTipo(tipo)) * 100).toFixed(2)}%`]),
            ['LUGAR', 'CANTIDAD', 'PORCENTAJE'], true, totalActasPorTipo(tipo));
        });
      }

      doc.save('informe.pdf');
    };

    // Función para descargar el informe de la sesión
    const downloadSessionReport = () => {
      if (activeTable.value === 'lugares') {
        generateReport({
          top5Lugares: top5Lugares.value,
          totalLugares: totalLugares.value
        });
      } else if (activeTable.value === 'tipos') {
        generateReport({
          cantidadPorTipoActa: cantidadPorTipoActa.value,
          totalActas: totalActas.value
        });
      } else if (activeTable.value === 'compromisos') {
        generateReport({
          actasConCompromisos: actasConCompromisos.value,
          totalActasConCompromisos: totalActasConCompromisos.value
        });
      } else if (activeTable.value === 'lugaresPorTipo') {
        generateReport({
          lugaresPorTipoActa: lugaresPorTipoActa.value
        });
      }
    };

    // Función para descargar el informe completo
    const downloadFullReport = () => {
      generateReport({
        top5Lugares: top5Lugares.value,
        cantidadPorTipoActa: cantidadPorTipoActa.value,
        actasConCompromisos: actasConCompromisos.value,
        lugaresPorTipoActa: lugaresPorTipoActa.value,
        totalActas: totalActas.value,
        totalActasConCompromisos: totalActasConCompromisos.value,
        totalLugares: totalLugares.value
      });
    };

    const loadData = async () => {
      try {
        const sheetData = await fetchGoogleSheetData();
        data.value = sheetData;
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    onMounted(loadData);

    return {
      activeTable,
      top5Lugares,
      cantidadPorTipoActa,
      totalActas,
      actasConCompromisos,
      totalActasConCompromisos,
      lugaresPorTipoActa,
      showTable,
      downloadSessionReport,
      downloadFullReport,
      totalActasPorTipo,
      totalLugares
    };
  }
};
</script>



<style scoped>
.dashboard-container {
  padding: 40px;
  text-align: center;
  background-color: #f4f7fb;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  color: #34495e;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 600;
  margin-bottom: 20px;
}

h2, h3 {
  color: #2c3e50;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.menu {
  display: flex;
  justify-content: center;
  gap: 10px; /* Reducido el espacio entre botones */
  margin-bottom: 40px;
}

button {
  padding: 12px 34px; /* Botones más pequeños */
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px; /* Reducción del tamaño de la fuente */
  transition: background-color 0.3s ease;
  
}

button:hover {
  background-color: #2980b9;
}

.table-container {
  width: 85%; /* Ajusté el ancho para mover la tabla más a la derecha */
  max-width: 1100px;
  margin-left: 15%; /* Mueve la tabla más a la derecha */
  margin-right: auto;
  margin-bottom: 40px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
}

table {
  margin: 0 auto;
  border-collapse: collapse;
  width: 100%;
}

th, td {
  border: 1px solid #e0e0e0;
  padding: 14px 20px;
  text-align: center;
  font-size: 16px;
}

th {
  background-color: #2c3e50;
  color: white;
  font-weight: 600;
}

tr:nth-child(even) {
  background-color: #ecf0f1;
}

tr:hover {
  background-color: #bdc3c7;
}

tfoot td {
  font-weight: 600;
  background-color: #f7f9fb;
}

.download-btn {
  padding: 12px 24px; /* Tamaño ajustado */
  background-color: #e67e22;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px; /* Reducción del tamaño de la fuente */
  transition: background-color 0.3s ease;
  margin-top: 30px;
}

.download-btn:hover {
  background-color: #d35400;
}
</style>
