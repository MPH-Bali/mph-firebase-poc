<template>
  <div>
    <v-slide-x-transition mode="out-in">
      <v-data-table v-if="!formData" :headers="headers" :items="items" hide-actions class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="text-xs-center">{{ props.item.timestamp | moment('DD-MMM')}}</td>
          <td class="text-xs-center">{{ props.item.total }}</td>
          <td class="text-xs-center">{{ props.item.organic }}</td>
          <td class="text-xs-center">{{ props.item.anorganic }}</td>
          <td class="text-xs-center">{{ props.item.households }}</td>
          <td>{{ props.item.driver }}</td>
          <td>{{ props.item.banjar }}</td>
          <td>{{ props.item.comments }}</td>
          <td class="text-xs-right">
            <v-menu bottom>
              <v-btn icon slot="activator">
                <v-icon>more_vert</v-icon>
              </v-btn>
              <v-list dense>
                <v-list-tile @click="edit(props.item.id)">
                  <v-list-tile-action>
                    <v-icon size="20px">fa-edit</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>Edit</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="remove(props.item.id)">
                  <v-list-tile-action>
                    <v-icon size="20px">fa-trash</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>Delete</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-menu>
          </td>
        </template>
      </v-data-table>

      <v-layout row v-if="formData">
        <v-flex xs8 offset-xs2 pt-4>
          <h1 class="py-4 title">Delivery Waste Data</h1>
          <v-container fluid grid-list-lg>
            <v-layout row wrap>
              <v-flex xs6>
                <v-text-field solo flat label="Organic" suffix="kg" type="number" v-model="formData.organic" />
              </v-flex>
              <v-flex xs6>
                <v-text-field solo flat label="Anorganic" suffix="kg" type="number" v-model="formData.anorganic" />
              </v-flex>
              <v-flex xs6>
                <v-text-field solo flat label="No. households" suffix="kg" type="number" v-model="formData.households" />
              </v-flex>
              <v-flex xs6>
                <v-text-field solo flat label="No. businesses" suffix="kg" type="number" v-model="formData.businesses" />
              </v-flex>
              <v-flex xs12>
                <v-text-field solo flat label="Date & Time" v-model="formData.timestamp" prepend-icon="event" readonly />
              </v-flex>
              <v-flex xs6>
                <v-select solo flat :items="['Putu', 'Kutu', 'Tutu']" v-model="formData.driver" label="Driver" />
              </v-flex>
              <v-flex xs6>
                <v-select solo flat :items="['Somewhere', 'Here', 'There']" v-model="formData.banjar" label="Banjar" />
              </v-flex>
              <v-flex xs12>
                <v-text-field solo flat label="Comments" v-model="formData.comments" auto-grow multi-line/>
              </v-flex>
              <v-flex xs6>
                <v-btn flat @click.stop="cancel">Cancel</v-btn>
              </v-flex>
              <v-flex xs6 text-xs-right>
                <v-btn flat color="primary" @click.stop="save">Save</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-slide-x-transition>

    <v-btn v-if="!formData" color="primary" dark fixed bottom right fab @click.stop="add">
      <v-icon>add</v-icon>
    </v-btn>
  </div>
</template>

<script>
  export default {
    methods: {
      add () {
        this.formData = {
          anorganic: 20,
          organic: 20,
          households: 20,
          banjar: 'There',
          comments: 'Foo',
          driver: 'Putu',
          timestamp: new Date()
        }
      },
      edit (id) {
        // ToDo
      },
      cancel () {
        this.formData = null
        this.showForm = false
      },
      save () {
        // change for edit
        this.$db.collection('delivery').add(this.formData)
        this.formData = null
      },
      remove (id) {
        console.log('delete this', id || 'nope')
      }
    },
    firestore () {
      return {
        delivery: this.$db.collection('delivery')
      }
    },
    computed: {
      items () {
        if (!this.delivery) return []

        return this.delivery.map(item => ({
          ...item,
          value: false,
          total: item.organic + item.anorganic
        }))
      }
    },
    data () {
      return {
        delivery: [],
        formData: null,
        headers: [
          { text: 'Date & Time', align: 'center', sortable: true, value: 'timestamp' },
          { text: 'Total Delivery (kg)', align: 'center', sortable: true, value: 'total' },
          { text: 'Organic', align: 'center', sortable: true, value: 'organic' },
          { text: 'Anorganic', align: 'center', sortable: true, value: 'anorganic' },
          { text: 'Housholds', align: 'center', sortable: true, value: 'households' },
          { text: 'Driver', align: 'left', sortable: true, value: 'driver' },
          { text: 'Banjar', align: 'left', sortable: true, value: 'banjar' },
          { text: 'Comments', align: 'left', sortable: false, value: 'comments' },
          { text: 'Actions', align: 'center', sortable: false, value: null }
        ]
      }
    }
  }
</script>
