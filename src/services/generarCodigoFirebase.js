import { getFirestore, doc, getDoc, setDoc, collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { app } from "../firebase"; // Importa la app inicializada

const db = getFirestore(app); // Obtén la instancia de Firestore

export async function generarCodigoUnico() {
  const fecha = new Date();
  const fechaActual = fecha.toISOString().slice(0, 10).replace(/-/g, ""); // formato YYYYMMDD

  // Documento que almacena el contador global (número secuencial)
  const contadorDocRef = doc(db, "config", "contadorGlobal");

  try {
    // Obtiene el documento con el contador global
    const docSnap = await getDoc(contadorDocRef);

    let nuevoNumero;

    if (docSnap.exists()) {
      // Si ya existe el documento, obtiene el contador actual
      const contador = docSnap.data().contador;
      nuevoNumero = contador + 1; // Incrementar el contador global
    } else {
      // Si no existe el documento, empezar desde el número máximo ya existente en Firestore
      const q = query(
        collection(db, "codigos"),
        orderBy("timestamp", "desc"),
        limit(1)
      );
      const snapshot = await getDocs(q);
      
      // Si no hay registros previos, empezamos desde 200
      if (snapshot.empty) {
        nuevoNumero = 200;
      } else {
        // Si hay registros previos, continuamos desde el último número generado
        const ultimoCodigo = snapshot.docs[0].data().codigo;
        const partes = ultimoCodigo.split("-");
        const numeroAnterior = parseInt(partes[1], 10);
        nuevoNumero = numeroAnterior + 1;
      }
    }

    // Generar el código con la fecha y el número secuencial
    let codigoGenerado = `${fechaActual}-${String(nuevoNumero).padStart(4, "0")}`;

    // Verificar si el código generado ya existe
    const codigoExistente = await verificarCodigoExistente(codigoGenerado);
    if (codigoExistente) {
      // Si ya existe, incrementamos el número y volvemos a generar el código
      nuevoNumero++;
      codigoGenerado = `${fechaActual}-${String(nuevoNumero).padStart(4, "0")}`;
    }

    // Guardar el nuevo código y el contador actualizado en Firestore
    await setDoc(contadorDocRef, { contador: nuevoNumero }, { merge: true });

    // Añadir el código generado a la colección "codigos"
    await setDoc(doc(db, "codigos", codigoGenerado), {
      codigo: codigoGenerado,
      timestamp: Date.now()
    });

    return codigoGenerado;
  } catch (error) {
    console.error("Error al generar el código único:", error);
    throw new Error("No se pudo generar el código único.");
  }
}

// Función para verificar si el código generado ya existe en Firestore
async function verificarCodigoExistente(codigo) {
  const q = query(
    collection(db, "codigos"),
    orderBy("timestamp"),
    limit(1)
  );
  const snapshot = await getDocs(q);

  // Si el código existe en la base de datos, devuelve true
  if (!snapshot.empty) {
    const codigoExistente = snapshot.docs.some((doc) => doc.data().codigo === codigo);
    return codigoExistente;
  }

  return false; // Si no hay coincidencias, el código no existe
}
