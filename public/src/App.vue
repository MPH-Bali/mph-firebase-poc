<template>
  <v-app>
    <v-navigation-drawer persistent clipped v-model="drawer" enable-resize-watcher fixed app>
      <v-list>
        <v-list-tile v-for="section in sections" :key="section.name" @click="$router.push(section.route)">
          <v-list-tile-action>
            <v-icon v-html="section.icon"/>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title :color="$route.path === section.route && 'primary'" v-text="section.name"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar flat app color="primary" dark clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="'Green Village Project'" />
      <v-spacer />
      <v-toolbar-items>
        <v-btn flat>
          <v-icon class="pr-2">person</v-icon>
          <span>Putu</span>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-slide-y-transition mode="out-in">
        <router-view />
      </v-slide-y-transition>
    </v-content>
    <v-footer app>
      <span>MPH Bali &copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sections: [
        { name: 'Dashboard', icon: 'fa-tachometer-alt', route: '/' },
        { name: 'Delivery', icon: 'fa-truck', route: '/delivery' },
        { name: 'Sales', icon: 'fa-money-bill-alt', route: '/sales' },
        { name: 'Compost', icon: 'fa-leaf', route: '/compost' },
        { name: 'Material', icon: 'fa-archive', route: '/material' },
        { name: 'EOD Report', icon: 'fa-chart-pie', route: '/eod' },
        { name: 'Settings', icon: 'fa-cog', route: '/settings' }
      ],
      drawer: true
    }
  },
  name: 'App'
}
</script>
