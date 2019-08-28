<template>
    <div>
        <barra-superior/>
        <menu-principal/>
        <dialog-actualizar-tarea/>
        <v-content>
            <v-container>
                <v-layout>
                    <v-flex xs12>
                        <router-view/>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </div>
</template>

<script>
import BarraSuperior from '../components/BarraSuperior.vue'
import MenuPrincipal from '../components/MenuPrincipal.vue'
import DialogActualizarTarea from '../components/DialogActualizarTarea.vue'
import firebase from '../firebase'
export default {
    components:{BarraSuperior,MenuPrincipal,DialogActualizarTarea}
}
</script>

<style>

</style>
