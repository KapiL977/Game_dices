export default class RandomNumberGenerator {
    generateRandomNumbers(number) {
        const randomNumbers = [];
        for (let i = 0; i < number; i++) {
            randomNumbers.push(Math.floor(Math.random() * 6) + 1);
        }
        return randomNumbers;
    }
}