import { Data } from "./data.js"
import { renderChart, getSpecChartTimelines, getSpecChartPercentages } from "./chart.js"
import { renderTable } from "./table.js"
import { renderMetaData } from "./metadata.js"


export function analyzeSleepPatterns(data, elementIds) {
    console.table(data.values)
    renderChart(elementIds.timelines, getSpecChartTimelines, data)
    renderChart(elementIds.percentages, getSpecChartPercentages, data)
    renderTable(elementIds.table, data)
    renderMetaData(elementIds.metadata, data)
}


export const norms = {
    timeToSleep: {"op": "<", "threshold": 30 * 60 * 1000},
    totalSleep: {"op": ">=", "threshold": 7 * 60 * 60 * 1000},
    totalAwake: {"op": "<", "threshold": 90 * 60 * 1000},
    sleepEfficiency: {"op": ">", "threshold": .85},
    countsAwake: {"op": "<=", "threshold": 2},
}
