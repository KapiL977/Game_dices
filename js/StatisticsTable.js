class StatisticsTable {
    constructor() {
        this.rules = new Rules();
        this.firstColumnCellsAfterClick = [];
        this.secondColumnCellsAfterClick = [];
        this.countedDices = '';
    }

    createTableSkeleton(specialRows, playersNames, playersNamesRow, firstColumn, secondColumn) {
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

    addScoreToTable(playerNumber, countedDices, i, firstColumn, secondColumn) {
        this.countedDices = countedDices;
        if (playerNumber === 0) {
            if (i <= 5) {
                this.rules.upperPartOfStatsTable(this.countedDices, firstColumn, i, playerNumber);
            } else {
                this.rules.lowerPartOfStatsTable(this.countedDices, firstColumn, i);
            }

            this.firstColumnCellsAfterClick.push(i);
            firstColumn.forEach(cell => cell.style.pointerEvents = "none");
            secondColumn.forEach(cell => cell.style.pointerEvents = "auto");
            this.secondColumnCellsAfterClick.forEach(cell => {
                secondColumn[cell].style.pointerEvents = "none";
            })

        } else if (playerNumber === 1) {
            if (i <= 5) {
                this.rules.upperPartOfStatsTable(this.countedDices, secondColumn, i, playerNumber);
            } else {
                this.rules.lowerPartOfStatsTable(this.countedDices, secondColumn, i);
            }

            this.secondColumnCellsAfterClick.push(i);
            secondColumn.forEach(cell => cell.style.pointerEvents = "none");
            firstColumn.forEach(cell => cell.style.pointerEvents = "auto");
            this.firstColumnCellsAfterClick.forEach(cell => {
                firstColumn[cell].style.pointerEvents = "none";
            })

        }
    }
}
