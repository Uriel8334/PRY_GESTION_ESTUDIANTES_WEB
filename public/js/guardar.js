var estudiantes = [];

function clasificarEstudiante(nota) {
    if (nota >= 7 && nota <= 10) {
        return "Aprobado";
    } else if (nota >= 5 && nota < 7) {
        return "Supletorio";
    } else {
        return "Reprobado";
    }
}


function guardarEstudiante() {

    var nombreInput = document.getElementById('nombre');
    var notaInput = document.getElementById('nota');

    var nombre = nombreInput.value.trim();
    var nota = parseFloat(notaInput.value);

    if (nombre === "") {
        alert("Por favor, ingresa el nombre del estudiante.");
        return;
    }
    if (isNaN(nota) || nota < 0 || nota > 10) {
        alert("La nota debe ser un número entre 0 y 10.");
        return;
    }

    var estado = clasificarEstudiante(nota);

    var nuevoEstudiante = {
        nombre: nombre,
        nota: nota,
        estado: estado
    };

    estudiantes.push(nuevoEstudiante);

    mostrarEstudiantes();

    limpiarFormulario();
}

function mostrarEstudiantes() {
    var tbody = document.getElementById('tabla-estudiantes');
    tbody.innerHTML = "";

    for (var i = 0; i < estudiantes.length; i++) {
        var estudiante = estudiantes[i];
        var tr = document.createElement('tr');

        var claseEstado = "";
        if (estudiante.estado === "Aprobado") {
            claseEstado = "text-success fw-bold";
        } else if (estudiante.estado === "Supletorio") {
            claseEstado = "text-warning fw-bold";
        } else {
            claseEstado = "text-danger fw-bold";
        }

        tr.innerHTML = `
            <td>${estudiante.nombre}</td>
            <td>${estudiante.nota}</td>
            <td class="${claseEstado}">${estudiante.estado}</td>
        `;

        tbody.appendChild(tr);
    }
}


function limpiarFormulario() {
    document.getElementById('formularioEstudiante').reset();
    document.getElementById('nombre').focus();
}
