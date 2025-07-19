// Utility functions

// Device detection
export const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Check if a box is empty (for tic-tac-toe)
export function emptyCheck(box) {
    if (box.textContent === "X" || box.textContent === "O") {
        return false;
    } else {
        return true;
    }
}

// Apply mobile-specific styling
export function applyMobileStyles() {
    if (isMobile) {
        const title = document.getElementById("title");
        title.style.fontFamily = "mobileTitleFont";
        
        const root = document.querySelector(':root');
        root.style.fontFamily = "textFont";
        
        const buttons = document.querySelectorAll('.row>button');
        buttons.forEach((button) => {
            button.style.fontFamily = "textFont";
        });
    }
}

// Focus management for input fields
export function manageFocus(inputKids) {
    document.addEventListener("keydown", (event) => {
        let inputFocus = 1;
        for (let i = 0; i < 5; i++) {
            if (inputKids[i] === document.activeElement) {
                inputFocus = 0;
            }
        }
        if (inputFocus) {
            for (let i = 0; i < 5; i++) {
                if (inputKids[i].value === "") {
                    inputKids[i].focus();
                    i = i + 5;
                    inputFocus = 0;
                }
            }
            if (inputFocus) {
                inputKids[4].focus();
            }
        }
    });
}
