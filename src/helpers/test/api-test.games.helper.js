const Game = require('../../api/components/game/game.model')

const stats = {
    drives: 0,
    punts: 0,
    fieldGoals: 0,
    missedFieldGoals: 0,
    attempts: 0,
    completions: 0,
    yards: 0,
    touchDowns: 0,
    fumble: 0,
    interception: 0,
}
const game1 = new Game({
    season: 1,
    week: 16,
    homeTeam: {
        rank: 1,
        name: 'patriots',
        identifier: 1,
        points: 0,
        stats: stats,
    },
    awayTeam: {
        rank: 2,
        name: 'dolphins',
        identifier: 2,
        points: 0,
        stats: stats,
    },
})
const game2 = new Game({
    season: 1,
    week: 16,
    homeTeam: {
        rank: 3,
        name: 'bills',
        identifier: 3,
        points: 0,
        stats: stats,
    },
    awayTeam: {
        rank: 4,
        name: 'jets',
        identifier: 4,
        points: 0,
        stats: stats,
    },
})
const game3 = new Game({
    season: 1,
    week: 16,
    homeTeam: {
        rank: 5,
        name: 'ravens',
        identifier: 5,
        points: 0,
        stats: stats,
    },
    awayTeam: {
        rank: 6,
        name: 'steelers',
        identifier: 6,
        points: 0,
        stats: stats,
    },
})
const game4 = new Game({
    season: 1,
    week: 16,
    homeTeam: {
        rank: 7,
        name: 'bengals',
        identifier: 7,
        points: 0,
        stats: stats,
    },
    awayTeam: {
        rank: 8,
        name: 'browns',
        identifier: 8,
        points: 0,
        stats: stats,
    },
})
const game5 = new Game({
    season: 1,
    week: 16,
    homeTeam: {
        rank: 9,
        name: 'texans',
        identifier: 9,
        points: 0,
        stats: stats,
    },
    awayTeam: {
        rank: 10,
        name: 'titans',
        identifier: 10,
        points: 0,
        stats: stats,
    },
})
const game6 = new Game({
    season: 1,
    week: 16,
    homeTeam: {
        rank: 11,
        name: 'colts',
        identifier: 11,
        points: 0,
        stats: stats,
    },
    awayTeam: {
        rank: 12,
        name: 'jaguars',
        identifier: 12,
        points: 0,
        stats: stats,
    },
})
const game7 = new Game({
    season: 1,
    week: 16,
    homeTeam: {
        rank: 13,
        name: 'chiefs',
        identifier: 13,
        points: 0,
        stats: stats,
    },
    awayTeam: {
        rank: 14,
        name: 'raiders',
        identifier: 14,
        points: 0,
        stats: stats,
    },
})
const game8 = new Game({
    season: 1,
    week: 16,
    homeTeam: {
        rank: 15,
        name: 'broncos',
        identifier: 15,
        points: 0,
        stats: stats,
    },
    awayTeam: {
        rank: 16,
        name: 'chargers',
        identifier: 16,
        points: 0,
        stats: stats,
    },
})
const game9 = new Game({
    season: 1,
    week: 16,
    homeTeam: {
        rank: 17,
        name: 'cowboys',
        identifier: 17,
        points: 0,
        stats: stats,
    },
    awayTeam: {
        rank: 18,
        name: 'giants',
        identifier: 18,
        points: 0,
        stats: stats,
    },
})
const game10 = new Game({
    season: 1,
    week: 16,
    homeTeam: {
        rank: 19,
        name: 'redskins',
        identifier: 19,
        points: 0,
        stats: stats,
    },
    awayTeam: {
        rank: 20,
        name: 'eagles',
        identifier: 20,
        points: 0,
        stats: stats,
    },
})
const game11 = new Game({
    season: 1,
    week: 16,
    homeTeam: {
        rank: 21,
        name: 'packers',
        identifier: 21,
        points: 0,
        stats: stats,
    },
    awayTeam: {
        rank: 22,
        name: 'lions',
        identifier: 22,
        points: 0,
        stats: stats,
    },
})
const game12 = new Game({
    season: 1,
    week: 16,
    homeTeam: {
        rank: 23,
        name: 'vikings',
        identifier: 23,
        points: 0,
        stats: stats,
    },
    awayTeam: {
        rank: 24,
        name: 'bears',
        identifier: 24,
        points: 0,
        stats: stats,
    },
})
const game13 = new Game({
    season: 1,
    week: 16,
    homeTeam: {
        rank: 25,
        name: 'falcons',
        identifier: 25,
        points: 0,
        stats: stats,
    },
    awayTeam: {
        rank: 26,
        name: 'buccaneers',
        identifier: 26,
        points: 0,
        stats: stats,
    },
})
const game14 = new Game({
    season: 1,
    week: 16,
    homeTeam: {
        rank: 27,
        name: 'panthers',
        identifier: 27,
        points: 0,
        stats: stats,
    },
    awayTeam: {
        rank: 28,
        name: 'saints',
        identifier: 28,
        points: 0,
        stats: stats,
    },
})
const game15 = new Game({
    season: 1,
    week: 16,
    homeTeam: {
        rank: 29,
        name: 'cardinals',
        identifier: 29,
        points: 0,
        stats: stats,
    },
    awayTeam: {
        rank: 30,
        name: '49ers',
        identifier: 30,
        points: 0,
        stats: stats,
    },
})
const game16 = new Game({
    season: 1,
    week: 16,
    homeTeam: {
        rank: 31,
        name: 'seahawks',
        identifier: 31,
        points: 0,
        stats: stats,
    },
    awayTeam: {
        rank: 32,
        name: 'rams',
        identifier: 32,
        points: 0,
        stats: stats,
    },
})

const game17 = new Game({
    season: 2,
    week: 17,
    homeTeam: {
        rank: 1,
        name: 'patriots',
        identifier: 1,
        points: 27,
        stats: stats,
    },
    awayTeam: {
        rank: 3,
        name: 'bills',
        identifier: 3,
        points: 30,
        stats: stats,
    },
})

const game18 = new Game({
    season: 2,
    week: 17,
    homeTeam: {
        rank: 12,
        name: 'jaguars',
        identifier: 12,
        points: 17,
        stats: stats,
    },
    awayTeam: {
        rank: 14,
        name: 'raiders',
        identifier: 14,
        points: 30,
        stats: stats,
    },
})

const game19 = new Game({
    season: 2,
    week: 18,
    homeTeam: {
        rank: 5,
        name: 'ravens',
        identifier: 1,
        points: 17,
        stats: stats,
    },
    awayTeam: {
        rank: 13,
        name: 'chiefs',
        identifier: 13,
        points: 13,
        stats: stats,
    },
})

const game20 = new Game({
    season: 2,
    week: 18,
    homeTeam: {
        rank: 14,
        name: 'raiders',
        identifier: 14,
        points: 17,
        stats: stats,
    },
    awayTeam: {
        rank: 6,
        name: 'steelers',
        identifier: 6,
        points: 23,
        stats: stats,
    },
})

const game21 = new Game({
    season: 2,
    week: 19,
    homeTeam: {
        rank: 14,
        name: 'raiders',
        identifier: 14,
        points: 17,
        stats: stats,
    },
    awayTeam: {
        rank: 12,
        name: 'jaguars',
        identifier: 12,
        points: 23,
        stats: stats,
    },
})

const game22 = new Game({
    season: 2,
    week: 19,
    homeTeam: {
        rank: 5,
        name: 'ravens',
        identifier: 5,
        points: 17,
        stats: stats,
    },
    awayTeam: {
        rank: 6,
        name: 'steelers',
        identifier: 6,
        points: 13,
        stats: stats,
    },
})
exports.getTestGames = () => {
    return [
        game1,
        game2,
        game3,
        game4,
        game5,
        game6,
        game7,
        game8,
        game9,
        game10,
        game11,
        game12,
        game13,
        game14,
        game15,
        game16,
        game17,
        game18,
        game19,
        game20,
        game21,
        game22,
    ]
}
