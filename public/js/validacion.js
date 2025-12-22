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

function validarUsuario(usuario, usuarioInput) {
    usuarioInput.classList.remove('is-invalid', 'is-valid');
    let errorUsuario = '';

    if (usuario === '') {
        errorUsuario = 'El usuario es requerido.';
    } else if (usuario.length < 3) {
        errorUsuario = 'El usuario debe tener al menos 3 caracteres.';
    } else {
        usuarioInput.classList.add('is-valid');
        return true;
    }

    if (errorUsuario) {
        usuarioInput.classList.add('is-invalid');
        mostrarMensajeError(usuarioInput, errorUsuario);
    }
    return false;
}

function validarContraseñaLogin(password, passwordInput) {
    passwordInput.classList.remove('is-invalid', 'is-valid');
    let errorPassword = '';

    if (password === '') {
        errorPassword = 'La contraseña es requerida.';
    } else if (password.length < 6) {
        errorPassword = 'La contraseña debe tener al menos 6 caracteres.';
    } else {
        passwordInput.classList.add('is-valid');
        return true;
    }

    if (errorPassword) {
        passwordInput.classList.add('is-invalid');
        mostrarMensajeError(passwordInput, errorPassword);
    }
    return false;
}

function inicializarValidacionLogin(usuario, password,usuarioInput,passwordInput) {
    var validarUsuario = validarUsuario(usuario, usuarioInput);
    var validarPassword = validarContraseñaLogin(password, passwordInput);

    var form = document.getElementById('loginForm');
    if (form) {
        form.classList.add('was-validated');
    }

    return validarUsuario && validarPassword;
}

function validarLoginAntesDeLlenar() {
    var usuarioInput = document.getElementById('usuario');
    var passwordInput = document.getElementById('password');
    var btnEnter = document.getElementById('btnEnter');
    var loginForm = document.getElementById('loginForm');

    if (!usuarioInput || !passwordInput || !btnEnter) return;

    // Validar usuario mientras escribe
    usuarioInput.addEventListener('input', function() {
        var usuario = usuarioInput.value.trim();
        validarUsuario(usuario, usuarioInput);
    });

    // Validar contraseña mientras escribe
    passwordInput.addEventListener('input', function() {
        var password = passwordInput.value.trim();
        validarContraseñaLogin(password, passwordInput);
    });

    // Validar al enviar el formulario
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            var usuario = usuarioInput.value.trim();
            var password = passwordInput.value.trim();

            var usuarioValido = validarUsuario(usuario, usuarioInput);
            var passwordValido = validarContraseñaLogin(password, passwordInput);  // CORREGIDO

            if (usuarioValido && passwordValido) {
                // Guardar sesión y redirigir
                localStorage.setItem("sesionActiva", "true");
                localStorage.setItem("usuarioActual", usuario);

                if (document.getElementById('recordar').checked) {
                    localStorage.setItem("usuarioRecordado", usuario);
                }

                // Redirigir a index.html
                window.location.href = "../index.html";
            }
        });
    }
}

// Función principal de validación (al hacer clic en guardar)
function validacionTabla(nombre, nota, nombreInput, notaInput) {
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
    var nombreInput = document.getElementById('nombre');
    var notaInput = document.getElementById('nota');

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

// Ejecutar SOLO en login.html
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('usuario') && document.getElementById('password')) {
        validarLoginAntesDeLlenar();
    }
});