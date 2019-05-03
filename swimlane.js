let swimlaneID = 0; //initialize the swimlane counter
let cardID = 0; //initialize the card counter


function showButton() {

    const showSwimlaneForm = document.getElementById("form");

    const showFormButtonContainer = document.getElementById("present-form-button-container");


    showSwimlaneForm.style.display = "block"

    showFormButtonContainer.style.display = "none"
}

function hideButton () {

    const showSwimlaneForm = document.getElementById("form");

    const showFormButtonContainer = document.getElementById("present-form-button-container");

    showSwimlaneForm.style.display = "none"

    showFormButtonContainer.style.display = "block"
}



function getRandomSwimlane(){
    let arrMonsters = [
        {name: "monster1", file: "board-monster1.png", darkColor: "#3bcebc"},
        {name: "yellowmonster", file: "board-monster2.png", darkColor: "#f4c531"},
        {name: "monster3", file: "board-monster3.png", darkColor: "#8549db"},
        {name: "monster4", file: "board-monster4.png", darkColor: "#f63333"},
    ];
    console.log(arrMonsters[Math.floor(Math.random()*arrMonsters.length)])
    return arrMonsters[Math.floor(Math.random()*arrMonsters.length)];
}

//add a swimlane
//add another swimlane
function addSwimlane() {
    swimlaneID++;
    const id = "swimlane" + swimlaneID;
    const randomSwimlaneStyles = getRandomSwimlane();

    // create a swimlane
    const swimlane = document.createElement("DIV");
        //set id attribute
        swimlane.setAttribute("id", id);
        swimlane.setAttribute("data-swimlane-id", swimlaneID);
    
        //set the class
        swimlane.setAttribute("class", "swimlane");
        swimlane.setAttribute("style", `background-color: ${randomSwimlaneStyles.darkColor}`);
    

        // create background image
        let backgroundImage = document.createElement("DIV");
        backgroundImage.setAttribute("class", "background-image");
        backgroundImage.setAttribute("style", `background-image: url(${randomSwimlaneStyles.file})`);
        backgroundImage.insertAdjacentHTML('beforeend', `<button class="rounded-circle-delete" type="button"  onclick="deleteSwimlane(${swimlaneID})" value="X"><i class="fas fa-trash-alt"></i></button>`)
    

        swimlane.appendChild(backgroundImage);

        //create a "delete swimlane" button
        // const btnDelSwimlane = document.createElement("INPUT");
        // btnDelSwimlane.setAttribute("type", "button");
        // btnDelSwimlane.setAttribute("value", "X");
        // btnDelSwimlane.setAttribute("id", "btnDel" + swimlaneID);
        // btnDelSwimlane.setAttribute("data-swimlane-id", swimlaneID);
        // btnDelSwimlane.addEventListener("click", deleteSwimlane);

        //create title
        const title = document.createElement("DIV");
        title.setAttribute("class", 'swimlane-title');
        title.setAttribute("data-title-id", swimlaneID);

        const swimlaneInput = document.getElementById("swimlane-title-input");
        title.innerHTML = `${swimlaneInput.value}`;

        // add title to the swimlane
        swimlane.appendChild(title);


        const cardContainer = document.createElement("DIV");
        cardContainer.setAttribute("class", "card-container");
        cardContainer.setAttribute('data-swimlane-id', `${swimlaneID}`);
        cardContainer.setAttribute('id', `card-container-${swimlaneID}`);
        swimlane.appendChild(cardContainer);

        

        //create a "add card" button
        const btnAddCard = document.createElement("INPUT");
        btnAddCard.setAttribute("type", "button");
        btnAddCard.setAttribute("value", "+ Add Card");
        btnAddCard.setAttribute("class", "btnAddCard1");
        btnAddCard.setAttribute("data-swimlane-id", swimlaneID);
        btnAddCard.addEventListener("click", addCard);
        swimlane.appendChild(btnAddCard);


        //create a "move swimlane left" button
        // const btnMoveSwimlaneLeft = document.createElement("INPUT");
        // btnMoveSwimlaneLeft.setAttribute("type", "button");
        // btnMoveSwimlaneLeft.setAttribute("value", "◀️");
        // btnMoveSwimlaneLeft.setAttribute("data-swimlane-id", swimlaneID);
        // btnMoveSwimlaneLeft.setAttribute("data-direction", "left");
        // btnMoveSwimlaneLeft.addEventListener("click", moveSwimlane);
        // swimlane.appendChild(btnMoveSwimlaneLeft);


        //create a "move swimlane right" button
        // const btnMoveSwimlaneRight = document.createElement("INPUT");
        // btnMoveSwimlaneRight.setAttribute("type", "button");
        // btnMoveSwimlaneRight.setAttribute("value", "▶️");
        // btnMoveSwimlaneRight.setAttribute("data-swimlane-id", swimlaneID);
        // btnMoveSwimlaneRight.setAttribute("data-direction", "right");
        // btnMoveSwimlaneRight.addEventListener("click", moveSwimlane);
        // swimlane.appendChild(btnMoveSwimlaneRight);

    let newSwimlaneButtonContainer = document.getElementById("new-swimlane-button-container");

    let swimlaneContainer = document.querySelector(".app-container");

    // add the swimlane to the container before the add swimlane button container
    swimlaneContainer.insertBefore(swimlane, newSwimlaneButtonContainer);
     //Adds title swimlane in swimlane

    showButton();
}

//delete a swimlane
//	delete all cards in a swimlane?
//	prompt "are you sure you want to delete the swimlane"
//	prompt "move cards to a new swimlane"
function deleteSwimlane(slid) {
    let container = document.querySelector(".app-container");
    let swimlane = document.getElementById("swimlane" + slid);

    container.removeChild(swimlane);
}


//add a card to swimlane
function addCard() {
    const addCardButton = this;
    cardID++;

    //get the swimlane id from the button that was clicked
    let slid = this.dataset.swimlaneId; 

    // var txtTitle = prompt("Name your card:");
    // var txtDescription = prompt("Description of your task:");

    //	add a name to the card
    //	add a description to the card

    var card = document.createElement("DIV");
    card.setAttribute("id", "card" + cardID); 
    card.setAttribute("class", "card form-group");
    card.setAttribute("data-swimlane-id", slid);

    var cardButtons = document.createElement("DIV");
    cardButtons.setAttribute("class", "card-buttons");

    var btnMoveLeft = document.createElement("INPUT");
    btnMoveLeft.setAttribute("id", "btnMoveLeft" + cardID);
    btnMoveLeft.setAttribute("type", "button");
    btnMoveLeft.setAttribute("value", "<");
    btnMoveLeft.setAttribute("data-move-direction","left");
    btnMoveLeft.setAttribute("data-card-id", cardID);
    btnMoveLeft.addEventListener("click", moveCard);
    cardButtons.appendChild(btnMoveLeft);

    var btnDelete = document.createElement("INPUT");
    btnDelete.setAttribute("id", "btnDel" + cardID);
    btnDelete.setAttribute("type", "button");
    btnDelete.setAttribute("value", "X");
    btnDelete.setAttribute("data-card-id", cardID);
    btnDelete.addEventListener("click", deleteCard);
    cardButtons.appendChild(btnDelete);

    var btnMoveRight = document.createElement("INPUT");
    btnMoveRight.setAttribute("id", "btnMoveRight" + cardID);
    btnMoveRight.setAttribute("type", "button");
    btnMoveRight.setAttribute("value", ">");
    btnMoveRight.setAttribute("data-move-direction","right");
    btnMoveRight.setAttribute("data-card-id", cardID);
    btnMoveRight.addEventListener("click", moveCard);
    btnMoveRight.innerHTML = "";
    cardButtons.appendChild(btnMoveRight);

    card.appendChild(cardButtons);

    var title = document.createElement("INPUT");
    title.setAttribute('placeholder','Enter a title for this card...')
    title.setAttribute('class', 'form-control')
    card.appendChild(title);

    // var desc = document.createElement("INPUT");
    // desc.setAttribute('placeholder','Add a description here...')
    // card.appendChild(desc);

    let swimlane = document.querySelector("#card-container-" + slid);
    swimlane.appendChild(card);
}


//edit the name of a card

//delete a card from a swimlane
function deleteCard() {
    let slid = this.parentNode.parentNode.dataset.swimlaneId; 
    let cid = this.dataset.cardId;

    let swimlane = document.querySelector("#swimlane" + slid);
    let card = document.querySelector("#card" + cid);

    swimlane.removeChild(card);
}

//ability to move a card up or down in the swimlane

//move swimlane to left or right
function moveSwimlane() {
    let slid = this.dataset.swimlaneId;
    let swimlane = document.querySelector("#swimlane" + slid);
    let container = document.querySelector(".container");
    let previous = document.querySelector("#swimlane" + slid).previousSibling;
    let next = document.querySelector("#swimlane" + slid).nextSibling;

    let pidx = Array.prototype.indexOf.call(container.children, previous);
    let nidx = Array.prototype.indexOf.call(container.children, next);
    let cidx = Array.prototype.indexOf.call(container.children, swimlane);

    console.log(this.dataset.direction);
    console.log(swimlane);

    if(this.dataset.direction == "left") {
        // list.insertBefore(newItem, list.childNodes[0]);
        container.insertBefore(swimlane, container.childNodes[pidx]);
    }
    else if (this.dataset.direction == "right") {
        container.insertBefore(swimlane, container.childNodes[++nidx]);
    }
}



//edit the swimlane name


//move a card to next or previous swimlane
function moveCard() {
    let slid = this.parentNode.parentNode.dataset.swimlaneId;
    let cid = this.dataset.cardId;

    let card = document.querySelector("#card" + cid);

    let leftSlid;
    let rightSlid;
    let left;
    let right;

    //try to get left swimlane data, may not exist
    try {
        left = document.querySelector("#swimlane" + slid).previousSibling;
        leftSlid = left.dataset.swimlaneId;
    }
    catch (e) {
        console.error(e);
    }

    //try to get right swimlane data, may not exist
    try {
        right = document.querySelector("#swimlane" + slid).nextSibling;
        rightSlid = right.dataset.swimlaneId;
    }
    catch (e) {
        console.error(e);
    }

    console.log(left);
    console.log(right);

    let direction = this.dataset.moveDirection;

    if(left != null && direction == "left") {
        left.appendChild(card);
        card.dataset.swimlaneId = leftSlid;
    }
    else if(right != null && direction == "right") {
        right.appendChild(card);
        card.dataset.swimlaneId = rightSlid;
    }
}

