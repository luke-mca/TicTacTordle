// Keyboard and input handling
export class KeyboardHandler {
    constructor(wordleGame) {
        this.wordleGame = wordleGame;
        this.inputKids = document.getElementsByClassName("input");
        this.keyParents = document.getElementsByClassName("row");
        this.setupKeyboardEvents();
        this.setupInputEvents();
    }

    setupInputEvents() {
        // Handle keydown events for input navigation
        for (let i = 0; i < 4; i++) {
            this.inputKids[i].addEventListener("keydown", (event) => {
                if (event.key === "Enter") { return false; }
                if (event.key === "Backspace") { return false; }
                if (event.key === "Tab") { return false; }
                
                let tempNum = this.inputKids[i].value.charCodeAt(0);
                if ((tempNum < 91 && tempNum > 64) || (tempNum < 123 && tempNum > 96)) {
                    this.inputKids[i + 1].focus();
                }
            });
        }

        // Handle Enter key for submitting guesses
        for (let i = 0; i < 5; i++) {
            this.inputKids[i].addEventListener("keyup", (event) => {
                if (event.key === "Enter") {
                    this.wordleGame.updateBoxes();
                }
            });
        }

        // Handle backspace navigation
        for (let i = 1; i < 5; i++) {
            this.inputKids[i].addEventListener("keydown", (event) => {
                if (event.key === "Backspace") {
                    if (this.inputKids[i].value === "") {
                        this.inputKids[i - 1].focus();
                    }
                }
            });
        }

        // Special case for last input
        this.inputKids[4].addEventListener("keydown", (event) => {
            if (event.key === "Backspace" && this.inputKids[4].value === "") {
                this.inputKids[3].focus();
            }
        });
    }

    setupKeyboardEvents() {
        for (let i = 0; i < 3; i++) {
            let row = this.keyParents[i].childNodes;
            for (let j = 1; j < row.length; j += 2) {
                row[j].addEventListener("click", () => {
                    let letterBox;
                    let letterBoxNum;
                    
                    // Find the next empty input box
                    for (let k = 0; k < 5; k++) {
                        if (this.inputKids[k].value === "") {
                            letterBox = this.inputKids[k];
                            letterBoxNum = k;
                            k += 5;
                        } else {
                            letterBoxNum = 5;
                        }
                    }
                    
                    // Handle special keys
                    if (i === 2 && j === 1) {
                        // Enter key
                        this.wordleGame.updateBoxes();
                    } else if (i === 2 && j === 17) {
                        // Delete key
                        if (this.inputKids[letterBoxNum - 1] !== undefined) {
                            this.inputKids[letterBoxNum - 1].value = "";
                        }
                    } else {
                        // Regular letter key
                        if (letterBox !== undefined) {
                            letterBox.value = row[j].innerHTML;
                        }
                    }
                });
            }
        }
    }

    updateKeys(letter, color) {
        for (let i = 0; i < 3; i++) {
            let row = this.keyParents[i].childNodes;
            for (let j = 1; j < row.length; j += 2) {
                if (row[j].innerHTML === letter.toUpperCase()) {
                    if (color === "var(--darkgray)") {
                        if (!(row[j].style.backgroundColor === "rgb(201, 180, 88)" || row[j].style.backgroundColor === "rgb(106, 170, 100)")) {
                            row[j].style.backgroundColor = color;
                        }
                    }
                    if (color === "rgb(201, 180, 88)") { // yellow
                        if (!(row[j].style.backgroundColor === "rgb(106, 170, 100)")) {
                            row[j].style.backgroundColor = color;
                        }
                    }
                    if (color === "rgb(106, 170, 100)") { // green
                        row[j].style.backgroundColor = color;
                    }
                }
            }
        }
    }

    resetKeys() {
        for (let i = 0; i < 3; i++) {
            let row = this.keyParents[i].childNodes;
            for (let j = 1; j < row.length; j += 2) {
                row[j].style.backgroundColor = "var(--gray)";
            }
        }
    }

    updateKeyboard(box) {
        if (box.parentElement.style.backgroundColor !== "") {
            let words = box.childNodes;
            for (let p = 0; p < words.length; p++) {
                let letters0 = words[p].childNodes;
                for (let q = 0; q < 5; q++) {
                    if (letters0[q].style.backgroundColor === "rgb(106, 170, 100)") {
                        this.updateKeys(letters0[q].innerHTML, "rgb(106, 170, 100)");
                    }
                }
            }
        }
        
        let kids = box.childNodes;
        for (let j = 0; j < kids.length; j++) {
            let letters = kids[j].childNodes;
            for (let k = 0; k < 5; k++) {
                if (letters[k].style.backgroundColor === "rgb(201, 180, 88)") {
                    this.updateKeys(letters[k].innerHTML, "rgb(201, 180, 88)");
                } else if (letters[k].style.backgroundColor === "") {
                    this.updateKeys(letters[k].innerHTML, "var(--darkgray)");
                }
            }
        }
        
        for (let j = 0; j < kids.length; j++) {
            let letters = kids[j].childNodes;
            for (let k = 0; k < 5; k++) {
                if (letters[k].style.backgroundColor === "rgb(106, 170, 100)") {
                    this.updateKeys(letters[k].innerHTML, "rgb(106, 170, 100)");
                }
            }
        }
    }

    initializeRandomTurn() {
        const inputBox = document.getElementById("input-box");
        if ((Math.random() * 2) > 1) {
            inputBox.style.border = "4px solid var(--blue)";
            this.wordleGame.mainGame.turn += 1;
        }
    }
}
