import { Data } from "./data.js"
import { renderChart } from "./chart.js"
import { renderTable } from "./table.js"


export function analyzeSleepPatterns(event, chartId, tableId) {
    const data = Data.fromCSV(event.target.result)
    console.table(data.values)
    renderChart(chartId, data)
    renderTable(tableId, data, norms)
}


export const norms = {
    timeToSleep: {"op": "<", "threshold": 30 * 60 * 1000},
    totalSleep: {"op": ">", "threshold": 7 * 60 * 60 * 1000},
    totalAwake: {"op": "<", "threshold": 90 * 60 * 1000},
    sleepEfficiency: {"op": ">", "threshold": .85},
    countsAwake: {"op": "<=", "threshold": 2},
}
