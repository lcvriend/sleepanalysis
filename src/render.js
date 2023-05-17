import { renderChart } from "./chart.js"
import { renderTable } from "./table.js"
import { renderMetaData } from "./metadata.js"


export async function renderAnalysis(data, elementIds, options = {}) {
    console.table(data.values)
    await renderChart(
        elementIds.timelines,
        "./specs/timelines.json",
        data,
        options.timelines
    )
    await renderChart(
        elementIds.percentages,
        "./specs/percentages.json",
        data,
        options.percentages
    )
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
