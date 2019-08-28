import firebase from '../firebase'
const db = firebase.firestore()
const storage = firebase.storage().ref()


const store = {
    state :{
        tareas:[]
    },
    getters:{
        tareasHoy(state){
            var limiteHoy = new Date()
            limiteHoy.setHours(23,59,59)
            return state.tareas.filter(tarea =>  tarea.fecha_vencimiento <= limiteHoy)
        },
        tareasManana(state){
            var limiteMananaSuperior = new Date()
            limiteMananaSuperior.setDate(limiteMananaSuperior.getDate()+1)
            limiteMananaSuperior.setHours(23,59,59)

            var limiteInferior = new Date()
            limiteInferior.setDate(limiteInferior.getDate()+1)
            limiteInferior.setHours(0,0,1)
            return state.tareas.filter(tarea => tarea.fecha_vencimiento>=limiteInferior && tarea.fecha_vencimiento<=limiteMananaSuperior)
        },
        tareasPorLista(state){
            return listaID => state.tareas.filter(tarea => tarea.listaID == listaID)
        },
        tareaPorID(state){
            return id => state.tareas.find(tarea => tarea.id === id)
        }
    },
    mutations:{
        agregarTarea(state,tarea){
            state.tareas.push(tarea)
        },
        actualizarTarea(state,tareaActualizar){
            var indice = state.tareas.findIndex(tarea => tarea.id == tareaActualizar.id)
            state.tareas.splice(indice,1,tareaActualizar)
        },
        cargarTareas(state,tareas){
            state.tareas = tareas
        }
    },
    actions:{        
        agregarTarea({},tarea){
            tarea.archivos = []
            var user = firebase.auth().currentUser
            // User Identifier
            tarea.userID = user.uid
            return db.collection("tareas").add(tarea)
        },
        eliminarTarea({},tareaID){
            return db.collection('tareas').doc(tareaID).delete()
        },
        actualizarTarea({},tarea){
            return db.collection('tareas').doc(tarea.id).update({
                contenido: tarea.contenido,
                fecha_vencimiento : tarea.fecha_vencimiento
            })
        },
        actualizarEstadoTarea({},tarea){
            return db.collection('tareas').doc(tarea.id).update({
                completado: tarea.completado
            })
        },
        eliminarTareasPorLista({},listaID){            
            return new Promise((resolve,reject)=>{
                db.collection('tareas').where('listaID',"==",listaID).get().then((querySnapshot)=>{
                    querySnapshot.forEach((document)=>{
                        document.ref.delete()
                    })
                    resolve()
                }).catch((error)=>reject(error))
            })            
        },
        subirArchivo({},archivo){
            var uid = firebase.auth().currentUser.uid
            //RmM51tSQN5OvsP2Ggk0DbPAvKWM2
            //foto.jpg
            //RmM51tSQN5OvsP2Ggk0DbPAvKWM2/foto.jpg
            return new Promise((resolve,reject)=>{
                storage.child(`${uid}/${archivo.name}`)
                    .put(archivo).then((uploadTaskSnapshot)=>{
                        uploadTaskSnapshot.ref.getDownloadURL().then((url)=>{
                            resolve(url)
                        }).catch((error)=>reject(error))
                }).catch((error)=>reject(error))
            })            
        },
        actualizarArchivos({},tarea){
            return db.collection('tareas').doc(tarea.id).update({
                archivos:tarea.archivos
            })
        },
        eliminarArchivo({getters,dispatch},payload){
            var indice = payload.indice
            var tareaID = payload.tareaID
            var tarea = getters.tareaPorID(tareaID)
            var archivo = tarea.archivos.splice(indice,1)[0]
            return new Promise((resolve,reject)=>{
                var uid = firebase.auth().currentUser.uid
                dispatch('actualizarArchivos',tarea).then(()=>{
                    storage.child(`${uid}/${archivo.nombre}`).delete().then(()=>{
                        resolve()
                    }).catch((error)=>reject(error))
                }).catch((error)=>reject(error))
            })
        }
    }
}

export default store