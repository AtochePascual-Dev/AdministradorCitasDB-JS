// * IMPORTACIONES
import { contenedorCitas } from './variables.js';
import { BD } from './funciones.js';
export class UI {

  // * Muestra un mensaje en pantalla
  mostrarMensaje = (mensaje, exito = true) => {
    const existeMensaje = document.querySelector('.mensaje');
    const divMensaje = document.createElement('div');

    // Validamos si ya exite un mensaje en pantalla
    if (existeMensaje) return;

    divMensaje.textContent = mensaje;
    divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12', 'mensaje');

    (exito)
      ? divMensaje.classList.add('alert-success')
      : divMensaje.classList.add('alert-danger');

    document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  };



  // * Muestra las citas en pantalla
  motrarCitas() {
    const transaction = BD.transaction(['citas']);
    const objectStore = transaction.objectStore('citas');

    // limpiamos la lista de html previa
    this.limpiarListaHtml();

    objectStore.openCursor().onsuccess = (event) => {

      // obtenemos un registro de la bd
      const cursor = event.target.result;

      if (cursor) {
        const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cursor.value;
        const divCita = document.createElement('div');

        divCita.classList.add('cita', 'p-3');
        divCita.dataset.id = id;

        // Scripting
        const mascotaText = document.createElement('h2');
        mascotaText.textContent = mascota;
        mascotaText.classList.add('card-title', 'font-weight-bolder');

        const propietarioText = document.createElement('p');
        propietarioText.innerHTML = `
      <span class="font-weight-bolder">Propietario:</span> ${propietario}`;

        const telefonoText = document.createElement('p');
        telefonoText.innerHTML = `
      <span class="font-weight-bolder">Telefono:</span> ${telefono}`;

        const fechaText = document.createElement('p');
        fechaText.innerHTML = `
      <span class="font-weight-bolder">Fecha:</span> ${fecha}`;

        const horaText = document.createElement('p');
        horaText.innerHTML = `
      <span class="font-weight-bolder">Hora:</span> ${hora}`;

        const sintomasText = document.createElement('p');
        sintomasText.innerHTML = `
      <span class="font-weight-bolder">Sintomas:</span> ${sintomas}`;

        // boton para eliminar cita
        const bntEliminar = document.createElement('button');
        bntEliminar.textContent = 'Eliminar';
        bntEliminar.classList.add('btn', 'btn-danger', 'mr-2');

        // Boton para editar un cita
        const bntEditar = document.createElement('button');
        bntEditar.textContent = 'Editar';
        bntEditar.classList.add('btn', 'btn-info');

        divCita.append(mascotaText, propietarioText, telefonoText, fechaText, horaText, sintomasText, bntEliminar, bntEditar);

        contenedorCitas.appendChild(divCita);

        // Ve al siguiente elemento
        cursor.continue();
      };
    }
  };



  // * Limpa la lisa de html previa
  limpiarListaHtml() {
    while (contenedorCitas.firstChild) {
      contenedorCitas.firstChild.remove();
    };
  };
};