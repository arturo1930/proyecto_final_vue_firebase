<template>
    <div>
        <lista-tareas
            :titulo="titulo"
            :tareas="tareas"
            :agregarTarea="agregarTarea"
        >
            <v-btn slot="editar" @click="abrirDialog" icon>
                <v-icon color="success">edit</v-icon>
            </v-btn>            
        </lista-tareas>
        <v-dialog
            v-model="dialogEditar"
            width="300"
        >
            <v-card>
                <v-toolbar dense flat>
                    <v-toolbar-title>ACTUALIZANDO LISTA</v-toolbar-title>
                    <v-spacer/>
                    <v-btn @click="dialogEditar = false" icon>
                        <v-icon>cancel</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-divider/>
                <v-card-text>
                    <v-text-field 
                        v-model="nombreEditar"
                        label="El nombre de la lista"
                    />
                    <v-btn block outline :loading="cargando" @click="guardarCambios" color="success">
                        GUARDAR
                    </v-btn>
                    <v-btn block outline :loading="cargando" @click="eliminarLista" color="red" >
                        ELIMINAR
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
import ListaTareas from '../components/ListaTareas.vue'
// /panel/listas/:id
export default {
    components:{ListaTareas},
    computed:{
        tareas(){
            var id = this.$route.params.id
            return this.$store.getters.tareasPorLista(id)
        },
        titulo(){
            var id = this.$route.params.id
            var lista = this.$store.getters.listaPorID(id)
            if(lista){
                return lista.nombre
            }
            return ''
        }
    },
    data(){
        return {
            dialogEditar:false,
            nombreEditar : '',
            cargando : false
        }
    },
    methods:{
        agregarTarea(tareaContenido){
            var listaID = this.$route.params.id
            var nuevaTarea = {}
            nuevaTarea.contenido = tareaContenido
            nuevaTarea.completado = false
            nuevaTarea.listaID = listaID
            return this.$store.dispatch('agregarTarea',nuevaTarea)
        },
        abrirDialog(){
            var id = this.$route.params.id
            var lista = this.$store.getters.listaPorID(id)
            this.dialogEditar = true
            this.nombreEditar = lista.nombre
        },
        guardarCambios(){
            var id = this.$route.params.id
            this.cargando = true
            this.$store.dispatch('actualizarLista',{
                nombre:this.nombreEditar,
                id: id
            }).then(()=>{
                this.dialogEditar = false
                this.cargando = false
            }).catch((error)=>{
                this.cargando = false
            })
        },
        eliminarLista(){
            var id = this.$route.params.id
            this.cargando = true
            this.$store.dispatch('eliminarLista',id).then(()=>{
                this.dialogEditar = false
                this.cargando = false
                this.$router.push('/panel/listas')
            }).catch((error)=>{
                console.log(error)
                this.cargando = false
            })
        }
    }

}
</script>

<style>

</style>
