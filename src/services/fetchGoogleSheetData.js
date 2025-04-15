import * as Papa from "papaparse";

export default async function fetchGoogleSheetData() {
  try {
    const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRChp3phM2rozhyhDVAJ7EnkapAImoLREVtdK_47piV_1SZhtAK_bwNoXgWDVJNOWe6n8z-DRqZiaIH/pub?gid=0&single=true&output=csv";

    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al obtener los datos");

    const csvText = await response.text();

    const { data, errors } = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
    });

    if (errors.length > 0) {
      console.warn("Errores en el parseo del CSV:", errors);
    }

    // Procesar columnas JSON
    const parsedData = data.map(row => ({
      ...row,
      asistencia: row.asistencia ? JSON.parse(row.asistencia) : [],
      agenda: row.agenda ? JSON.parse(row.agenda) : [],
      temasTratados: row.temasTratados ? JSON.parse(row.temasTratados) : [],
      compromisos: row.compromisos ? JSON.parse(row.compromisos) : [],
    }));

    console.log("Datos obtenidos:", parsedData);
    return parsedData;
  } catch (error) {
    console.error("Error al obtener datos de Google Sheets:", error);
    return [];
  }
}