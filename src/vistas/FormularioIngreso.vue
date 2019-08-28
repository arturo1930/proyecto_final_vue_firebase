<template>
    <formulario-base titulo="INGRESAR" :error="error">
        <v-form v-model="valido" slot="formulario">
            <v-text-field 
                prepend-icon="email"
                :rules="reglasEmail"
                label="Correo electrónico" 
                v-model="email"/>
            <v-text-field        
                prepend-icon="lock"         
                label="Contraseña" 
                type="password" 
                v-model="password"/>
            <div class="text-xs-right">
                <router-link to="/recuperar">¿Olvidó su contraseña?</router-link>
            </div>
            <v-btn 
                :disabled="!valido" 
                :loading="cargandoFormulario" 
                @click="loginCorreo"
                block class="primary elevation-0"
                >INGRESAR</v-btn>
            <div class="my-2">
                <span>¿No tiene una cuenta? <router-link to="/registrese">REGISTRESE</router-link></span>
            </div>
            <v-divider/>
            <v-btn block @click="loginFacebook" :loading="cargandoFormulario" class="my-3 bg-facebook" dark>
                <img class="mr-1 mb-1" height="16" src="../assets/facebook.svg"/>
                Facebook
            </v-btn>
            <v-btn @click="loginGoogle" :loading="cargandoFormulario" block>
                <img class="mr-1 mb-1" height="16" src="../assets/google.svg"/>
                Google
            </v-btn>
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
    methods:{
        loginCorreo(){
            this.cargandoFormulario = true
            this.$store.dispatch('loginCorreo',{
                email :this.email,
                password:this.password
            }).then((user)=>{
                this.cargandoFormulario = false
            }).catch((error)=>{
                this.cargandoFormulario = false
                this.error = errors(error.code)
            })
        },
        loginFacebook(){
            this.cargandoFormulario = true
            this.$store.dispatch('loginFacebook').then((user)=>{
                this.cargandoFormulario = false
            }).catch((error)=>{
                this.cargandoFormulario = false
                this.error = errors(error.code)
            })
        },
        loginGoogle(){
            this.cargandoFormulario = true
            this.$store.dispatch('loginGoogle').then((user)=>{
                this.cargandoFormulario = false
            }).catch((error)=>{
                this.cargandoFormulario = false
                this.error = errors(error.code)
            })
        }
    }
}
</script>

<style scoped>
    .bg-facebook{
        background-color: #3b5998 !important;
    }
</style>
