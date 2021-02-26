<template>
<div>
    <v-card style="margin:10px">
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
          :key="team.identifier"
        >
          <td>
            <img
                            class="logo"
                            :src="
                                require(`../../assets/logos/${team.name}/${team.name}.svg`)
                            "
                        />
          </td>
          <td class="team-name">{{ team.name }}</td>
          <td>{{ team.win }}</td>
          <td>{{ team.lost }}</td>
          <td>{{ team.draw }}</td>
          <td>{{ team.scored }}</td>
          <td>{{ team.conceded }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
    </v-card>
</div>
</template>

<script>
require('../../assets/logos/patriots/patriots.svg')
require('../../assets/logos/dolphins/dolphins.svg')
require('../../assets/logos/bills/bills.svg')
require('../../assets/logos/jets/jets.svg')
require('../../assets/logos/texans/texans.svg')
require('../../assets/logos/titans/titans.svg')
require('../../assets/logos/colts/colts.svg')
require('../../assets/logos/jaguars/jaguars.svg')
require('../../assets/logos/cardinals/cardinals.svg')
require('../../assets/logos/49ers/49ers.svg')
require('../../assets/logos/seahawks/seahawks.svg')
require('../../assets/logos/rams/rams.svg')
require('../../assets/logos/falcons/falcons.svg')
require('../../assets/logos/buccaneers/buccaneers.svg')
require('../../assets/logos/panthers/panthers.svg')
require('../../assets/logos/saints/saints.svg')
require('../../assets/logos/chiefs/chiefs.svg')
require('../../assets/logos/raiders/raiders.svg')
require('../../assets/logos/broncos/broncos.svg')
require('../../assets/logos/chargers/chargers.svg')
require('../../assets/logos/ravens/ravens.svg')
require('../../assets/logos/steelers/steelers.svg')
require('../../assets/logos/bengals/bengals.svg')
require('../../assets/logos/browns/browns.svg')
require('../../assets/logos/cowboys/cowboys.svg')
require('../../assets/logos/giants/giants.svg')
require('../../assets/logos/redskins/redskins.svg')
require('../../assets/logos/eagles/eagles.svg')
require('../../assets/logos/packers/packers.svg')
require('../../assets/logos/lions/lions.svg')
require('../../assets/logos/vikings/vikings.svg')
require('../../assets/logos/bears/bears.svg')

export default {
    name: 'standing-division',
    props: ['teams'],
}
</script>

<style lang="scss" scoped>

.logo {
    height: 30px;
    width: 30px;
}
.team-name {
    text-transform: capitalize;
}
</style>