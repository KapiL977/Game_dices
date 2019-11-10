import RandomNumberGenerator from "./RandomNumberGenerator.js";
import Computer from "./Computer.js";
import Player from "./Player.js";
import StatisticsTable from "./StatisticsTable.js";

class Game {
    constructor() {
        this.initGameVariables();
        this.gameLogicInConstructor();
    }

    initGameVariables() {
        //from html
        this.specialRows = document.querySelectorAll(".special_row");
        this.roundNumber = document.querySelector(".round_number");
        this.gamerName = document.querySelector(".gamer_name");
        this.numberOfThrows = document.querySelectorAll(".throw_number");
        this.showDiceArea = document.querySelector(".dices");
        this.endOfThrows = document.querySelector(".chooseOption");
        this.gameSection = document.querySelector(".game");
        this.statisticsSection = document.querySelector(".statistics");
        this.startPanel = document.querySelector(".start_panel");
        this.firstColumn = [...document.querySelectorAll(".column_1")];
        this.secondColumn = [...document.querySelectorAll(".column_2")];
        this.startGameBtn = document.querySelector(".start_game");
        this.throwDiceBtn = document.querySelector(".throw");
        this.rethrowDiceBtn = document.querySelector(".rethrow");
        this.wrapper = document.querySelector(".wrapper");
        //instance of a class
        this.player = new Player();
        this.statisticsTable = new StatisticsTable(this.specialRows);
        this.randomNumberGenerator = new RandomNumberGenerator();
        this.computer = new Computer(this.specialRows);
        //own variables
        this.playersNames = [];
        this.countedDice = '';
        this.counter = 3;
        this.playerNumber = 0;
        this.round = 1;
        this.diceToRethrow = 0;
        this.fiveChoseDice = [];
        this.diceClasses = [
            "fas fa-dice-one dice",
            "fas fa-dice-two dice",
            "fas fa-dice-three dice",
            "fas fa-dice-four dice",
            "fas fa-dice-five dice",
            "fas fa-dice-six dice"
        ];
    }

    gameLogicInConstructor() {
        //disable click on second column cells
        this.secondColumn.forEach(cell => cell.style.pointerEvents = "none");
        //click on cells
        for (let i = 0; i < this.firstColumn.length; i++) {
            this.firstColumn[i].addEventListener("click", this.afterClickInCell.bind(this, i));
            this.secondColumn[i].addEventListener("click", this.afterClickInCell.bind(this, i));
        }
        //click on main buttons
        this.startGameBtn.addEventListener("click", this.startGame);
        this.throwDiceBtn.addEventListener("click", this.throwDice);
        this.rethrowDiceBtn.addEventListener("click", this.rethrowDice);
    }

    startGame = () => {
        const trulyStart = confirm("Czy na pewno chcesz rozpocząć grę?");
        if (trulyStart) {
            this.startPanel.style.display = "none";
            this.wrapper.style.display = "grid";
            const numberOfPlayers = this.player.getNumberOfPlayers();
            this.playersNames = this.player.getPlayersNames(numberOfPlayers);
            if (numberOfPlayers === 2) {
                while (this.playersNames[0] === this.playersNames[1] || this.playersNames[1] === "Komputer") {
                    alert("Musiałeś podać dwa razy taką samą nazwę zawodnika! Nazwy zawodników nie mogą się powtarzać. Podaj je jeszcze raz.");
                    this.playersNames = this.player.getPlayersNames(numberOfPlayers);
                }
            }
            const playersNamesRow = document.querySelector(".gamers_names_row");
            this.statisticsTable.createTableSkeleton(this.playersNames, playersNamesRow);
            this.roundNumber.textContent = this.round;
            this.gamerName.textContent = this.playersNames[this.playerNumber];
        }
    }

    throwDice = () => {
        this.fiveChoseDice = this.randomNumberGenerator.generateRandomNumbers(5);
        this.counter--;
        this.throwDiceBtn.classList.toggle("disable");
        this.renderDiceInArea();
        this.giveOptionToChooseDice();
        this.rethrowDiceBtn.classList.toggle("disable");
        this.numberOfThrows[this.counter].classList.toggle("active");
        this.countedDice = this.countNumberOfDice(this.fiveChoseDice);
    }

    rethrowDice = () => {
        if (this.diceToRethrow.length === 0) {
            alert("Musisz wybrać jakieś kości do przerzucenia! \nJeśli nie chcesz przerzucać żadnych kości - kliknij w jedną z kategorii w tabeli statystyk by zakończyć rundę.");
        } else {
            this.counter--;
            this.diceToRethrow = this.diceToRethrow.sort((lower, bigger) => lower - bigger);
            const toRethrowLength = this.diceToRethrow.length;
            const newDiceAfterRethrow = this.randomNumberGenerator.generateRandomNumbers(toRethrowLength);
            for (let i = 0; i < toRethrowLength; i++) {
                this.fiveChoseDice.splice(this.diceToRethrow[i], 1, newDiceAfterRethrow[i]);
            }
            this.renderDiceInArea();
            this.giveOptionToChooseDice();
            this.numberOfThrows[this.counter].classList.toggle("active");
            this.canThrowDice(this.counter, this.rethrowDiceBtn);
            this.countedDice = this.countNumberOfDice(this.fiveChoseDice);
        }
    }

    renderDiceInArea() {
        this.showDiceArea.innerHTML = '';
        let diceElement = '';
        for (let i = 0; i < this.fiveChoseDice.length; i++) {
            diceElement = document.createElement("i");
            diceElement.setAttribute("class", this.diceClasses[this.fiveChoseDice[i] - 1]);
            this.showDiceArea.appendChild(diceElement);
        }
    }

    giveOptionToChooseDice() {
        if (this.counter > 0) {
            const diceInArea = document.querySelectorAll(".dices > *");
            this.diceToRethrow = this.player.getDiceToRethrow(diceInArea);
        }
    }

    canThrowDice(counter, rethrowDiceBtn) {
        if (counter === 0) {
            rethrowDiceBtn.classList.toggle("disable");
            this.endOfThrows.classList.toggle("active");
        }
    }

    countNumberOfDice(dice) {
        const count = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0
        };
        let number = 0;
        for (let i = 0; i < dice.length; i++) {
            number = dice[i];
            count[number] = count[number] ? count[number] + 1 : 1;
        }
        return count;
    }

    afterClickInCell(i) {
        if (this.showDiceArea.innerHTML === "") {
            alert("Aby móc kliknąć w pola tabeli musisz rzucić kości!");
        } else {
            this.statisticsTable.addScoreToTable(this.playerNumber, this.countedDice, i, this.firstColumn, this.secondColumn, this.playersNames);
            if (this.playerNumber === 0) {
                if (this.playersNames[1] !== "Komputer") {
                    this.playerNumber = 1;
                } else {
                    // computer panel
                    const computerDice = this.computer.generateComputerDice();
                    const countedComputerDice = this.countNumberOfDice(computerDice);
                    this.computer.chooseTheBestOption(countedComputerDice, this.secondColumn, this.round);
                    this.renderRoundNumber();
                    //
                }
            } else if (this.playerNumber === 1) {
                this.playerNumber = 0;
                this.renderRoundNumber();
            }

            this.showEndGame();
            this.renderGameArea();
        }
    }

    renderGameArea() {
        if (this.counter === 0) {
            this.endOfThrows.classList.toggle("active");
        } else {
            this.rethrowDiceBtn.classList.toggle("disable");
        }
        this.gamerName.textContent = this.playersNames[this.playerNumber];
        this.counter = 3;
        this.numberOfThrows.forEach(throwNumber => {
            if (throwNumber.classList.contains("active")) {
                throwNumber.classList.toggle("active")
            }
        })
        this.throwDiceBtn.classList.toggle("disable");
        this.showDiceArea.innerHTML = '';
        this.fiveChoseDice = [];
    }

    renderRoundNumber() {
        this.round++;
        if (this.round <= 13) this.roundNumber.textContent = this.round;
    }

    endGame = () => {
        //check winner
        const playersScores = [this.specialRows[6].textContent * 1, this.specialRows[7].textContent * 1];
        const winner = playersScores[0] > playersScores[1] ? this.playersNames[0] : this.playersNames[1];
        const draw = (playersScores[0] === playersScores[1]);
        const points = winner === this.playersNames[0] ? playersScores[0] : playersScores[1];
        //reset and show who won
        if (!draw) {
            alert(`Wygrał gracz: ${winner} i uzyskał ${points} punktów. Gratulacje!`);
        } else {
            alert("W grze wystąpił remis! Gratulacje dla obydwu graczy!");
        }
        this.startPanel.style.display = "flex";
        this.wrapper.style.display = "none";
        //clear round and statistics table
        this.round = 1;
        this.statisticsTable.clearTableAfterLastRound(this.firstColumn, this.secondColumn);
    }

    showEndGame() {
        if (this.round > 13) {
            setTimeout(this.endGame, 2000);
            this.computer.clearUsedIndex();
        }
    }
}

new Game();