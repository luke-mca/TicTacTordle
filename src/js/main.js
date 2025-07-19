// Main application entry point
import { TicTacTordleGame } from './game.js';
import { WordleGame } from './wordle-game.js';
import { KeyboardHandler } from './keyboard.js';
import { UIComponents } from './ui-components.js';
import { applyMobileStyles, manageFocus } from './utils.js';

class TicTacTordleApp {
    constructor() {
        this.game = null;
        this.wordleGame = null;
        this.keyboardHandler = null;
        this.uiComponents = null;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeGame());
        } else {
            this.initializeGame();
        }
    }

    initializeGame() {
        // Apply mobile-specific styles
        applyMobileStyles();

        // Initialize game instances
        this.game = new TicTacTordleGame();
        this.wordleGame = new WordleGame(this.game);
        this.keyboardHandler = new KeyboardHandler(this.wordleGame);
        this.uiComponents = new UIComponents(this.wordleGame, this.keyboardHandler);

        // Initialize the game board
        this.game.initializeBoard();
        this.game.setupNewGameButton();

        // Set up input focus management
        const inputKids = document.getElementsByClassName("input");
        manageFocus(inputKids);

        // Initialize random turn
        this.keyboardHandler.initializeRandomTurn();

        // Focus on first input
        if (inputKids.length > 0) {
            inputKids[0].focus();
        }

        console.log('TicTacTordle game initialized successfully!');
    }
}

// Initialize the application
const app = new TicTacTordleApp();
