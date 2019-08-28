<template>
    <div>
        <v-list-tile>
            <v-list-tile-action>
                <v-checkbox v-model="tarea.completado"/>
            </v-list-tile-action>
            <v-list-tile-title :class="{tarea:tarea.completado}">
                <span>{{tarea.contenido}}</span>
            </v-list-tile-title>
            <v-list-tile-action>
                <v-btn icon @click="actualizarTarea">
                    <v-icon color="success">edit</v-icon>
                </v-btn>
            </v-list-tile-action>
        </v-list-tile>
        <v-divider/>
    </div>
</template>

<script>
import bus from '../bus'
export default {
    props:{
        tarea: Object
    },
    methods:{
        actualizarTarea(){
            bus.$emit('dialogTarea',this.tarea.id)
        }
    },
    watch:{
        'tarea.completado'(completado){
            this.$store.dispatch('actualizarEstadoTarea',this.tarea)
        }
    }
}
</script>

<style scoped>
    .tarea{
        text-decoration: line-through;
    }
</style>
