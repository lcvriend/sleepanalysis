import { analysis, getAverage, getMode } from "./stats.js"
import { norms } from "./render.js"


export function renderTable(tableId, data) {
    const tableSpecification = {}
    for (const [key, group] of Object.entries(data.grouped)) {
        tableSpecification[key] = {
            timeToSleep: getIndicator(group, {
                func: analysis.getTotalTimeOfCategory,
                formatter: formatTime,
                category: "Inslapen",
                normName: "timeToSleep"
            }),
            timeToWake: getIndicator(group, {
                func: analysis.getTotalTimeOfCategory,
                formatter: formatTime,
                category: "Waken",
            }),
            totalTimeInBed: getIndicator(group, {
                func: analysis.getTotalTimeInBed,
                formatter: formatTime,
            }),
            totalSleep: getIndicator(group, {
                func: analysis.getTotalTimeOfCategory,
                formatter: formatTime,
                category: "Slapen",
                normName: "totalSleep"
            }),
            totalAwake: getIndicator(group, {
                func: analysis.getTotalTimeOfCategory,
                formatter: formatTime,
                category: "Wakker",
                normName: "totalAwake"
            }),
            countsAwake: getIndicator(group, {
                func: analysis.getCategoryCounts,
                category: "Wakker",
                normName: "countsAwake"
            })
        }
    }

    for (const [key, group] of Object.entries(tableSpecification)) {
        const data = {
            totalTimeInBed: group.totalTimeInBed.value,
            totalSleep: group.totalSleep.value
        }
        const options = {
            func: analysis.getSleepEfficiency,
            formatter: formatPercentage,
            normName: "sleepEfficiency"
        }
        tableSpecification[key].sleepEfficiency = getIndicator(data, options)
    }

    const getValues = indicator => Object.values(tableSpecification)
        .map(item => item[indicator].value)
    tableSpecification["Gem."] = {
        timeToSleep: getIndicator(getValues("timeToSleep"), {
            func: getAverage,
            formatter: formatTime,
            category: "Inslapen",
            normName: "timeToSleep"
        }),
        timeToWake: getIndicator(getValues("timeToWake"), {
            func: getAverage,
            formatter: formatTime,
            category: "Waken",
        }),
        totalTimeInBed: getIndicator(getValues("totalTimeInBed"), {
            func: getAverage,
            formatter: formatTime,
        }),
        totalSleep: getIndicator(getValues("totalSleep"), {
            func: getAverage,
            formatter: formatTime,
            category: "Slapen",
            normName: "totalSleep"
        }),
        totalAwake: getIndicator(getValues("totalAwake"), {
            func: getAverage,
            formatter: formatTime,
            category: "Wakker",
            normName: "totalAwake"
        }),
        countsAwake: getIndicator(getValues("countsAwake"), {
            func: getMode,
            category: "Wakker",
            normName: "countsAwake"
        }),
        sleepEfficiency: getIndicator(getValues("sleepEfficiency"), {
            func: getAverage,
            formatter: formatPercentage,
            normName: "sleepEfficiency"
        }),
    }

    const tableHTMLElements = []
    for (const [key, spec] of Object.entries(tableSpecification)) {
        const rowHTMLElements = [`<th>${key}</th>`]
        for (const item of Object.values(spec)) {
            rowHTMLElements.push(`<td${item.class}>${item.formatted}</td>`)
        }
        tableHTMLElements.push(`<tr>${rowHTMLElements.join("")}</tr>`)
    }

    const table = document.querySelector(tableId)
    table.innerHTML = `<table id="sleep-quantification">
        <thead>
            <tr>
                <th>Sessie</th>
                <td>Inslaaptijd</td>
                <td>Waaktijd</td>
                <td>Totaal in bed</td>
                <td>Totaal slaap</td>
                <td>Totaal wakker</td>
                <td><em>n</em> wakker</td>
                <td>Slaapefficiëntie</td>
            </tr>
        </thead>
        <tbody>
        ${tableHTMLElements.join("")}
        </tbody>
    </table>`
}

function getIndicator(data, options) {
    const value = options.func(data, options)
    const passesNorm = options.normName ? testNorm(value, options.normName) : true
    return {
        value: value,
        formatted: options.formatter ? options.formatter(value) : value,
        class: passesNorm ? "" : ` class="issue" data-f-color="8b0000"`,
    }
}

function testNorm(value, normName) {
    const {op, threshold} = norms[normName]
    const operation = {
        "<": value => value < threshold,
        "<=": value => value <= threshold,
        ">": value => value > threshold,
        ">=": value => value >= threshold,
        "===": value => value === threshold,
    }
    return operation[op](value)
}

function formatTime(milliseconds) {
    if (!milliseconds) { return "" }
    const stringify = t => t.toString().padStart(2, '0')
    const totalSeconds = Math.floor(milliseconds / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds - (hours * 3600)) / 60)
    const seconds = totalSeconds - (hours * 3600) - (minutes * 60)
    return `${stringify(hours)}:${stringify(minutes)}:${stringify(seconds)}`
}

function formatPercentage(percentage) {
    return percentage
        .toLocaleString(undefined, {style: "percent", minimumFractionDigits: 1})
}
