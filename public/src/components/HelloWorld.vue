<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <!-- <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5"> -->
        <v-icon color="accent" size="300px">fa-leaf</v-icon>
        <pre>
          {{ delivery }}
        </pre>
        <blockquote>
          &#8220;First, solve the problem. Then, write the code.&#8221;
          <footer>
            <small>
              <em>&mdash;John Johnson</em>
            </small>
          </footer>
        </blockquote>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
export default {
  created () {
    this.$db
      .collection('delivery')
      .onSnapshot(snapshot => snapshot.forEach(doc => {
        console.log({ id: doc.id, ...doc.data() })
      }))
  },
  firestore () {
    return {
      delivery: this.$db.collection('delivery').orderBy('organic')
    }
  },
  data () {
    return {
      delivery: []
    }
  }
}
</script>

