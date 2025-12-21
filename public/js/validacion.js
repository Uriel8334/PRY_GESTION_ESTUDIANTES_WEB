// Funcion para validar el formulario de Registro de Estudiante
function validacion(nombre, nota, nombreInput, notaInput) {
    // Limpiar clases previas
    nombreInput.classList.remove('is-invalid');
    notaInput.classList.remove('is-invalid');

    var esValido = true;
    var errorNombre = '';
    var errorNota = '';

    // Validaciones del nombre
    if (nombre === '' || nombre.split(' ').length < 2) {
        errorNombre = 'El nombre es requerido y debe incluir al menos un apellido.';
        esValido = false;
    } else if (nombre.length < 5) {
        errorNombre = 'El nombre debe tener al menos 5 caracteres.';
        esValido = false;
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
        errorNombre = 'El nombre solo debe contener letras y espacios.';
        esValido = false;
    } else {
        nombreInput.classList.add('is-valid');
    }

    // Validaciones de la nota
    if (isNaN(nota) || nota < 0 || nota > 10) {
        errorNota = 'La nota debe ser un número entre 0 y 10.';
        esValido = false;
    } else {
        notaInput.classList.add('is-valid');
    }

    // Mostrar errores en los inputs
    if (errorNombre) {
        nombreInput.classList.add('is-invalid');
        mostrarMensajeError(nombreInput, errorNombre);
    } else {
        limpiarMensajeError(nombreInput);
    }

    if (errorNota) {
        notaInput.classList.add('is-invalid');
        mostrarMensajeError(notaInput, errorNota);
    } else {
        limpiarMensajeError(notaInput);
    }

    var form = document.getElementById('formularioEstudiante');
    if (form) {
        form.classList.add('was-validated');
    }

    return esValido;
}

// Funcion para mostrar el mensaje de error
function mostrarMensajeError(input, mensaje) {
    var feedback = input.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.textContent = mensaje;
    }
}

// Funcion para limpiar el mensaje de error
function limpiarMensajeError(input) {
    var feedback = input.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.textContent = '';
    }
}
