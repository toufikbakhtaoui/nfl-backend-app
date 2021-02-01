<template>
    <v-card class="games">
                    <v-list dense>
                        <template v-for="(game, index) in games">
                            <v-list-item :key="game._id" class="game-item">
                                <div class="team-name">
                                    {{ game.awayTeam.name }}
                                </div>

                                <div class="logo-container">
                                    <img
                                        class="logo"
                                        :src="
                                            require(`../../../assets/logos/${game.awayTeam.name}/${game.awayTeam.name}.svg`)
                                        "
                                    />
                                </div>
                                <div class="team-score">
                                    {{ index }}
                                </div>
                                <div class="team-versus">@</div>
                                <div class="team-score">
                                    {{ index }}
                                </div>

                                <div class="logo-container">
                                    <img
                                        class="logo"
                                        :src="
                                            require(`../../../assets/logos/${game.homeTeam.name}/${game.homeTeam.name}.svg`)
                                        "
                                    />
                                </div>

                                <div class="team-name home-team-name">
                                    {{ game.homeTeam.name }}
                                </div>
                            </v-list-item>
                            <v-divider
                                v-if="index < 16"
                                :key="index"
                            ></v-divider>
                        </template>
                        <v-list-item>
                            <div class="game-actions">
                                <v-list-item-action style="margin: 0">
                                    <v-btn plain> Previous </v-btn>
                                </v-list-item-action>

                                <v-list-item-action>
                                    <v-btn class="ma-2" fab
      dark
      small color="cyan" plain>
                                        Play
                                    </v-btn>
                                </v-list-item-action>

                                <v-list-item-action style="margin: 0">
                                    <v-btn class="ma-1" plain>
                                        Next
                                    </v-btn>
                                </v-list-item-action>
                            </div>
                        </v-list-item>
                    </v-list>
                </v-card>
</template>

<script>
const patriots = require('../../../assets/logos/patriots/patriots.svg')
const dolphins = require('../../../assets/logos/dolphins/dolphins.svg')
const bills = require('../../../assets/logos/bills/bills.svg')
const jets = require('../../../assets/logos/jets/jets.svg')
const texans = require('../../../assets/logos/texans/texans.svg')
const titans = require('../../../assets/logos/titans/titans.svg')
const colts = require('../../../assets/logos/colts/colts.svg')
const jaguars = require('../../../assets/logos/jaguars/jaguars.svg')
const cardinals = require('../../../assets/logos/cardinals/cardinals.svg')
const _49ers = require('../../../assets/logos/49ers/49ers.svg')
const seahawks = require('../../../assets/logos/seahawks/seahawks.svg')
const rams = require('../../../assets/logos/rams/rams.svg')
const falcons = require('../../../assets/logos/falcons/falcons.svg')
const buccaneers = require('../../../assets/logos/buccaneers/buccaneers.svg')
const panthers = require('../../../assets/logos/panthers/panthers.svg')
const saints = require('../../../assets/logos/saints/saints.svg')
const chiefs = require('../../../assets/logos/chiefs/chiefs.svg')
const raiders = require('../../../assets/logos/raiders/raiders.svg')
const broncos = require('../../../assets/logos/broncos/broncos.svg')
const chargers = require('../../../assets/logos/chargers/chargers.svg')
const ravens = require('../../../assets/logos/ravens/ravens.svg')
const steelers = require('../../../assets/logos/steelers/steelers.svg')
const bengals = require('../../../assets/logos/bengals/bengals.svg')
const browns = require('../../../assets/logos/browns/browns.svg')
const cowboys = require('../../../assets/logos/cowboys/cowboys.svg')
const giants = require('../../../assets/logos/giants/giants.svg')
const redskins = require('../../../assets/logos/redskins/redskins.svg')
const eagles = require('../../../assets/logos/eagles/eagles.svg')
const packers = require('../../../assets/logos/packers/packers.svg')
const lions = require('../../../assets/logos/lions/lions.svg')
const vikings = require('../../../assets/logos/vikings/vikings.svg')
const bears = require('../../../assets/logos/bears/bears.svg')

import gameService from '../../api/game/game.service'
import seasonService from '../../api/season/season.service'

export default {
    name: 'game',
    data() {
        return {
            games: [],
            seasons: [],
            currentSeason: ''
        }
    },
    async created() {
        this.seasons = await seasonService.findAllSeasons()
        const currentSeason = this.seasons[this.seasons.length - 1]
        this.games = await gameService.findGames(currentSeason.identifier, currentSeason.week)
    },
}
</script>

<style scoped lang="scss">
.main {
    background-color: #03dac6;
}

.games {
    width: 350px;
}

.game-item {
    justify-content: space-between;
}

.team-name {
    width: 85px;
    text-transform: capitalize;
}

.home-team-name {
    text-align: end;
}

.logo-container {
    display: flex;
}
.logo {
    height: 30px;
    width: 30px;
}
</style>