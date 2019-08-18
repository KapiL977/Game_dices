class RandomNumberGenerator {
    generateFiveRandomNumbers() {
        const randomNumbers = [];
        for (let i = 0; i < 5; i++) {
            randomNumbers.push(Math.floor(Math.random() * 6) + 1);
        }
        return randomNumbers;
    }
}