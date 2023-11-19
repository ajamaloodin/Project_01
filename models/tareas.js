
const Tarea = require('./tarea');

class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach (key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea ( id = '' ) {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => this._listado[tarea.id] = tarea);
    }

    listadoCompleto(tareas = []) {
        console.clear();
        tareas.forEach((tarea, index) => {

            const idx = `${index + 1}`.brightYellow;
            if (!tarea.completadoEn) {
                const estado = "Pendiente".brightRed;
                console.log(`${idx} ${tarea.desc.brightRed} :: ${estado}`);
            }
            else {
                const estado = "Completada".brightGreen;
                console.log(`${idx} ${tarea.desc.brightGreen} :: ${estado}`);
            }
        })
    }

    listarPendientesCompletadas (completadas = true, tareas = []) {
        console.clear();
        let index = 0;
        tareas.forEach((tarea) => {

            if (!completadas) { 
                if (!tarea.completadoEn) {
                    const estado = "Pendiente".brightRed;
                    const idx = `${index + 1}.`.brightYellow;
                    console.log(`${idx} ${tarea.desc.brightRed} :: ${estado}`);
                    index += 1;
                }
            }
            else {
                if (tarea.completadoEn) {
                    const fecha = tarea.completadoEn.brightGreen;
                    const idx = `${index + 1}.`.brightYellow;
                    console.log(`${idx} ${tarea.desc.brightGreen} :: Completada el: ${fecha}`);
                    index += 1;
                }
            }
        })
    }

    crearTarea ( desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    toggleCompletadas (ids = []) {

        ids.forEach(id => {

            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }

        })

        this.listadoArr.forEach( tarea => {

            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}

module.exports = Tareas;