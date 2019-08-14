class Player {
    numberOfPlayers() {
        let numberOfPlayers = prompt("Podaj ilość zawodników (max 2, min 1)");
        while (numberOfPlayers <= 0 || numberOfPlayers > 2 || isNaN(numberOfPlayers)) {
            numberOfPlayers = prompt("Podano za mało lub za dużo zawodników! Podaj ilość zawodników (max 2, min 1)");
        }
        return parseInt(numberOfPlayers);
    }
}