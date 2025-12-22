// Función auxiliar para validar nombre y mostrar errores
function validarNombre(nombre, nombreInput) {
    nombreInput.classList.remove('is-invalid', 'is-valid');
    let errorNombre = '';

    if (nombre === '' || nombre.split(' ').length < 2) {
        errorNombre = 'El nombre es requerido y debe incluir al menos un apellido.';
    } else if (nombre.length < 5) {
        errorNombre = 'El nombre debe tener al menos 5 caracteres.';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
        errorNombre = 'El nombre solo debe contener letras y espacios.';
    } else {
        nombreInput.classList.add('is-valid');
        return true; // Válido
    }

    nombreInput.classList.add('is-invalid');
    mostrarMensajeError(nombreInput, errorNombre);
    return false; // No válido
}

// Función auxiliar para validar nota y mostrar errores
function validarNota(nota, notaInput) {
    notaInput.classList.remove('is-invalid', 'is-valid');
    let errorNota = '';

    if (notaInput.value === '') {
        errorNota = 'La nota es requerida.';
    } else if (isNaN(nota)) {
        errorNota = 'Solo números permitidos.';
    } else if (nota < 0 || nota > 10) {
        errorNota = 'La nota debe estar entre 0 y 10.';
    } else {
        notaInput.classList.add('is-valid');
        return true; 
    }

    notaInput.classList.add('is-invalid');
    mostrarMensajeError(notaInput, errorNota);
    return false; 
}

// Función principal de validación (al hacer clic en guardar)
function validacion(nombre, nota, nombreInput, notaInput) {
    let esValidoNombre = validarNombre(nombre, nombreInput);
    let esValidoNota = validarNota(nota, notaInput);

    var form = document.getElementById('formularioEstudiante');
    if (form) {
        form.classList.add('was-validated');
    }

    return esValidoNombre && esValidoNota;
}

// Función para mostrar el mensaje de error
function mostrarMensajeError(input, mensaje) {
    var feedback = input.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.textContent = mensaje;
    }
}

// Función para limpiar el mensaje de error
function limpiarMensajeError(input) {
    var feedback = input.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.textContent = '';
    }
}

// Función para inicializar validación en tiempo real
document.addEventListener('DOMContentLoaded', function () {
    const nombreInput = document.getElementById('nombre');
    const notaInput = document.getElementById('nota');

    // Validar nombre mientras escribe
    if (nombreInput) {
        nombreInput.addEventListener('input', function () {
            let nombre = nombreInput.value.trim();
            validarNombre(nombre, nombreInput);
        });
    }

    // Validar nota mientras escribe
    if (notaInput) {
        notaInput.addEventListener('input', function () {
            let nota = parseFloat(notaInput.value);
            validarNota(nota, notaInput);
        });
    }
});