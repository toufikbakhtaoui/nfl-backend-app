<template>
<div>
    <v-card style="margin:10px">
    <template>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            
          </th>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Win
          </th>
           <th class="text-left">
            Lost
          </th>
           <th class="text-left">
            Draw
          </th>
           <th class="text-left">
            Scored
          </th>
            <th class="text-left">
            Conceded
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="team in teams"
          :key="team._id"
        >
        <td>logo</td>
          <td>{{ team.name }}</td>
          <td>{{ team.standings.find(standing => standing.season === seasonStore.currentSeason.value.identifier).win }}</td>
          <td>{{ team.standings.find(standing => standing.season === seasonStore.currentSeason.value.identifier).lost }}</td>
          <td>{{ team.standings.find(standing => standing.season === seasonStore.currentSeason.value.identifier).draw }}</td>
          <td>{{ team.standings.find(standing => standing.season === seasonStore.currentSeason.value.identifier).scored }}</td>
          <td>{{ team.standings.find(standing => standing.season === seasonStore.currentSeason.value.identifier).conceded }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
    </v-card>
</div>
</template>

<script>
import seasonStore from '../services/season/season.store'
export default {
    name: 'standing-division',
    props: ['teams'],
    data() {
        return {
            seasonStore    
            }
    },
    async created() {
        await seasonStore.loadSeasons()
    },
}
</script>

<style>

</style>