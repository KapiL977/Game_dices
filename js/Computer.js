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

    chooseTheBestOption(countedDices, secondColumn) {
        this.computerCountDices = countedDices;
        const compCountDicesArray = Object.values(this.computerCountDices);
        const arrayLength = compCountDicesArray.length;
        const scores = this.fillScoresTable(compCountDicesArray, arrayLength, secondColumn);
        this.chooseScore(scores, secondColumn);
    }

    fillScoresTable(compDicesArray, arrayLength, column) {
        const scores = [];
        for (let i = 0; i < column.length; i++) {
            if (i < 6) {
                scores.push(this.rules.upperPartsCountScore(i, this.computerCountDices));
            } else if (i >= 6 && i < 13) {
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
}