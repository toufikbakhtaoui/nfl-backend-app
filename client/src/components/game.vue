<template>
    <v-card>
        <span class="display-week">week {{ displayedWeek }}</span>
        <v-divider></v-divider>
        <v-list dense>
            <div class="no-games" v-if="weekNotReadyToDisplay">
                <p>No game to show</p>
            </div>
           <div v-else>
            <template v-for="(game, index) in gameStore.games.value">
                <v-list-item :key="game._id" class="game-item">
                    <div class="away-team-reord">
                        {{ getRecord(game.awayTeam.identifier) }}
                    </div>
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
                    <div class="home-team-reord">
                        {{ getRecord(game.homeTeam.identifier) }}
                    </div>
                </v-list-item>
                <v-divider v-if="index < 16" :key="index"></v-divider>
            </template>
           </div>
                <v-pagination style="margin-top:10px"
                    v-model="displayedWeek"
                    :length="20"
                    :total-visible="7"
                ></v-pagination>
                 <div style="display:flex; justify-content:center">
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
                 </div>
        </v-list>
    </v-card>
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
import teamStore from '../services/team/team.store'
import seasonStore from '../services/season/season.store'

export default {
    name: 'game',
    data() {
        return {
            gameStore,
            displayedWeek: 1,
            weekNotReadyToDisplay: false
        }
    },
    async created() {
        await teamStore.loadTeams()
        await seasonStore.loadSeasons()
        await gameStore.loadGames(
            seasonStore.currentSeason.value.identifier,
            seasonStore.currentSeason.value.week
        )
        this.displayedWeek = seasonStore.currentSeason.value.week
    },
    watch: {
        displayedWeek: function () {
            this.displayWeek()
        },
    },
    methods: {
        async displayWeek() {
            this.weekNotReadyToDisplay = 
                this.displayedWeek > 16 &&
                this.displayedWeek > seasonStore.currentSeason.value.week
            // if (isSeasonFinished) {
            //     await seasonStore.loadSeasons()
            //     await gameStore.loadGames(seasonStore.currentSeason.value.identifier, seasonStore.currentSeason.value.week)
            //     await teamStore.loadTeamsByDivision(seasonStore.currentSeason.value.identifier)
            //     this.displayedWeek = seasonStore.currentSeason.value.week
            // } else
            if (this.weekNotReadyToDisplay) {
                return
            }
            await gameStore.loadGames(
                seasonStore.currentSeason.value.identifier,
                this.displayedWeek
            )
        },
        async playGames() {
            const isDisplayedGameTheGameToPlay =
                this.displayedWeek === seasonStore.currentSeason.value.week
            if (isDisplayedGameTheGameToPlay) {
                await gameStore.playGames(
                    seasonStore.currentSeason.value.identifier,
                    this.displayedWeek
                )
                await teamStore.loadTeams()
                await teamStore.loadTeamsByDivision(
                    seasonStore.currentSeason.value.identifier
                )
                const isSeasonStillOnPlay =
                    seasonStore.currentSeason.value.week <= 20
                if (isSeasonStillOnPlay) {
                    seasonStore.currentSeason.value.week++
                }
            }
        },
        getRecord(teamIdentifier) {
            const standings = teamStore.teams.value.find(
                (team) => team.identifier === teamIdentifier
            ).standings
            const win = standings.find(
                (standing) =>
                    standing.season ===
                    seasonStore.currentSeason.value.identifier
            ).win
            const lost = standings.find(
                (standing) =>
                    standing.season ===
                    seasonStore.currentSeason.value.identifier
            ).lost
            const draw = standings.find(
                (standing) =>
                    standing.season ===
                    seasonStore.currentSeason.value.identifier
            ).draw
            return '(' + win + '-' + lost + '-' + draw + ')'
        },
    },
}
</script>

<style scoped lang="scss">
.main {
    background-color: #03dac6;
}

.display-week {
    display: block;
    text-align: center;
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

.home-team-reord {
    text-align: end;
    height: 24px;
    width: 56px;
}

.away-team-reord {
    text-align: left;
    height: 24px;
    width: 56px;
}

.no-games {
min-height:650px;
display: flex;
justify-content: center;
align-items: center;
}
</style>
