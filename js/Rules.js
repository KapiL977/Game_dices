class Rules {
    constructor() {
        this.specialRows = document.querySelectorAll(".special_row");
        this.countFirstPlayerScore = 0;
        this.countSecondPlayerScore = 0;
        this._canAddFirstPlayer = true;
        this._canAddSecondPlayer = true;
    }

    upperPartOfStatsTable(countedDices, column, i, playerNumber) {
        let scoreIntoTable = (i + 1) * countedDices[i + 1];
        column[i].textContent = scoreIntoTable;
        this.upperPartSpecialRows(playerNumber, scoreIntoTable);
    }

    lowerPartOfStatsTable(countedDices, column, i) {
        // countedDices = {
        //     1: 1,
        //     2: 1,
        //     3: 1,
        //     4: 1,
        //     5: 1,
        //     6: 0
        // }
        let points = 0;
        const countedDicesArray = Object.values(countedDices);
        const arrayLength = countedDicesArray.length;
        if (i === 6) {
            for (let j = 0; j < arrayLength; j++) {
                if (countedDicesArray[j] >= 3) {
                    for (let k = 0; k < arrayLength; k++) {
                        points += (k + 1) * countedDicesArray[k];
                    }
                }
            }
            column[i].textContent = points;
        } else if (i === 7) {
            for (let j = 0; j < arrayLength; j++) {
                if (countedDicesArray[j] >= 4) {
                    for (let k = 0; k < arrayLength; k++) {
                        points += (k + 1) * countedDicesArray[k];
                    }
                }
            }
            column[i].textContent = points;
        } else if (i === 8) {
            for (let j = 0; j < arrayLength; j++) {
                if (countedDicesArray[j] === 3) {
                    for (let k = 0; k < arrayLength; k++) {
                        if (countedDicesArray[k] === 2) {
                            column[i].textContent = 30;
                            break;
                        } else column[i].textContent = points;
                    }
                    break;
                } else column[i].textContent = points;
            }
        } else if (i === 9) {
            const scopeStart = [0, 1, 2, 0, 1];
            const scopeEnd = [3, 4, 5, 4, 5];
            let count = 0;
            const checkPossibilities = countedDicesArray.map(element => (element >= 1 && element <= 2));

            for (let j = 0; j < scopeStart.length; j++) {
                for (let k = scopeStart[j]; k <= scopeEnd[j]; k++) {
                    checkPossibilities[k] === true ? count++ : count--;
                }

                if (count === 4 || count === 5) break;
                else count = 0;
            }

            (count === 4 || count === 5) ? column[i].textContent = 35 : column[i].textContent = points;

        } else if (i === 10) {
            const checkPossibilities = countedDicesArray.map(element => element === 1);
            let count = 0;
            for (let j = 0; j < checkPossibilities.length; j++) {
                checkPossibilities[j] === true ? count++ : count = 0;
                if (count === 5) break;
            }
            count === 5 ? column[i].textContent = 50 : column[i].textContent = points;
        } else if (i === 11) {
            for (let j = 0; j < arrayLength; j++) {
                if (countedDicesArray[j] === 5) {
                    column[i].textContent = 60;
                    break;
                } else {
                    column[i].textContent = points;
                }
            }
        } else if (i === 12) {
            let counter = 0;
            countedDicesArray.forEach((element, index) => counter += (element * (index + 1)));
            column[i].textContent = counter;
        }
    }

    upperPartSpecialRows = (playerNumber, scoreIntoTable) => {
        if (playerNumber === 0) {
            this.countFirstPlayerScore += scoreIntoTable;
            if (this.countFirstPlayerScore >= 15 && this._canAddFirstPlayer) {
                this.specialRows[0].textContent = 35;
                this.countFirstPlayerScore += 35;
                this._canAddFirstPlayer = false;
            }
            this.specialRows[2].textContent = this.countFirstPlayerScore;
        } else if (playerNumber === 1) {
            this.countSecondPlayerScore += scoreIntoTable;
            if (this.countSecondPlayerScore >= 15 && this._canAddSecondPlayer) {
                this.specialRows[1].textContent = 35;
                this.countSecondPlayerScore += 35;
                this._canAddSecondPlayer = false;
            }
            this.specialRows[3].textContent = this.countSecondPlayerScore;
        }
    }
}