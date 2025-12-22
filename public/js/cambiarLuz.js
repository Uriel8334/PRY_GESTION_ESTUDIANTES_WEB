// 1. Declarar variables (se asignarán cuando el DOM esté listo)
var botonTema = document.getElementById("configToggle");
var body = document.body;

// 2. Función para inicializar el tema al cargar la página
function inicioPantalla() {
    // Verificar si el usuario guardó una preferencia anterior
    var temaGuardado = localStorage.getItem("mode");
    
    if (temaGuardado === "dark") {
        // Si guardó modo oscuro, aplicarlo
        body.classList.add("dark");
        botonTema.classList.add("dark-on");
        botonTema.classList.remove("dark-off");
    } else {
        // Si no, mantener modo claro
        body.classList.remove("dark");
        botonTema.classList.add("dark-off");
        botonTema.classList.remove("dark-on");
    }
}

// 3. Función para cambiar el tema
function cambiarTema() {
    // Verificar si el body tiene la clase "dark"
    if (body.classList.contains("dark")) {
        // Está en oscuro, cambiar a claro
        body.classList.remove("dark");
        botonTema.classList.remove("dark-on");
        botonTema.classList.add("dark-off");
        localStorage.setItem("mode", "light");
    } else {
        // Está en claro, cambiar a oscuro
        body.classList.add("dark");
        botonTema.classList.remove("dark-off");
        botonTema.classList.add("dark-on");
        localStorage.setItem("mode", "dark");
    }
}

// 4. Cuando la página carga, inicializar todo
document.addEventListener("DOMContentLoaded", function() {
    // Inicializar el tema guardado
    inicioPantalla();
    // 5. Agregar listener al botón solo si existe
    if (botonTema) {
        botonTema.addEventListener("click", function(e) {
            e.preventDefault();
            cambiarTema();
        });
    }
});