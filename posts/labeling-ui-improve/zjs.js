let debugVerbose = false;

const eComplete = document.getElementById('btnImageComplete');
const eLWrapCard = document.getElementsByClassName('wrapCard');
const eLRects = document.getElementsByClassName('draw-object');
const eCusUITagListWrapper = document.createElement('div');
const eCusUITagLists = new Array();
// const eCustUITagListClass = 
const nbFrames = 50;  // number of frames in original UI
for (let i; i<nbFrames; i++) {
    eCusUITagLists.push(document.createElement('div'));
}

let keysPressed = {};
const resolution = ['size_400', 'size_800', 'size_1600'];
// try {
//     const originFillColor = eLRects[0].style.fillColor // what if when eLRects === none ?
// } catch {
//     const originFillColor = 'green';
// }
const originFillColor = 'green';

const fillColor = {
    // clothes:"",
    // glasses:"",
    'none':originFillColor,
    안경:"dodgerblue",
    모자:"yellow",
    가방:"red",
    우산:"purple"
}
let opacity = 0;//eRects[0].style.fillOpacity;
let strokeWidth = 0;
let toggleOpacity = 0.4;//true;//(e.style.fillOpacity > 0 ) ? 100. :
let toggleWidth = '5px';


function changeOpacity(x, assign=false) {
    memOpacity = (assign === false) ? opacity + x : x;
    eRects = eWrapCard.getElementsByClassName('draw-object');
    if (0 > memOpacity) {
        memOpacity = 0.;
    } else if (memOpacity > 100.) {
        memOpacity = 100.;
    }
    // console.log(`eRects.length ${eRects.length}`);
    // console.log(`eRects.length ${eLWrapCard.length}`);
    for (let i=0; i<eLWrapCard.length; i++){ 
        eWrapCard = eLWrapCard[i];
        // console.log('===========');
        // console.log(eWrapCard);
        eRects = eWrapCard.getElementsByClassName('draw-object');
        // console.log(`eRects.length ${eRects.length}`);
        if (eRects !== null && eRects.length !== 0) {
            for (let j=0; j<eRects.length; j++) {
                arect = eRects[j];
                title = arect.getAttribute('title');
                // console.log(`title:${title}`);                
                if (title !== undefined) {
                    regexResult = title.match('\= ([가-힣]+) \]');
                    try {
                        givenTag = regexResult[1];
                    } catch {
                        givenTag = 'none';
                    }
                    
                    console.log(`givenTag: ${givenTag}`);
                    arect.style.fill = fillColor[givenTag];
                } 
                arect.style.fillOpacity = memOpacity; 
            }
        } else {
            
            // console.log('idx:', i, 'no rect.');
        }
    }
    opacity = eLRects[0].style.fillOpacity;  // update global opacity from DOM
}

function changeWidth(x, assign=false) {
    memWidth = (assign === false) ? (width + x) +'px' : x + 'px';
    // if ()
    for (let i=0; i<eLRects.length; i++) {
        e = eLRects[i];
        e.style.strokeWidth = memWidth;        
    }
    strokeWidth = eLRects[0].style.strokeWidth;  // update global opacity from DOM
}

document.addEventListener('keydown', (event) => {
    keysPressed[event.keyCode] = true;
    if (debugVerbose === true) {
        console.log(keysPressed);
    }

    // change resolution
    if (keysPressed[18] && ( 49 <= event.keyCode && event.keyCode <= 51)) {
        page.fn.changeImageSize(resolution[event.keyCode - 49]);
    }
    // bounding box opacity, border
    else if (event.keyCode === 81) {  // q
        if (opacity != 0. || opacity === undefined) {
            changeOpacity(0., assign=true);
            changeWidth('0px', assign=true);
        } else {
            changeOpacity(toggleOpacity, assign=true);
            changeWidth(toggleWidth, assign=true);  // need to debug the func.
        }
    }
    else if (event.keyCode === 87) {  // w
        changeOpacity(-0.05, assign=false);
    }
    else if (event.keyCode === 69) {  // e
        // changeOpacity(0.05, assign=false);
        getObjTagName();
    }

});

document.addEventListener('keyup', (event) => {
    delete keysPressed[event.keyCode];
    if (debugVerbose === true) {
        console.log('keyup', keysPressed);
    }
});


function getObjTagName() {
    console.log('getObjTagName');
    for (let i=0; i<eLWrapCard.length; i++){ 
        eWrapCard = eLWrapCard[i];
        // console.log('===========');
        // console.log(eWrapCard);
        eRects = eWrapCard.getElementsByClassName('draw-object');
        // console.log(eRects);
        if (eRects !== null && eRects.length !== 0) {
            console.log('===========================');
            for (let j=0; j<eRects.length; j++) {
                arect = eRects[j];
                console.log('idx:',i,'j:',j, arect.getAttribute('title'));
            }
        } else {
            // console.log('idx:', i, 'no rect.');
        }
    }
}



var myWindow = window.open("", "", "width=200,height=400", "");  // if 4th param is set as "" then redundant popup window be prevented.
let e = {};  // just for debugging
let e2 = {};  // just for debugging

document.addEventListener('mouseover', function (event) {
    console.log(event.target);
    e = event.target;
    if (e.parentElement.tagName === undefined) {
        return;
    }
    while (e.parentElement.tagName !== 'LI') {
        e = e.parentElement;
        console.log(e.tagName);
    } e = e.parentElement;
    
    idx = Array.from(e.parentNode.children).indexOf(e)
    console.log('idx:', idx);

    strResult = '';
    eWrapCard = eLWrapCard[idx];
    console.log(`eWrapCard\n${eWrapCard}`);
    e2 = eWrapCard;
    // console.log('===========');
    // console.log(eWrapCard);
    eRects = eWrapCard.getElementsByClassName('draw-object');
    // console.log(eRects);
    if (eRects !== null && eRects.length !== 0) {
        // console.log('===========================');
        strResult += '<br>';
        strResult += '===========================';
        for (let j=0; j<eRects.length; j++) {
            arect = eRects[j];
            strResult += '<br>';
            strResult += `idx:${idx} j:${j} ${arect.getAttribute('title')}`;
        }
    } else {
        // console.log('idx:', i, 'no rect.');
    }
    console.log(strResult);
    myWindow.document.body.innerHTML = strResult;
}, false);