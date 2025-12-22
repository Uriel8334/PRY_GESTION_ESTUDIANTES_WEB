var estudiantes = [];

// Funcion para inicializar la aplicacion
function inicializar() {
    estudiantes = cargarDelStorage();
    renderTabla(estudiantes);
    actualizarEstadisticas(estudiantes);

}

// Funcion para manejar el registro de un nuevo estudiante como objeto
function manejarRegistro() {
    var nombreInput = document.getElementById('nombre');
    var notaInput = document.getElementById('nota');

    if (!nombreInput || !notaInput) {
        return;
    }

    var nombre = nombreInput.value.trim().toUpperCase();
    var nota = parseFloat(notaInput.value);

    if (!validacion(nombreInput.value.trim(), nota, nombreInput, notaInput)) {
        return;
    }

    var nuevoEstudiante = {
        nombre: nombre,
        nota: nota,
        estado: getEstado(nota)
    };

    estudiantes.push(nuevoEstudiante);
    guardarEnStorage(estudiantes);
    renderTabla(estudiantes);
    actualizarEstadisticas(estudiantes);
    limpiarFormulario();
}

// Inicialización al cargar el DOM
document.addEventListener('DOMContentLoaded', function () {
    var menuItems = document.querySelectorAll('nav.page-navigation li');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(li => li.classList.remove('active'));
            this.classList.add('active');
        });
    });

    var btnAgregar = document.getElementById('btn_agregar');
    if (btnAgregar) {
        btnAgregar.addEventListener('click', manejarRegistro);
    }
    inicializar();
});
