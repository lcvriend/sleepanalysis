let views = {}

export async function renderChart(chartId, urlToSpec, data, options = {}) {
    const baseSpec = await loadJSONFile("../specs/_base_.json")
    const chartSpec = await loadJSONFile(urlToSpec)
    const spec = merge({...baseSpec, ...chartSpec}, options)
    spec.data.values = data.values

    vegaEmbed(chartId, spec)
        .then(({ view }) => {
            views[chartId] = view
        })
        .catch(error => console.log(error))
}

async function loadJSONFile(url) {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Error:", error)
        return null
    }
}

// taken from https://thescottyjam.github.io/snap.js/#!/nolodash/merge
const isObject = value => value !== null && typeof value === "object"

const isPlainObject = value => {
    if (!isObject(value)) return false
    const prototype = Object.getPrototypeOf(value)
    return prototype === null || prototype === Object.prototype
}

function merge(object, ...sources) {
    for (const source of sources) {
        for (const [key, value] of Object.entries(source)) {
            if (value === undefined) { continue }
            if (!isPlainObject(value) && !Array.isArray(value)) {
                object[key] = value
            } else if (Array.isArray(value) && !Array.isArray(object[key])) {
                object[key] = value
            } else if (!isObject(object[key])) {
                object[key] = value
            } else {
                merge(object[key], value)
            }
        }
    }
    return object
}

export { views }
