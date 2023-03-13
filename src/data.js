export function parseCSV(csv) {
    let [colnames, ...values] = csv.trim().split("\n").map(row => row.split(";").map(i => i.trim()))
    values = values.map(row => {
        return row.reduce((obj, val, idx) => {
            obj[colnames[idx]] = val
            return obj
        }, {})
    })
    return {colnames, values}
}


export function groupby(data) {
    const groups = data.reduce((acc, current) => {
        const {key: key, ...newObj} = current
        if (!acc[key]) {
            acc[key] = []
        }
        acc[key].push(newObj)
        return acc
        }, {})
    return groups
}


export function ungroup(groups) {
    const ungrouped = []
    for (const [key, group] of Object.entries(groups)) {
        for (const row of group) {row.key = key}
        ungrouped.push(...group)
    }
    return ungrouped
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
