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

        this.counter = 3;
        this.dicesToRethrow = 0;
        this.firstFiveDices = this.randomNumberGenerator.generateRandomNumbers(5);
        this.dicesClasses = ["fas fa-dice-one dice",
            "fas fa-dice-two dice",
            "fas fa-dice-three dice",
            "fas fa-dice-four dice",
            "fas fa-dice-five dice",
            "fas fa-dice-six dice"
        ];

        const startGameBtn = document.querySelector(".start_game");
        const throwDicesBtn = document.querySelector(".throw");
        const rethrowDicesBtn = document.querySelector(".rethrow");

        startGameBtn.addEventListener("click", () => this.startGame(startGameBtn));
        throwDicesBtn.addEventListener("click", () => this.throwDices(throwDicesBtn, rethrowDicesBtn));
        rethrowDicesBtn.addEventListener("click", () => this.rethrowDices(rethrowDicesBtn));
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

    throwDices(throwDicesBtn, rethrowDicesBtn) {
        this.counter--;
        throwDicesBtn.classList.toggle("disable");
        this.renderDicesInArea();
        this.giveOptionToChooseDices();
        rethrowDicesBtn.classList.toggle("disable");
        this.numberOfThrows[this.counter].classList.toggle("active");
    }

    rethrowDices(rethrowDicesBtn) {
        this.counter--;
        if (this.dicesToRethrow.length === 0) {
            alert("Musisz wybrać jakieś kości do przerzucenia! \nJeśli nie chcesz przerzucać żadnych kości - kliknij w jedną z kategorii w tabeli statystyk by zakończyć rundę.");
        } else {
            this.dicesToRethrow = this.dicesToRethrow.sort((lower, bigger) => lower - bigger);
            const toRethrowLength = this.dicesToRethrow.length;
            const newDicesAfterRethrow = this.randomNumberGenerator.generateRandomNumbers(toRethrowLength);

            for (let i = 0; i < toRethrowLength; i++) {
                this.firstFiveDices.splice(this.dicesToRethrow[i], 1, newDicesAfterRethrow[i]);
            }

            this.showDicesArea.innerHTML = '';
            this.renderDicesInArea();
            this.giveOptionToChooseDices();
            this.numberOfThrows[this.counter].classList.toggle("active");
            this.canThrowDices(this.counter, rethrowDicesBtn);
        }

    }

    renderDicesInArea() {
        let diceElement = '';
        for (let i = 0; i < this.firstFiveDices.length; i++) {
            diceElement = document.createElement("i");
            diceElement.setAttribute("class", this.dicesClasses[this.firstFiveDices[i] - 1]);
            this.showDicesArea.appendChild(diceElement);
        }
    }

    giveOptionToChooseDices() {
        if (this.counter > 0) {
            const dicesInArea = document.querySelectorAll(".dices > *");
            this.dicesToRethrow = this.player.getDicesToRethrow(dicesInArea);
        }
    }

    canThrowDices(counter, rethrowDicesBtn) {
        const endOfThrows = document.querySelector(".chooseOption");
        if (counter === 0) {
            rethrowDicesBtn.classList.toggle("disable");
            endOfThrows.classList.toggle("active");
        }
    }

}

const game = new Game();