<template>
<div>
  <v-chart :option="option"></div>
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";

import {
  DatasetComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent
} from "echarts/components";
import VChart,  { THEME_KEY } from "vue-echarts";

use(
    [DatasetComponent, TooltipComponent, GridComponent, LegendComponent, LineChart, CanvasRenderer]
);


export default {
    name: 'lineChart',
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
