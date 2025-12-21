// console.log("script cargado");


// suponiendo un arreglo global de notas para probar
let notas = [7, 5, 8, 6, 9, 4, 10];

function calcularEstadisticas() {
    // contadores 
    var aprobados = 0;
    var supletorio = 0;
    var reprobados = 0;
    var sumaNotas = 0;
    var promedio = 0;

    // leemos el arreglo global de notas 
    for (var i = 0; i < notas.length; i++) {
        var nota = notas[i];
        sumaNotas += nota;
        aprobados += validarNota(nota).aprobados;
        supletorio += validarNota(nota).supletorio;
        reprobados += validarNota(nota).reprobados;
    }
    promedio = sumaNotas / notas.length;
    determinarEstadoCurso(promedio);

    // mostramos los resultados en consola, en un futuro en cartas de bootstrap
    console.log("Total de estudiantes: " + notas.length);
    console.log("Cantidad de aprobados: " + aprobados);
    console.log("Cantidad de estudiantes en supletorios: " + supletorio);
    console.log("Cantidad de reprobados: " + reprobados);
    console.log("Promedio general del curso: " + promedio.toFixed(2));
    console.log("Estado del curso: " + determinarEstadoCurso(promedio));

    // retornamos un objeto con los resultados 
    return {
        cantidadNotas: notas.length,
        sumaNotas: sumaNotas,
        promedioNotas: promedio,
        estadoCurso: determinarEstadoCurso(promedio)
    };
}

// funcion independiente para validar una nota
function validarNota(nota) {
    var aprobados = 0;
    var supletorio = 0;
    var reprobados = 0;
    if (nota >= 7) {
        aprobados++;
    }
    else if (nota >= 5 && nota <= 6) {
        supletorio++;
    }
    else {
        reprobados++;
    }
    return {
        aprobados: aprobados,
        supletorio: supletorio,
        reprobados: reprobados
    };
}

// funcion para determinar el estado del curso
function determinarEstadoCurso(promedio) {
    if (promedio >= 7) {
        return "Curso aprobado";
    }
    else {
        return "Curso en riesgo";
    }
}

calcularEstadisticas();