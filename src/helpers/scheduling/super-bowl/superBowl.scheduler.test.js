const superBowlScheduler = require('./superBowl.scheduler')
const schedulerData = require('../commons/scheduler.data')
const schedulerHelper = require('../commons/scheduler.helper')

describe('SuperBowl scheduler', () => {
    it('Should return superBowl game', () => {
        const championshipGames = schedulerData.getChampionshipGames()
        const standings = schedulerData.getStandings()
        const winners = schedulerHelper.getWinners(championshipGames, standings)
        const season = 1
        const superBowlGame = superBowlScheduler.generateSuperBowl(
            winners,
            season
        )

        expect(superBowlGame.homeTeam.name).toBe('ravens')
        expect(superBowlGame.awayTeam.name).toBe('jaguars')
    })
})
