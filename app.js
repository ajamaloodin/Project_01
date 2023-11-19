// ES: Para "decorar" con colores las opciones y salida en consola
// EN: Showing different colors for menu options and console output.
require ('colors')

// ES: Funciones para la persistencia de la data.
// EN: Data persistence functions
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');

// ES: Funciones que apoyan la funcionalidad requerida
// EN: Functions that help develop all the required functionality
const { inquirerMenu, 
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoCheckList } = require('./helpers/inquirers');

// ES: La clase con la que se implementa toda la funcionalidad
// EN: Main class for handling all the functionality
const Tareas = require('./models/tareas');

// ES: El código principal estará en main y es una función asíncrona
// EN: The main code implemented with an asyncronic function
const main = async () => {

    let opt = '';
    const tareas = new Tareas();

// ES: Inicialmente de haber tareas registradas se deber cargar.
// EN: Initialy if there are some tasks should be loaded.
    const tareasDB = leerDB();

    if ( tareasDB ) {
        tareas.cargarTareasFromArray(tareasDB);
    }

// ES: Mostramos el menu de manera repetitiva hasta que el usuario finalice.
// EN: The menu is shown until the user exits.
    do {
        // ES: Mostrar el menú y obtener la opción seleccionada por el usuario.
        // EN: Show up the menu and get the selected option from the user.
        opt = await inquirerMenu();
        
        switch (opt) {
            // ES: Opción 1 -> Registrar una nueva tarea.
            // EN: Option 1 -> To register a new task.
            case '1':
                const desc = await leerInput('Descripción:')
                tareas.crearTarea( desc );
            break;
            // ES: Opción 2 -> Listar todas las tareas registradas.
            // EN: Option 2 -> To list all tasks.
            case '2':
                tareas.listadoCompleto(tareas.listadoArr);
            break;
            // ES: Opción 3 -> Listar las tareas completadas.
            // EN: Option 3 -> To list all completed tasks.
            case '3':
                tareas.listarPendientesCompletadas(true, tareas.listadoArr);
            break;
            // ES: Opción 4 -> Listar las tareas pendientes.
            // EN: Option 4 -> To list all pending tasks.
            case '4':
                tareas.listarPendientesCompletadas(false, tareas.listadoArr);
            break;
            // ES: Opción 5 -> Marcar tareas como completadas.
            // EN: Option 5 -> To set tasks as completed.
            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas( ids );
            break;
            // ES: Opción 6 -> Borrar una tarea seleccionada.
            // EN: Option 6 -> TO delete a selected task.
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);

                const ok = await confirmar('\n¿Está seguro?');

                if (ok) {
                    tareas.borrarTarea( id )
                    console.log("\n=== Tarea Eliminada ==".brightRed)
                }
            break;
        }
        // ES: Al finalizar cada operación se actualiza el archivo de persistencia.
        // EN: At the end of each action the persistence file is updated.
        guardarDB( tareas.listadoArr );

        await pausa();

    } while (opt != '0');
}

// Aqui llamamos a main
main ()