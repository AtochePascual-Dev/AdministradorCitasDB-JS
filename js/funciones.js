// * IMPORTACIONES
import { citaDatos } from './variables.js';


// * Llena los datos del objeto cita segun propiedad name
export const llenarDatosCita = (event) => {
  const valor = event.target.value.trim();
  const name = event.target.name;

  // llenamos los datos del objeto
  citaDatos[name] = valor;
};
