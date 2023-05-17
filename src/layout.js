/**
 * Adds column names as data attributes to the cells in a table.
 *
 * @param {HTMLTableElement} table - The table element.
 * @returns {void}
 */
export function addColumnNamesToCells(table) {
    const ths = Array.from(table.querySelectorAll("thead :where(th, td)"))
    const columnNames = ths.map(th => th.textContent).reverse()
    const rows = Array.from(table.querySelectorAll("tbody tr"))
    rows.forEach(row => {
        const cells = Array.from(row.querySelectorAll("th, td")).reverse()
        cells.forEach((cell, index) => {
            cell.dataset.cell = columnNames[index]
        })
    })
}

export function addOptionsMenuAboveTable(table) {
    const div = document.createElement("div")
    div.innerHTML = `
        <details title="Click to view actions">
            <summary>
                <svg viewBox="0 0 16 16" fill="currentColor" stroke="none" stroke-width="1" stroke-linecap="round"
                    stroke-linejoin="round">
                    <circle r="2" cy="8" cx="2"></circle>
                    <circle r="2" cy="8" cx="8"></circle>
                    <circle r="2" cy="8" cx="14"></circle>
                </svg>
            </summary>
            <div class="table-actions">
                <a href="#" target="_blank" data-table-id="${table.id}">Save as .xlsx</a>
            </div>
        </details>`
    div.classList.add("table-embed")
    table.before(div)
}
