class StatisticsTable {
    constructor(specialRows) {
        this.rules = new Rules(specialRows);
        this.firstColumnCellsAfterClick = [];
        this.secondColumnCellsAfterClick = [];
        this.countedDices = '';
        this.playersNamesRow = '';
    }

    createTableSkeleton(playersNames, playersNamesRow) {
        this.playersNamesRow = playersNamesRow;
        let nameCell = '';
        for (let i = 0; i < playersNames.length; i++) {
            nameCell = document.createElement("th");
            nameCell.textContent = playersNames[i];
            nameCell.dataset.name = "player";
            playersNamesRow.appendChild(nameCell);
        }
    }

    addScoreToTable(playerNumber, countedDices, i, firstColumn, secondColumn) {
        this.countedDices = countedDices;
        if (playerNumber === 0) {
            if (i <= 5) {
                this.rules.upperPartOfStatsTable(this.countedDices, firstColumn, i, playerNumber);
            } else {
                this.rules.lowerPartOfStatsTable(this.countedDices, firstColumn, i, playerNumber);
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
                this.rules.lowerPartOfStatsTable(this.countedDices, secondColumn, i, playerNumber);
            }

            this.secondColumnCellsAfterClick.push(i);
            secondColumn.forEach(cell => cell.style.pointerEvents = "none");
            firstColumn.forEach(cell => cell.style.pointerEvents = "auto");
            this.firstColumnCellsAfterClick.forEach(cell => {
                firstColumn[cell].style.pointerEvents = "none";
            })

        }
    }

    clearTableAfterLastRound(firstColumn, secondColumn) {
        let playersCells = [...document.querySelectorAll("[data-name='player']")];

        this.firstColumnCellsAfterClick = [];
        this.secondColumnCellsAfterClick = [];
        this.countedDices = '';

        for (let i = 0; i < firstColumn.length; i++) {
            firstColumn[i].style.pointerEvents = "auto";
            firstColumn[i].textContent = "";
            secondColumn[i].textContent = "";
        }

        playersCells.forEach(el => el.remove());
        this.rules.specialRows.forEach(cell => cell.textContent = "");
    }
}
