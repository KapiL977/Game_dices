export default class Player {
    getNumberOfPlayers() {
        let numberOfPlayers = prompt("Podaj ilość zawodników (max 2, min 1)");
        while (numberOfPlayers <= 0 || numberOfPlayers > 2 || isNaN(numberOfPlayers)) {
            numberOfPlayers = prompt("Podano za mało lub za dużo zawodników! Podaj ilość zawodników (max 2, min 1)");
        }
        return parseInt(numberOfPlayers);
    }

    getPlayersNames(numberOfPlayers) {
        const playersNames = [];
        let message = "";
        let messageIfComputer = "";
        for (let i = 0; i < numberOfPlayers; i++) {
            let playerName = prompt(`Podaj imię zawodnika ${i + 1} (ograniczenie znaków: max 8, min 1)`);
            while (playerName === null || (playerName.length < 1 || playerName.length > 8) || playerName.includes(" ") || playerName.toLowerCase() === "komputer") {
                const isComputer = playerName.toLowerCase() === "komputer" ? true : false;
                message = `Podane imię jest za krótkie lub za długie. Mogło również zawierać spacje, bądź nie być w ogóle wpisane! Podaj imię zawodnika ${i + 1} (ograniczenie znaków: max 8, min 1)`;
                messageIfComputer = `Żaden z graczy nie może nazywać się 'komputer'!  Podaj imię zawodnika ${i + 1} (ograniczenie znaków: max 8, min 1)`
                playerName = prompt(isComputer ? messageIfComputer : message);

            }
            playersNames.push(playerName);
        }
        numberOfPlayers === 1 ? playersNames.push("Komputer") : null;
        return playersNames;
    }

    getDiceToRethrow(diceInArea) {
        const diceToRethrow = [];
        diceInArea.forEach((dice, diceIndex) => {
            dice.addEventListener("click", () => {
                if (dice.classList.toggle("active")) {
                    diceToRethrow.push(diceIndex);
                } else {
                    diceToRethrow.forEach((element, i) => {
                        if (element === diceIndex) diceToRethrow.splice(i, 1);
                    })
                }
            })
        })
        return diceToRethrow;
    }
}