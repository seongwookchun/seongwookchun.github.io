eComplete = document.querySelector('#btnImageComplete');
eBtnSave = document.querySelector('#btnImageTempSave');
// delete all
eBtnDeleteAll = document.querySelector('#ui-id-134 > button:nth-child(2)');
eBtnCommentConfirm = document.querySelector('#alertModalBtnConfirm');


const tagValues = {
    clothes: ['', 'hat', 'bag', 'glasses', 'unbrella']
}


const keysPressed = {}
// debugging during server disfunction
document.addEventListener('keydown', (event) => {
    keysPressed[event.keyCode] = true;
    console.log(keysPressed);

    if (keysPressed[16] && event.keyCode === 90) {  // z
        eBtnSave.click();
    } 
    else if (keysPressed[16] && event.keyCode === 88) {  // x
        eComplete.click();
        workCounterInc();
    }
    
    else if (keysPressed[16] && event.keyCode === 68) {  // d
        // eBtnDeleteAll.click();
        page.fn.deleteAllObject();
    }


    else if (keysPressed[16] && event.keyCode === 32) {  // shift + space
        eBtnCommentConfirm.click();
    } 
});

document.addEventListener('keyup', (event) => {
    delete keysPressed[event.keyCode];
    console.log(keysPressed);
});




// open drop down
// https://johnnblade.wordpress.com/2015/03/03/open-or-exspand-dropdown-with-javascript/
let eSelect = document.querySelector('select.tagInput');

window.openDropdown = function (str) {
    var dropdown = eSelect;//document.getElementById('eSelect');
    var event;
    event = document.createEvent('MouseEvents');
    event.initMouseEvent('mousedown', true, true, window);
    dropdown.dispatchEvent(event);
}