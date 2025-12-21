var estudiantes = [];
var btn_Agregar = document.getElementById('btn_agregar');

function validación(nombre, nota, nombreInput, notaInput) {
    // Limpiar clases previas
    nombreInput.classList.remove('is-invalid');
    notaInput.classList.remove('is-invalid');

    let esValido = true;
    let errorNombre = '';
    let errorNota = '';

    // VALIDACIONES DEL NOMBRE
    if (nombre === ''|| nombre.split(' ').length < 2) {
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

    // VALIDACIONES DE LA NOTA
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

    const form = document.getElementById('formularioEstudiante');
    form.classList.add('was-validated');

    return esValido;
}



function mostrarMensajeError(input, mensaje) {
    let feedback = input.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.textContent = mensaje;
    }
}

function limpiarMensajeError(input) {
    let feedback = input.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.textContent = '';
    }
}

function guardarEstudiante() {
    // 1. CAPTURA DE DATOS DEL DOM
    var nombreInput = document.getElementById('nombre');
    var notaInput = document.getElementById('nota');

    var nombre = nombreInput.value.trim().toUpperCase();
    var nota = parseFloat(notaInput.value);
    // 2. VALIDACIÓN
    // if (!no_seleccionar(nombre, nota, nombreInput, notaInput)) return;
    if (!validación(nombre, nota, nombreInput, notaInput)) return;

    // 3. DETERMINAR ESTADO
    var estado = "Reprobado";
    if (nota >= 7) {
        estado = "Aprobado";
    } else if (nota >= 5) {
        estado = "Supletorio";
    }

    // 4. CREAR EL OBJETO
    var nuevoEstudiante = {
        nombre: nombre,
        nota: nota,
        estado: estado
    };

    // 5. GUARDAR EN TU ARREGLO DE OBJETOS
    estudiantes.push(nuevoEstudiante);

    if (typeof notas !== 'undefined') {
        notas.push(nota);
        console.log("Nota agregada al arreglo global 'notas' para cálculo.");

        calcularEstadisticas();
    }

    // 6. ACTUALIZAR INTERFAZ
    agregarFilaTabla(nuevoEstudiante);
    limpiarFormulario();
}

function agregarFilaTabla(estudiante) {
    var tbody = document.getElementById('tabla-estudiantes');
    var tr = document.createElement('tr');

    // pintar celda
    var claseEstado = '';
    if (estudiante.estado === 'Aprobado') claseEstado = 'text-success fw-bold';
    else if (estudiante.estado === 'Supletorio') claseEstado = 'text-warning fw-bold';
    else claseEstado = 'text-danger fw-bold';

   
    var td = (contenido, claseAsignada) => {
        var celda = document.createElement('td');
        celda.textContent = contenido;
        if (claseAsignada != undefined) {
            celda.className = claseAsignada;
        }
        return celda;
    };

    tr.innerHTML = td(estudiante.nombre).outerHTML + td(estudiante.nota).outerHTML + td(estudiante.estado, claseEstado).outerHTML;

    tbody.appendChild(tr);
}

function limpiarFormulario() {
    document.getElementById('formularioEstudiante').reset();
    document.getElementById('nombre').focus();
}

btn_Agregar.addEventListener('click', function (event) {
    guardarEstudiante();
});