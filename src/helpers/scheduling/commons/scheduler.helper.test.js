const schedulerHelper = require('./scheduler.helper')
const schedulerData = require('../commons/scheduler.data')

const standings = schedulerData.getGroupedStandings()

describe('Scheduler helper', () => {
    it('Should return champions', () => {
        const champions = schedulerHelper.getChampions(standings)
        expect(champions[0].name).toBe('ravens')
        expect(champions[1].name).toBe('raiders')
        expect(champions[2].name).toBe('jaguars')
        expect(champions[3].name).toBe('dolphins')
    })

    it('Should return contenders', () => {
        const contenders = schedulerHelper.getContenders(standings)
        expect(contenders[0].name).toBe('steelers')
        expect(contenders[1].name).toBe('chiefs')
        expect(contenders[2].name).toBe('patriots')
        expect(contenders[3].name).toBe('texans')
    })

    it('Should get winners', () => {
        const games = schedulerData.getWildCardGames()
        const standings = schedulerData.getStandings()
        const winners = schedulerHelper.getWinners(games, standings)
        expect(winners[0].name).toBe('steelers')
        expect(winners[1].name).toBe('chiefs')
    })
})
