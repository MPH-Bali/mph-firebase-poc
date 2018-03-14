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

Vue.use(Vuetify, {
  theme: {
    primary: colors.teal.darken3,
    secondary: colors.grey.darken3,
    accent: colors.lime.lighten1
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: new Router({
    mode: 'history',
    routes: [
      { path: '/', name: 'HelloWorld', component: HelloWorld },
      { path: '/delivery', name: 'Delivery', component: Delivery }
    ]
  }),
  components: { App },
  template: '<App/>'
})
