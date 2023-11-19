const { promiseHooks } = require('v8');

require('colors');

// mostramos el menu de opciones
const mostrarMenu = () => {

    return new Promise((resolve) => {

        console.clear();
        console.log('============================='.brightGreen);
        console.log('Seleccione una opción'.brightGreen);
        console.log('=============================\n'.brightGreen);
    
        console.log(`${'1.'.brightYellow} Crear Tarea `);
        console.log(`${'2.'.brightYellow} Listar Tareas `);
        console.log(`${'3.'.brightYellow} Listar Tareas Completadas `);
        console.log(`${'4.'.brightYellow} Listar Tareas Pendientes `);
        console.log(`${'5.'.brightYellow} Completar Tarea(s)`);
        console.log(`${'6.'.brightYellow} Borrar Tarea`);
        console.log(`${'0.'.brightYellow} Salir\n`);
        
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readline.question('Seleccione una opción: ', (opt) => {
            readline.close();
            resolve(opt);
        })

    });

}

const pausa = () => {

    return new Promise(resolve => {

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readline.question(`Presione ${'Enter'.brightYellow} para continuar` , (opt) => {
            readline.close();
            resolve();
        })

    })

}

// Exportamos para poder hacer la llamada desde main
module.exports = {
    mostrarMenu,
    pausa
}