import { parseCSV, groupby, ungroup } from "./data.js"
import { renderChart } from "./chart.js"
import { renderTable } from "./table.js"


export const norms = {
    totalSleep: {"op": ">", "threshold": 7 * 60 * 60 * 1000},
    timeToSleep: {"op": "<", "threshold": 30 * 60 * 1000},
    totalAwake: {"op": "<", "threshold": 90 * 60 * 1000},
    sleepEfficiency: {"op": ">", "threshold": .85},
    countsAwake: {"op": "<=", "threshold": 2},
}


export function analyzeSleepPatterns(event, chartId, tableId) {
    const data = Data.fromCSV(event.target.result)
    console.table(data.values)
    renderChart(chartId, data)
    renderTable(tableId, data, norms)
}


class Data {
    constructor(values, headers) {
        this.headers = headers
        this.values = values
        this.grouped = groupby(values)
    }

    static fromCSV(csv) {
        let {colnames, values} = parseCSV(csv)
        const [key, datestr, timestr, category] = colnames
        const headers = {key, datestr, timestr, category}
        for (const row of values) {
            row.key = row[key]
            row.category = row[category]
            row.timestamp = Data.getTimestampFromDateAndTime(row, headers)
        }
        const groups = groupby(values)
        for (const group of Object.values(groups)) {
            addNextTimestamp(group)
            addDurationInMs(group)
        }
        values = ungroup(groups)
        return new Data(values, headers)
    }

    static getTimestampFromDateAndTime(row, headers) {
        const {[headers.datestr]: date, [headers.timestr]: time} = row
        const datestr = `${date.slice(0,4)}-${date.slice(4,6)}-${date.slice(6)}`
        return Date.parse(`${datestr} ${time}`)
    }
}


function addNextTimestamp(data) {
    data.forEach((item, index) => {
        const nextItem = data[index + 1]
        item.timestamp2 = nextItem
            ? nextItem.timestamp
            : item.timestamp + 300000
    })
}


function addDurationInMs(data) {
    data.forEach(item => {
        item.duration = item.timestamp2 - item.timestamp
    })
}
