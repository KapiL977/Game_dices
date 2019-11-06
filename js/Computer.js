class Computer {
    constructor(specialRow) {
        this.randomNumberGenerator = new RandomNumberGenerator();
        this.rules = new Rules(specialRow);
        this.computerFiveNumbers = [];
        this.computerCountDices = {};
        this.usedIndex = [];
    }

    generateComputerDices() {
        this.computerFiveNumbers = this.randomNumberGenerator.generateRandomNumbers(5);
        return this.computerFiveNumbers;
    }

    chooseTheBestOption(countedDices, secondColumn, round) {
        this.computerCountDices = countedDices;
        const compCountDicesArray = Object.values(this.computerCountDices);
        const scores = this.fillScoresTable(compCountDicesArray, compCountDicesArray.length, secondColumn);
        this.chooseScore(scores, secondColumn);
        this.clearComputerCount(round)
    }

    fillScoresTable(compDicesArray, arrayLength, column) {
        const scores = [];
        const upperPartLastIndex = 6;
        const lowerPartLastIndex = 13;
        for (let i = 0; i < column.length; i++) {
            if (i < upperPartLastIndex) {
                scores.push(this.rules.upperPartsCountScore(i, this.computerCountDices));
            } else if (i >= upperPartLastIndex && i < lowerPartLastIndex) {
                scores.push(this.rules.lowerPartsCountScore(i, arrayLength, compDicesArray, 0, 2));
            }
        }
        return scores;
    }

    chooseScore(scores, secondColumn) {
        let maxValue = Math.max(...scores);
        let maxIndex = scores.indexOf(maxValue);
        let isScoreInside = this.usedIndex.some(index => index === maxIndex);
        while (isScoreInside) {
            scores[maxIndex] = -1;
            maxValue = Math.max(...scores);
            maxIndex = scores.indexOf(maxValue);
            isScoreInside = this.usedIndex.some(index => index === maxIndex);
        }

        if (!isScoreInside) {
            const finalScore = scores[maxIndex];
            secondColumn[maxIndex].textContent = finalScore;
            this.usedIndex.push(maxIndex);
            this.addScoreToSpecialRow(maxIndex, finalScore);
        }
    }

    addScoreToSpecialRow(maxIndex, finalScore) {
        if (maxIndex < 6) {
            this.rules.upperPartSpecialRows(1, finalScore);
        } else if (maxIndex >= 6) {
            this.rules.countComputer += finalScore;
            this.rules.lowerPartSpecialRow(2);
        }
        this.rules.showFinalResult(2);
    }

    clearUsedIndex() {
        this.usedIndex = [];
    }

    clearComputerCount(round) {
        if (round === 13) {
            this.rules.countComputer = 0;
            this.rules.countSecondPlayerScore[0] = 0;
            this.rules._canAddRules[1] = true;
        }
    }
}