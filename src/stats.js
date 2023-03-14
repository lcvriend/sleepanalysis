function getSleepEfficiency(data) {
    const { totalTimeInBed, totalSleep} = data
    return totalSleep / totalTimeInBed
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

export const analysis = {
    getSleepEfficiency: getSleepEfficiency,
    getCategoryCounts: getCategoryCounts,
    getTotalTimeOfCategory: getTotalTimeOfCategory,
    getTotalTimeInBed: getTotalTimeInBed,
}

export function getAverage(array) {
    const sum = array.reduce((acc, curr) => acc + curr, 0)
    return sum / array.length
}

export function getMode(array) {
    const count = array.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1
        return acc
    }, {})

    let maxCount = 0
    let mode = null
    for (const key in count) {
        if (count[key] > maxCount) {
            maxCount = count[key]
            mode = key
        }
    }
    return mode
}
