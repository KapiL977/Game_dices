export default class RandomNumberGenerator {
    generateRandomNumbers(number) {
        const randomNumbers = [];
        for (let i = 0; i < number; i++) {
            randomNumbers.push(Math.floor(Math.random() * 7) + 1);
        }
        return randomNumbers;
    }
}
