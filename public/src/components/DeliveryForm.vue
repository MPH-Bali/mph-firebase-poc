<template>
  <v-layout row>
    <v-flex xs12 md8 offset-md2>
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

          <v-flex xs4>
            <v-btn color="error" flat outline @click.stop="$router.go(-1)">Cancel</v-btn>
          </v-flex>
          <v-flex xs4 text-xs-center>
            <v-btn v-if="this.formData.id" color="error" depressed @click.stop="remove">Delete</v-btn>
          </v-flex>
          <v-flex xs4 text-xs-right>
            <v-btn style="text-transform: capitalize" depressed color="primary" @click.stop="save">Save Delivery</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  created () {
    const id = this.$route.params.id

    if (!id) {
      this.formData = {
        anorganic: 20,
        organic: 20,
        households: 20,
        banjar: 'There',
        comments: 'Foo',
        driver: 'Putu',
        timestamp: new Date()
      }
    } else {
      this.$db.collection('delivery').doc(id).get().then(doc => {
        this.formData = { id: doc.id, ...doc.data() }
      })
    }
  },
  methods: {
    cancel () {
      this.formData = null
      this.showForm = false
    },
    save () {
      if (this.formData.id) {
        this.$db.collection('delivery')
          .doc(this.formData.id)
          .set({ ...this.formData })
          .then(this.$router.go(-1))
      } else {
        this.$db.collection('delivery')
          .add(this.formData)
          .then(this.$router.go(-1))
      }
    },
    remove () {
      this.$db.collection('delivery')
        .doc(this.formData.id)
        .delete()
        .then(this.$router.go(-1))
    }
  },
  data () {
    return {
      formData: null
    }
  }
}
</script>
