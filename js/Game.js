class Game {
    constructor() {
        this.player = new Player();
        this.statisticsTable = new StatisticsTable();
        this.randomNumberGenerator = new RandomNumberGenerator();
        this.specialRows = document.querySelectorAll(".special_row");
        this.roundNumber = document.querySelector(".round_number");
        this.gamerName = document.querySelector(".gamer_name");
        this.numberOfThrows = document.querySelectorAll(".throw_number");
        this.showDicesArea = document.querySelector(".dices");
        this.endOfThrows = document.querySelector(".chooseOption");
        this.firstColumn = [...document.querySelectorAll(".column_1")];
        this.secondColumn = [...document.querySelectorAll(".column_2")];


        this.secondColumn.forEach(cell => cell.style.pointerEvents = "none");

        this.playersNames = [];
        this.countedDices = '';
        this.counter = 3;
        this.playerNumber = 0;
        this.round = 1;
        this.dicesToRethrow = 0;
        this.fiveChoseDices = [];
        this.dicesClasses = ["fas fa-dice-one dice",
            "fas fa-dice-two dice",
            "fas fa-dice-three dice",
            "fas fa-dice-four dice",
            "fas fa-dice-five dice",
            "fas fa-dice-six dice"
        ];

        const startGameBtn = document.querySelector(".start_game");
        this.throwDicesBtn = document.querySelector(".throw");
        this.rethrowDicesBtn = document.querySelector(".rethrow");

        startGameBtn.addEventListener("click", () => this.startGame(startGameBtn));
        this.throwDicesBtn.addEventListener("click", this.throwDices);
        this.rethrowDicesBtn.addEventListener("click", this.rethrowDices);


        for (let i = 0; i < this.firstColumn.length; i++) {
            this.firstColumn[i].addEventListener("click", this.afterClickInCell.bind(this, i));
            this.secondColumn[i].addEventListener("click", this.afterClickInCell.bind(this, i));
        }

    }

    startGame(startGameBtn) {
        startGameBtn.style.display = "none";
        const numberOfPlayers = this.player.getNumberOfPlayers();
        this.playersNames = this.player.getPlayersNames(numberOfPlayers);
        console.log(numberOfPlayers, this.playersNames);

        const playersNamesRow = document.querySelector(".gamers_names_row");
        this.statisticsTable.createTableSkeleton(this.specialRows, this.playersNames, playersNamesRow, this.firstColumn, this.secondColumn);


        this.roundNumber.textContent = this.round;
        this.gamerName.textContent = this.playersNames[this.playerNumber];
    }

    throwDices = () => {
        console.log(this.counter)
        this.fiveChoseDices = this.randomNumberGenerator.generateRandomNumbers(5);
        this.counter--;
        this.throwDicesBtn.classList.toggle("disable");
        this.renderDicesInArea();
        this.giveOptionToChooseDices();
        this.rethrowDicesBtn.classList.toggle("disable");
        this.numberOfThrows[this.counter].classList.toggle("active");

        this.countedDices = this.countNumberOfDices(this.fiveChoseDices);
    }

    rethrowDices = () => {
        console.log(this.playerNumber);
        if (this.dicesToRethrow.length === 0) {
            alert("Musisz wybrać jakieś kości do przerzucenia! \nJeśli nie chcesz przerzucać żadnych kości - kliknij w jedną z kategorii w tabeli statystyk by zakończyć rundę.");
        } else {
            this.counter--;
            this.dicesToRethrow = this.dicesToRethrow.sort((lower, bigger) => lower - bigger);
            const toRethrowLength = this.dicesToRethrow.length;
            const newDicesAfterRethrow = this.randomNumberGenerator.generateRandomNumbers(toRethrowLength);

            for (let i = 0; i < toRethrowLength; i++) {
                this.fiveChoseDices.splice(this.dicesToRethrow[i], 1, newDicesAfterRethrow[i]);
            }

            this.showDicesArea.innerHTML = '';
            this.renderDicesInArea();
            this.giveOptionToChooseDices();
            this.numberOfThrows[this.counter].classList.toggle("active");
            this.canThrowDices(this.counter, this.rethrowDicesBtn);
            this.countedDices = this.countNumberOfDices(this.fiveChoseDices);
        }

    }

    renderDicesInArea() {
        let diceElement = '';
        for (let i = 0; i < this.fiveChoseDices.length; i++) {
            diceElement = document.createElement("i");
            diceElement.setAttribute("class", this.dicesClasses[this.fiveChoseDices[i] - 1]);
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
        if (counter === 0) {
            rethrowDicesBtn.classList.toggle("disable");
            this.endOfThrows.classList.toggle("active");
        }
    }

    countNumberOfDices(dices) {
        const count = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0
        };
        let number = 0;
        for (let i = 0; i < dices.length; i++) {
            number = dices[i];
            count[number] = count[number] ? count[number] + 1 : 1;
        }
        return count;
    }

    afterClickInCell(i) {
        this.statisticsTable.addScoreToTable(this.playerNumber, this.countedDices, i, this.firstColumn, this.secondColumn);

        if (this.playerNumber === 0) {
            // console.log("x");
            this.playerNumber = 1;
        } else if (this.playerNumber === 1) {
            // console.log("y");
            this.playerNumber = 0;
            this.round++;
            this.roundNumber.textContent = this.round;
        }

        this.renderGameArea();
    }

    renderGameArea() {
        if (this.counter === 0) {
            this.endOfThrows.classList.toggle("active");
        } else {
            this.rethrowDicesBtn.classList.toggle("disable");
        }
        this.gamerName.textContent = this.playersNames[this.playerNumber];
        this.counter = 3;
        this.numberOfThrows.forEach(throwNumber => {
            if (throwNumber.classList.contains("active")) {
                throwNumber.classList.toggle("active")
            }
        })
        this.throwDicesBtn.classList.toggle("disable");
        this.showDicesArea.innerHTML = '';
        this.fiveChoseDices = [];
    }



}

const game = new Game();