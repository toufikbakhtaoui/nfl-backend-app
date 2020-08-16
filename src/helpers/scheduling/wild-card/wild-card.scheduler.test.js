const Team = require('../../../api/components/team/team.model')
const wildCardScheduler = require('./wild-card.scheduler')
const schedulerHelper = require('../commons/scheduler.helper')
const schedulerData = require('../commons/scheduler.data')

const standings = schedulerData.getStandings()

describe('Wild card generation', () => {
    it('Should generate wild card', () => {
        const champions = schedulerHelper.getChampions(standings)
        const contenders = schedulerHelper.getContenders(standings)
        const games = wildCardScheduler.generateWildCard(
            champions,
            contenders,
            1
        )
        expect(games[0].homeTeam.name).toBe('jaguars')
        expect(games[0].awayTeam.name).toBe('chiefs')

        expect(games[1].homeTeam.name).toBe('dolphins')
        expect(games[1].awayTeam.name).toBe('steelers')
    })
})
