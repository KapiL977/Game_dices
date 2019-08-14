class Game {
    constructor() {
        this.player = new Player();
        this.statisticsTable = new StatisticsTable();
        this.firstColumn = document.querySelectorAll(".column_1");
        this.secondColumn = document.querySelectorAll(".column_2");
        this.specialRows = document.querySelectorAll(".special_row");

        const startGameBtn = document.querySelector(".start_game");

        startGameBtn.addEventListener("click", () => this.startGame(startGameBtn));
    }

    startGame(startGameBtn) {
        startGameBtn.style.display = "none";
        const numberOfPlayers = this.player.numberOfPlayers();
        const playersNames = this.player.playersNames(numberOfPlayers);
        console.log(numberOfPlayers, playersNames);

        const playersNamesRow = document.querySelector(".gamers_names_row");
        this.statisticsTable.createTableSkeleton(this.firstColumn, this.secondColumn, this.specialRows, playersNames, playersNamesRow);
    }
}

const game = new Game();