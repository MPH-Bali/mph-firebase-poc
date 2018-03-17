// Vue stuff
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import moment from 'vue-moment'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'
import 'vuetify/dist/vuetify.min.css'

// Firebase stuff
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import store from './store'

// Routes
import DailyLog from '@/components/DailyLog'
import DeliveryForm from '@/components/DeliveryForm'

Vue.use(Router)
Vue.use(moment)
Vue.use(VueFire)
firebase.initializeApp({
  projectId: 'mph-firebase-poc',
  databaseURL: 'https://mph-firebase-poc.firebaseio.com'
})

Vue.prototype.$db = firebase.firestore()

Vue.use(Vuetify, {
  theme: {
    primary: '#42853d',
    secondary: '#f7f7f7',
    accent: colors.lime.lighten1
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router: new Router({
    mode: 'history',
    routes: [
      { path: '/', name: 'Daily Log', component: DailyLog },
      { path: '/delivery-form/:id?', name: 'DeliveryForm', component: DeliveryForm }
    ]
  }),
  components: { App },
  template: '<App/>'
})
