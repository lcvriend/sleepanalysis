/**
 * Adds column names as data attributes to the cells in a table.
 *
 * @param {HTMLTableElement} table - The table element.
 * @returns {void}
 */
export function addColumnNamesToCells(table) {
    const ths = Array.from(table.querySelectorAll("thead :where(th, td)"))
    const columnNames = ths.map(th => th.textContent).reverse()
    console.log(columnNames)

    const rows = Array.from(table.querySelectorAll("tbody tr"))

    rows.forEach(row => {
        const cells = Array.from(row.querySelectorAll("th, td")).reverse()
        cells.forEach((cell, index) => {
            cell.dataset.cell = columnNames[index]
        })
    })
}
