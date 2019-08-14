class StatisticsTable {
    createTableSkeleton(firstColumn, secondColumn, specialRows, playersNames, playersNamesRow) {
        for (let i = 0; i < firstColumn.length; i++) {
            firstColumn[i].classList.toggle("active");
            secondColumn[i].classList.toggle("active");
        }

        specialRows.forEach(row => row.classList.toggle("active"));

        for (let i = 0; i < playersNames.length; i++) {
            const nameCell = document.createElement("th");
            nameCell.textContent = playersNames[i];
            playersNamesRow.appendChild(nameCell);
        }
    }
}