import firebase from '../firebase'
const db = firebase.firestore()
const auth = firebase.auth()

const store = {
    state :{
        listas:[]
    },
    getters:{
        listas(state){
            return state.listas
        },
        listaPorID(state){
            return id => state.listas.find(lista => lista.id == id)
        }
    },
    mutations:{
        cargarListas(state,listas){
            state.listas = listas
        }
    },
    actions:{
        agregarLista({},lista){
            var uid = auth.currentUser.uid
            lista.userID = uid
            return db.collection('listas').add(lista)
        },
        eliminarLista({dispatch},listaID){
            return new Promise((resolve,reject)=>{
                db.collection('listas').doc(listaID).delete().then(()=>{
                    dispatch('eliminarTareasPorLista',listaID).then(()=>{
                        resolve()
                    }).catch((error)=>reject(error))
                }).catch((error)=>reject(error))
            })
        },
        actualizarLista({},lista){
            return db.collection('listas').doc(lista.id).update({
                nombre:lista.nombre
            })
        }
    }
}

export default store