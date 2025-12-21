// Funcion para manejar el estado del estudiante
function getEstado(nota) {
    if (nota >= 7) return 'Aprobado';
    if (nota >= 5) return 'Supletorio';
    return 'Reprobado';
}

// Funcion para guardar estudiantes en la tabla
function agregarFilaTabla(estudiante, index) {
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

    // Celda de acciones con botón eliminar
    var tdAcciones = document.createElement('td');
    var btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn btn-danger btn-sm';
    btnEliminar.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>';
    btnEliminar.title = 'Eliminar estudiante';
    btnEliminar.setAttribute('data-index', index);
    btnEliminar.setAttribute('data-nombre', estudiante.nombre);
    btnEliminar.addEventListener('click', function() {
        mostrarModalEliminar(this.getAttribute('data-index'), this.getAttribute('data-nombre'));
    });
    tdAcciones.appendChild(btnEliminar);
    tr.appendChild(tdAcciones);

    tbody.appendChild(tr);
}


// Funcion para renderizar la tabla con los estudiantes
function renderTabla(estudiantes) {
    var tbody = document.getElementById('tabla-estudiantes');
    if (!tbody) return;
    tbody.innerHTML = '';
    estudiantes.forEach(function (estudiante, index) {
        agregarFilaTabla(estudiante, index);
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

// Funcion para borrar estudiante 
function borrarEstudiante(index) {
    if (typeof estudiantes === 'undefined') {
        console.error('Array estudiantes no definido');
        return;
    }
    
    estudiantes.splice(index, 1);
    guardarEnStorage(estudiantes);
    renderTabla(estudiantes);
    actualizarEstadisticas(estudiantes);
}

// Funcion para mostrar el modal de confirmación
function mostrarModalEliminar(index, nombre) {
    var modalElement = document.getElementById('modalEliminar');
    var nombreEl = document.getElementById('nombreEstudianteEliminar');
    var btnConfirmar = document.getElementById('confirmarEliminar');
    
    if (!modalElement || !nombreEl || !btnConfirmar) return;
    
    nombreEl.textContent = nombre;
    
    // Eliminar listeners previos para evitar duplicados
    var nuevoBtn = btnConfirmar.cloneNode(true);
    btnConfirmar.parentNode.replaceChild(nuevoBtn, btnConfirmar);
    
    nuevoBtn.addEventListener('click', function() {
        borrarEstudiante(parseInt(index));
        var modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
    });
    
    var modal = new bootstrap.Modal(modalElement, {
        backdrop: 'static',
        keyboard: false
    });
    modal.show();
}
