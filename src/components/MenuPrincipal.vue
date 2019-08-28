<template>
    <v-navigation-drawer v-model="drawer" app clipped>
        <v-list>
            <v-list-tile>
                <v-list-tile-avatar>
                    <v-avatar size="36">
                        <img :src="usuario.photoURL"/>
                    </v-avatar>
                </v-list-tile-avatar>
                <v-list-tile>
                    {{usuario.displayName}}
                </v-list-tile>
            </v-list-tile>
            <v-divider/>
            <v-list-tile to="/panel" exact>
                <v-list-tile-action>
                    <v-icon>today</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>
                    Hoy
                </v-list-tile-title>
                <v-list-tile-action v-show="numeroTareasHoy >0">
                    <v-chip color="red" small text-color="white">{{numeroTareasHoy}}</v-chip>
                </v-list-tile-action>
            </v-list-tile>
            <v-list-tile to="/panel/manana">
                <v-list-tile-action>
                    <v-icon>event</v-icon>
                </v-list-tile-action>
                <v-list-tile-title>
                    Mañana
                </v-list-tile-title>
                <v-list-tile-action v-show="numeroTareasManana >0">
                    <v-chip color="red" small text-color="white">{{numeroTareasManana}}</v-chip>
                </v-list-tile-action>
                </v-list-tile>
                <v-list-tile to="/panel/listas">
                    <v-list-tile-action>
                        <v-icon>list</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>
                        Mis listas
                    </v-list-tile-title>
                </v-list-tile>
                <v-divider/>
                <v-list-tile @click="desconectarse">
                    <v-list-tile-action>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>
                        Salir
                    </v-list-tile-title>
                </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import imagenPlaceholder from '../assets/usuario_placeholder.svg'
import bus from '../bus'
export default {
    data(){
        return {
            drawer:false
        }
    },
    computed:{
        usuario(){
            var usuario = this.$store.getters.getUsuario
            if(!usuario){
                return {
                    photoURL: imagenPlaceholder,
                    displayName: ""
                }
            }
            else{
                return usuario
            }
        },
        numeroTareasHoy(){
            return this.$store.getters.tareasHoy.filter(tarea => !tarea.completado).length
        },
        numeroTareasManana(){
            return this.$store.getters.tareasManana.filter(tarea => !tarea.completado).length
        }
    },
    beforeMount(){
        bus.$on('notificarDrawer',()=>{
            this.drawer = !this.drawer
        })
    },
    methods:{
        desconectarse(){
            this.$store.dispatch('desconectarse')
        }
    }
}
</script>

<style>

</style>
