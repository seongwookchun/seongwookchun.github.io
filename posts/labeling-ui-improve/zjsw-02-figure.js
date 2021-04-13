// popup window
myWindow = window.open("", "", "width=400,height=600", "");  // if 4th param is set as "" then redundant popup window be prevented.
renderMyWindow();


eComplete = document.getElementById('btnImageComplete');
eBtnSave = document.querySelector('#btnImageTempSave');
let keysPressed = {};
const tagValues = {
    clothes: ['', 'hat', 'bag', 'glasses', 'unbrella']
}
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
    else if (keysPressed[18] && (49 <= event.keyCode <= 57)) {  // alt + #
        valueIndex = event.keyCode - 49;
        // console.log(`nbLoop ${nbLoop} keyCode ${event.keyCode}`);
        let eSelect = document.querySelector('select.tagInput');
        eSelect.value = tagValues['clothes'][valueIndex];
        // for (let i=0; i<nbLoop; i++) {
            // console.log(`inside forloop: ${i}`);
            // document.dispatchEvent(
            //     new KeyboardEvent('keydown', {key: 'v', shiftKey: true})
            // );
        }
    // } else if (event.keyCode === 86) {  //v
    //     console.log('hi v!!!');
    // }
    // figure hot key
    // else if (keysPressed[16] && event.keyCode === 65) {  // a
    //     changeClass(1);
    // } 
    // else if (keysPressed[16] && event.keyCode === 83) {  // s
    //     changeClass(9);
    // } 
    // else if (keysPressed[16] && event.keyCode === 68) {  // d
    //     changeClass(13);
    // } 
    // else if (keysPressed[16] && event.keyCode === 70) {  // f
    //     changeClass(21 -1);  // 수빈
    // } 
    // else if (keysPressed[16] && event.keyCode === 71) {  // g
    //     changeClass(8 -1);  // 나비
    // } 
    else if (event.keyCode === 70) {  // f
        changeClass(21 -1);  // 수빈
    } 
    else if (event.keyCode === 71) {  // g
        changeClass(8 -1);  // 나비
    } 

    
    else if (keysPressed[16] && event.keyCode === 32) {  // shift + space
        clickBtnCommentConfirm();
    } 
    
});

document.addEventListener('keyup', (event) => {
    delete keysPressed[event.keyCode];
    console.log(keysPressed);
});





// custom figure hotkeys
eObjList = document.querySelector('#rootObjectList');

function findObjOn(eUl) {
    eLi = eUl.querySelectorAll('li');
    console.log(`eLi length: ${eLi.length} \n ${eLi}`);

    for (let i=0; i<eLi.length; i++) {
        e = eLi[i];
        className = e.classList[0]
        if (className === 'on') {
            return e;
        }
    }
}

eClassList = document.querySelector('#rootChangeClassList');
dicClassName = {};
for (let i=0; i<eClassList.length; i++) {
    eClassList
}

function nameToClassNum(name) {

    return classNum;
}


function changeClass(classNum) {
    eLi = findObjOn(eObjList);
    
    if (eLi === undefined) {
        console.log(`object is not selected.`);
        return -1;
    }

    eBtnClass = eLi.querySelector('button:nth-child(1)');
    eBtnClass.click();
    eClassItems = eClassList.querySelectorAll('li');
    console.log(`classNum ${classNum}`);
    eClassItems[classNum].click();
}

arrEntity = `1 강윤[블레이디]
9 나현[블레이디](910112)
13 다래[블레이디]
16 분홍[블레이디]
19 선영[블레이디]`.split('\n')
dicEntity = {}
for (let i=0; i<arrEntity; i++) {
    [value, index] = arrEntity[i].split(' ')
    dicEntity[i] = {
        "value" : value,
        "index" : index
    };
}



// click comment 확인 버튼
eBtnCommentConfirm = document.querySelector('#alertModalBtnConfirm');
function clickBtnCommentConfirm() {
    eBtnCommentConfirm.click();
}



// local storage

function workCounterInc() {
    cnt = Number(window.localStorage.getItem('workCounter')) + 1;
    window.localStorage.setItem('workCounter', cnt);
    console.log(`one job finished. counter: ${cnt}`);
}



// popup window
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
            }
        </style>


        <div class="container-fluid">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col" id="w-swch-toggle-bdbx">
                            <div class="row">
                                <div class="col">
                                selected object index: 
                                    <span id="selectedObjIndex">-</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <h5>favorite entity list</h5>
                        </div>
                    <div class="row">
                        <!-- <div>
                            ${compEntityItem(5)}
                        </div>
                        -->
                        ${compEntityItem(5)}
                    </div>
                </div>
            </div>
        </div>
    `
}

// function copyContent() {
//     console.log(this.parentNode);
// }


function compEntityItem(n) {
    compBase = `
        <div class="row">
            <input class="inpEntity" id="inpEntity" />
            <button onclick="console.log(dicEntity(n))">
        </div>
    `
    a = '';
    for (let i=0; i<3; i++) {
        a += `
        <div class="row">
            <input class="inpEntity" id="inpEntity${i}" value="dicEntity(${i})"/>
            <button onclick="console.log(dicEntity(${i}))">적용</button>
        </div>`;
    }
    return a;
}
renderMyWindow();
