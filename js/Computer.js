class Computer {
    constructor(specialRow) {
        this.randomNumberGenerator = new RandomNumberGenerator();
        this.rules = new Rules(specialRow);
        this.computerFiveNumbers = [];
        this.computerCountDices = {};
        this.upperIndex = [0, 1, 2, 3, 4, 5];
        this.lowerIndex = [6, 7, 8, 9, 10, 11, 12];
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
        console.log(scores, this.computerCountDices);
    }

    fillScoresTable(compDicesArray, arrayLength, column) {
        const scores = [];
        for (let i = 0; i < column.length; i++) {
            if (i < 6) {
                scores.push(this.rules.upperPartsCountScore(i, this.computerCountDices));
            } else if (i >= 6 && i < 13) {
                scores.push(this.rules.lowerPartsCountScore(i, arrayLength, compDicesArray, 0, 1));
            }
        }
        return scores;
    }
}