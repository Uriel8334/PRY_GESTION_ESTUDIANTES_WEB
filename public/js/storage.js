// Funciones para manejar el almacenamiento en localStorage
function guardarEnStorage(estudiantes) {
    localStorage.setItem('estudiantesData', JSON.stringify(estudiantes || []));
}

// Función para cargar estudiantes desde localStorage
function cargarDelStorage() {
    var datos = localStorage.getItem('estudiantesData');
    if (!datos) {
        return [];
    }

    try {
        var parsed = JSON.parse(datos);
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        console.warn('No se pudo leer estudiantes desde storage', e);
        return [];
    }
}
