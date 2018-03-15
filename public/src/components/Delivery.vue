<template>
  <v-layout row wrap>
    <v-flex mb-4 xs12 md10 offset-xs1 text-xs-right>
      <v-btn v-if="!formData" color="primary"  top right  @click.stop="add">
        <v-icon>add_circle</v-icon>
        <span style="text-transform: capitalize" class="ml-2">Add</span>
      </v-btn>
    </v-flex>

    <v-flex xs12 md10 offset-xs1>
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

        <v-container fluid grid-list-lg v-if="formData">
          <v-layout row wrap>
            <v-flex xs12>
              <h1 class="py-4 title">Delivery Waste Data</h1>
            </v-flex>
            <v-flex xs12>
              <v-text-field solo flat label="Date & Time" v-model="formData.timestamp" prepend-icon="event" readonly />
            </v-flex>
            <v-flex xs6>
              <v-text-field solo flat label="Organic" suffix="kg" type="number" v-model="formData.organic" />
            </v-flex>
            <v-flex xs6>
              <v-text-field solo flat label="Anorganic" suffix="kg" type="number" v-model="formData.anorganic" />
            </v-flex>
            <v-flex xs3>
              <v-text-field solo flat label="No. households" type="number" v-model="formData.households" />
            </v-flex>
            <v-flex xs3>
              <v-text-field solo flat label="No. businesses" type="number" v-model="formData.businesses" />
            </v-flex>
            <v-flex xs3>
              <v-text-field solo flat label="No. villas" type="number" v-model="formData.villas" />
            </v-flex>
            <v-flex xs3>
              <v-text-field solo flat label="No. facilities" type="number" v-model="formData.facilities" />
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
              <v-btn color="error" flat outline @click.stop="cancel">Cancel</v-btn>
            </v-flex>
            <v-flex xs6 text-xs-right>
              <v-btn style="text-transform: capitalize" depressed color="primary" @click.stop="save">Save Delivery</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-slide-x-transition>
    </v-flex>
  </v-layout>
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
        this.$db.collection('delivery').doc(id).get().then(doc => {
          this.formData = { id: doc.id, ...doc.data() }
        })
      },
      cancel () {
        this.formData = null
        this.showForm = false
      },
      save () {
        if (this.formData.id) {
          this.$db.collection('delivery').doc(this.formData.id).set({ ...this.formData })
        } else {
          this.$db.collection('delivery').add(this.formData)
        }
        this.formData = null
      },
      remove (id) {
        this.$db
          .collection('delivery')
          .doc(id)
          .delete()
          // .then(() => call toast or something)
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
          id: item.id,
          value: false,
          total: parseInt(item.organic) + parseInt(item.anorganic)
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
