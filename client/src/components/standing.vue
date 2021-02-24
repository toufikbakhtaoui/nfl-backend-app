<template>
  <v-carousel hide-delimiters>
    <v-carousel-item
      v-for="(color, i) in colors"
      :key="color"
    >
      <v-sheet
        :color="color"
      >
           <division :teams=teamStore.afcNorth.value></division>
           <division :teams=teamStore.afcWest.value></division>
           <division :teams=teamStore.afcSouth.value></division>
           <division :teams=teamStore.afcEast.value></division>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import teamService from '../services/team/team.service'
import teamStore from '../services/team/team.store'
import division from './standing-division'

export default {
    name: 'standing',
    components: {
        division
        },
    data() {
        return {
            teamStore,
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