import {
  inputMascota,
  inputPropietario,
  inputTelefono,
  inputFecha,
  inputHora,
  inputSintomas,
  formulario,
} from '../variables.js';
import { llenarDatosCita, generarCita, crearBaseDatos } from '../funciones.js';


export class App {
  constructor() {
    this.init();
  }

  init() {
    crearBaseDatos();
    inputMascota.addEventListener('change', llenarDatosCita);
    inputPropietario.addEventListener('change', llenarDatosCita);
    inputTelefono.addEventListener('change', llenarDatosCita);
    inputFecha.addEventListener('change', llenarDatosCita);
    inputHora.addEventListener('change', llenarDatosCita);
    inputSintomas.addEventListener('change', llenarDatosCita);
    formulario.addEventListener('submit', generarCita);
  }
};