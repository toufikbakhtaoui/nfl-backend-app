<template>
    <div style="display:flex; justify-content:space-between">
        <pie class="chart" :option="afcNorthOption"></pie>
        <pie class="chart" :option="afcWestOption"></pie>
        <pie class="chart" :option="afcEastOption"></pie>
        <pie class="chart" :option="option"></pie>
    </div>
</template>

<script>
import teamStore from '../services/team/team.store'
import utils from '../commons/arrays-utils'
import pie from '../charts/pie'
import lineChart from '../charts/line'
export default {
    name: 'stats',
    components: {
        pie,
        lineChart,
    },
    data() {
        return {
            afcNorthOption: {
                title: {
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                },
                series: [
                    {
                        name: 'division titles',
                        type: 'pie',
                        radius: '50%',
                        data: [],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                            },
                        },
                        label: {
                            formatter: '{b}: ({d}%)',
                        },
                        encode: {
                            itemName: 'product',
                            value: '2012',
                            tooltip: '2012',
                        },
                    },
                ],
            },
            afcWestOption: {
                title: {
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                },
                series: [
                    {
                        name: 'division titles',
                        type: 'pie',
                        radius: '50%',
                        data: [],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                            },
                        },
                        label: {
                            formatter: '{b}: ({d}%)',
                        },
                        encode: {
                            itemName: 'product',
                            value: '2012',
                            tooltip: '2012',
                        },
                    },
                ],
            },
             afcEastOption: {
                title: {
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                },
                series: [
                    {
                        name: 'division titles',
                        type: 'pie',
                        radius: '50%',
                        data: [],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                            },
                        },
                        label: {
                            formatter: '{b}: ({d}%)',
                        },
                        encode: {
                            itemName: 'product',
                            value: '2012',
                            tooltip: '2012',
                        },
                    },
                ],
            },
        }
    },
    async created() {
        await teamStore.loadTeams()

        let teams = teamStore.teams.value.filter(
            (team) => team.conference === 'afc' && team.division === 'north'
        )
        let data = utils.getRankingByTeam(teams)
        this.afcNorthOption.title.text = 'AFC NORTH'
        this.afcNorthOption.series[0].data = data

        teams = teamStore.teams.value.filter(
            (team) => team.conference === 'afc' && team.division === 'west'
        )
        data = utils.getRankingByTeam(teams)
        this.afcWestOption.title.text = 'AFC WEST'
        this.afcWestOption.series[0].data = data

         teams = teamStore.teams.value.filter(
            (team) => team.conference === 'afc' && team.division === 'east'
        )
        data = utils.getRankingByTeam(teams)
        this.afcEastOption.title.text = 'AFC EAST'
        this.afcEastOption.series[0].data = data
    },
}
</script>

<style lang="scss" scoped>
.chart {
     height: 600px;
     width: 600px;
}
</style>
