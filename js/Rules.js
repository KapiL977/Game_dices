class Rules {
    static upperPartOfStatsTable(countedDices, firstColumn, i) {
        console.log(countedDices);
        if (i === 0) {
            firstColumn[i].textContent = 1 * countedDices[i + 1];
        } else if (i === 1) {
            firstColumn[i].textContent = 2 * countedDices[i + 1];
        } else if (i === 2) {
            firstColumn[i].textContent = 3 * countedDices[i + 1];
        } else if (i === 3) {
            firstColumn[i].textContent = 4 * countedDices[i + 1];
        } else if (i === 4) {
            firstColumn[i].textContent = 5 * countedDices[i + 1];
        } else if (i === 5) {
            firstColumn[i].textContent = 6 * countedDices[i + 1];
        }
    }

    static lowerPartOfStatsTable(countedDices, firstColumn, i) {
        console.log("dolna");
    }
}