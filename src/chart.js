let views = {}


export function renderChart(chartId, specGetter, data) {
    const spec = specGetter()
    spec.data.values = data.values
    vegaEmbed(chartId, spec)
        .then(result => {
            views[chartId] = result.view
        })
        .catch(error => console.log(error))
}


const baseSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.9.0.json",
    "config": {
        "font": "Georgia",
        "header": {
            "titleFontSize": 16,
            "labelFontSize": 14
        },
        "axis": {
            "titleFontSize": 16,
            "labelFontSize": 14,
            "labelAngle": 270,
            "grid": true
        },
        "legend": {
            "titleFontSize": 16,
            "labelFontSize": 14
        }
    },
    "data": {
        "values": []
    },
}


export function getSpecChartTimelines() {
    const spec = {
        "title": {
            "text": "Tijdlijnen per sessie",
            "subtitle": [
                "Mouseover om details te zien bij de observaties.",
                "(Shift-)klik op label(s) in legende om status(sen) uit te lichten."
            ],
            "fontSize": 18,
            "offset": 24,
        },
        "params": [{
            "name": "category",
            "select": {"type": "point", "fields": ["category"]},
            "bind": "legend"
          }],
        "encoding": {
            "color": {
                "field": "category",
                "scale": {
                    "domain": [
                        "Inslapen",
                        "Slapen",
                        "Wakker",
                        "Waken",
                        "Uit bed"
                    ],
                    "range": [
                        "#4c78a8",
                        "#54a24b",
                        "#e45756",
                        "#eeca3b",
                        "#ff9da6"
                    ]
                },
                "type": "nominal",
                "title": "Categorie"
            },
            "opacity": {
                "condition": {"param": "category", "value": 1},
                "value": 0.2
            },
            "row": {
                "field": "key",
                "type": "nominal",
                "title": "Sessie"
            },
            "tooltip": [
                {
                    "field": "key",
                    "type": "nominal",
                    "title": "Sessie"
                },
                {
                    "field": "category",
                    "type": "nominal",
                    "title": "Status"
                },
                {
                    "field": "duration",
                    "format": "%H:%M",
                    "type": "temporal",
                    "title": "Duur"
                },
                {
                    "field": "timestamp",
                    "format": "%x %H:%M",
                    "type": "temporal",
                    "title": "Begin"
                },
                {
                    "field": "timestamp2",
                    "format": "%x %H:%M",
                    "type": "temporal",
                    "title": "Eind"
                }
            ],
            "x": {
                "axis": {
                    "labelExpr": "timeFormat(timeOffset('hours', datum.value, 12), '%H:%M')",
                    "title": "Tijdstip"
                },
                "field": "start_offs",
                "timeUnit": "hoursminutes",
                "type": "temporal"
            },
            "x2": {
                "field": "end_offs",
                "timeUnit": "hoursminutes",
            },
            "y": {"value": 10},
            "y2": {"value": 55}
        },
        "mark": {
            "type": "rect",
            "cornerRadius": 4,
            // "opacity": .9
        },
        "transform": [
            {
                "as": "start_offs",
                "calculate": "timeOffset('hours', datum.timestamp, -12)"
            },
            {
                "as": "end_offs",
                "calculate": "timeOffset('hours', datum.timestamp2, -12)"
            },
            {
                "as": "duration",
                "calculate": "timeOffset('hours', datum.duration, -1)"
            }
        ],
        "width": 600,
        "height": 64
    }
    return {...baseSpec, ...spec}
}


export function getSpecChartPercentages() {
    const spec = {
        "title": {
            "text": "Totaalpercentages per slaapstatus",
            "fontSize": 18,
            "offset": 24,
            "anchor": "start",
        },
        "transform": [
            {
                "filter": "datum.category !== 'Uit bed'"
            },
            {
                "aggregate": [{
                    "op": "sum",
                    "field": "duration",
                    "as": "duration"
                }],
                "groupby": [
                    "category"
                ]
            },
            {
                "joinaggregate": [{
                    "op": "sum",
                    "field": "duration",
                    "as": "totalDuration"
                }],
            },
            {
                "calculate": "datum.duration/datum.totalDuration",
                "as": "percentage"
            },
            {
                "calculate": "format(datum.percentage, '.0%')",
                "as": "percentageFormatted"
            },
        ],
        "encoding": {
            "theta": {
                "field": "percentage",
                "type": "quantitative",
                "stack": true
            },
            "color": {
                "field": "category",
                "scale": {
                    "domain": [
                        "Inslapen",
                        "Slapen",
                        "Wakker",
                        "Waken",
                        "Uit bed"
                    ],
                    "range": [
                        "#4c78a8",
                        "#54a24b",
                        "#e45756",
                        "#eeca3b",
                        "#ff9da6"
                    ]
                },
                "type": "nominal",
                "title": "Categorie"
            },
            "order": {
                "field": "percentage",
                "type": "quantitative",
                "sort": "descending"
            },
            "tooltip": [
                {
                    "field": "category",
                    "type": "nominal",
                    "title": "Status"
                },
                {
                    "field": "percentage",
                    "type": "nominal",
                    "format": ".0%",
                    "title": "Percentage"
                },
            ]
        },
        "layer": [
            {
                "mark": {
                    "type": "arc",
                    "innerRadius": 90,
                    "outerRadius": 180
                },
            },
            {
                "mark": {
                    "type": "text",
                    "fill": "black",
                    "radius": 210,
                    "fontSize": 14
                },
                "encoding": {
                    "text": {
                        "field": "percentageFormatted",
                        "type": "nominal"
                    }
                }
            }
        ],
        "width": 400,
        "height": 400
    }
    return {...baseSpec, ...spec}
}


export { views }
