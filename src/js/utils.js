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
        // Apply mobile title font
        const title = document.getElementById("title");
        if (title) {
            title.style.fontFamily = "mobileTitleFont, Arial, sans-serif";
        }

        // Apply text font to body and common elements
        document.body.style.fontFamily = "textFont, Arial, sans-serif";

        // Apply font to keyboard buttons
        const buttons = document.querySelectorAll('.row>button');
        buttons.forEach((button) => {
            button.style.fontFamily = "textFont, Arial, sans-serif";
        });

        // Apply font to input fields
        const inputs = document.querySelectorAll('.input');
        inputs.forEach((input) => {
            input.style.fontFamily = "textFont, Arial, sans-serif";
        });

        // Prevent zoom on input focus (common mobile issue)
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
        }
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
