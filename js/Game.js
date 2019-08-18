class Game {
    constructor() {
        this.player = new Player();
        this.statisticsTable = new StatisticsTable();
        this.randomNumberGenerator = new RandomNumberGenerator();
        this.firstColumn = document.querySelectorAll(".column_1");
        this.secondColumn = document.querySelectorAll(".column_2");
        this.specialRows = document.querySelectorAll(".special_row");
        this.roundNumber = document.querySelector(".round_number");
        this.gamerName = document.querySelector(".gamer_name");
        this.numberOfThrows = document.querySelectorAll(".throw_number");
        this.showDicesArea = document.querySelector(".dices");

        this.dicesToRethrow = 0;
        this.firstFiveDices = this.randomNumberGenerator.generateFiveRandomNumbers();
        this.dicesClasses = ["fas fa-dice-one dice",
            "fas fa-dice-two dice",
            "fas fa-dice-three dice",
            "fas fa-dice-four dice",
            "fas fa-dice-five dice",
            "fas fa-dice-six dice"
        ];

        const startGameBtn = document.querySelector(".start_game");
        const throwDicesBtn = document.querySelector(".throw");

        startGameBtn.addEventListener("click", () => this.startGame(startGameBtn));
        throwDicesBtn.addEventListener("click", () => this.throwDices(throwDicesBtn));
    }

    startGame(startGameBtn) {
        startGameBtn.style.display = "none";
        const numberOfPlayers = this.player.getNumberOfPlayers();
        const playersNames = this.player.getPlayersNames(numberOfPlayers);
        console.log(numberOfPlayers, playersNames);

        const playersNamesRow = document.querySelector(".gamers_names_row");
        this.statisticsTable.createTableSkeleton(this.firstColumn, this.secondColumn, this.specialRows, playersNames, playersNamesRow);

        this.roundNumber.textContent = 1;
        this.gamerName.textContent = playersNames[0];
    }

    throwDices(throwDicesBtn) {
        throwDicesBtn.classList.toggle("disable");
        this.renderDicesInArea();

        const dicesInArea = document.querySelectorAll(".dices > *");
        this.dicesToRethrow = this.player.getDicesToRethrow(dicesInArea)
    }

    renderDicesInArea() {
        let diceElement = '';
        for (let i = 0; i < this.firstFiveDices.length; i++) {
            diceElement = document.createElement("i");
            diceElement.setAttribute("class", this.dicesClasses[this.firstFiveDices[i] - 1]);
            this.showDicesArea.appendChild(diceElement);
        }
    }
}

const game = new Game();