<template>
    <v-dialog 
        v-model="dialogTarea"
        width="500"
        >
        <v-card>
            <v-toolbar color="transparent" flat>
                <v-toolbar-title>ACTUALIZAR TAREA</v-toolbar-title>
                <v-spacer/>
                <v-btn icon @click="dialogTarea = false">
                    <v-icon color="red">cancel</v-icon>
                </v-btn>
            </v-toolbar>
            <v-divider/>
            <v-card-text>
                <v-form>
                    <v-container>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field
                                    label="Descripción de la tarea"
                                    v-model="contenido"
                                />
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-menu
                                    :close-on-content-click="true"
                                    >
                                    <v-text-field
                                        slot="activator"   
                                        readonly
                                        v-model="fechaVencimientoFormateada"
                                        label="Fecha de vencimiento"
                                        append-icon="close"
                                        @click:append="fecha_ISO = ''"
                                    />
                                    <v-date-picker
                                        v-model="fecha_ISO"
                                        locale="es"
                                        :allowed-dates="filtrarFechas"
                                        first-day-of-week="1"
                                    />
                                </v-menu>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-menu
                                    :close-on-content-click="false"
                                    >
                                    <v-text-field
                                        readonly
                                        slot="activator" 
                                        v-model="hora_seleccionada" 
                                        label="Hora de vencimiento"
                                        clearable
                                    >                                    
                                    </v-text-field>
                                    <v-time-picker
                                        v-model="hora_seleccionada"
                                    />
                                </v-menu>
                            </v-flex>
                            <input ref="inputArchivo" @change="seleccionarArchivo" v-show="false" type="file"/>
                            <v-flex xs12>
                                <v-list dense class="lista_archivos">
                                    <v-toolbar flat>
                                        <v-toolbar-title>Archivos</v-toolbar-title>
                                        <v-spacer/>
                                        <v-btn :loading="cargando" icon @click="abrirArchivos">
                                            <v-icon color="success">add</v-icon>
                                        </v-btn>
                                    </v-toolbar>
                                    <v-list-tile v-for="(archivo,indice) in archivos" :key="indice">
                                        <v-list-tile-title>
                                            <a  :href="archivo.url">{{archivo.nombre}}</a>
                                        </v-list-tile-title>
                                        <v-list-tile-action>
                                            <v-btn icon @click="eliminarArchivo(indice)"><v-icon color="red">delete</v-icon></v-btn>
                                        </v-list-tile-action>
                                    </v-list-tile>
                                    
                                </v-list>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-btn :loading="cargando" color="success" @click="guardarCambios" outline block>GUARDAR</v-btn>
                            </v-flex>
                            <v-flex xs12 sm6>
                                <v-btn :loading="cargando" color="red" @click="eliminarTarea" outline dark block>ELIMINAR</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import bus from '../bus'
import dateFns from 'date-fns'
import esLocale from 'date-fns/locale/es'
export default {
    beforeMount(){
        bus.$on('dialogTarea',(tareaID)=>{
            var tarea = this.$store.getters.tareaPorID(tareaID)
            this.id = tareaID
            this.contenido = tarea.contenido
            this.fecha_ISO = ""
            this.hora_seleccionada = ""
            if(tarea.fecha_vencimiento){
                var anho,mes,dia,horas,minutos
                anho = tarea.fecha_vencimiento.getFullYear()
                mes = tarea.fecha_vencimiento.getMonth()+1
                dia = tarea.fecha_vencimiento.getDate()
                horas = tarea.fecha_vencimiento.getHours()
                minutos = tarea.fecha_vencimiento.getMinutes()
                this.fecha_ISO = `${anho}-${mes}-${dia}`
                if(horas != 0 || minutos != 0){
                    this.hora_seleccionada = `${horas}:${minutos}`
                }
            }
            this.archivos = tarea.archivos
            this.dialogTarea = !this.dialogTarea
        })
    },
    computed:{
        fechaVencimientoFormateada(){
            // 2018-12-28 00:00 GMT0
            // Perú GMT-5
            if(this.fecha_ISO){
                return dateFns.format(this.fecha_ISO,'DD/MM/YYYY',{
                    locale: esLocale
                })
            }
            return ''
        }
    },
    data(){
        return {
            cargando : false,
            dialogTarea: false,
            contenido: '',
            id: 0,
            fecha_ISO : '',
            hora_seleccionada : '',
            archivos: []
        }
    },
    methods:{
        filtrarFechas(fechaISO){
            if(dateFns.isToday(fechaISO) || dateFns.isAfter(fechaISO,new Date())){
                return true
            }
            return false
        },
        convertirAFechaVencimiento(){
            if(this.fecha_ISO != ""){
                if(this.hora_seleccionada != ""){
                    return dateFns.parse(`${this.fecha_ISO} ${this.hora_seleccionada}`)
                }
                else{
                    return dateFns.parse(this.fecha_ISO)
                }
            }
            else{
                return null
            }
        },
        abrirArchivos(){
            this.$refs.inputArchivo.click()
        },
        seleccionarArchivo(e){
            var archivoSeleccionado = e.target.files[0]
            this.$store.dispatch('subirArchivo',archivoSeleccionado).then((url)=>{
                var tarea = this.$store.getters.tareaPorID(this.id)
                tarea.archivos.push({
                    nombre: archivoSeleccionado.name,
                    url: url
                })
                this.$store.dispatch('actualizarArchivos',tarea).catch((error)=>{
                    console.log(error)
                })
            }).catch((error)=>{
                console.log(error)
            })
        },
        eliminarArchivo(indice){
            this.cargando = true
            this.$store.dispatch('eliminarArchivo',{
                indice:indice,
                tareaID:this.id
            }).then(()=>{
                this.cargando = false
            }).catch((error)=>{
                this.cargando = false
                console.log(error)
            })
        },
        guardarCambios(){
            this.cargando = true
            var tarea = {}
            tarea.contenido = this.contenido
            tarea.fecha_vencimiento = this.convertirAFechaVencimiento()
            tarea.id = this.id
            this.$store.dispatch('actualizarTarea',tarea).then(()=>{
                this.cargando = false
                this.dialogTarea = false
            }).catch((error)=>{
                this.cargando = false
                console.log(error)
            })
        },  
        eliminarTarea(){
            this.$store.dispatch('eliminarTarea',this.id).then(()=>{
                this.cargando = false
                this.dialogTarea = false
            }).catch((error)=>{
                this.cargando = false
                console.log(error)
            })
        }
    }
}
</script>

<style>
    .lista_archivos{
        max-height: 350px;
        overflow-y: scroll;
    }
</style>    
