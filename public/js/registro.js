// Funcion para manejar el estado del estudiante
function getEstado(nota) {
    if (nota >= 7) return 'Aprobado';
    if (nota >= 5) return 'Supletorio';
    return 'Reprobado';
}

// Funcion para guardar estudiantes en la tabla
function agregarFilaTabla(estudiante) {
    var tbody = document.getElementById('tabla-estudiantes');
    if (!tbody) return;

    var tr = document.createElement('tr');

    var claseEstado = '';
    if (estudiante.estado === 'Aprobado') claseEstado = 'text-success fw-bold';
    else if (estudiante.estado === 'Supletorio') claseEstado = 'text-warning fw-bold';
    else claseEstado = 'text-danger fw-bold';

    var td = function (contenido, claseAsignada) {
        var celda = document.createElement('td');
        celda.textContent = contenido;
        if (claseAsignada !== undefined) {
            celda.className = claseAsignada;
        }
        return celda;
    };

    tr.appendChild(td(estudiante.nombre));
    tr.appendChild(td(estudiante.nota));
    tr.appendChild(td(estudiante.estado, claseEstado));

    tbody.appendChild(tr);
}


// Funcion para renderizar la tabla con los estudiantes
function renderTabla(estudiantes) {
    var tbody = document.getElementById('tabla-estudiantes');
    if (!tbody) return;
    tbody.innerHTML = '';
    estudiantes.forEach(function (estudiante) {
        agregarFilaTabla(estudiante);
    });
}


// Funcion para limpiar el formulario
function limpiarFormulario() {
    var form = document.getElementById('formularioEstudiante');
    if (form) {
        form.reset();
    }
    var nombreInput = document.getElementById('nombre');
    if (nombreInput) {
        nombreInput.focus();
    }
}

// Funcion para actualizar las estadisticas del curso
function actualizarEstadisticas(estudiantes) {
    var totalEstudiantes = estudiantes.length;
    var aprobados = 0;
    var supletorio = 0;
    var reprobados = 0;
    var sumaNotas = 0;

    estudiantes.forEach(function (est) {
        sumaNotas += est.nota;
        if (est.estado === 'Aprobado') aprobados++;
        else if (est.estado === 'Supletorio') supletorio++;
        else reprobados++;
    });

    var promedio = totalEstudiantes > 0 ? (sumaNotas / totalEstudiantes).toFixed(2) : '0.00';

    var totalEl = document.getElementById('total-estudiantes');
    var promedioEl = document.getElementById('promedio-general');
    var aprobadosEl = document.getElementById('aprobados');
    var supletorioEl = document.getElementById('supletorio');
    var reprobadosEl = document.getElementById('reprobados');

    if (totalEl) totalEl.textContent = totalEstudiantes;
    if (promedioEl) promedioEl.textContent = promedio;
    if (aprobadosEl) aprobadosEl.textContent = aprobados;
    if (supletorioEl) supletorioEl.textContent = supletorio;
    if (reprobadosEl) reprobadosEl.textContent = reprobados;
}
