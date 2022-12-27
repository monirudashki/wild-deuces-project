export function buttonTurnOff(button) {
    button.style.backgroundColor = "Grey";
    button.disabled = true;
}

export function buttonTurnOn(button) {
    button.style.backgroundColor = "Blue";
    button.disabled = false;
}