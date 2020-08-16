const championshipScheduler = require('./championship.scheduler')
const schedulerData = require('../commons/scheduler.data')
const schedulerHelper = require('../commons/scheduler.helper')

describe('Championship scheduler', () => {
    it('Should return championship games', () => {
        const divisionalGames = schedulerData.getDivisionalGames()
        const winners = schedulerHelper.getWinners(divisionalGames)
        const championshipGame = championshipScheduler.generateChampionship(
            winners,
            1
        )

        expect(championshipGame.homeTeam.name).toBe('ravens')
        expect(championshipGame.awayTeam.name).toBe('jaguars')
    })
})
