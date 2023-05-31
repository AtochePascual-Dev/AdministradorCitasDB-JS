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
};