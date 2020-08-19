const divisionalScheduler = require('./divisional.scheduler')
const schedulerData = require('../commons/scheduler.data')
const schedulerHelper = require('../commons/scheduler.helper')

const groupedStandings = schedulerData.getGroupedStandings()

describe('Divisional generation', () => {
    it('Should generate divisional', () => {
        const champions = schedulerHelper.getChampions(groupedStandings)
        const wildCardGames = schedulerData.getWildCardGames()
        const standings = schedulerData.getStandings()
        const wildCardWinners = schedulerHelper.getWinners(
            wildCardGames,
            standings
        )
        const divisionalGames = divisionalScheduler.generateDivisional(
            champions,
            wildCardWinners,
            1
        )

        expect(divisionalGames[0].homeTeam.name).toBe('ravens')
        expect(divisionalGames[0].awayTeam.name).toBe('chiefs')
        expect(divisionalGames[1].homeTeam.name).toBe('raiders')
        expect(divisionalGames[1].awayTeam.name).toBe('steelers')
    })
})
