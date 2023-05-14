export class Data {
    constructor(values, headers) {
        this.headers = headers
        this.values = values
        this.grouped = groupby(values)
    }

    static fromCSV(csv, onError) {
        try {
            const data = this._fromCSV(csv)
            return data
        } catch (error) {
            if (onError) {
                onError(error)
            }
            throw error
        }
    }

    static _fromCSV(csv) {
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
        return Date.parse(`${datestr}T${time}`)
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

function parseCSV(csv) {
    let [colnames, ...values] = csv
        .trim()
        .split("\n")
        .map(row => row.split(";").map(i => i.trim()))
    values = values.map(row => {
        return row.reduce((obj, val, idx) => {
            obj[colnames[idx]] = val
            return obj
        }, {})
    })
    return {colnames, values}
}

function groupby(data) {
    const groups = data.reduce((acc, current) => {
        const {key: key, ...newObj} = current
        if (!acc[key]) { acc[key] = [] }
        acc[key].push(newObj)
        return acc
    }, {})
    return groups
}

function ungroup(groups) {
    const ungrouped = []
    for (const [key, group] of Object.entries(groups)) {
        for (const row of group) {row.key = key}
        ungrouped.push(...group)
    }
    return ungrouped
}

class ParseError extends Error {
    constructor(message) {
        super(message)
        this.name = "ParseError"
    }
}
