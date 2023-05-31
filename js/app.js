// * IMPORTACIONES
import {
  inputMascota,
  inputPropietario,
  inputTelefono,
  inputFecha,
  inputHora,
  inputSintomas,
  formulario,
  citaDatos
} from './variables.js';

import { llenarDatosCita, generarCita, crearBaseDatos } from './funciones.js';

// * EVENTOS
document.addEventListener('DOMContentLoaded', () => {
  crearBaseDatos();
  inputMascota.addEventListener('change', llenarDatosCita);
  inputPropietario.addEventListener('change', llenarDatosCita);
  inputTelefono.addEventListener('change', llenarDatosCita);
  inputFecha.addEventListener('change', llenarDatosCita);
  inputHora.addEventListener('change', llenarDatosCita);
  inputSintomas.addEventListener('change', llenarDatosCita);
  formulario.addEventListener('submit', generarCita);
});

