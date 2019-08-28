<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
import firebase from './firebase'
const db = firebase.firestore()
var snapshotListas = null
var snapshotTareas = null
export default {
  data () {
    return {
      
    }
  },
  beforeCreate(){
    firebase.auth().onAuthStateChanged((user)=>{
      // si el user es null entonces no hay un usuario logeado
      if(user){
        // get obtiene UNA SOLA VEZ la información de la consulta
        //db.collection('tareas').where("userID","==",user.uid).get()

        //onSnapshot obtiene el resultado de la consulta CADA VEZ que se realize una modificacion a los datos de retorno
        // por ejemplo, se agrega una tarea que cumple esa condición, o se elimina o modifica.
        snapshotTareas = db.collection('tareas')
            .where("userID","==",user.uid)
            .onSnapshot((querySnapshot)=>{
              var tareas = []
              querySnapshot.forEach((docSnapshot)=>{
                var tarea = docSnapshot.data()
                tarea.id = docSnapshot.id
                if(tarea.fecha_vencimiento){
                  tarea.fecha_vencimiento = tarea.fecha_vencimiento.toDate()
                }              
                
                tareas.push(tarea)
              })
              console.log(tareas)            
              this.$store.commit('cargarTareas',tareas)
            })

        // CARGANDO LAS LISTAS
        snapshotListas = db.collection('listas')
            .where("userID","==",user.uid)
            .onSnapshot((querySnapshot)=>{
              var listas = []
              querySnapshot.forEach((docSnapshot)=>{
                var lista = docSnapshot.data()
                lista.id = docSnapshot.id
                listas.push(lista)
              })
              this.$store.commit('cargarListas',listas)
            })
        this.$store.commit('login',user)
        this.$router.push('/panel')
      }else{
        if(snapshotTareas){
          snapshotTareas()
          snapshotTareas = null
        }
        if(snapshotListas){
          snapshotListas()
          snapshotListas = null
        }
        this.$store.commit('cargarTareas',[])
        this.$store.commit('cargarListas',[])
        this.$router.push('/')
      }
    })
  }
}
</script>
