<template>
  <v-layout row>
    <v-flex xs12 md10 offset-md1>
      <v-layout row wrap pt-4>
        <v-flex text-xs-center>
          <p class="title">
            <v-btn icon class="mr-3">
              <v-icon>chevron_left</v-icon>
            </v-btn>
            <v-icon color="primary">event</v-icon>
            <span>{{ new Date() | moment("dddd, DD MMM YYYY")}}</span>
            <v-btn icon class="ml-3">
              <v-icon>chevron_right</v-icon>
            </v-btn>
          </p>
        </v-flex>
      </v-layout>

      <daily-log-header action="/delivery-form" title="Delivery" />
      <delivery-table :formData="formData" :items="items" />

      <daily-log-header class="mt-4" action="/delivery-form" title="Material Kg" />
      <delivery-table :formData="formData" :items="items" />

      <daily-log-header class="mt-4" action="/delivery-form" title="Stock Kg" />
      <delivery-table :formData="formData" :items="items" />

      <daily-log-header class="mt-4" action="/delivery-form" title="Sales IDR" />
      <delivery-table :formData="formData" :items="items" />

      <daily-log-header class="mt-4" action="/delivery-form" title="Expenses IDR" />
      <delivery-table :formData="formData" :items="items" />

      <daily-log-header class="mt-4" action="/delivery-form" title="Workers Hours" />
      <delivery-table :formData="formData" :items="items" />
    </v-flex>
  </v-layout>
</template>

<script>
import DailyLogHeader from '@/components/DailyLogHeader'
import DeliveryTable from '@/components/DeliveryTable'

export default {
  components: {
    DailyLogHeader,
    DeliveryTable
  }
}
</script>
