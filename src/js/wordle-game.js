// Wordle game logic
import { wordCheck } from './words.js';

export class WordleGame {
    constructor(mainGame) {
        this.mainGame = mainGame;
        this.hardMode = {
            active: 0,
            boxClicked: null,
        };
        this.guesses = [""];
        this.rowNum = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        this.currentGuess = 0;
        this.inputKids = document.getElementsByClassName("input");
        this.inputBox = document.getElementById("input-box");
    }

    clearInput() {
        for (let j = 0; j < 5; j++) {
            this.inputKids[j].value = "";
        }
        this.inputKids[0].focus();
    }

    hardModeCheck(word) {
        if (this.currentGuess === 0) {
            return true;
        }
        if (this.hardMode.boxClicked === null) {
            this.inputBox.setAttribute("class", "wrong");
            setTimeout(() => { this.inputBox.setAttribute("class", ""); }, 200);
            return false;
        } else {
            let greenLetters = ["", "", "", "", ""];
            let greenLettersCount = 0;
            let neededLetters = ["", "", "", "", ""];
            let neededLettersCount = 0;
            let noLetters = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
            let noLettersCount = 0;
            let hardRows = document.getElementsByClassName("row");
            
            for (let i = 0; i < hardRows.length; i++) {
                let hardRowLetters = hardRows[i].childNodes;
                for (let j = 1; j < hardRowLetters.length; j = j + 2) {
                    if (hardRowLetters[j].style.backgroundColor === "rgb(106,170,100)") {
                        // green
                        greenLetters[greenLettersCount] = hardRowLetters[j].textContent;
                        greenLettersCount++;
                    }
                    if (hardRowLetters[j].style.backgroundColor === "rgb(201,180,88)") {
                        // yellow
                        neededLetters[neededLettersCount] = hardRowLetters[j].textContent;
                        neededLettersCount++;
                    }
                    if (hardRowLetters[j].style.backgroundColor === "var(--darkgray)") {
                        noLetters[noLettersCount] = hardRowLetters[j].textContent;
                        noLettersCount++;
                    }
                }
            }
            return true;
        }
    }

    updateBoxes() {
        let tempEnteredWord = "";
        let rows = document.getElementsByClassName("row");
        
        for (let p = 0; p < 5; p++) {
            tempEnteredWord += this.inputKids[p].value;
        }
        
        const enteredWord = tempEnteredWord.toLowerCase();
        
        if (this.hardMode.active) {
            if (!this.hardModeCheck(enteredWord)) {
                return false;
            }
        }
        
        if (!wordCheck(enteredWord)) {
            this.shakeInputBox();
            return false;
        }

        // Change color of keyboard keys
        for (let p = 0; p < 5; p++) {
            for (let i = 0; i < 3; i++) {
                let row = rows[i];
                for (let j = 1; j < row.childNodes.length; j += 2) {
                    if ((this.inputKids[p].value).toLowerCase() === (row.childNodes[j].innerHTML).toLowerCase()) {
                        row.childNodes[j].style.backgroundColor = "var(--darkgray)";
                        row.childNodes[j].style.color = "white";
                    }
                }
            }
        }

        let wordles = document.getElementsByClassName("wordle");
        let words = document.getElementsByClassName(this.rowNum[this.currentGuess]);
        
        for (let i = 0; i < 9; i++) {
            let tempWord = this.mainGame.words[Math.floor(i / 3)][Math.floor(i % 3)];
            let correctCounter = 0;
            let greenLetters = ["", "", "", "", ""];
            
            // Check for exact matches (green)
            for (let j = 0; j < 5; j++) {
                words[i].childNodes[j].innerHTML = this.inputKids[j].value;
                words[i].childNodes[j].setAttribute("class", "letter guessed");
                
                if (tempWord[j] === (this.inputKids[j].value).toLowerCase()) {
                    greenLetters[j] = ".";
                    tempWord = tempWord.substring(0, j) + "." + tempWord.substring(j + 1);
                    words[i].childNodes[j].style.backgroundColor = "rgb(106, 170, 100)";
                    words[i].childNodes[j].style.border = "1px solid rgb(106, 170, 100)";
                    correctCounter += 1;
                }
            }
            
            // Check for partial matches (yellow)
            for (let p = 0; p < 5; p++) {
                for (let k = 0; k < 5; k++) {
                    if (k !== p && greenLetters[p] === "") {
                        if (tempWord[k] === (this.inputKids[p].value).toLowerCase()) {
                            tempWord = tempWord.substring(0, k) + "." + tempWord.substring(k + 1);
                            words[i].childNodes[p].style.backgroundColor = "rgb(201, 180, 88)";
                            words[i].childNodes[p].style.border = "1px solid rgb(201, 180, 88)";
                            k = k + 5;
                        }
                    }
                }
            }
            
            if (this.hardMode.boxClicked !== null) {
                this.updateKeyboard(this.hardMode.boxClicked);
            }
            
            // Check if word is complete
            if (correctCounter === 5) {
                this.mainGame.click(wordles[i], i);
                if (this.mainGame.done) {
                    return;
                }
            }
            correctCounter = 0;
        }
        
        this.currentGuess += 1;
        let rowID = this.rowNum[this.currentGuess];
        
        for (let i = 0; i < 9; i++) {
            let word = document.createElement("div");
            word.setAttribute("class", "word " + rowID);
            for (let j = 0; j < 5; j++) {
                let letter = document.createElement("div");
                letter.setAttribute("class", "letter");
                letter.setAttribute("maxlength", "1");
                word.appendChild(letter);
            }
            wordles[i].insertBefore(word, wordles[i].firstChild);
            if (((wordles[i].parentElement.style.border) === "8px solid var(--red)" || (wordles[i].parentElement.style.border) === "8px solid var(--blue)")) {
                wordles[i].firstChild.style.display = "none";
            }
        }
        
        this.clearInput();
        this.mainGame.turn += 1;

        // Auto-scroll all wordle boxes to show the most recent guess
        this.scrollBoxesToTop();

        if (this.mainGame.turn % 2 === 0) {
            this.inputBox.style.border = "4px solid var(--red)";
        } else {
            this.inputBox.style.border = "4px solid var(--blue)";
        }
    }

    updateKeyboard(box) {
        // This method would be implemented to update keyboard colors
        // Based on the letters used in the selected box
        console.log("Update keyboard for box:", box);
    }

    /**
     * Scroll all wordle boxes to show the most recent guess
     * Since boxes use column-reverse, scrolling to top shows newest content
     */
    scrollBoxesToTop() {
        const wordles = document.getElementsByClassName("wordle");
        for (let i = 0; i < wordles.length; i++) {
            // Smooth scroll to top to show the most recent guess
            wordles[i].scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    /**
     * Add shake animation to input box for invalid words
     */
    shakeInputBox() {
        const inputBox = this.inputBox;

        // Add shake class
        inputBox.classList.add('shake');

        // Remove shake class after animation completes
        setTimeout(() => {
            inputBox.classList.remove('shake');
        }, 500); // Match the animation duration
    }
}
