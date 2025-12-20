
var estudiantes = [];

function guardarEstudiante() {
    // 1. CAPTURA DE DATOS DEL DOM
    var nombreInput = document.getElementById('nombre');
    var notaInput = document.getElementById('nota');
    
    var nombre = nombreInput.value.trim();
    var nota = parseFloat(notaInput.value);

    // 2. VALIDACIÓN
    if (nombre === "") {
        alert("Por favor, ingresa el nombre del estudiante.");
        return;
    }
    if (isNaN(nota) || nota < 0 || nota > 10) {
        alert("La nota debe ser un número entre 0 y 10.");
        return;
    }

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
    if(estudiante.estado === 'Aprobado') claseEstado = 'text-success fw-bold';
    else if(estudiante.estado === 'Supletorio') claseEstado = 'text-warning fw-bold';
    else claseEstado = 'text-danger fw-bold';

    tr.innerHTML = `
        <td>${estudiante.nombre}</td>
        <td>${estudiante.nota}</td>
        <td class="${claseEstado}">${estudiante.estado}</td>
    `;
    
    tbody.appendChild(tr);
}

function limpiarFormulario() {
    document.getElementById('formularioEstudiante').reset();
    document.getElementById('nombre').focus();
}