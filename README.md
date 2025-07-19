# TicTacTordle

A unique combination of two popular games: **Tic Tac Toe** and **Wordle**!

## 🎮 How to Play

- Play Wordle in 9 boxes simultaneously
- First player to win 3 Wordles in a row (horizontally, vertically, or diagonally) wins the game
- Take turns guessing 5-letter words
- Use standard Wordle color coding:
  - 🟩 Green: Correct letter in correct position
  - 🟨 Yellow: Correct letter in wrong position
  - ⬜ Gray: Letter not in the word

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- A modern web browser

### Installation

1. Clone the repository:
```bash
git clone https://github.com/luke-mca/TicTacTordle.git
cd TicTacTordle
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Alternative: Quick Start
You can also run the game directly by opening `index.html` (root) or `public/index.html` in your browser.

## 📁 Project Structure

```
TicTacTordle/
├── src/
│   ├── css/
│   │   ├── main.css          # Main CSS file (imports all others)
│   │   ├── fonts.css         # Font definitions
│   │   ├── variables.css     # CSS custom properties
│   │   ├── base.css          # Base styles and layout
│   │   ├── header.css        # Header component styles
│   │   ├── game-board.css    # Game board and wordle grid styles
│   │   ├── keyboard.css      # Keyboard and input styles
│   │   └── components.css    # UI components (buttons, modals, etc.)
│   └── js/
│       ├── main.js           # Application entry point
│       ├── game.js           # Tic-tac-toe game logic
│       ├── wordle-game.js    # Wordle game logic
│       ├── keyboard.js       # Keyboard and input handling
│       ├── ui-components.js  # Settings, help, and other modals
│       ├── words.js          # Word lists and validation
│       └── utils.js          # Utility functions
├── assets/
│   ├── fonts/               # Font files
│   ├── icons/               # SVG icons
│   └── images/              # Image assets
├── public/
│   └── index.html           # Main HTML file (structured serving)
├── index.html               # Root HTML file (for easy access)
├── docs/                    # Documentation
├── package.json
├── .gitignore
└── README.md
```

## 🛠️ Development

### Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Technologies Used

- **Vanilla JavaScript** (ES6 modules)
- **CSS3** (with custom properties)
- **HTML5**
- **Node.js** (for development tools)

## 🎯 Features

- ✅ Responsive design (works on desktop and mobile)
- ✅ Dark mode toggle
- ✅ Clean, modular code architecture
- ✅ Accessible keyboard navigation
- ✅ Real-time game state management
- ✅ Win detection and celebration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎮 Play Online

Visit the live game at: https://luke-mca.github.io/TicTacTordle/

## 📧 Contact

For feedback or questions, reach out to: mcluke2004@gmail.com

---

Enjoy playing TicTacTordle! 🎉
