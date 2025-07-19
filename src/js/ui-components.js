// UI Components - Settings, Help, and other modals
import { isMobile } from './utils.js';

export class UIComponents {
    constructor(wordleGame, keyboardHandler) {
        this.wordleGame = wordleGame;
        this.keyboardHandler = keyboardHandler;
        this.displayMode = "light";
        this.settingsExist = false;
        this.helpExist = false;
        this.setupEventListeners();
        this.setupBoxClickHandlers();
    }

    setupEventListeners() {
        const settingsButton = document.getElementById("SETTINGS");
        const helpButton = document.getElementById("HELP");

        settingsButton.addEventListener("click", () => {
            this.toggleSettings();
        });

        helpButton.addEventListener("click", () => {
            this.toggleHelp();
        });
    }

    setupBoxClickHandlers() {
        const realBoxes = document.getElementsByClassName("box");
        const boxes = document.getElementsByClassName("wordle");

        for (let i = 0; i < 9; i++) {
            realBoxes[i].addEventListener("click", () => {
                // Reset all box shadows
                for (let j = 0; j < 9; j++) {
                    realBoxes[j].style.boxShadow = "0px 0px 0px var(--darkgray)";
                }

                this.wordleGame.hardMode.boxClicked = boxes[i];

                if (realBoxes[i].style.border !== "8px solid var(--red)" && realBoxes[i].style.border !== "8px solid var(--blue)") {
                    this.setBoxShadow(realBoxes[i], i);
                }

                this.keyboardHandler.resetKeys();
                this.keyboardHandler.updateKeyboard(boxes[i]);
            });
        }
    }

    setBoxShadow(box, index) {
        const shadows = [
            "-6px -6px 0px -4px var(--darkgray) inset",
            "-6px -6px 0px -4px var(--darkgray) inset, 6px -4px 0px -4px var(--darkgray) inset",
            "6px -6px 0px -4px var(--darkgray) inset",
            "-6px -6px 0px -4px var(--darkgray) inset, -4px 6px 0px -4px var(--darkgray) inset",
            "-6px -6px 0px -4px var(--darkgray) inset, 6px 6px 0px -4px var(--darkgray) inset",
            "6px -6px 0px -4px var(--darkgray) inset, 4px 6px 0px -4px var(--darkgray) inset",
            "-6px 6px 0px -4px var(--darkgray) inset",
            "-6px 6px 0px -4px var(--darkgray) inset, 6px 4px 0px -4px var(--darkgray) inset",
            "6px 6px 0px -4px var(--darkgray) inset"
        ];
        
        if (shadows[index]) {
            box.style.boxShadow = shadows[index];
        }
    }

    toggleSettings() {
        this.removeExistingModals();
        
        if (this.settingsExist) {
            this.settingsExist = false;
            this.helpExist = false;
        } else {
            this.settingsExist = true;
            this.showSettingsModal();
        }
    }

    toggleHelp() {
        this.removeExistingModals();
        
        if (this.helpExist) {
            this.helpExist = false;
            this.settingsExist = false;
        } else {
            this.helpExist = true;
            this.showHelpModal();
        }
    }

    removeExistingModals() {
        const existingModals = document.getElementsByClassName("settings");
        for (let i = existingModals.length - 1; i >= 0; i--) {
            existingModals[i].remove();
        }
    }

    showSettingsModal() {
        const main = document.getElementById("main");
        const settingsDisplay = document.createElement("div");
        settingsDisplay.setAttribute("class", "settings");

        if (isMobile) {
            settingsDisplay.style.width = "min(40vw, 400px)";
            settingsDisplay.style.height = "40vh";
            settingsDisplay.style.fontWeight = "400";
        }

        // Settings title
        const settingsTitle = document.createElement("div");
        settingsTitle.textContent = "Settings";
        settingsTitle.setAttribute("class", "setTitle");
        settingsTitle.style.fontWeight = "600";
        settingsDisplay.appendChild(settingsTitle);

        // Dark mode toggle
        const darkModeDiv = this.createDarkModeToggle();
        settingsDisplay.appendChild(darkModeDiv);

        // Feedback section
        const feedbackDiv = this.createFeedbackSection();
        settingsDisplay.appendChild(feedbackDiv);

        // Close button
        const closeButton = this.createCloseButton(() => {
            settingsDisplay.remove();
            this.settingsExist = false;
        });
        settingsDisplay.appendChild(closeButton);

        main.appendChild(settingsDisplay);
    }

    createDarkModeToggle() {
        const switchDiv = document.createElement("div");
        switchDiv.setAttribute("class", "settings-main");
        
        const switchDivText = document.createElement("div");
        switchDivText.textContent = "Dark Mode";
        
        const switchMode = document.createElement("label");
        switchMode.setAttribute("class", "switch");
        
        const switchType = document.createElement("input");
        switchType.setAttribute("type", "checkbox");
        
        if (this.displayMode === "dark") {
            switchType.setAttribute("checked", "true");
        }
        
        switchType.addEventListener("click", () => {
            this.toggleDarkMode();
        });

        const switchSpan = document.createElement("span");
        switchSpan.setAttribute("class", "slider round");
        
        switchMode.appendChild(switchType);
        switchMode.appendChild(switchSpan);
        switchDiv.appendChild(switchDivText);
        switchDiv.appendChild(switchMode);
        
        return switchDiv;
    }

    createFeedbackSection() {
        const feedbackDiv = document.createElement("div");
        feedbackDiv.setAttribute("class", "settings-main");
        
        const feedbackText = document.createElement("div");
        feedbackText.textContent = "Feedback";
        
        const feedbackLink = document.createElement("a");
        feedbackLink.setAttribute("href", "mailto:mcluke2004@gmail.com");
        feedbackLink.textContent = "Email";
        feedbackLink.style.textDecoration = "underline";
        
        feedbackDiv.appendChild(feedbackText);
        feedbackDiv.appendChild(feedbackLink);
        
        return feedbackDiv;
    }

    showHelpModal() {
        const main = document.getElementById("main");
        const helpDisplay = document.createElement("div");
        helpDisplay.setAttribute("class", "settings");

        if (isMobile) {
            helpDisplay.style.width = "min(50vw, 500px)";
            helpDisplay.style.height = "50vh";
            helpDisplay.style.fontWeight = "400";
        }

        // Help title
        const helpTitle = document.createElement("div");
        helpTitle.textContent = "How To Play";
        helpTitle.style.fontWeight = "900";
        helpTitle.setAttribute("class", "setTitle");
        helpDisplay.appendChild(helpTitle);

        // Help content
        const helpTexts = [
            "Combination of popular games, Tic Tac Toe and Wordle.",
            "Play Wordle in 9 boxes at the same time.",
            "First to win 3 Wordles in a row wins, like Tic Tac Toe."
        ];

        helpTexts.forEach(text => {
            const helpDiv = document.createElement("div");
            helpDiv.textContent = text;
            helpDiv.setAttribute("class", "settings-main");
            helpDisplay.appendChild(helpDiv);
        });

        // Close button
        const closeButton = this.createCloseButton(() => {
            helpDisplay.remove();
            this.helpExist = false;
        });
        helpDisplay.appendChild(closeButton);

        main.appendChild(helpDisplay);
    }

    createCloseButton(clickHandler) {
        const closeButton = document.createElement("button");
        closeButton.innerHTML = `<svg fill="#000000" height="800px" width="800px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460.775 460.775">
            <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
        </svg>`;
        closeButton.setAttribute("class", "X");
        closeButton.addEventListener("click", clickHandler);
        return closeButton;
    }

    toggleDarkMode() {
        if (this.displayMode === "light") {
            document.documentElement.style.setProperty("--SVGblack", "white");
            document.documentElement.style.setProperty("--gray", "rgb(120, 124, 126)");
            document.documentElement.style.setProperty("--darkgray", "rgb(80, 80, 80)");
            document.documentElement.style.setProperty("--white", "rgb(50, 50, 50)");
            document.documentElement.style.setProperty("--black", "white");
            document.documentElement.style.setProperty("--red", "rgb(170, 0, 0)");
            document.documentElement.style.setProperty("--blue", "rgb(0, 0, 170)");
            this.displayMode = "dark";
        } else {
            document.documentElement.style.setProperty("--SVGblack", "black");
            document.documentElement.style.setProperty("--darkgray", "rgb(120, 124, 126)");
            document.documentElement.style.setProperty("--gray", "rgb(211, 214, 218)");
            document.documentElement.style.setProperty("--black", "black");
            document.documentElement.style.setProperty("--white", "white");
            document.documentElement.style.setProperty("--red", "rgb(241, 131, 131)");
            document.documentElement.style.setProperty("--blue", "rgb(134, 134, 226)");
            this.displayMode = "light";
        }
    }
}
