<template>
    <div>
        <v-form v-model="valido">
            <v-layout wrap>
                <v-flex xs12>
                    <h2>NUEVA LISTA</h2>
                    <v-divider/>
                </v-flex>
                <v-flex xs12 sm8>
                    <v-text-field
                        label="El nombre de la nueva lista"
                        :counter="40"
                        :rules="reglaLista"
                        v-model="listaNueva"
                    />
                </v-flex>
                <v-flex xs12 sm4>
                    <v-btn :disabled="!valido" color="success" @click="agregarLista" block>AGREGAR LISTA</v-btn>
                </v-flex>
            </v-layout>
        </v-form>
        <v-layout wrap class="mt-3">
            <v-flex xs12>
                <h2>MIS LISTAS</h2>
                <v-divider/>
            </v-flex>
            <v-container fluid grid-list-md>
                <v-layout wrap>
                    <v-flex xs12 sm6 md3 v-for="lista in listas" :key="lista.id">
                        <v-card @click="irLista(lista.id)" class="text-xs-center card-lista" height="100">
                            <v-container fill-height>
                                <v-layout align-center justify-center>
                                    <v-flex xs12>
                                        <span class="body-2">{{lista.nombre}}</span>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-layout>
    </div>
</template>

<script>
export default {
    data(){
        return {
            listaNueva : '',
            valido:false,
            reglaLista:[
                (nombre) => nombre.length>0 || 'Debe ingresar un nombre a la nueva lista',
                (nombre) => nombre.length<=40 || 'El nombre de la nueva lista no debe exceder los 40 caracteres'
            ]
        }
    },
    computed:{
        listas(){
            return this.$store.getters.listas
        }
    },
    methods:{
        irLista(listaID){
            this.$router.push(`/panel/listas/${listaID}`)
        },
        agregarLista(){
            this.$store.dispatch('agregarLista',{
                nombre: this.listaNueva
            }).then(()=>{
                this.listaNueva = ''
            })
        }
    }
}
</script>

<style>
    .card-lista:hover{
        cursor: pointer;
    }
</style>
