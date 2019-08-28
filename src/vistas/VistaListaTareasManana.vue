<template>
    <lista-tareas
        titulo="Mañana"
        :tareas="tareasManana"
        :agregarTarea="agregarTarea"
    />
</template>

<script>
import ListaTareas from '../components/ListaTareas.vue'
export default {
    components:{ListaTareas},
    computed:{
        tareasManana(){
            return this.$store.getters.tareasManana
        }
    },
    methods:{
        agregarTarea(tareaContenido){
            var manana = new Date()
            var nuevaTarea = {}
            nuevaTarea.contenido = tareaContenido
            nuevaTarea.completado = false
            manana.setHours(manana.getHours()+24)
            nuevaTarea.fecha_vencimiento = manana
            return this.$store.dispatch('agregarTarea',nuevaTarea)
        }
    }

}
</script>

<style>

</style>
