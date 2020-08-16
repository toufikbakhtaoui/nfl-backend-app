const divisionalScheduler = require('./divisional.scheduler')
const schedulerData = require('../commons/scheduler.data')
const schedulerHelper = require('../commons/scheduler.helper')

const standings = schedulerData.getStandings()

describe('Divisional generation', () => {
    it('Should generate divisional', () => {
        const champions = schedulerHelper.getChampions(standings)
        const wildCardGames = schedulerData.getWildCardGames()
        const wildCardWinners = schedulerHelper.getWinners(wildCardGames)
        const divisionalGames = divisionalScheduler.generateDivisional(
            champions,
            wildCardWinners,
            1
        )

        expect(divisionalGames[0].homeTeam.name).toBe('ravens')
        expect(divisionalGames[0].awayTeam.name).toBe('steelers')
        expect(divisionalGames[1].homeTeam.name).toBe('raiders')
        expect(divisionalGames[1].awayTeam.name).toBe('jaguars')
    })
})
