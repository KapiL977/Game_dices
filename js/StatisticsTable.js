class StatisticsTable {
    constructor() {
        this.firstColumn = [...document.querySelectorAll(".column_1")];
        this.secondColumn = document.querySelectorAll(".column_2");

        this.countedDices = '';
        this._canAdd = true;
    }

    createTableSkeleton(specialRows, playersNames, playersNamesRow) {
        for (let i = 0; i < this.firstColumn.length; i++) {
            this.firstColumn[i].classList.toggle("active");
            this.secondColumn[i].classList.toggle("active");
        }

        specialRows.forEach(row => row.classList.toggle("active"));

        let nameCell = '';
        for (let i = 0; i < playersNames.length; i++) {
            nameCell = document.createElement("th");
            nameCell.textContent = playersNames[i];
            playersNamesRow.appendChild(nameCell);
        }
    }

    addScoreToTable(playerNumber, countedDices) {
        this.countedDices = countedDices;
        for (let i = 0; i < this.firstColumn.length; i++) {
            if (playerNumber === 0 && this._canAdd) {
                this.firstColumn[i].addEventListener("click", () => {
                    if (i <= 5) {
                        Rules.upperPartOfStatsTable(this.countedDices, this.firstColumn, i);
                        this.firstColumn[i].style.pointerEvents = "none";
                    } else {
                        Rules.lowerPartOfStatsTable(this.countedDices, this.firstColumn, i);
                        this.firstColumn[i].style.pointerEvents = "none";
                        if (i === 11) this.firstColumn[i].style.pointerEvents = "auto";
                    }
                })
            } else if (playerNumber === 1 && this._canAdd) {
                this.secondColumn[i].addEventListener("click", () => {
                    console.log("druga kolumna");
                })
            }
        }
        this._canAdd = false;
    }
}
