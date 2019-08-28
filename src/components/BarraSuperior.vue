<template>
    <v-toolbar app color="blue" dark clipped-left>
        <v-toolbar-side-icon @click="notificarDrawer"/>
        <v-toolbar-title>Kodemia-Tareas</v-toolbar-title>        
    </v-toolbar>
</template>

<script>
import bus from '../bus'
export default {
    methods:{
        notificarDrawer(){
            bus.$emit('notificarDrawer')
        }
    }
}
</script>

<style>

</style>
