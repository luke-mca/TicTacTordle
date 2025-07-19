// Game logic for TicTacTordle
import { randomWord } from './words.js';
import { emptyCheck, isMobile } from './utils.js';

export class TicTacTordleGame {
    constructor() {
        this.board = [["", "", ""], ["", "", ""], ["", "", ""]];
        this.words = [
            [randomWord(), randomWord(), randomWord()],
            [randomWord(), randomWord(), randomWord()],
            [randomWord(), randomWord(), randomWord()]
        ];
        this.turn = 0;
        this.done = false;
        this.player1 = { mark: "X", wins: 0 };
        this.player2 = { mark: "O", wins: 0 };
    }

    click(box, i) {
        if ((this.turn % 2) === 0 && emptyCheck(box)) {
            box.parentElement.style.border = "8px solid var(--red)";
            box.parentElement.style.boxShadow = "0px 0px 0px var(--darkgray)";
            this.board[Math.floor(i / 3)][Math.floor(i % 3)] = this.player1.mark;
            this.winCheck(this.player1.mark);
            this.words[Math.floor(i / 3)][Math.floor(i % 3)] = ".....";
        }
        if ((this.turn % 2) === 1 && emptyCheck(box)) {
            box.parentElement.style.border = "8px solid var(--blue)";
            box.parentElement.style.boxShadow = "0px 0px 0px var(--darkgray)";
            this.board[Math.floor(i / 3)][Math.floor(i % 3)] = this.player2.mark;
            this.winCheck(this.player2.mark);
            this.words[Math.floor(i / 3)][Math.floor(i % 3)] = ".....";
        }
    }

    winCheck(mark) {
        if (this.turn < 4) return false;
        
        // Check rows
        if (this.board[0][0] === mark && this.board[0][1] === mark && this.board[0][2] === mark) { this.win(mark); }
        else if (this.board[1][0] === mark && this.board[1][1] === mark && this.board[1][2] === mark) { this.win(mark); }
        else if (this.board[2][0] === mark && this.board[2][1] === mark && this.board[2][2] === mark) { this.win(mark); }
        // Check columns
        else if (this.board[0][0] === mark && this.board[1][0] === mark && this.board[2][0] === mark) { this.win(mark); }
        else if (this.board[0][1] === mark && this.board[1][1] === mark && this.board[2][1] === mark) { this.win(mark); }
        else if (this.board[0][2] === mark && this.board[1][2] === mark && this.board[2][2] === mark) { this.win(mark); }
        // Check diagonals
        else if (this.board[0][0] === mark && this.board[1][1] === mark && this.board[2][2] === mark) { this.win(mark); }
        else if (this.board[0][2] === mark && this.board[1][1] === mark && this.board[2][0] === mark) { this.win(mark); }
        // Check for tie
        else if (this.board.every(row => row.every(cell => cell !== ""))) { this.win("tie"); }
    }

    win(player) {
        this.click = null;
        
        if (isMobile) {
            this.showMobileWinModal(player);
        } else {
            this.showDesktopWinModal(player);
        }
        
        this.done = true;
        this.revealRemainingWords();
    }

    showMobileWinModal(player) {
        const main = document.getElementById("main");
        const winDisplay = document.createElement("div");
        winDisplay.setAttribute("id", "win");
        
        if (player === "tie") {
            winDisplay.textContent = "Tie Game";
        } else if (player === "X") {
            winDisplay.textContent = "Red Wins!";
            winDisplay.style.borderColor = "var(--red)";
            this.player1.wins += 1;
        } else if (player === "O") {
            winDisplay.textContent = "Blue Wins!";
            winDisplay.style.borderColor = "var(--blue)";
            this.player2.wins += 1;
        }

        const closeButton = document.createElement("button");
        closeButton.innerHTML = `<svg fill="#000000" height="800px" width="800px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460.775 460.775">
            <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
        </svg>`;
        closeButton.setAttribute("class", "X");
        closeButton.addEventListener("click", () => {
            winDisplay.remove();
        });
        
        const newGameButton = document.createElement("button");
        newGameButton.innerHTML = "New Game";
        newGameButton.addEventListener("click", () => {
            location.reload();
        });
        
        winDisplay.appendChild(closeButton);
        winDisplay.appendChild(newGameButton);
        main.appendChild(winDisplay);
    }

    showDesktopWinModal(player) {
        const main = document.getElementById("header");
        const winDisplay = document.createElement("div");
        winDisplay.setAttribute("id", "win-non-mobile");
        
        if (player === "tie") {
            winDisplay.textContent = "Tie Game";
        } else if (player === "X") {
            winDisplay.textContent = "Red Wins!";
            winDisplay.style.borderColor = "var(--red)";
            this.player1.wins += 1;
        } else if (player === "O") {
            winDisplay.textContent = "Blue Wins!";
            winDisplay.style.borderColor = "var(--blue)";
            this.player2.wins += 1;
        }
        
        main.insertBefore(winDisplay, main.childNodes[2]);
    }

    revealRemainingWords() {
        const wordles = document.getElementsByClassName("wordle");
        for (let i = 0; i < 9; i++) {
            const wordle = wordles[i];
            const word = wordle.childNodes[0];
            if (this.board[Math.floor(i / 3)][Math.floor(i % 3)] === "") {
                for (let j = 0; j < 5; j++) {
                    word.childNodes[j].innerHTML = (this.words[Math.floor(i / 3)][Math.floor(i % 3)])[j];
                    word.childNodes[j].style.backgroundColor = "rgb(106, 170, 100)";
                    word.childNodes[j].style.border = "1px solid rgb(106, 170, 100)";
                    word.childNodes[j].style.color = "var(--white)";
                }
            }
        }
    }

    initializeBoard() {
        const boxes = document.getElementsByClassName("wordle");
        for (let i = 0; i < 9; i++) {
            const row = document.createElement("div");
            row.setAttribute("class", "word a");
            for (let j = 0; j < 5; j++) {
                const letter = document.createElement("div");
                letter.setAttribute("maxlength", "1");
                letter.setAttribute("class", "letter");
                row.appendChild(letter);
            }
            boxes[i].appendChild(row);
        }
    }

    setupNewGameButton() {
        const newGame = document.getElementById("new-game");
        newGame.addEventListener("click", () => {
            location.reload();
        });
    }
}
