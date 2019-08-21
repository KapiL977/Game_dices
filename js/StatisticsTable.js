class StatisticsTable {
    createTableSkeleton(firstColumn, secondColumn, specialRows, playersNames, playersNamesRow) {
        for (let i = 0; i < firstColumn.length; i++) {
            firstColumn[i].classList.toggle("active");
            secondColumn[i].classList.toggle("active");
        }

        specialRows.forEach(row => row.classList.toggle("active"));

        let nameCell = '';
        for (let i = 0; i < playersNames.length; i++) {
            nameCell = document.createElement("th");
            nameCell.textContent = playersNames[i];
            playersNamesRow.appendChild(nameCell);
        }
    }

    addScoreToTable(firstColumn, secondColumn, playerNumber) {
        for (let i = 0; i < firstColumn.length; i++) {
            if (playerNumber === 0) {
                firstColumn[i].addEventListener("click", () => {
                    console.log("pierwsza kolumna");
                })
            } else if (playerNumber === 1) {
                secondColumn[i].addEventListener("click", () => {
                    console.log("druga kolumna");
                })
            }
        }
    }
}