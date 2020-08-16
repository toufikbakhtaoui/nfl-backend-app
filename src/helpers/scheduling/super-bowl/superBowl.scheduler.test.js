const superBowlScheduler = require('./superBowl.scheduler')
const schedulerData = require('../commons/scheduler.data')
const schedulerHelper = require('../commons/scheduler.helper')

describe('SuperBowl scheduler', () => {
    it('Should return superBowl game', () => {
        const championshipGames = schedulerData.getChampionshipGames()
        const winners = schedulerHelper.getWinners(championshipGames)
        const superBowlGame = superBowlScheduler.generateSuperBowl(winners, 1)

        expect(superBowlGame.homeTeam.name).toBe('ravens')
        expect(superBowlGame.awayTeam.name).toBe('jaguars')
    })
})
