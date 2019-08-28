<template>
    <formulario-base titulo="REGISTRARSE" :error="error">
        <v-form v-model="valido" slot="formulario">
            <v-text-field 
                v-model="nombreCompleto" 
                label="Nombre completo"
                prepend-icon="person"
                :rules="reglasNombre"
                />
            <v-text-field 
                v-model="email" 
                label="Correo electrónico"
                prepend-icon="email"
                :rules="reglasEmail"
                />
            <v-text-field 
                v-model="password" 
                label="Contraseña"
                type="password"
                prepend-icon="lock"
                :rules="reglasPassword"
                />
            <v-text-field 
                v-model="repetirPassword" 
                label="Repita su contraseña"
                prepend-icon="lock"
                type="password"
                :rules="reglasRepetirPassword"
                />
            <v-btn @click="crearUsuario" color="primary" :loading="cargandoFormulario" :disabled="!valido" class="mb-3" block>REGISTRARSE</v-btn>
            <router-link to="/">¿Ya tiene una cuenta?</router-link>
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
            nombreCompleto : '',
            repetirPassword : ''
        }
    },
    methods:{
        crearUsuario(){
            var nuevoUsuario = {}
            this.cargandoFormulario = true
            nuevoUsuario.nombreCompleto = this.nombreCompleto
            nuevoUsuario.password = this.password
            nuevoUsuario.email = this.email
            this.$store.dispatch('crearUsuario',nuevoUsuario).then((usuario)=>{
                this.cargandoFormulario = false
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
