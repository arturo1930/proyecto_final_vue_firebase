import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

import FormularioIngreso from './vistas/FormularioIngreso.vue'
import FormularioRecuperar from './vistas/FormularioRecuperar.vue'
import FormularioRegistro from './vistas/FormularioRegistro.vue'
import PanelPrincipal from './vistas/PanelPrincipal.vue'

import VistaListaTareasHoy from './vistas/VistaListaTareasHoy.vue'
import VistaListaTareasManana from './vistas/VistaListaTareasManana.vue'
import VistaListasTareasGeneral from './vistas/VistaListaTareasGeneral.vue'
import VistaListas from './vistas/VistaListas.vue'
const rutas = [
    {
        path:'/',
        component: FormularioIngreso
    },
    {
        path:'/registrese',
        component:FormularioRegistro
    },
    {
        path:'/recuperar',
        component: FormularioRecuperar
    },
    {
        path:'/panel',
        component: PanelPrincipal,
        children:[
            {
                path:'',
                component:VistaListaTareasHoy,                
            },
            {
                path:'manana',
                component: VistaListaTareasManana
            },
            {
                path:'listas',
                component:VistaListas
            },
            {
                path:'listas/:id',
                component: VistaListasTareasGeneral
            }
        ]
    }
]

export default new VueRouter({
    routes:rutas
})