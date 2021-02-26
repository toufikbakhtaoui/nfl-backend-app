<template>
<v-card style="display:flex">
 <v-card>
           <division :teams="teamStore.teamsByDivision.value.find(division => division._id.conference === 'afc' && division._id.division === 'north').teams"></division>
           <division :teams="teamStore.teamsByDivision.value.find(division => division._id.conference === 'afc' && division._id.division === 'south').teams"></division>
           <division :teams="teamStore.teamsByDivision.value.find(division => division._id.conference === 'afc' && division._id.division === 'east').teams"></division>
           <division :teams="teamStore.teamsByDivision.value.find(division => division._id.conference === 'afc' && division._id.division === 'west').teams"></division>
  </v-card>
   <v-card>
    
           <division :teams="teamStore.teamsByDivision.value.find(division => division._id.conference === 'nfc' && division._id.division === 'north').teams"></division>
           <division :teams="teamStore.teamsByDivision.value.find(division => division._id.conference === 'nfc' && division._id.division === 'south').teams"></division>
           <division :teams="teamStore.teamsByDivision.value.find(division => division._id.conference === 'nfc' && division._id.division === 'east').teams"></division>
           <division :teams="teamStore.teamsByDivision.value.find(division => division._id.conference === 'nfc' && division._id.division === 'west').teams"></division>
   <v-card>
</v-card>
  
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