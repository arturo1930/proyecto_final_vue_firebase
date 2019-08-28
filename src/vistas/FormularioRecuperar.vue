<template>
    <formulario-base titulo="RECUPERAR CONTRASEÑA" :error="error">
        <v-form v-model="valido" slot="formulario">
            <v-text-field 
                v-model="email" 
                label="Correo electrónico"
                prepend-icon="email"
                :rules="reglasEmail"
                />
            <v-btn 
            :disabled="!valido"
            :loading="cargandoFormulario" 
            @click="recuperarPassword"
            color="success" 
            block>Recuperar contraseña</v-btn>
            <v-alert color="success" v-show="Boolean(exito)">
                {{exito}}
            </v-alert>
            <router-link to="/">Regresar</router-link>
        </v-form>
    </formulario-base>
</template>

<script>
import FormularioBase from './FormularioBase.vue'
import {mixinFormulario} from '../mixins'
import errors from '../errors'
export default {
    components:{FormularioBase},
    mixins:[mixinFormulario],
    data(){
        return {
            exito : ""
        }
    },
    methods:{
        recuperarPassword(){
            this.cargandoFormulario = true
            this.$store.dispatch('recuperarPassword',this.email).then(()=>{
                this.cargandoFormulario = false
                this.exito = "Se ha enviado un mensaje a su correo electrónico para el reestablecimiento de su contraseña."
            }).catch((error)=>{
                this.cargandoFormulario = false
                this.error = errors(error.code)
            })
        }
    }

}
</script>

<style>

</style>
