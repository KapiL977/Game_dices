class Rules {
    static upperPartOfStatsTable(countedDices, column, i) {
        if (i === 0) {
            column[i].textContent = 1 * countedDices[i + 1];
        } else if (i === 1) {
            column[i].textContent = 2 * countedDices[i + 1];
        } else if (i === 2) {
            column[i].textContent = 3 * countedDices[i + 1];
        } else if (i === 3) {
            column[i].textContent = 4 * countedDices[i + 1];
        } else if (i === 4) {
            column[i].textContent = 5 * countedDices[i + 1];
        } else if (i === 5) {
            column[i].textContent = 6 * countedDices[i + 1];
        }
        // add bonus 
    }

    static lowerPartOfStatsTable(countedDices, column, i) {
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
}