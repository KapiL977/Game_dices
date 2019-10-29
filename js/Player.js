class Player {
    getNumberOfPlayers() {
        let numberOfPlayers = prompt("Podaj ilość zawodników (max 2, min 1)");
        while (numberOfPlayers <= 0 || numberOfPlayers > 2 || isNaN(numberOfPlayers)) {
            numberOfPlayers = prompt("Podano za mało lub za dużo zawodników! Podaj ilość zawodników (max 2, min 1)");
        }
        return parseInt(numberOfPlayers);
    }

    getPlayersNames(numberOfPlayers) {
        const playersNames = [];
        for (let i = 0; i < numberOfPlayers; i++) {
            let playerName = prompt(`Podaj imię zawodnika ${i + 1} (ograniczenie znaków: max 8, min 1)`);
            while (playerName === null || (playerName.length < 1 || playerName.length > 8) || playerName.includes(" ")) {
                playerName = prompt(`Podane imię jest za krótkie lub za długie. Mogło również zawierać spacje, bądź nie być w ogóle wpisane! Podaj imię zawodnika ${i + 1} (ograniczenie znaków: max 8, min 1)`);
            }
            playersNames.push(playerName);
        }

        numberOfPlayers === 1 ? playersNames.push("Komputer") : null;

        return playersNames;
    }

    getDicesToRethrow(dicesInArea) {
        const dicesToRethrow = [];
        dicesInArea.forEach((dice, diceIndex) => {
            dice.addEventListener("click", () => {
                if (dice.classList.toggle("active")) {
                    dicesToRethrow.push(diceIndex);
                } else {
                    dicesToRethrow.forEach((el, i) => {
                        if (el === diceIndex) dicesToRethrow.splice(i, 1);
                    })
                }
            })
        })
        return dicesToRethrow;
    }
}