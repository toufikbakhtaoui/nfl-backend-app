<template>
    <v-card class="games">
        <span class="display-week">{{ displayedWeek }}</span>
        <v-divider></v-divider>
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
                                require(`../../../assets/logos/${game.homeTeam.name}/${game.homeTeam.name}.svg`)
                            "
                        />
                    </div>

                    <div class="team-name home-team-name">
                        {{ game.homeTeam.name }}
                    </div>
                </v-list-item>
                <v-divider v-if="index < 16" :key="index"></v-divider>
            </template>
            <v-list-item>
                <div class="game-actions">
                    <v-list-item-action style="margin: 0">
                        <v-btn @click="getPreviousWeek" plain> Previous </v-btn>
                    </v-list-item-action>

                    <v-list-item-action>
                        <v-btn
                            class="ma-2"
                            fab
                            dark
                            small
                            color="cyan"
                            plain
                            @click="playGames"
                        >
                            Play
                        </v-btn>
                    </v-list-item-action>

                    <v-list-item-action style="margin: 0">
                        <v-btn @click="getNextWeek" class="ma-1" plain>
                            Next
                        </v-btn>
                    </v-list-item-action>
                </div>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
require('../../../assets/logos/patriots/patriots.svg')
require('../../../assets/logos/dolphins/dolphins.svg')
require('../../../assets/logos/bills/bills.svg')
require('../../../assets/logos/jets/jets.svg')
require('../../../assets/logos/texans/texans.svg')
require('../../../assets/logos/titans/titans.svg')
require('../../../assets/logos/colts/colts.svg')
require('../../../assets/logos/jaguars/jaguars.svg')
require('../../../assets/logos/cardinals/cardinals.svg')
require('../../../assets/logos/49ers/49ers.svg')
require('../../../assets/logos/seahawks/seahawks.svg')
require('../../../assets/logos/rams/rams.svg')
require('../../../assets/logos/falcons/falcons.svg')
require('../../../assets/logos/buccaneers/buccaneers.svg')
require('../../../assets/logos/panthers/panthers.svg')
require('../../../assets/logos/saints/saints.svg')
require('../../../assets/logos/chiefs/chiefs.svg')
require('../../../assets/logos/raiders/raiders.svg')
require('../../../assets/logos/broncos/broncos.svg')
require('../../../assets/logos/chargers/chargers.svg')
require('../../../assets/logos/ravens/ravens.svg')
require('../../../assets/logos/steelers/steelers.svg')
require('../../../assets/logos/bengals/bengals.svg')
require('../../../assets/logos/browns/browns.svg')
require('../../../assets/logos/cowboys/cowboys.svg')
require('../../../assets/logos/giants/giants.svg')
require('../../../assets/logos/redskins/redskins.svg')
require('../../../assets/logos/eagles/eagles.svg')
require('../../../assets/logos/packers/packers.svg')
require('../../../assets/logos/lions/lions.svg')
require('../../../assets/logos/vikings/vikings.svg')
require('../../../assets/logos/bears/bears.svg')

import gameService from '../../api/game/game.service'
import seasonService from '../../api/season/season.service'

export default {
    name: 'game',
    data() {
        return {
            games: [],
            seasons: [],
            currentSeason: {},
            displayedWeek: 0,
        }
    },
    async created() {
        await this.getCurrentSeason()
    },
    methods: {
        async getNextWeek() {
            const isSeasonFinished = this.currentSeason.week === 21
            const isDisplayedWeekInRegularSeason = this.displayedWeek < 16
            const isDisplayedWeekAlreadyPlayed =
                this.currentSeason.week > this.displayedWeek
            if (isSeasonFinished) {
                this.getCurrentSeason()
            } else if (
                isDisplayedWeekInRegularSeason ||
                isDisplayedWeekAlreadyPlayed
            ) {
                this.displayedWeek++
                this.games = await gameService.findGames(
                    this.currentSeason.identifier,
                    this.displayedWeek
                )
            }
        },
        async getPreviousWeek() {
            if (this.displayedWeek > 1) {
                this.displayedWeek--
                this.games = await gameService.findGames(
                    this.currentSeason.identifier,
                    this.displayedWeek
                )
            }
        },

        async playGames() {
            const isDisplayedGameTheGameToPlay =
                this.displayedWeek === this.currentSeason.week
            if (isDisplayedGameTheGameToPlay) {
                this.games = await gameService.playGames(
                    this.currentSeason.identifier,
                    this.displayedWeek
                )
                const isSeasonStillOnPlay = this.currentSeason.week <= 20
                if (isSeasonStillOnPlay) {
                    this.currentSeason.week++
                }
            }
        },

        async getCurrentSeason() {
            this.seasons = await seasonService.findAllSeasons()
            this.currentSeason = this.seasons[this.seasons.length - 1]
            this.games = await gameService.findGames(
                this.currentSeason.identifier,
                this.currentSeason.week
            )
            this.displayedWeek = this.currentSeason.week
        },
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

.display-week {
    display: block;
    text-align: center;
}
</style>