<template>
<div>
  <v-chart :option="option"></div>
</template>

<script>
import { use } from "echarts/core";
import VChart,  { THEME_KEY } from "vue-echarts";

import {
    TitleComponent,
    TooltipComponent,
    LegendComponent
} from 'echarts/components';
import {
    PieChart
} from 'echarts/charts';
import {
    CanvasRenderer
} from 'echarts/renderers';

use(
    [TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer]
)

export default {
    name: 'pie',
    props: ['option'],
    components: {
        VChart
    },
    provide: {
    [THEME_KEY]: "dark"
  },
}
</script>

<style lang="scss" scoped>
</style>
