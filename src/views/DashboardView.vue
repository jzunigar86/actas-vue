<template>
  <form id="contact-form" class="form-container" @submit.prevent="enviarFormulario" :disabled="enviando">
    <input type="hidden" v-model="codigoUnico" name="codigoUnico" />

    <div class="form-group">
      <label for="objetivo">Objetivo de la Reunión</label>
      <textarea id="objetivo" v-model="objetivo" placeholder="Describa el objetivo de la reunión" required rows="4"></textarea>
    </div>

    <div class="form-group">
      <label for="acta">Tipo de Acta</label>
      <select id="acta" v-model="acta" required>
        <option value="" disabled selected>Seleccione un tipo de acta</option>
                            <option value="ORIENTACIONES PEDAGOGICAS">ORIENTACIONES PEDAGOGICAS</option>
                            <option value="ESTUDIANTES PRESUNTIVOS -  ACTIVACION RUTA">ESTUDIANTES PRESUNTIVOS -  ACTIVACION RUTA</option>
                            <option value="ESTUDIANTES PRESUNTIVOS -  SEGUIMIENTO RUTA">ESTUDIANTES PRESUNTIVOS -  SEGUIMIENTO RUTA</option>
                            <option value="SEGUIMIENTO TERAPEUTICO A ESTUDIANTE CON DISCAPACIDAD / TRASTORNOS">SEGUIMIENTO TERAPEUTICO A ESTUDIANTE CON DISCAPACIDAD / TRASTORNOS</option>
                            <option value="ACTA DE ACUERDO PADRE DE FAMILIA">ACTA DE ACUERDO PADRE DE FAMILIA</option>
                            <option value="ACTA DE ACUERDO CON DIRECTIVOS IED">ACTA DE ACUERDO CON DIRECTIVOS IED</option>
                            <option value="CARACTERIZACION CON TECNICOS OPERATIVOS">CARACTERIZACION CON TECNICOS OPERATIVOS</option>
                            <option value="ENTREGA Y SOCIALIZACION PIAR - IED">ENTREGA Y SOCIALIZACION PIAR - IED</option>
                            <option value="OFICINA COBERTURA - INCLUSION">OFICINA COBERTURA - INCLUSION</option>
      </select>
    </div>


        <div class="form-row">
        <div class="form-group">
        <label for="fecha">Fecha</label>
        <input type="date" id="fecha" v-model="fecha" class="form-control" required/>
        </div>
        </div>

        
    <div class="form-group">
    <!-- Campo de búsqueda -->
    <label for="lugar">Lugar</label>
    <input list="instituciones" id="lugar"  v-model="lugar" placeholder="Escribe para buscar una institución" />

    <!-- Datalist con las opciones -->
    <datalist id="instituciones">
      <option v-for="institucion in instituciones" :key="institucion" :value="institucion" />
      <input type="hidden" id="lugar"  :value="formulario.lugar">
    </datalist>
  </div>

    
    <div class="form-row">
      <div class="form-group input-half">
        <label for="horaInicio">Hora de Inicio</label>
        <input type="time" id="horaInicio" v-model="horaInicio" required />
      </div>
      <div class="form-group input-half">
        <label for="horaFin">Hora de Fin</label>
        <input type="time" id="horaFin" v-model="horaFin" required />
      </div>
    </div>

        <!-- Participante 1 -->
        <div class="asistencia">
          <h2>Asistencia</h2>
          <div class="asistencia-item">
            <input type="text" v-model="nombre" placeholder="Nombre" required />
            <input type="text" v-model="cargo" placeholder="Cargo" required />
            <select v-model="asistio" required>
              <option value="" disabled selected>Seleccione</option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>
            <canvas ref="firmaCanvas1" class="firma-canvas" width="200" height="100"
              @mousedown="iniciarFirma(1, $event)" 
              @mousemove="dibujarFirma(1, $event)" 
              @mouseup="finalizarFirma(1)" 
              @mouseleave="finalizarFirma(1)">
            </canvas>
            <div class="firma-buttons">
            <button type="button" @click="limpiarFirma(1)">Limpiar Firma</button>
            </div>
          </div>
        </div>

    <!-- Participante 2 -->
    <div class="asistencia">
      <h2>Asistencia</h2>
      <div class="asistencia-item">
        <input type="text" v-model="nombre1" placeholder="Nombre" 
          :disabled="!nombre || !cargo || !asistio" />
        
        <input type="text" v-model="cargo1" placeholder="Cargo" 
          :disabled="!nombre || !cargo || !asistio" />
        
        <select v-model="asistio1" :disabled="!nombre || !cargo || !asistio">
          <option value="" disabled>Seleccione</option>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>

        <canvas ref="firmaCanvas2" class="firma-canvas" width="200" height="100"
          @mousedown="iniciarFirma(2, $event)" 
          @mousemove="dibujarFirma(2, $event)" 
          @mouseup="finalizarFirma(2)" 
          @mouseleave="finalizarFirma(2)"
          :style="{ pointerEvents: (!nombre || !cargo || !asistio) ? 'none' : 'auto', opacity: (!nombre || !cargo || !asistio) ? 0.5 : 1 }"
        ></canvas>

        <div class="firma-buttons">
          <button type="button" @click="limpiarFirma(2)" 
            :disabled="!nombre || !cargo || !asistio">Limpiar Firma</button>
        </div>
      </div>
    </div>


      <!-- Participante 3 -->
    <div class="asistencia">
      <h2>Asistencia</h2>
      <div class="asistencia-item">
        <input type="text" v-model="nombre2" placeholder="Nombre" 
          :disabled="!nombre1 || !cargo1 || !asistio1" />

        <input type="text" v-model="cargo2" placeholder="Cargo" 
          :disabled="!nombre1 || !cargo1 || !asistio1" />

        <select v-model="asistio2" :disabled="!nombre1 || !cargo1 || !asistio1">
          <option value="" disabled>Seleccione</option>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>

        <canvas ref="firmaCanvas3" class="firma-canvas" width="200" height="100"
          @mousedown="iniciarFirma(3, $event)" 
          @mousemove="dibujarFirma(3, $event)" 
          @mouseup="finalizarFirma(3)" 
          @mouseleave="finalizarFirma(3)"
          :style="{ pointerEvents: (!nombre1 || !cargo1 || !asistio1) ? 'none' : 'auto', opacity: (!nombre1 || !cargo1 || !asistio1) ? 0.5 : 1 }"
        ></canvas>

        <div class="firma-buttons">
          <button type="button" @click="limpiarFirma(3)" 
            :disabled="!nombre1 || !cargo1 || !asistio1">Limpiar Firma</button>
        </div>
      </div>
    </div>


      <!-- Participante 4 -->
    <div class="asistencia">
      <h2>Asistencia</h2>
      <div class="asistencia-item">
        <input type="text" v-model="nombre3" placeholder="Nombre" 
          :disabled="!nombre2 || !cargo2 || !asistio2" />

        <input type="text" v-model="cargo3" placeholder="Cargo" 
          :disabled="!nombre2 || !cargo2 || !asistio2" />

        <select v-model="asistio3" :disabled="!nombre2 || !cargo2 || !asistio2">
          <option value="" disabled>Seleccione</option>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>

        <canvas ref="firmaCanvas4" class="firma-canvas" width="200" height="100"
          @mousedown="iniciarFirma(4, $event)" 
          @mousemove="dibujarFirma(4, $event)" 
          @mouseup="finalizarFirma(4)" 
          @mouseleave="finalizarFirma(4)"
          :style="{ pointerEvents: (!nombre2 || !cargo2 || !asistio2) ? 'none' : 'auto', opacity: (!nombre2 || !cargo2 || !asistio2) ? 0.5 : 1 }"
        ></canvas>

        <div class="firma-buttons">
          <button type="button" @click="limpiarFirma(4)" 
            :disabled="!nombre2 || !cargo2 || !asistio2">Limpiar Firma</button>
        </div>
      </div>
    </div>

    <!-- Participante 5 -->
    <div class="asistencia">
      <h2>Asistencia</h2>
      <div class="asistencia-item">
        <input type="text" v-model="nombre4" placeholder="Nombre" 
          :disabled="!nombre3 || !cargo3 || !asistio3" />

        <input type="text" v-model="cargo4" placeholder="Cargo" 
          :disabled="!nombre3 || !cargo3 || !asistio3" />

        <select v-model="asistio4" :disabled="!nombre3 || !cargo3 || !asistio3">
          <option value="" disabled>Seleccione</option>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>

        <canvas ref="firmaCanvas5" class="firma-canvas" width="200" height="100"
          @mousedown="iniciarFirma(5, $event)" 
          @mousemove="dibujarFirma(5, $event)" 
          @mouseup="finalizarFirma(5)" 
          @mouseleave="finalizarFirma(5)"
          :style="{ pointerEvents: (!nombre3 || !cargo3 || !asistio3) ? 'none' : 'auto', opacity: (!nombre3 || !cargo3 || !asistio3) ? 0.5 : 1 }"
        ></canvas>

        <div class="firma-buttons">
          <button type="button" @click="limpiarFirma(5)" 
            :disabled="!nombre3 || !cargo3 || !asistio3">Limpiar Firma</button>
        </div>
      </div>
    </div>



    <h2>Agenda</h2>
    <div class="asistencia-item">      
      <input type="text" v-model="tema1" placeholder="Primer tema tratado" required/>
         <select v-model="abordado1" required>
          <option value="" disabled selected>Abordado</option>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>
        <select v-model="completo1" required>
          <option value="" disabled selected>Completo</option>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>
       
      <input type="text" v-model="tema2" placeholder="Segundo tema tratado" :disabled="!completo1" />
         <select v-model="abordado2" :disabled="!tema2" >
          <option value="" disabled selected>Abordado</option>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>
        <select v-model="completo2" :disabled="!abordado2" >
          <option value="" disabled selected>Completo</option>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>

        <input type="text" v-model="tema3" placeholder="Tercer tema tratado" :disabled="!completo2" />
         <select v-model="abordado3" :disabled="!tema3">
          <option value="" disabled selected>Abordado</option>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>
        <select v-model="completo3" :disabled="!abordado3">
          <option value="" disabled selected>Completo</option>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>

    </div>



    <h2>Desarrollo de la Reunión</h2>
    <div class="form-group">
      <textarea id="temaTratado1" v-model="temaTratado1" placeholder="Primer tema tratado" required rows="4"></textarea>
      <textarea id="temaTratado2" v-model="temaTratado2" placeholder="Segundo tema tratado"  rows="4" :disabled="!temaTratado1"></textarea>
      <textarea id="temaTratado3" v-model="temaTratado3" placeholder="Tercer tema tratado"  rows="4" :disabled="!temaTratado2"></textarea>
    </div>



    <div class="asistencia-item"> 
    <h2>Compromisos</h2>
    <input type="text" v-model="descripcion1" placeholder="Primer Compromiso" />
    <input type="text" v-model="responsable1" placeholder="Responsable" />
    <input type="date" id="fechaPrevista1" v-model="fechaPrevista1"/>
    
    <input type="text" v-model="descripcion2" placeholder="Segundo Compromiso":disabled="!temaTratado2" />
    <input type="text" v-model="responsable2" placeholder="Responsable" :disabled="!descripcion2" />
    <input type="date" id="fechaPrevista2" v-model="fechaPrevista2" :disabled="!descripcion2"/>
    
    <input type="text" v-model="descripcion3" placeholder="Tercer Compromiso" :disabled="!temaTratado3" />
    <input type="text" v-model="responsable3" placeholder="Responsable" :disabled="!descripcion3" />
    <input type="date" id="fechaPrevista3" v-model="fechaPrevista3" :disabled="!descripcion3" />
           
         
    </div>  
   

    <button class="btn btn-submit" type="submit" :disabled="enviando">Enviar y Descargar PDF</button>
  </form>
</template>

<script>


import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css'

import { generarCodigoUnico } from "@/services/generarCodigoFirebase";


export default {

  components: {
    Multiselect
  },
  data() {
    return {

      formulario: {
        
        lugar: '',
      },

      instituciones: [
        "SECRETARIA DISTRITAL DE EDUCACION",
        "ESCUELA NORMAL SUPERIOR DEL DISTRITO DE BARRANQUILLA",
        "ESCUELA NORMAL SUPERIOR LA HACIENDA",
        "INSTITUCION EDUCATIVA COMUNITARIA DISTRITAL MANUEL ELKIN PATARROYO",
        "INSTITUCION EDUCATIVA DISTRITAL ALEXANDER VON HUMBOLDT",
        "INSTITUCION EDUCATIVA DISTRITAL ALFONSO LOPEZ",
        "INSTITUCION EDUCATIVA DISTRITAL ALFREDO CORREA DE ANDREIS",
        "INSTITUCIÓN EDUCATIVA DISTRITAL ANTONIO JOSE DE SUCRE",
        "INSTITUCION EDUCATIVA DISTRITAL BETANIA NORTE",
        "INSTITUCION EDUCATIVA DISTRITAL BETSABE ESPINOZA",
        "INSTITUCION EDUCATIVA DISTRITAL BOSTON",
        "INSTITUCION EDUCATIVA DISTRITAL BRISAS DEL RIO",
        "INSTITUCION EDUCATIVA DISTRITAL BUENOS AIRES",
        "INSTITUCION EDUCATIVA DISTRITAL CALIXTO ALVAREZ",
        "INSTITUCION EDUCATIVA DISTRITAL CAMILO TORRES TENORIO",
        "INSTITUCION EDUCATIVA DISTRITAL CARLOS MEISEL",
        "INSTITUCION EDUCATIVA DISTRITAL CIUDADELA 20 DE JULIO",
        "INSTITUCION EDUCATIVA DISTRITAL CIUDADELA ESTUDIANTIL",
        "INSTITUCION EDUCATIVA DISTRITAL CIVICA 7 DE ABRIL",
        "INSTITUCION EDUCATIVA DISTRITAL COMUNITARIA METROPOLITANA",
        "INSTITUCION EDUCATIVA DISTRITAL COMUNITARIA OCTAVIO PAZ",
        "INSTITUCION EDUCATIVA DISTRITAL COMUNITARIA SIETE DE ABRIL",
        "INSTITUCION EDUCATIVA DISTRITAL CONCENTRACION CEVILLAR",
        "INSTITUCION EDUCATIVA DISTRITAL COSTA CARIBE",
        "INSTITUCION EDUCATIVA DISTRITAL CULTURAL LAS MALVINAS",
        "INSTITUCIÓN EDUCATIVA DISTRITAL DAVID SANCHEZ JULIAO",
        "INSTITUCION EDUCATIVA DISTRITAL DE ARTE Y CULTURA ALEJANDRO OBREGON",
        "INSTITUCION EDUCATIVA DISTRITAL DE BARRANQUILLA \"CODEBA\"",
        "INSTITUCION EDUCATIVA DISTRITAL DE CARRIZAL",
        "INSTITUCION EDUCATIVA DISTRITAL DE EXPERIENCIAS PEDAGOGICAS",
        "INSTITUCION EDUCATIVA DISTRITAL DE FORMACION INTEGRAL",
        "INSTITUCION EDUCATIVA DISTRITAL DE FORMACION TECNICA DIVERSIFICADA ALBERTO ASSA",
        "INSTITUCION EDUCATIVA DISTRITAL DE LAS NIEVES",
        "INSTITUCION EDUCATIVA DISTRITAL DEL BARRIO MONTES",
        "INSTITUCION EDUCATIVA DISTRITAL DEL BARRIO SIMON BOLIVAR",
        "INSTITUCION EDUCATIVA DISTRITAL DEL CARIBE",
        "INSTITUCION EDUCATIVA DISTRITAL DEL DESARROLLO HUMANO Y CULTURAL DEL CARIBE",
        "INSTITUCION EDUCATIVA DISTRITAL DENIS HERRERA DE VILLA",
        "INSTITUCION EDUCATIVA DISTRITAL DESPERTAR DEL SUR",
        "INSTITUCION EDUCATIVA DISTRITAL EDUARDO SANTOS",
        "INSTITUCION EDUCATIVA DISTRITAL EL CAMPITO",
        "INSTITUCION EDUCATIVA DISTRITAL EL CAÑAHUATE",
        "INSTITUCION EDUCATIVA DISTRITAL EL CASTILLO DE LA ALBORAYA",
        "INSTITUCION EDUCATIVA DISTRITAL EL CORAZON DEL SANTUARIO",
        "INSTITUCION EDUCATIVA DISTRITAL EL PARAISO",
        "INSTITUCION EDUCATIVA DISTRITAL EL PUEBLO",
        "INSTITUCION EDUCATIVA DISTRITAL EL SILENCIO",
        "INSTITUCION EDUCATIVA DISTRITAL EL VALLE",
        "INSTITUCION EDUCATIVA DISTRITAL ESTER FORERO",
        "INSTITUCION EDUCATIVA DISTRITAL ETNOEDUCATIVO PAULINO SALGADO  BATATA",
        "INSTITUCION EDUCATIVA DISTRITAL EVARDO TURIZO PALENCIA",
        "INSTITUCION EDUCATIVA DISTRITAL EVARISTO SOURDIS",
        "INSTITUCION EDUCATIVA DISTRITAL FUNDACION PIES DESCALZOS",
        "INSTITUCION EDUCATIVA DISTRITAL GABRIEL GARCIA MARQUEZ",
        "INSTITUCION EDUCATIVA DISTRITAL GOLDA MEIR",
        "INSTITUCION EDUCATIVA DISTRITAL HILDA MUÑOZ",
        "INSTITUCION EDUCATIVA DISTRITAL HOGAR MARIANO",
        "INSTITUCION EDUCATIVA DISTRITAL INMACULADA CONCEPCION",
        "INSTITUCION EDUCATIVA DISTRITAL INOCENCIO CHINCA",
        "INSTITUCION EDUCATIVA DISTRITAL ISAAC NEWTON",
        "INSTITUCION EDUCATIVA DISTRITAL JAVIER SANCHEZ",
        "INSTITUCION EDUCATIVA DISTRITAL JESUS DE NAZARETH",
        "INSTITUCION EDUCATIVA DISTRITAL JESUS MISERICORDIOSO",
        "INSTITUCION EDUCATIVA DISTRITAL JORGE ISAAC",
        "INSTITUCION EDUCATIVA DISTRITAL JORGE ROBLEDO ORTIZ",
        "INSTITUCION EDUCATIVA DISTRITAL JOSE ANTONIO GALAN",
        "INSTITUCION EDUCATIVA DISTRITAL JOSE CONSUEGRA HIGGINS",
        "INSTITUCION EDUCATIVA DISTRITAL JOSE EUSEBIO CARO",
        "INSTITUCION EDUCATIVA DISTRITAL JOSE MARIA VELAZ",
        "INSTITUCION EDUCATIVA DISTRITAL JOSE MARTI",
        "INSTITUCION EDUCATIVA DISTRITAL JUAN ACOSTA SOLERA",
        "INSTITUCION EDUCATIVA DISTRITAL JUAN JOSE RONDON",
        "INSTITUCION EDUCATIVA DISTRITAL KARL PARRISH",
        "INSTITUCION EDUCATIVA DISTRITAL LA CONCEPCION",
        "INSTITUCION EDUCATIVA DISTRITAL LA ESMERALDA",
        "INSTITUCION EDUCATIVA DISTRITAL LA ESPERANZA DEL SUR",
        "INSTITUCION EDUCATIVA DISTRITAL LA LIBERTAD",
        "INSTITUCION EDUCATIVA DISTRITAL LA LUZ",
        "INSTITUCION EDUCATIVA DISTRITAL LA MAGDALENA",
        "INSTITUCION EDUCATIVA DISTRITAL LA MERCED",
        "INSTITUCION EDUCATIVA DISTRITAL LA MILAGROSA FE Y ALEGRIA",
        "INSTITUCION EDUCATIVA DISTRITAL LA PRESENTACION",
        "INSTITUCION EDUCATIVA DISTRITAL LA SALLE",
        "INSTITUCION EDUCATIVA DISTRITAL LA UNION",
        "INSTITUCION EDUCATIVA DISTRITAL LA VICTORIA",
        "INSTITUCION EDUCATIVA DISTRITAL LAS AMERICAS",
        "INSTITUCION EDUCATIVA DISTRITAL LAS FLORES",
        "INSTITUCION EDUCATIVA DISTRITAL LAS GARDENIAS",
        "INSTITUCION EDUCATIVA DISTRITAL LAS GRANJAS",
        "INSTITUCION EDUCATIVA DISTRITAL LAS MERCEDES SAN PABLO",
        "INSTITUCION EDUCATIVA DISTRITAL LESTONNAC",
        "INSTITUCION EDUCATIVA DISTRITAL LOS LAURELES",
        "INSTITUCION EDUCATIVA DISTRITAL LOS ROSALES",
        "INSTITUCION EDUCATIVA DISTRITAL LUIS CARLOS GALAN SARMIENTO",
        "INSTITUCION EDUCATIVA DISTRITAL LUZ DEL CARIBE",
        "INSTITUCION EDUCATIVA DISTRITAL MADRE MARCELINA",
        "INSTITUCION EDUCATIVA DISTRITAL MADRES CATOLICAS",
        "INSTITUCION EDUCATIVA DISTRITAL MANUEL ZAPATA OLIVELLA",
        "INSTITUCION EDUCATIVA DISTRITAL MARCO FIDEL SUAREZ",
        "INSTITUCION EDUCATIVA DISTRITAL MARIA AUXILIADORA",
        "INSTITUCION EDUCATIVA DISTRITAL MARIA INMACULADA",
        "INSTITUCION EDUCATIVA DISTRITAL MARIE POUSSEPIN",
        "INSTITUCION EDUCATIVA DISTRITAL MAYOR DE BARRANQUILLA Y DEL CARIBE",
        "INSTITUCION EDUCATIVA DISTRITAL MUNDO BOLIVARIANO",
        "INSTITUCION EDUCATIVA DISTRITAL MURILLO",
        "INSTITUCION EDUCATIVA DISTRITAL NIÑOS JESUS",
        "INSTITUCION EDUCATIVA DISTRITAL NO. 176",
        "INSTITUCION EDUCATIVA DISTRITAL NUESTRA SEÑORA DE  LAS NIEVES",
        "INSTITUCION EDUCATIVA DISTRITAL NUESTRA SEÑORA DEL ROSARIO",
        "INSTITUCION EDUCATIVA DISTRITAL NUEVA GRANADA",
        "INSTITUCION EDUCATIVA DISTRITAL NUEVO BOSQUE PIES DESCALZOS",
        "INSTITUCION EDUCATIVA DISTRITAL OLAYA",
        "INSTITUCION EDUCATIVA DISTRITAL OLGA EMILIANI",
        "INSTITUCION EDUCATIVA DISTRITAL PARA EL DESARROLLO DE LAS CIENCIAS ARTES Y HUMANIDADES  \"IEDCAH\"",
        "INSTITUCION EDUCATIVA DISTRITAL PARA EL DESARROLLO HUMANO MARIA CANO",
        "INSTITUCION EDUCATIVA DISTRITAL PESTALOZZI",
        "INSTITUCION EDUCATIVA DISTRITAL REUVEN FEUERSTEN",
        "INSTITUCION EDUCATIVA DISTRITAL RODOLFO LLINAS RIASCOS",
        "INSTITUCION EDUCATIVA DISTRITAL SAGRADO CORAZON DE JESUS",
        "INSTITUCIÓN EDUCATIVA DISTRITAL SALVADOR ENTREGAS",
        "INSTITUCION EDUCATIVA DISTRITAL SALVADOR SUAREZ SUAREZ",
        "INSTITUCION EDUCATIVA DISTRITAL SAN GABRIEL",
        "INSTITUCION EDUCATIVA DISTRITAL SAN JOSE",
        "INSTITUCION EDUCATIVA DISTRITAL SAN LUIS",
        "INSTITUCION EDUCATIVA DISTRITAL SAN MIGUEL ARCANGEL",
        "INSTITUCION EDUCATIVA DISTRITAL SAN SALVADOR",
        "INSTITUCION EDUCATIVA DISTRITAL SAN VICENTE DE PAUL",
        "INSTITUCION EDUCATIVA DISTRITAL SANTA BERNARDITA",
        "INSTITUCION EDUCATIVA DISTRITAL SANTA MAGDALENA SOFIA",
        "INSTITUCION EDUCATIVA DISTRITAL SANTA MARIA",
        "INSTITUCION EDUCATIVA DISTRITAL SANTO DOMINGO DE GUZMAN",
        "INSTITUCION EDUCATIVA DISTRITAL SARID ARTETA DE VASQUEZ",
        "INSTITUCION EDUCATIVA DISTRITAL SIMON BOLIVAR",
        "INSTITUCION EDUCATIVA DISTRITAL SOFIA CAMARGO DE LLERAS",
        "INSTITUCION EDUCATIVA DISTRITAL SONIA AHUMADA",
        "INSTITUCION EDUCATIVA DISTRITAL TECNICA  BILINGUE JORGE NICOLAS ABELLO",
        "INSTITUCION EDUCATIVA DISTRITAL TECNICA CRUZADA SOCIAL",
        "INSTITUCION EDUCATIVA DISTRITAL TECNICA DE REBOLO",
        "INSTITUCION EDUCATIVA DISTRITAL TECNICA DIVERSIFICADA DE BARRANQUILLA \"COTEDIBA\"",
        "INSTITUCION EDUCATIVA DISTRITAL TECNICA HELENA DE CHAUVIN",
        "INSTITUCION EDUCATIVA DISTRITAL TECNICA MEIRA DEL MAR",
        "INSTITUCION EDUCATIVA DISTRITAL TECNICA METROPOLITANO DE BARRANQUILLA PARQUE EDUCATIVO",
        "INSTITUCION EDUCATIVA DISTRITAL TECNICA MIGUEL ANGEL BUILES",
        "INSTITUCION EDUCATIVA DISTRITAL TÉCNICA NACIONAL DE COMERCIO",
        "INSTITUCION EDUCATIVA DISTRITAL TECNICA PABLO NERUDA",
        "INSTITUCION EDUCATIVA DISTRITAL TECNICA PARA EL DESARROLLO DEL TALENTO HUMANO",
        "INSTITUCION EDUCATIVA DISTRITAL TECNICO EL SANTUARIO",
        "INSTITUCION EDUCATIVA DISTRITAL TECNICO JESUS MAESTRO",
        "INSTITUCION EDUCATIVA DISTRITAL TIERRA SANTA",
        "INSTITUCION EDUCATIVA DISTRITAL UNIVERSAL",
        "INSTITUCION EDUCATIVA DISTRITAL VILLA DEL CARMEN",
        "INSTITUCION EDUCATIVA DISTRITAL VILLANUEVA",
        "INSTITUCION EDUCATIVA DISTRITAL VILLAS DE SAN PABLO"
      ],
     
      codigoUnico: '',
      objetivo: '',
      acta: '',
      fecha: '',
      lugar: '',
      horaInicio: '',
      horaFin: '',
      nombre: '',
      cargo: '',
      asistio: '',
      firmaBase641: '',
      nombre1: '',
      cargo1: '',
      asistio1: '',
      firmaBase642: '',
      nombre2: '',
      cargo2: '',
      asistio2: '',
      firmaBase643: '',
      nombre3: '',
      cargo3: '',
      asistio3: '',
      firmaBase644: '',
      nombre4: '',
      cargo4: '',
      asistio4: '',
      firmaBase645: '',
      tema1: '',
      abordado1: '',
      completo1: '',
      tema2: '',
      abordado2: '',
      completo2: '',
      tema3: '',
      abordado3: '',
      completo3: '',
      temaTratado1: '',
      temaTratado2: '',
      temaTratado3: '',
      descripcion1: '',
      responsable1: '',
      fechaPrevista1: '',
      descripcion2: '',
      responsable2: '',
      fechaPrevista2: '',
      descripcion3: '',
      responsable3: '',
      fechaPrevista3: '',      
      enviando: false,
      firmando: [false, false, false, false, false],
      scriptURL: 'https://script.google.com/macros/s/AKfycby8ZLF9aHB4eEOVwa8ZuvPk5LUTRIeNqThZuaVgakKkWqur5wsSTZNHvi5uSyZN_XppMA/exec',

               
      
     
    };

  
  },
       
    
  methods: {
    iniciarFirma(index, event) {
      event.preventDefault();
      const canvas = this.$refs[`firmaCanvas${index}`];
      const ctx = canvas.getContext('2d');
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.strokeStyle = 'black';
      ctx.beginPath();
      ctx.moveTo(event.offsetX, event.offsetY);
      this.firmando[index - 1] = true;
    },
    dibujarFirma(index, event) {
      if (!this.firmando[index - 1]) return;
      const canvas = this.$refs[`firmaCanvas${index}`];
      const ctx = canvas.getContext('2d');
      ctx.lineTo(event.offsetX, event.offsetY);
      ctx.stroke();
    },
    finalizarFirma(index) {
      this.firmando[index - 1] = false;
      const canvas = this.$refs[`firmaCanvas${index}`];
      const firmaKey = `firmaBase64${index}`;
      this[firmaKey] = canvas.toDataURL('image/png');
    },

  limpiarFirma(index) {
  const canvas = this.$refs[`firmaCanvas${index}`];
  if (canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const firmaKey = `firmaBase64${index}`;
    this[firmaKey] = ''; // Borra la imagen en base64
    this.firmando[index - 1] = false; // Asegura que no quede en modo dibujo
  }
},

      
    async enviarFormulario() {
      if (!this.firmaBase641) {
        alert('Es obligatorio la firma del primer participante de la reunión.');
        return;
      }

      if (this.enviando) return;
      this.enviando = true;

      try {
        const codigo = await generarCodigoUnico();
        this.codigoUnico = codigo;

        const formData = new FormData();
        formData.append('codigoUnico', this.codigoUnico);
        formData.append('objetivo', this.objetivo);
        formData.append('acta', this.acta);
        formData.append('fecha', this.fecha);
        formData.append('lugar', this.lugar);
        formData.append('horaInicio', this.horaInicio);
        formData.append('horaFin', this.horaFin);
        formData.append('nombre', this.nombre);
        formData.append('cargo', this.cargo);
        formData.append('asistio', this.asistio);
        formData.append('firmaBase641', this.firmaBase641);
        formData.append('nombre1', this.nombre1);
        formData.append('cargo1', this.cargo1);
        formData.append('asistio1', this.asistio1);
        formData.append('firmaBase642', this.firmaBase642);
        formData.append('nombre2', this.nombre2);
        formData.append('cargo2', this.cargo2);
        formData.append('asistio2', this.asistio2);
        formData.append('firmaBase643', this.firmaBase643);
        formData.append('nombre3', this.nombre3);
        formData.append('cargo3', this.cargo3);
        formData.append('asistio3', this.asistio3);
        formData.append('firmaBase644', this.firmaBase644);
        formData.append('nombre4', this.nombre4);
        formData.append('cargo4', this.cargo4);
        formData.append('asistio4', this.asistio4);
        formData.append('firmaBase645', this.firmaBase645);
        formData.append('tema1', this.tema1);
        formData.append('abordado1', this.abordado1);
        formData.append('completo1', this.completo1);
        formData.append('tema2', this.tema2);
        formData.append('abordado2', this.abordado2);
        formData.append('completo2', this.completo2);
        formData.append('tema3', this.tema3);
        formData.append('abordado3', this.abordado3);
        formData.append('completo3', this.completo3);
        formData.append('temaTratado1', this.temaTratado1);
        formData.append('temaTratado2', this.temaTratado2);
        formData.append('temaTratado3', this.temaTratado3);
        formData.append('descripcion1', this.descripcion1);
        formData.append('responsable1', this.responsable1);
        formData.append('fechaPrevista1', this.fechaPrevista1);
        formData.append('descripcion2', this.descripcion2);
        formData.append('responsable2', this.responsable2);
        formData.append('fechaPrevista2', this.fechaPrevista2);
        formData.append('descripcion3', this.descripcion3);
        formData.append('responsable3', this.responsable3);
        formData.append('fechaPrevista3', this.fechaPrevista3);
        

        await fetch(this.scriptURL, { method: 'POST', body: formData });

        alert('✅ Datos almacenados correctamente.');
        this.resetFormulario();

      } catch (error) {
        console.error("❌ Error real:", error.message || error);
        alert('❌ Error al enviar los datos. Revisa la consola.');
      } finally {
        this.enviando = false;
      }
    },

    
    resetFormulario() {
      this.objetivo = '';
      this.acta = '';
      this.fecha = '';
      this.lugar = '';
      this.horaInicio = '';
      this.horaFin = '';
      this.nombre = '';
      this.cargo = '';
      this.asistio = '';
      this.firmaBase641 = '';
      this.nombre1 = '';
      this.cargo1 = '';
      this.asistio1 = '';
      this.firmaBase642 = '';
      this.nombre2 = '';
      this.cargo2 = '';
      this.asistio2 = '';
      this.firmaBase643 = '';
      this.nombre3 = '';
      this.cargo3 = '';
      this.asistio3 = '';
      this.firmaBase644 = '';
      this.nombre4 = '';
      this.cargo4 = '';
      this.asistio4 = '';
      this.firmaBase645 = '';
      this.tema1 = '';
      this.abordado1 = '';
      this.completo1 = '';
      this.tema2 = '';
      this.abordado2 = '';
      this.completo2 = '';
      this.tema3 = '';
      this.abordado3 = '';
      this.completo3 = '';
      this.temaTratado1 = '';
      this.temaTratado2 = '';
      this.temaTratado3 = '';
      this.descripcion1 = '';
      this.responsable1 = '';
      this.fechaPrevista1 = '';
      this.descripcion2 = '';
      this.responsable2 = '';
      this.fechaPrevista2 = '';
      this.descripcion3 = '';
      this.responsable3 = '';
      this.fechaPrevista3 = '';
      

      this.$nextTick(() => {
        for (let i = 1; i <= 5; i++) {
          const canvas = this.$refs[`firmaCanvas${i}`];
          if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
          }
        }
      });
    }
  }
};



document.addEventListener("DOMContentLoaded", function () {
    // Obtener la fecha actual en formato YYYY-MM-DD
    let today = new Date().toISOString().split("T")[0];

    // Aplicar la restricción a los campos de fecha
    document.getElementById("fecha").setAttribute("min", today);

    let fechaPrevistaInputs = document.querySelectorAll("input[type='date'][name^='fechaPrevista']");
    fechaPrevistaInputs.forEach(input => {
        input.setAttribute("min", today);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let horaInicio = document.getElementById("horaInicio");
    let horaFin = document.getElementById("horaFin");

    function validarHora() {
        if (horaInicio.value && horaFin.value) {
            if (horaFin.value <= horaInicio.value) {
                alert("La hora de fin no puede ser menor o igual a la hora de inicio.");
                horaFin.value = ""; // Limpia el campo de hora de fin
            }
        }
    }

    horaInicio.addEventListener("change", validarHora);
    horaFin.addEventListener("change", validarHora);
 });   


</script>

<style scoped>

/* ======= ESTILOS BASE ======= */
.firma-canvas {
  border: 3px dashed #007bff;
  border-radius: 10px;
  background: #fff;
  padding: 10px;
  display: block;
  margin: 10px auto;
  max-width: 100%;
  cursor: crosshair;
}

.form-container {
  max-width: 750px;
  margin: auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  color: #2c3e50;
}

.form-container h2 {
  font-size: 1.4rem;
  margin-bottom: 20px;
  border-bottom: 2px solid #007bff;
  padding-bottom: 8px;
  color: #007bff;
}

/* ======= FORMULARIO ======= */
.form-group label {
  font-weight: 600;
  color: #2c3e50;
  display: block;
  margin-bottom: 5px;
}

input, select, textarea {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  font-size: 16px;
  transition: border-color 0.3s ease-in-out, background-color 0.3s ease;
}

input:focus, select:focus, textarea:focus {
  border-color: #007bff;
  background-color: #fff;
  outline: none;
}

/* ======= BOTONES MODERNOS ======= */
.btn,
.firma-actions button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #fff;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn:hover,
.firma-actions button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.btn-submit {
  width: 100%;
  background: linear-gradient(135deg, #007bff, #0056b3);
}

.btn-submit:hover {
  background: linear-gradient(135deg, #0056b3, #00408f);
}

.btn-add {
  background: linear-gradient(135deg, #17a2b8, #117a8b);
}

.btn-add:hover {
  background: linear-gradient(135deg, #117a8b, #0f5e70);
}

.btn-firma,
.firma-actions button:first-child {
  background: linear-gradient(135deg, #28a745, #218838);
}

.btn-firma:hover,
.firma-actions button:first-child:hover {
  background: linear-gradient(135deg, #218838, #1e7e34);
}

.btn-cancel,
.firma-actions button:last-child {
  background: linear-gradient(135deg, #dc3545, #c82333);
}

.btn-cancel:hover,
.firma-actions button:last-child:hover {
  background: linear-gradient(135deg, #c82333, #bd2130);
}

/* ======= CONTENEDOR DE BOTONES DE FIRMA ======= */
.firma-actions {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 14px;
  max-width: 420px;
  margin-left: auto;
  margin-right: auto;
  flex-wrap: wrap;
}

.firma-actions button {
  flex: 1;
  min-width: 160px;
  text-align: center;
}

/* ======= VISTA PREVIA DE FIRMA ======= */
.firma-preview {
  max-width: 200px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  margin-top: 10px;
}

/* ======= CAMPOS DE PARTICIPANTES ======= */
.input-group,
.row {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.input-medium {
  flex: 1;
}

.input-small {
  width: 130px;
}

.asistencia-item {
  margin-bottom: 30px;
}

.asistencia-item input[type="text"],
.asistencia-item select {
  width: calc(33.33% - 12px);
  margin-bottom: 12px;
}

.asistencia-item canvas {
  display: block;
  margin: 10px auto 5px;
}

/* ======= RESPONSIVE ======= */
@media (max-width: 768px) {
  .input-group,
  .row {
    flex-direction: column;
    gap: 10px;
  }

  .asistencia-item input[type="text"],
  .asistencia-item select {
    width: 100%;
  }

  .btn {
    width: 100%;
    margin-bottom: 10px;
  }

  .firma-preview {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .form-container {
    padding: 20px;
  }

  .form-container h2 {
    font-size: 1.2rem;
  }

  input, select, textarea {
    font-size: 14px;
    padding: 10px;
  }

  .btn,
  .firma-actions button {
    font-size: 15px;
    padding: 10px 16px;
    width: 100%;
  }

  .firma-actions {
    flex-direction: column;
  }
}

/* ======= ESTILO PARA BOTÓN DE LIMPIAR FIRMA ======= */
.firma-buttons {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

.firma-buttons button {
  background: linear-gradient(135deg, #dc3545, #c82333);
  color: #fff;
  padding: 8px 16px;
  font-size: 10px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  letter-spacing: 0.5px;
  min-width: 180px;
}

.firma-buttons button:hover {
  background: linear-gradient(135deg, #c82333, #bd2130);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(220, 53, 69, 0.3);
}

.firma-buttons button:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(220, 53, 69, 0.25);
}

@media (max-width: 480px) {
  .firma-buttons button {
    width: 100%;
    padding: 10px 16px;
    font-size: 15px;
  }
}

</style>
