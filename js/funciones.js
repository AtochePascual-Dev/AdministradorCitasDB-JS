// * IMPORTACIONES
import { citaDatos } from './variables.js';
import { UI } from './UI.js';

const ui = new UI();

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
};