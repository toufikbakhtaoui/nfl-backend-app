<template>
  <v-carousel hide-delimiters>
    <v-carousel-item
      v-for="(color, i) in colors"
      :key="color"
    >
      <v-sheet
        :color="color"
      >
           <division :teams=store.afcNorth.value></division>
           <division :teams=store.afcWest.value></division>
           <division :teams=store.afcSouth.value></division>
           <division :teams=store.afcEast.value></division>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import teamService from '../services/team/team.service'
import store from '../store'
import division from './standing-division'

export default {
    name: 'standing',
    components: {
        division
        },
    data() {
        return {
            teams:[],
            store,
      colors: [
        'primary',
        'secondary'
      ],    
        }
    }
}
</script>

<style>
</style>