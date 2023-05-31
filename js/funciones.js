// * IMPORTACIONES
import { citaDatos } from './variables.js';
import { UI } from './UI.js';

const ui = new UI();
let BD;

// * Llena los datos del objeto cita segun propiedad name
export const llenarDatosCita = (event) => {
  const valor = event.target.value.trim();
  const name = event.target.name;

  // llenamos los datos del objeto
  citaDatos[name] = valor;
};


// * Genera una cita
export const generarCita = (event) => {
  event.preventDefault();

  // Validamos si los datos del objetoCita contienen vacios
  if (Object.values(citaDatos).includes('')) {
    ui.mostrarMensaje('Todos los campos son obligatorios', false);
    return;
  };

  // Encaso de pasar la validacion mostramos un mensaje de exito
  ui.mostrarMensaje('Cita creada correctamente');
};


// * Crea al base de datos
export const crearBaseDatos = () => {
  const baseDatos = window.indexedDB.open('citas', 1);

  baseDatos.onupgradeneeded = () => {
    BD = baseDatos.result;

    const objectStore = BD.createObjectStore('citas', {
      keyPath: 'id',
      autoIncrement: true
    });

    objectStore.createIndex('mascota', 'mascota', { unique: false });
    objectStore.createIndex('propietario', 'propietario', { unique: false });
    objectStore.createIndex('telefono', 'telefono', { unique: false });
    objectStore.createIndex('fecha', 'fecha', { unique: false });
    objectStore.createIndex('hora', 'hora', { unique: false });
    objectStore.createIndex('sintomas', 'sintomas', { unique: false });
    objectStore.createIndex('id', 'id', { unique: true });
  };

  baseDatos.onsuccess = () => {
    console.log('Base datos creada correctamente');
  };

  baseDatos.onerror = () => {
    console.log('Error al crear la base de datos');
  };
};