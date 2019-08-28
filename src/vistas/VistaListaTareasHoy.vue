<template>
    <lista-tareas
        titulo="Hoy"
        :tareas="tareasHoy"
        :agregarTarea="agregarTarea"
    />
</template>

<script>
import ListaTareas from '../components/ListaTareas.vue'
export default {
    components:{ListaTareas},
    computed:{
        tareasHoy(){
            return this.$store.getters.tareasHoy
        }
    },
    methods:{
        agregarTarea(tareaContenido){
            var hoy = new Date()
            var nuevaTarea = {}
            nuevaTarea.contenido = tareaContenido
            nuevaTarea.completado = false
            hoy.setHours(hoy.getHours()+1)
            nuevaTarea.fecha_vencimiento = hoy
            return this.$store.dispatch('agregarTarea',nuevaTarea)
        }
    }

}
</script>

<style>

</style>
