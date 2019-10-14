class Computer {
    constructor() {
        this.randomNumberGenerator = new RandomNumberGenerator();
        this.computerFiveNumbers = [];
    }

    generateComputerDices() {
        this.computerFiveNumbers = this.randomNumberGenerator.generateRandomNumbers(5);
        return this.computerFiveNumbers;
    }

}