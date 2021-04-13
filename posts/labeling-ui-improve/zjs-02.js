myWindow = window.open("", "", "width=400,height=600", "");  // if 4th param is set as "" then redundant popup window be prevented.
renderMyWindow();
////////////////////////////////////////////////
// elements
eWrapBody = document.querySelector('.wrap.body');
eBtnAllPass = document.querySelector('body > div.wrap.footer > div.searchResult > button');
eBtnNewReviewAssign = document.querySelector('body > div.wrap.footer > div.controls > button');
// ?children elements are automatically updated by lazy loading
eLIs = document.getElementsByClassName('ul > li');
eLWrapCards = document.getElementsByClassName('wrapCard');
eLRects = document.querySelectorAll('svg rect');
eUIOpacity = document.querySelector('#txtOpacity');
eLBtnSave = document.querySelectorAll('.btn-save.save.setTooltip')
eBtnAllPass = document.querySelector('#btnAllPass');
eBtnLoadNewImgs = document.querySelector('body > div.wrap.footer > div.controls > button');
eSwchToggleBdbx = myWindow.document.querySelector('#swch-toggle-bdbx');
eLTextarea = document.querySelectorAll('textarea');
// let counterPageLoad = 0;
// counterPageLoad += 1;
// console.log(counterPageLoad);  // not updated by lazy loading


// constants
const resolution = ['size_400', 'size_800', 'size_1600'];
const fillColor = {
    none : 'green',
    default : '#02A676',
    안경 : "dodgerblue",
    모자 : "yellow",
    가방 : "red",
    우산 : "purple",
    //
    책상 : "cyan",
    의자 : "magenta",
    책 : "red",
    // peoplay 돌고래
    // 사람 : "green",  // affluenced by none green
    보트 : "red",
}


// keyevents
keysPressed = {};
document.addEventListener('keydown', (event) => {
    keysPressed[event.keyCode] = true;
    console.log(`keydown ${event.keyCode}`);

    if (event.keyCode === 81) {  // q
        updCntEntireObj();
        console.log(`before plz updCntEntireObj`);
        toggleOpacity();
        console.log(`plz updCntEntireObj`);
        toggleSwchTgBdbx();
    }
    // changeOpacity(-0.05, assign=false);
    else if (event.keyCode === 87) {  // w
        // console.log(`eLWrapCards.length ${eLWrapCard.length}`);
        appendEventToCards();
    } 
    // 
    else if (event.keyCode === 69) {  // e
        toggleComments();
    } 
    else if (event.keyCode === 82) {  // r
        toggleOpacity(ifCustColor=false);
    } 
    // change resolution
    else if (keysPressed[18] && 
        ( 49 <= event.keyCode && event.keyCode <= 51)) {
        page.fn.changeImageSize(resolution[event.keyCode - 49]);
    }

    // pass all and load new images
    else if (keysPressed[16] && event.keyCode === 90) {
        eBtnAllPass.click();
    }
    else if (keysPressed[16] && event.keyCode === 88) {
            eBtnLoadNewImgs.click();
    }

    // frequent comments
    else if (keysPressed[192] && 
        (49 <= event.keyCode && event.keyCode <= 57)) {
        idx = event.keyCode - 49;
        putFreqComment(idx);
    }

    // auto scroll
    else if (event.keyCode === 70) {  // f
        autoScroll(400,);
    } 
    else if (event.keyCode === 71) {  // g
        autoScroll(-400,);
    } 
    else if (event.keyCode === 68) {  // s
        flagAuScrollIntoView *= -1
        autoScrollIntoView();
    } 
    else if (event.keyCode === 83) {  // d
        flagAuScrollIntoView *= -1
        autoScrollIntoView();
    }

    // scrollIntoView to adjacent images
    else if (event.keyCode === 83) {  // d
        flagAuScrollIntoView *= -1
        autoScrollIntoView();
    } 
    else if (event.keyCode === 51) {  // 3
        idx = Math.max(0, idxScrollIntoViewAdjImg -1);
        eLWrapCards[idx].scrollIntoView();
    } 
    else if (event.keyCode === 52) {  // 4
        idx = Math.min(idxScrollIntoViewAdjImg -1, eLWrapCards.length);
        eLWrapCards[idx].scrollIntoView();
    } 
});
let idxScrollIntoViewAdjImg = 0
document.addEventListener('keyup', (event) => {
    delete keysPressed[event.keyCode];
    console.log(keysPressed);
});

///////////////////////////////////////////////////////////
// functions
// for debug/test : querySelectorAll gives updated children elements inside a element.
// function insideEachWrapCards(e) {
//     let cnt = 0;
//     for (let i=0; i < e.length; i++) {
//         cnt += e[i].querySelectorAll('svg rect').length;
//     }
//     console.log(cnt);
// }
// to assign a proper value because
// every opacity is empty string when first loading of the page

function toggleComments() {
    eL = document.querySelectorAll('button.material-icons.fail.setTooltip');
    for (let i=0; i<eL.length; i++) {
        e = eL[i];
        e.click();
    }
}

function initOpacity(e) {
    let memOpacity = getUIOpacity();
    for (let i=0; i<e.length; i++) {
        if (e[i].style.fillOpacity === '') {
            e[i].style.fillOpacity = memOpacity;
        }
    }
}

function updateELRects() {
    e = document.querySelectorAll('svg rect');
    initOpacity(e);
    return e;
}

let stateToggle = true;
function toggleOpacity(ifCustColor=true) {  // grand parent element
    //(stateToggle === undefined) ? true : stateToggle;
    // let cnt = 0;
    let memOpacity = getUIOpacity();
    let tempOpacity = '';
    let e = updateELRects();

    if (stateToggle === true) {// || cnt === 0) {
        tempOpacity = 0;
        stateToggle = false;
    } else if (stateToggle === false) {
        tempOpacity = memOpacity;//getUIOpacity();
        stateToggle = true;
    }
    for (let i=0; i<e.length; i++) {
        // opacity = e[i].style.fillOpacity;
        // console.log(`eLRects.length ${eLRects.length} opacity ${opacity}`);
        // console.log(`typeof(opacity) ${typeof(opacity)}`);
        
        e[i].style.fillOpacity = tempOpacity;
        applyObjectColor(e[i], ifCustColor);
    }
    // cnt += 1
    // console.log(`cnt: ${cnt} opacity ${opacity}`);
}

function applyObjectColor(e, ifCustColor) {
    title = e.getAttribute('title');
    // console.log(`title:${title}`);
    if (ifCustColor === false) {
        givenTag = 'default';
    }
    else if (title !== undefined) {
        regexResult = title.match('\= ([가-힣]+) \]');
        try {
            givenTag = regexResult[1];
        } catch {
            givenTag = 'none';
        }
    }
    let selectedColor = fillColor[givenTag];
    console.log(`regex: ${givenTag} selected color: ${selectedColor}`);
    e.style.fill = selectedColor;
}

function getUIOpacity() {
    console.log(`eUIOpacity.innerText ${eUIOpacity.innerText}`);
    return eUIOpacity.innerText;
}

// function fillOriginColor() {

// }






function updateTextarea() {
    return document.querySelectorAll('li textarea');
}

function setTextarea(start, end, text) {
    e = updateTextarea()
    console.log(`setTextarea i${start} f${end}`)
    for (let i=start; i<end+1; i++) {
        t = e[i];//.querySelector('textarea');
        t.value = text;
    }
}

// ver2. not working well
// function setTextarea(arrayIndex, text) {
//     for (i in arrayIndex) {
//         console.log(`i ${i}`);
//         t = eLWrapCards[i].querySelector('textarea');
//         console.log(`t ${t}`);
//         console.log(`i ${i} element before content${t.value}`);
//         t.value = text;
//         console.log(`i ${i} element after content${t.value}`);
//     }
// }


function setCardNum(ele) {
    for (let i=0; i<ele.length; i++) {
        ele[i].innerHTML = `<div style="
                                font-size: 45px; 
                                display: inline;"><br>${i}
                                    </div>` + ele[i].innerHTML;
        // ele[i].innerHTML = ele[i].innerHTML;
    }
}

function sendMultipleFail(arr, cnt=0) {
    setTimeout(() => {
        if (cnt === 0) {
            // update eLBtnSave
            eLBtnSave = document.querySelectorAll('.btn-save.save.setTooltip');
            console.log(`sendMultipleFail eLBtnSave ${eLBtnSave}`);
            // for (let i=0; i<eLBtnSave.length; i++) {
            //     e = eLBtnSave[i];
            //     console.log(`eLBtnSave[${i}] : ${e}`);
            //     e.click();
            }
        
        if (arr.length > 0) {
            // do actions
            i = arr.shift();
            console.log(`i ${i} arr ${arr}`);
            eLBtnSave[i].click();

            // call next loop
            sendMultipleFail(arr, ++cnt);
            t = 250*Math.random() + 100;
            console.log(`multiple ${arr.length} / time interval ${t}`);
        }
    }, t)
}


function showCardIndex(es) {
    for (let i=0; i<es.length; i++) {
        child = es[i];
        parent = child.parentNode;
        idx = Array.prototype.indexOf.call(child,parent.children);
        console.log(`loop ${i} idx ${idx}`);
    }
}





////////////////////////////////////////////////////////////
///   frequent comments
///  
///  
///  
////////////////////////////////////////////////////////////
let freqComments = [
    '취득해주세요',
    '수정해주세요',
]
function putFreqComment(idx) {
    cpos = getInputSelection();
}
function getInputSelection(el) {
    var start = 0, end = 0, normalizedValue, range, textInputRange, len, endRange;

    if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
        start = el.selectionStart;
        end = el.selectionEnd;
    } else {
        range = document.selection.createRange();

        if (range && range.parentElement() == el) {
            len = el.value.length;
            normalizedValue = el.value.replace(/\r\n/g, "\n");

            // Create a working TextRange that lives only in the input
            textInputRange = el.createTextRange();
            textInputRange.moveToBookmark(range.getBookmark());

            // Check if the start and end of the selection are at the very end
            // of the input, since moveStart/moveEnd doesn't return what we want
            // in those cases
            endRange = el.createTextRange();
            endRange.collapse(false);

            if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                start = end = len;
            } else {
                start = -textInputRange.moveStart("character", -len);
                start += normalizedValue.slice(0, start).split("\n").length - 1;

                if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                    end = len;
                } else {
                    end = -textInputRange.moveEnd("character", -len);
                    end += normalizedValue.slice(0, end).split("\n").length - 1;
                }
            }
        }
    }

    return {
        start: start,
        end: end
    };
}


////////////////////////////////////////////////
// auto scroll

function autoScroll(dist, timeInterval=500.0) {
    prevScrollTop = eWrapBody.scrollTop;
    eWrapBody.scrollTop += dist;
    // cntAutoScrollCalls += 1;
    console.log(`scrollTop: ${eWrapBody.scrollTop}`);
    setTimeout(() => {
        if ( prevScrollTop !== eWrapBody.scrollTop ) {
            autoScroll(dist, timeInterval);
        }
        else {
            return true;
        }
    }, timeInterval)
}
let flagAuScrollIntoView = -1;
let autoScrollIntoViewIdx = 0;
function autoScrollIntoView(modeSkip=true) {
    if (flagAuScrollIntoView === 1) {
        setTimeout(() => {
            if (//(flagAuScrollIntoView === 1) && 
                (autoScrollIntoViewIdx < eLWrapCards.length -1)) {
                autoScrollIntoViewIdx += 1;
                if (modeSkip === true) {
                    numBox = eLWrapCards[autoScrollIntoViewIdx].
                                querySelectorAll('svg rect').
                                    length;
                    while (numBox === 0 &&
                        autoScrollIntoViewIdx < eLWrapCards.length -1) {
                        autoScrollIntoViewIdx += 1;
                        numBox = eLWrapCards[autoScrollIntoViewIdx].
                                        querySelectorAll('svg rect').
                                            length
                    }
                }
                if (numBox > 0) {
                    console.log(`scrollIntoView - idx: ${autoScrollIntoViewIdx}`)
                    eLWrapCards[autoScrollIntoViewIdx].scrollIntoView();
                }
            }
            if (autoScrollIntoViewIdx === eLWrapCards.length -1) {
                // initialize params
                flagAuScrollIntoView = -1;
                autoScrollIntoViewIdx = 0;  

                alert(`autoScrollIntoView finished.`);
                return 0;  // exit this function
            }
            // recursive
            autoScrollIntoView();
        }, 1000);
    }
}

// find images worked by specific user only
function getImgIdxDoneBy(userId) {
    const imgIdx = new Array();
    for (let i=0; i< eLWrapCards.length; i++) {
        e = eLWrapCards[i].querySelector('div.btns.leftTop.help.setTooltip');
        t = e.innerText;
        id = t.match(/작업자.+zum_internet_(\d+)/)[1];
        if (id === userId) {
            imgIdx.push(i);
        }
    }
    console.log(`getImgIdxDoneBy - idx by user ${userId}: ${imgIdx}`);
    return imgIdx;
}

//////////////////////////////////////////////////////
// automation
eLoadingImg = document.querySelector('#div_loading');
function waitLoading() {
    console.log('wait ...');
    setTimeout(() => {
        if (eLoadingImg.classList.contains('on') === false) {
            waitLoading();
        }
        else {
            return true;
        }}, 0.2);
}


function autonomousFlow() {
    // auto scroll
    if (autoScroll(400, 2) === true) {
        eWrapBody.scrollTop = 0;  // go to top of the page
    }
    // pass all
    eBtnAllPass.click();
    
    // load next images
    // if (checkIsLoading() === true) {
    if (waitLoading() === true) {
        eBtnLoadNewImgs.click();
    }
}

// get idx where rects exist more than one
const e2FocusedIdx = myWindow.document.querySelector('#focusedIdx');
// const e2idxToFix = myWindow.document.querySelector('#p-idx-to-fix');

function getIdxWithRect(userTarget) {
    const arrIdx = new Array();
    const arrIdxWithUserTarget = new Array();
    console.log(`getIdxWithRect - userTarget : ${userTarget}`);

    for (let i=0; i<eLWrapCards.length; i++) {
        nbRects = eLWrapCards[i].querySelectorAll('rect').length;
        e = eLWrapCards[i].querySelector('div.btns.leftTop.help.setTooltip');
        t = e.getAttribute('title');
        workerId = t.match(/작업자.+zum_internet_(\d+)/)[1];
        // console.log(workerId);
        if (nbRects > 0) {
            arrIdx.push(i);
            if (workerId === userTarget) {
                arrIdxWithUserTarget.push(i);
            }
        }
    }
    if (arrIdxWithUserTarget.length === 0) {
        arrIdxWithUserTarget.push('해당 없음.')
    }
    // e2idxToFix.innerText = arrIdxWithUserTarget;
    renderWin2IdxToFix(arrIdxWithUserTarget);
    return [arrIdx, arrIdxWithUserTarget];
}

eLBtnFixImg = document.querySelectorAll('div > div.linkToTool.btns.leftTop > button');
goFixImg = i => {
    console.log(`goFixImg - idx : ${i}`);
    eLWrapCards[i].scrollIntoView();
    eLBtnFixImg[i].click();
}
function renderWin2IdxToFix(arr) {
    e2idxToFix = myWindow.document.querySelector('#p-idx-to-fix');
    let html = '';
    for (let i=0; i<arr.length; i++) {
        html += `
                <span 
                    class="smallIdx"
                    onclick="window.opener.goFixImg(${arr[i]})" >
                        ${arr[i]}
                </span> &nbsp;
            ` 
    }
    
    e2idxToFix.innerHTML = html;
}

////////////////////////////////////////////////////////////
// popup window
function toggleSwchTgBdbx() {
    console.log(`before opac: ${eSwchToggleBdbx.style.opacity}`);
    eSwchToggleBdbx.style.opacity = (stateToggle === true) ? 1 : 0;
    console.log(`after opac: ${eSwchToggleBdbx.style.opacity}`);
}


function _countEntireObjects() {
    let e = updateELRects();
    let cnt = e.length;
    console.log(`_countEntireObjects`);
    return cnt;
}
function updCntEntireObj() {
    e = myWindow.document.querySelector('#cntEntireObj');
    e.innerText = _countEntireObjects();
}
function appendEventToCards() {
    eDispCardIndex = myWindow.document.querySelector('#dispCardIndex');
    // eDispChosenIndice = myWindow.document.querySelector('#dispCardIndex');
    let arrIndice = new Array();
    function _eCompIndexItem(i) {
        return (
            `<div>
            ${i}
                <button 
                    class="btn-index-delete" 
                    id="btn-delete-${i}"
                    onclick=">
                    X
                </button>
            </div>
        `)
    }
    function _apdEtCardsAction(i, ele) {
        eDispCardIndex.innerText = i;
        console.log(`click li event ${i}`);
        // eDispChosenIndice.innerText = 
        // eDispChosenIndice.appendChild(_eCompIndexItem(i));
    }

    // eLIs = document.getElementsByClassName('ul > li');
    for (let i=0; i<eLWrapCards.length; i++) {
        // e = eLIs[i];
        e = eLWrapCards[i];
        e.addEventListener('click', (event) => {
            _apdEtCardsAction(i);
        })
    }
    
};
appendEventToCards();
// (function testOuter() {
//     var var1 = 'outer var1';
//     let lvar1 = 'outer lvar1';
//     function _inner() {
//         console.log(`${var1} ${lvar1}`); // outer var1 outer lvar1

//     }
//     _inner();
// })()
function wrapFuncSetTextarea(i, f, cmt) {
    console.log(`wrapFuncSetTextarea has been called.`)
    // eCmtIdxS = myWindow.document.querySelector('#cmt-idx-s');
    // eCmtIdxE = myWindow.document.querySelector('#cmt-idx-e');
    // eCmtText = myWindow.document.querySelector('#cmt-text');
    // eCmtIdxS = window.document.querySelector('#cmt-idx-s');
    // eCmtIdxE = window.document.querySelector('#cmt-idx-e');
    // eCmtText = window.document.querySelector('#cmt-text');
    // i = eCmtIdxS.value;
    // f = eCmtIdxE.value;
    // cmt = eCmtText.value;
    setTextarea(i,f,cmt);
}

function wrapFuncSendComments(i, f) {
    // eSndCmtS = myWindow.document.querySelector('#snd-cmt-s');
    // eSndCmtE = myWindow.document.querySelector('#snd-cmt-e');
    // eSndCmtText = myWindow.document.querySelector('#snd-cmt-text');
    // i = eSndCmtS.value;
    // f = eSndCmtE.value;
    n = f - i + 1;
    // cmt = eSndCmtText.value;
    console.log(`inside wrapFuncSendComments i${i} f${f}`);
    sendMultipleFail(Array.from(Array(n), (x, index) => index+i));
}

function consoleSendComments(i, f) {
    // eSndCmtS = myWindow.document.querySelector('#snd-cmt-s');
    // eSndCmtE = myWindow.document.querySelector('#snd-cmt-e');
    // eSndCmtText = myWindow.document.querySelector('#snd-cmt-text');
    // i = eSndCmtS.value;
    // f = eSndCmtE.value;
    n = f - i + 1;
    // cmt = eSndCmtText.value;
    console.log(`inside consoleSendComments i${i} f${f} n${n}`);
    sendMultipleFail(Array.from(Array(n), (x, index) => index+i));
}

function testOtherWindow() {
    alert('hi from origin');
}
function renderMyWindow() {
    myWindow.document.body.innerHTML = `
        <!-- bootstrap -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

        <style>
            div {
                font-size: 13px;
                //text-align: center;
            }
            .cmt-idx {
                height: 25px;
                width: 30px;
                resize: none;
            }
            .cmt-text {
                width: 100%;
                height: 75px;
                resize: none;
            }
            #w-swch-toggle-bdbx {
                //display: flex;
                //justify-content: center;
                //align-items: center;
            }
            #swch-toggle-bdbx {
                opacity: 0;
                -webkit-transition: all 0.3s ease-in-out;
                -moz-transition: all 0.3s ease-in-out;
                -ms-transition: all 0.3s ease-in-out;
                -o-transition: all 0.3s ease-in-out;
                transition: all 0.3s ease-in-out;
                
                width: 50px;
                height: 50px;
                border: solid 1px;
                border-color: black;
                
                border-radius: 50%;
                background-color: #02A676;
                //box-shadow: 5px 10px #888888;
            .smallIdx:hover {
                border: solid black 1px;
            }
            }
        </style>


        <div class="container-fluid">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            Total objects <h2 id="cntEntireObj">-</h2>
                        </div>
                        <div class="col">
                            focused index <h2 id="dispCardIndex">-</h2>
                        </div>
                        <div class="col" id="w-swch-toggle-bdbx">
                            <div class="row">
                                <div class="col">
                                bounding box
                                </div>
                            </div>
                            <div class="row d-flex justify-content-center">
                                <div class="col">
                                    <div id="swch-toggle-bdbx"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 
            <div>
                <h4>index list</h4>
                <div id="dispChosenIndice">
                    
                </div>
            </div>
            -->
            <div class="card">
                <div class="card-body">
                    <h4>idx to fix</h4>
                    <div class="row">
                        <div class="col-4">
                            <b>arget userId</b>
                            <!--<h2 id="focusedIdx">-</h2> -->
                            <input class="cmt-idx" id="inp-target-user-id" />
                            <button 
                                class="btn btn-primary" 
                                onclick="window.opener.getIdxWithRect(
                                    document.querySelector('#inp-target-user-id').value
                                )
                            ">
                                run
                            </button>
                        </div>
                        <div class="col-7">
                            idx to fix
                            <p id="p-idx-to-fix">-</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <h4>write multiple comment</h4>
                    <div class="row">
                        <div class="col-3">
                            <p>start:</p>
                            <textarea class="cmt-idx" id="cmt-idx-s">0</textarea>
                        </div>
                        <div class="col-3">
                            <p>end:</p>
                            <textarea class="cmt-idx" id="cmt-idx-e">49</textarea>
                        </div>
                    </div>
                    <div>
                        <p>comment:</p>
                        <textarea class="cmt-text" id="cmt-text"></textarea></div>
                    <div>
                        <button type="button" class="btn btn-primary" onclick="window.opener.wrapFuncSetTextarea(
                            document.querySelector('#cmt-idx-s').value,
                            document.querySelector('#cmt-idx-e').value,
                            document.querySelector('#cmt-text').value
                            )">run
                        </button>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                    <h4>send multiple comment</h4>
                    <div class="row">
                        <div>
                            <p>start:</p>
                            <textarea class="cmt-idx" id="snd-cmt-s"></textarea>
                        </div>
                        <div>
                            <p>end:</p>
                            <textarea class="cmt-idx" id="snd-cmt-e"></textarea>
                        </div>
                    </div>
                    <div>
                        <button class="btn btn-primary" type="button" onclick="window.opener.consoleSendComments(
                            document.querySelector('#snd-cmt-s').value,
                            document.querySelector('#snd-cmt-e').value
                            )">run
                        </button>
                    </div>
                </div>
            </div>
            <!--
            <ul>
                <li>
                    <textarea></textarea>
                    <button onclick="copyContent(this)">copy</button>
                </li>
            </ul>
            -->
        </div>
    `
}

// function copyContent() {
//     console.log(this.parentNode);
// }

renderMyWindow();
