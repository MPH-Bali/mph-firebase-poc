// Vue stuff
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import Vuetify from 'vuetify'
import moment from 'vue-moment'
import 'vuetify/dist/vuetify.min.css'

// Firebase stuff
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

// Routes
import HelloWorld from '@/components/HelloWorld'
import Delivery from '@/components/Delivery'

Vue.use(Router)
Vue.use(moment)
Vue.use(VueFire)
firebase.initializeApp({
  projectId: 'mph-firebase-poc',
  databaseURL: 'https://mph-firebase-poc.firebaseio.com'
})

Vue.prototype.$db = firebase.firestore()

Vue.use(Vuetify)
// Vue.use(Vuetify, {
//   theme: {
//     primary: '#ee44aa',
//     secondary: '#424242',
//     accent: '#82B1FF',
//     error: '#FF5252',
//     info: '#2196F3',
//     success: '#4CAF50',
//     warning: '#FFC107'
//   }
// })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: new Router({
    routes: [
      { path: '/', name: 'HelloWorld', component: HelloWorld },
      { path: '/delivery', name: 'Delivery', component: Delivery }
    ]
  }),
  components: { App },
  template: '<App/>'
})
