class StatisticsTable {
    constructor(specialRows) {
        this.rules = new Rules(specialRows);
        this.firstColumnCellsAfterClick = [];
        this.secondColumnCellsAfterClick = [];
        this.countedDice = '';
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

    addScoreToTable(playerNumber, countedDice, i, firstColumn, secondColumn, playersNames) {
        this.countedDice = countedDice;
        if (playerNumber === 0) {
            this.addToRulesClass(i, firstColumn, playerNumber);
            if (playersNames[1] !== "Komputer") {
                this.changeColumn(i, firstColumn, secondColumn, this.firstColumnCellsAfterClick, this.secondColumnCellsAfterClick);
            } else {
                firstColumn[i].style.pointerEvents = "none";
            }
        } else if (playerNumber === 1) {
            this.addToRulesClass(i, secondColumn, playerNumber);
            this.changeColumn(i, secondColumn, firstColumn, this.secondColumnCellsAfterClick, this.firstColumnCellsAfterClick);
        }
    }

    addToRulesClass(i, column, playerNumber) {
        if (i <= 5) {
            this.rules.upperPartOfStatsTable(this.countedDice, column, i, playerNumber);
        } else {
            this.rules.lowerPartOfStatsTable(this.countedDice, column, i, playerNumber);
        }
    }

    changeColumn(i, columnNone, columnChange, addArray, whichBlock) {
        addArray.push(i);
        columnNone.forEach(cell => cell.style.pointerEvents = "none");
        columnChange.forEach(cell => cell.style.pointerEvents = "auto");
        whichBlock.forEach(cell => {
            columnChange[cell].style.pointerEvents = "none";
        })
    }

    clearTableAfterLastRound(firstColumn, secondColumn) {
        let playersCells = [...document.querySelectorAll("[data-name='player']")];
        this.firstColumnCellsAfterClick = [];
        this.secondColumnCellsAfterClick = [];
        this.countedDice = '';
        for (let i = 0; i < firstColumn.length; i++) {
            firstColumn[i].style.pointerEvents = "auto";
            firstColumn[i].textContent = "";
            secondColumn[i].textContent = "";
        }
        playersCells.forEach(el => el.remove());
        this.rules.specialRows.forEach(cell => cell.textContent = "");
    }
}
