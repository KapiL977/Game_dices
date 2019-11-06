class Rules {
    constructor(specialRows) {
        this.specialRows = specialRows;
        this.countFirstPlayerScore = [0, 0];
        this.countSecondPlayerScore = [0, 0];
        this.countComputer = 0;
        this.firstPlayerClick = 0;
        this.secondPlayerClick = 0;
        this._canAddRules = [true, true];
    }

    upperPartOfStatsTable(countedDice, column, i, playerNumber) {
        const scoreIntoTable = this.upperPartsCountScore(i, countedDice);
        column[i].textContent = scoreIntoTable;
        this.upperPartSpecialRows(playerNumber, scoreIntoTable);
        this.showFinalResult(playerNumber);
        this.clearRules(playerNumber);
    }

    upperPartsCountScore(statIndex, countedDice) {
        let scoreIntoTable = (statIndex + 1) * countedDice[statIndex + 1];
        return scoreIntoTable;
    }

    lowerPartOfStatsTable(countedDice, column, statIndex, playerNumber) {
        let points = 0;
        const countedDiceArray = Object.values(countedDice);
        const arrayLength = countedDiceArray.length;
        const score = this.lowerPartsCountScore(statIndex, arrayLength, countedDiceArray, points, playerNumber);
        column[statIndex].textContent = score;
        this.lowerPartSpecialRow(playerNumber);
        this.showFinalResult(playerNumber);
        this.clearRules(playerNumber);
    }

    addScoreToCell(playerNumber, points) {
        if (playerNumber === 0) {
            this.countFirstPlayerScore[1] += points;
        } else if (playerNumber === 1) {
            this.countSecondPlayerScore[1] += points;
        }
    }

    lowerPartsCountScore(statIndex, arrayLength, countedDiceArray, points, playerNumber) {
        if (statIndex === 6) {
            for (let j = 0; j < arrayLength; j++) {
                if (countedDiceArray[j] >= 3) {
                    for (let k = 0; k < arrayLength; k++) {
                        points += (k + 1) * countedDiceArray[k];
                    }
                }
            }
            this.addScoreToCell(playerNumber, points);
            return points;
        } else if (statIndex === 7) {
            for (let j = 0; j < arrayLength; j++) {
                if (countedDiceArray[j] >= 4) {
                    for (let k = 0; k < arrayLength; k++) {
                        points += (k + 1) * countedDiceArray[k];
                    }
                }
            }
            this.addScoreToCell(playerNumber, points);
            return points;
        } else if (statIndex === 8) {
            for (let j = 0; j < arrayLength; j++) {
                if (countedDiceArray[j] === 3) {
                    for (let k = 0; k < arrayLength; k++) {
                        if (countedDiceArray[k] === 2) {
                            points = 30;
                            break;
                        }
                    }
                    break;
                }
            }
            this.addScoreToCell(playerNumber, points);
            return points;
        } else if (statIndex === 9) {
            const scopeStart = [0, 1, 2, 0, 1];
            const scopeEnd = [3, 4, 5, 4, 5];
            let count = 0;
            const checkPossibilities = countedDiceArray.map(element => (element >= 1 && element <= 2));

            for (let j = 0; j < scopeStart.length; j++) {
                for (let k = scopeStart[j]; k <= scopeEnd[j]; k++) {
                    checkPossibilities[k] === true ? count++ : count--;
                }

                if (count === 4 || count === 5) break;
                else count = 0;
            }

            if (count === 4 || count === 5) {
                points = 35;
            }

            this.addScoreToCell(playerNumber, points);
            return points;
        } else if (statIndex === 10) {
            const checkPossibilities = countedDiceArray.map(element => element === 1);
            let count = 0;
            for (let j = 0; j < checkPossibilities.length; j++) {
                checkPossibilities[j] === true ? count++ : count = 0;
                if (count === 5) break;
            }
            if (count === 5) {
                points = 50;
            }

            this.addScoreToCell(playerNumber, points);
            return points;
        } else if (statIndex === 11) {
            for (let j = 0; j < arrayLength; j++) {
                if (countedDiceArray[j] === 5) {
                    points = 60;
                    break;
                }
            }
            this.addScoreToCell(playerNumber, points);
            return points;
        } else if (statIndex === 12) {
            let counter = 0;
            countedDiceArray.forEach((element, index) => counter += (element * (index + 1)));
            this.addScoreToCell(playerNumber, counter);
            return counter;
        }
    }

    upperPartSpecialRows = (playerNumber, scoreIntoTable) => {
        if (playerNumber === 0) {
            this.upperPartSpecialRowsAddScore(this.countFirstPlayerScore, scoreIntoTable, 0, 0);
            this.specialRows[2].textContent = this.countFirstPlayerScore[0];
        } else if (playerNumber === 1) {
            this.upperPartSpecialRowsAddScore(this.countSecondPlayerScore, scoreIntoTable, 0, 1)
            this.specialRows[3].textContent = this.countSecondPlayerScore[0];
        }
    }

    upperPartSpecialRowsAddScore(playerCount, scoreIntoTable, iFirst, iSecond) {
        playerCount[iFirst] += scoreIntoTable;
        if (playerCount[iFirst] >= 63 && this._canAddRules[iSecond]) {
            this.specialRows[iSecond].textContent = 35;
            playerCount[iFirst] += 35;
            this._canAddRules[iSecond] = false;
        }
    }

    lowerPartSpecialRow = (playerNumber) => {
        if (playerNumber === 0) {
            this.specialRows[4].textContent = this.countFirstPlayerScore[1];
        } else if (playerNumber === 1) {
            this.specialRows[5].textContent = this.countSecondPlayerScore[1];
        } else if (playerNumber === 2) {
            this.specialRows[5].textContent = this.countComputer;
        }
    }

    showFinalResult = (playerNumber) => {
        if (playerNumber === 0) {
            this.specialRows[6].textContent = (this.countFirstPlayerScore[0] + this.countFirstPlayerScore[1]);
        } else if (playerNumber === 1) {
            this.specialRows[7].textContent = (this.countSecondPlayerScore[0] + this.countSecondPlayerScore[1]);
        } else if (playerNumber === 2) {
            this.specialRows[7].textContent = (this.countComputer + this.countSecondPlayerScore[0]);
        }
    }

    clearRules(playerNumber) {
        if (playerNumber === 1) {
            this.firstPlayerClick++;
        } else if (playerNumber === 0 && this.firstPlayerClick === 0) {
            this.secondPlayerClick++;
        }
        // clear
        if (this.firstPlayerClick === 13 || this.secondPlayerClick === 13) {
            this._canAddRules = [true, true];
            this.countFirstPlayerScore = [0, 0];
            this.countSecondPlayerScore = [0, 0];
            this.countComputer = 0;
            this.firstPlayerClick = 0;
            this.secondPlayerClick = 0;
        }
    }
}