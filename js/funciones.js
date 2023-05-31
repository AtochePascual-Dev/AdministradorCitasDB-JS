// * IMPORTACIONES
import {
  citaDatos,
  inputMascota,
  inputPropietario,
  inputTelefono,
  inputFecha,
  inputHora,
  inputSintomas,
} from './variables.js';
import { UI } from './UI.js';

const ui = new UI();
export let BD;

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

  // validamos si el objeto cita contiene un id
  (citaDatos.id)
    ? editarCitaBD({ ...citaDatos })
    : agregarCitaBD({ ...citaDatos });

  // Obtenemos la citas de la BD y las mostramos
  ui.motrarCitas();

  // Reseteamos el formulario y los datos del objeto cita
  ui.resetearFormulario();

  document.querySelector('button[type=submit]').textContent = 'crear cita';
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
    BD = baseDatos.result;
    ui.motrarCitas();
  };

  baseDatos.onerror = () => {
    console.log('Error al crear la base de datos');
  };
};



// * Agrega una cita a la Base de datos
const agregarCitaBD = (cita) => {
  const transaction = BD.transaction(['citas'], 'readwrite');
  const objectStore = transaction.objectStore('citas');

  // generamos un id para la cita
  citaDatos.id = Date.now();

  objectStore.add(cita);

  transaction.oncomplete = () => {
    ui.mostrarMensaje('Cita creada correctamente');
  };

  transaction.onerror = () => {
    ui.mostrarMensaje('Error al crear la cita', false);
  };
};



// * Elimina una cita de BD
export const eliminarCita = (id) => {
  const transaction = BD.transaction(['citas'], 'readwrite');
  const objectStore = transaction.objectStore('citas');

  objectStore.delete(id);

  transaction.oncomplete = () => {
    ui.mostrarMensaje('Cita eliminada correctamente');
    ui.motrarCitas();
  };

  transaction.onerror = () => {
    ui.mostrarMensaje('Error al eliminar la cita', false);
  };
};



// * Carga los datos del objeto y los inputs
export const cargarDatos = (cita) => {
  const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

  // cargamos los datos de los inputs 
  inputMascota.value = mascota;
  inputPropietario.value = propietario;
  inputTelefono.value = telefono;
  inputFecha.value = fecha;
  inputHora.value = hora;
  inputSintomas.value = sintomas;

  // Cargamos los datos del objeto cita
  citaDatos.mascota = mascota;
  citaDatos.propietario = propietario;
  citaDatos.telefono = telefono;
  citaDatos.fecha = fecha;
  citaDatos.hora = hora;
  citaDatos.sintomas = sintomas;
  citaDatos.id = id;

  document.querySelector('button[type=submit]').textContent = 'Guardar Cambios';
};



// * Edita una cita de BD
export const editarCitaBD = (cita) => {
  const transaction = BD.transaction(['citas'], 'readwrite');
  const objectStore = transaction.objectStore('citas');

  objectStore.put(cita);

  transaction.oncomplete = () => {
    ui.mostrarMensaje('Cita editada correctamente');
  };

  transaction.onerror = () => {
    ui.mostrarMensaje('Error al editar la cita', false);
  };
};