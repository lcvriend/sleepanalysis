import { addOptionsMenuAboveTable } from "./layout.js"


export function renderMetaData(metaDataId, data) {
    const now = new Date()
    const formattedDate = now.toLocaleString(undefined, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })
    const firstDate = Math.min(...data.values.map(({ timestamp}) => timestamp))
    const lastDate = Math.max(...data.values.map(({ timestamp}) => timestamp))
    const container = document.querySelector(metaDataId)
    container.innerHTML = `<table id="meta-data">
        <tr>
            <th>Aangemaakt</th>
            <td>${formattedDate}</td>
        </tr>
        <tr>
            <th>Periode</th>
            <td>${(new Date(firstDate).toLocaleDateString())} - ${(new Date(lastDate).toLocaleDateString())}</td>
        </tr>
        <tr>
            <th>Aantal sessies</th>
            <td>${Object.keys(data.grouped).length}</td>
        </tr>
        <tr>
            <th>Aantal observaties</th>
            <td>${data.values.length}</td>
        </tr>
    </table>`
    addOptionsMenuAboveTable(container.querySelector("table"))
}
