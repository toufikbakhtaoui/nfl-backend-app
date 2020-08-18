const Game = require('../../../api/components/game/game.model')
const regularSeasonScheduler = require('./regular-season.scheduler')

describe('Regular season scheduler', () => {
    it('Should generate same division games', () => {
        const sameDivisionGames = regularSeasonScheduler.generateSameDivisionGames()
        expect(sameDivisionGames.length).toBe(96)

        const teamAsHomeAndAwayInSameGame = sameDivisionGames.filter(
            (game) => game.homeTeamRank === game.awayTeamRank
        )
        expect(teamAsHomeAndAwayInSameGame.length).toBe(0)
    })

    it('Should generate same conference and different division games', () => {
        const sameConferenceDifferentDivisionGames = regularSeasonScheduler.generateSameConferenceDifferentDivisionGames(
            1
        )
        expect(sameConferenceDifferentDivisionGames.length).toBe(64)

        const teamAsHomeAndAwayInSameGame = sameConferenceDifferentDivisionGames.filter(
            (game) => game.homeTeamRank === game.awayTeamRank
        )
        expect(teamAsHomeAndAwayInSameGame.length).toBe(0)
    })

    it('Should generate same position games', () => {
        const samePositionGames = regularSeasonScheduler.generateSamePositionGames(
            1
        )
        expect(samePositionGames.length).toBe(32)

        const teamAsHomeAndAwayInSameGame = samePositionGames.filter(
            (game) => game.homeTeamRank === game.awayTeamRank
        )
        expect(teamAsHomeAndAwayInSameGame.length).toBe(0)
    })

    it('Should generate different conference different division games', () => {
        const differentConferenceDifferentDivisionGames = regularSeasonScheduler.generateDifferentConferenceDifferentDivisionGames(
            1
        )
        expect(differentConferenceDifferentDivisionGames.length).toBe(64)

        const teamAsHomeAndAwayInSameGame = differentConferenceDifferentDivisionGames.filter(
            (game) => game.homeTeamRank === game.awayTeamRank
        )
        expect(teamAsHomeAndAwayInSameGame.length).toBe(0)
    })

    it('Should generate regular season games', () => {
        const games = regularSeasonScheduler.generateRegularSeason(1)
        expect(games.length).toBe(256)

        const teamAsHomeAndAwayInSameGame = games.filter(
            (game) => game.homeTeamRank === game.awayTeamRank
        )
        expect(teamAsHomeAndAwayInSameGame.length).toBe(0)
    })
})
