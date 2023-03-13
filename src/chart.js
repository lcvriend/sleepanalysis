export function renderChart(chartId, data) {
    const spec = getSpecChart()
    spec.data.values = data.values
    vegaEmbed(chartId, spec)
        .then(result => {})
        .catch(error => console.log(error))
}


function getSpecChart() {
    return {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.6.1.json",
        "config": {
            "view": {
                "continuousHeight": 300,
                "continuousWidth": 300
            }
        },
        "data": {
            "values": []
        },
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
                "type": "nominal"
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
            }
        },
        "mark": {
            "type": "rect",
            "cornerRadius": 4
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
}
