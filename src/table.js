import { getAverage, getMode } from "./data.js"


export function renderTable(tableId, data, norms) {
    const timeToSleep = getPerGroup(data, getTimeOfCategory, {category: "Inslapen"})
    const timeToWake = getPerGroup(data, getTimeOfCategory, {category: "Waken"})
    const totalTimeInBed = getPerGroup(data, getTotalTimeInBed)
    const totalSleep = getPerGroup(data, getTotalTimeOfCategory, {category: "Slapen"})
    const totalAwake = getPerGroup(data, getTotalTimeOfCategory, {category: "Wakker"})
    const countsAwake = getPerGroup(data, getCategoryCounts, {category: "Wakker"})
    const sleepEfficiency = getSleepEfficiencyPerGroup(totalTimeInBed, totalSleep)

    const tableSpec = []
    for (const key of Object.keys(timeToSleep)) {
        tableSpec.push(`<tr>
            <th>${key}</th>
            <td ${timeToSleep[key] < norms.timeToSleep ? "" : 'class="issue"'}>${formatTime(timeToSleep[key])}</td>
            <td>${formatTime(timeToWake[key])}</td>
            <td>${formatTime(totalTimeInBed[key])}</td>
            <td ${totalSleep[key] > norms.sleepDuration ? "" : 'class="issue"'}>${formatTime(totalSleep[key])}</td>
            <td ${totalAwake[key] < norms.timeAwake ? "" : 'class="issue"'}>${formatTime(totalAwake[key])}</td>
            <td ${countsAwake[key] < norms.countsAwake ? "" : 'class="issue"'}>${countsAwake[key]}</td>
            <td ${sleepEfficiency[key] > norms.sleepEfficiency ? "" : 'class="issue"'}>${formatPercentage(sleepEfficiency[key])}</td>
        </tr>`)
    }

    const avgTimeToSleep = getAverage(Object.values(timeToSleep))
    const avgTotalSleep = getAverage(Object.values(totalSleep))
    const avgTotalAwake = getAverage(Object.values(totalAwake))
    const modeCountsAwake = getMode(Object.values(countsAwake))
    const avgSleepEfficiency = getAverage(Object.values(sleepEfficiency))
    tableSpec.push(`<tr>
        <th>Gem.</th>
        <td ${avgTimeToSleep < norms.timeToSleep ? "" : 'class="issue"'}>${formatTime(avgTimeToSleep)}</td>
        <td>${formatTime(getAverage(Object.values(timeToWake)))}</td>
        <td>${formatTime(getAverage(Object.values(totalTimeInBed)))}</td>
        <td ${avgTotalSleep > norms.sleepDuration ? "" : 'class="issue"'}>${formatTime(avgTotalSleep)}</td>
        <td ${avgTotalAwake < norms.timeAwake ? "" : 'class="issue"'}>${formatTime(avgTotalAwake)}</td>
        <td ${modeCountsAwake < norms.countsAwake ? "" : 'class="issue"'}>${modeCountsAwake}</td>
        <td ${avgSleepEfficiency > norms.sleepEfficiency ? "" : 'class="issue"'}>${formatPercentage(avgSleepEfficiency)}</td>
    </tr>`)

    document.querySelector(tableId).innerHTML = `<table>
        <thead>
            <tr>
                <th>Sessie</th>
                <td>Inslaaptijd</td>
                <td>Waaktijd</td>
                <td>Totaal in bed</td>
                <td>Totaal slaap</td>
                <td>Totaal wakker</td>
                <td>n wakker</td>
                <td>Slaapefficiëntie</td>
            </tr>
        </thead>
        <tbody>
        ${tableSpec.join("")}
        </tbody>
    </table>`
}


function getPerGroup(data, func, options={}) {
    const perGroup = {}
    for (const [key, group] of Object.entries(data.groups)) {
        perGroup[key] = func(group, options)
    }
    return perGroup
}


function getSleepEfficiencyPerGroup(totalTimeInBed, totalSleep) {
    const result = {}
    Object.keys(totalTimeInBed).forEach(key => {
        result[key] = totalSleep[key] / totalTimeInBed[key]
    })
    return result
}


function getCategoryCounts(data, options) {
    return data.filter(item => item.category === options.category ).length
}


function getTotalTimeOfCategory(data, options) {
    const selected = data.filter(item => item.category === options.category)
    if (selected.length === 0) { return 0 }
    return selected
        .map(({ duration }) => duration)
        .reduce((x, y) => x + y)
}


function getTotalTimeInBed(data) {
    return data.at(-2).timestamp - data.at(0).timestamp
}


function getTimeOfCategory(data, options) {
    for (const item of data) {
        if (item.category === options.category) { return item.duration }
    }
    return 0
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
        .toLocaleString(undefined, {style: 'percent', minimumFractionDigits: 1})
}
