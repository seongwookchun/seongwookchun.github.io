eComplete = document.getElementById('btnImageComplete');

let keysPressed = {};
const tagValues = {
    clothes: ['', 'hat', 'bag', 'glasses', 'unbrella']
}


document.addEventListener('keydown', (event) => {
    keysPressed[event.keyCode] = true;
    console.log(keysPressed);
    if (keysPressed[16] && event.keyCode === 90) {  // z
        eComplete.click();
    } 
    else if (keysPressed[16] && event.keyCode === 88) {  // z
        eAlertBtn = document.getElementById('alertModalBtnConfirm');
        eAlertBtn.click();
    } 
    
});

document.addEventListener('keyup', (event) => {
    delete keysPressed[event.keyCode];
    console.log(keysPressed);
});