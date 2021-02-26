<template>
  <v-carousel hide-delimiters>
    <v-carousel-item
      v-for="(conference, i) in conferences"
      :key="conference"
    >
      <v-sheet>
           <division :teams="teamStore.teamsByDivision.value.find(division => division._id.conference === conference && division._id.division === 'north').teams"></division>
           <division :teams="teamStore.teamsByDivision.value.find(division => division._id.conference === conference && division._id.division === 'south').teams"></division>
           <division :teams="teamStore.teamsByDivision.value.find(division => division._id.conference === conference && division._id.division === 'east').teams"></division>
           <division :teams="teamStore.teamsByDivision.value.find(division => division._id.conference === conference && division._id.division === 'west').teams"></division>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import teamService from '../services/team/team.service'
import teamStore from '../services/team/team.store'
import seasonStore from '../services/season/season.store'
import division from './standing-division'

export default {
    name: 'standing',
    components: {
        division
        },
    data() {
        return {
            teamStore,
      conferences: [
        'afc',
        'nfc'
      ],    
        }
    },
    async created() {
        await seasonStore.loadSeasons()
        await teamStore.loadTeamsByDivision(seasonStore.currentSeason.value.identifier)
    },
}
</script>

<style>
</style>