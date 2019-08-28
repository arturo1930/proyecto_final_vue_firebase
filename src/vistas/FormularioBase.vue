<template>
    <v-content class="blue">
        <v-container fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm6 md4 class="text-xs-center">
                    <v-card>
                        <v-responsive>
                            <img class="mt-2" height="160" src="../assets/logo.png">
                        </v-responsive>
                        <v-card-text>
                            <h4>{{titulo}}</h4>
                            <slot name="formulario"></slot>
                            <v-alert color="red" v-show="Boolean(error)">
                                {{error}}
                            </v-alert>
                        </v-card-text>
                        
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
export default {
    props:['titulo','error']
}
</script>

<style>

</style>
