class Game {
    constructor() {
        this.player = new Player();

        const startGameBtn = document.querySelector(".start_game");

        startGameBtn.addEventListener("click", () => this.startGame(startGameBtn));
    }

    startGame(startGameBtn) {
        startGameBtn.style.display = "none";
        const numberOfPlayers = this.player.numberOfPlayers();
        const playersNames = this.player.playersNames(numberOfPlayers);
        console.log(numberOfPlayers, playersNames);
    }
}

const game = new Game();