<template>
    <div style="display: flex">
        <v-card class="superbowl-card">
            <v-list dense>
                <template v-for="(game, index) in gameStore.superbowls.value">
                    <v-list-item :key="game._id" class="game-item">
                        <div class="team-name away-team-name">
                            {{ game.awayTeam.name }}
                        </div>

                        <div class="logo-container">
                            <img
                                class="logo"
                                :src="
                                    require(`../../assets/logos/${game.awayTeam.name}/${game.awayTeam.name}.svg`)
                                "
                            />
                        </div>
                        <div class="team-score">
                            {{ game.awayTeam.points }}
                        </div>
                        <div class="team-versus">@</div>
                        <div class="team-score">
                            {{ game.homeTeam.points }}
                        </div>

                        <div class="logo-container">
                            <img
                                class="logo"
                                :src="
                                    require(`../../assets/logos/${game.homeTeam.name}/${game.homeTeam.name}.svg`)
                                "
                            />
                        </div>

                        <div class="team-name home-team-name">
                            {{ game.homeTeam.name }}
                        </div>
                    </v-list-item>
                    <v-divider></v-divider>
                </template>
            </v-list>
        </v-card>
        <v-data-table
            dense
            :headers="superbowlHeaders"
            :items="superbowllWinners"
            item-key="name"
            class="elevation-1"
        >
            <template v-slot:item.logo="{ item }">
                <img
                    class="logo"
                    :src="
                        require(`../../assets/logos/${item.team}/${item.team}.svg`)
                    "
                />
            </template>
        </v-data-table>
        <v-data-table
            dense
            :headers="championshipHeaders"
            :items="championshipWinners"
            item-key="name"
            class="elevation-1"
        >
            <template v-slot:item.logo="{ item }">
                <img
                    class="logo"
                    :src="
                        require(`../../assets/logos/${item.team}/${item.team}.svg`)
                    "
                />
            </template>
        </v-data-table>
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

import gameStore from '../services/game/game.store'
import utils from '../commons/arrays-utils'

export default {
    name: 'superbowl',
    data() {
        return {
            gameStore,
            superbowllWinners: [],
            championshipWinners: [],
            superbowlHeaders: [
                { text: '', value: 'logo' },
                { text: 'Teams', value: 'team' },
                { text: 'Superbowls', value: 'superbowls' },
            ],

            championshipHeaders: [
                { text: '', value: 'logo' },
                { text: 'Teams', value: 'team' },
                { text: 'Championships', value: 'championships' },
            ],
        }
    },
    async created() {
        const winnerArray = []
        const appearancesArray = []
        await gameStore.loadSuperbowls()
        const {
            superbowlWinners,
            championshipWinners,
        } = utils.getSuperbowlStats(gameStore.superbowls.value)
        this.superbowllWinners = superbowlWinners
        this.championshipWinners = championshipWinners
    },
}
</script>

<style lang="scss" scoped>
.superbowl-card {
    width: 450px;
}
.game-item {
    justify-content: space-between;
}

.team-name {
    width: 85px;
    text-transform: capitalize;
}

.home-team-name {
    text-align: initial;
    margin-left: 10px;
}

.away-team-name {
    text-align: initial;
    margin-left: 10px;
}

.logo-container {
    display: flex;
}
.logo {
    height: 30px;
    width: 30px;
}

.team-score {
    height: 24px;
    width: 18px;
    margin-left: 5px;
    margin-right: 5px;
}
</style>