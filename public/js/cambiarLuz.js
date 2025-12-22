// 1. Obtener elementos del HTML
const botonTema = document.getElementById("configToggle");
const body = document.body;

// 2. Función para inicializar el tema al cargar la página
function initTheme() {
    // Verificar si el usuario guardó una preferencia anterior
    const temaGuardado = localStorage.getItem("mode");
    
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

// 4. Cuando la página carga, ejecutar initTheme
window.addEventListener("load", function() {
    initTheme();
});

// 5. Cuando el usuario hace click en el botón, cambiar tema
botonTema.addEventListener("click", function(e) {
    e.preventDefault();
    cambiarTema();
});