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
        {name: "Mike", file: "board-monster1.png", darkColor: "#3bcebc"},
        {name: "Sully", file: "board-monster2.png", darkColor: "#bc8f00"},
        {name: "Boo", file: "board-monster3.png", darkColor: "#8549db"},
        {name: "Manager", file: "board-monster4.png", darkColor: "#f63333"},
        // {name: "Celia", file: "board-monster.png", darkColor: "#5F3F5F"},
        // {name: "Waternoose", file: "board-monster.png", darkColor: "#212E3E"},
    ];
    console.log(arrMonsters[Math.floor(Math.random()*arrMonsters.length)])
    return arrMonsters[Math.floor(Math.random()*arrMonsters.length)];
}

//add a swimlane
//add another swimlane
function addSwimlane() {
    swimlaneID++;

    //make a swimlane id
    var id = "swimlane" + swimlaneID;
    var randomSwimlaneStyles = getRandomSwimlane();

    //create title
    var title = document.createElement("DIV");
    var titleid = "swimlane-title-" + swimlaneID;
    title.setAttribute("id", titleid);
    title.setAttribute("data-title-id", titleid);

    //create a swimlane
    var swimlane = document.createElement("DIV");

    //set id attribute
    swimlane.setAttribute("id", id);
    swimlane.setAttribute("data-swimlane-id", swimlaneID);

    //set the class
    swimlane.setAttribute("class", "swimlane");
    swimlane.setAttribute("style", `background-color: ${randomSwimlaneStyles.darkColor}`);

    swimlane.appendChild(title);

    let newSwimlaneButtonContainer = document.getElementById("new-swimlane-button-container");

    let swimlaneContainer = document.querySelector(".app-container");

    //add to the container
    swimlaneContainer.insertBefore(swimlane, newSwimlaneButtonContainer);

    let swimlaneInput = document.getElementById("swimlane-title-input");

    console.log(swimlaneInput)

    console.log(swimlaneInput.value)
    let titlediv = document.querySelector("#" + titleid);
    titlediv.innerHTML = swimlaneInput.value;
     //Adds title swimlane in swimlane
 
//function swimlaneInput() {
   // var x = document.getElementById("swimlaneInput").innerHTML;
    //document.getElementById("title").innerHTML = x;
  //}
  


    let backgroundImage = document.createElement("DIV");
    backgroundImage.setAttribute("class", "background-image");
    backgroundImage.setAttribute("style", `background-image: url(${randomSwimlaneStyles.file})`);
    

    swimlane.appendChild(backgroundImage);

    //create a "move swimlane left" button
    var btnMoveSwimlaneLeft = document.createElement("INPUT");
    btnMoveSwimlaneLeft.setAttribute("type", "button");
    btnMoveSwimlaneLeft.setAttribute("value", "◀️");
    btnMoveSwimlaneLeft.setAttribute("data-swimlane-id", swimlaneID);
    btnMoveSwimlaneLeft.setAttribute("data-direction", "left");
    btnMoveSwimlaneLeft.addEventListener("click", moveSwimlane);
    swimlane.appendChild(btnMoveSwimlaneLeft);

    //create a "add card" button
    var btnAddCard = document.createElement("INPUT");
    btnAddCard.setAttribute("type", "button");
    btnAddCard.setAttribute("value", "Add Card");
    btnAddCard.setAttribute("id", "btnAddCard" + swimlaneID);
    btnAddCard.setAttribute("data-swimlane-id", swimlaneID);
    btnAddCard.addEventListener("click", addCard);
    swimlane.appendChild(btnAddCard);

    //create a "delete swimlane" button
    var btnDelSwimlane = document.createElement("INPUT");
    btnDelSwimlane.setAttribute("type", "button");
    btnDelSwimlane.setAttribute("value", "X");
    btnDelSwimlane.setAttribute("id", "btnDel" + swimlaneID);
    btnDelSwimlane.setAttribute("data-swimlane-id", swimlaneID);
    btnDelSwimlane.addEventListener("click", deleteSwimlane);
    swimlane.appendChild(btnDelSwimlane);

    //create a "move swimlane right" button
    var btnMoveSwimlaneRight = document.createElement("INPUT");
    btnMoveSwimlaneRight.setAttribute("type", "button");
    btnMoveSwimlaneRight.setAttribute("value", "▶️");
    btnMoveSwimlaneRight.setAttribute("data-swimlane-id", swimlaneID);
    btnMoveSwimlaneRight.setAttribute("data-direction", "right");
    btnMoveSwimlaneRight.addEventListener("click", moveSwimlane);
    swimlane.appendChild(btnMoveSwimlaneRight);


    showButton();
}

//delete a swimlane
//	delete all cards in a swimlane?
//	prompt "are you sure you want to delete the swimlane"
//	prompt "move cards to a new swimlane"
function deleteSwimlane() {
    let slid = this.dataset.swimlaneId;

    let container = document.querySelector(".container");
    let swimlane = document.getElementById("swimlane" + slid);

    container.removeChild(swimlane);
}

//add a card to swimlane
function addCard() {
    cardID++;

    //get the swimlane id from the button that was clicked
    let slid = this.dataset.swimlaneId; 

    var txtTitle = prompt("Name your card:");
    var txtDescription = prompt("Description of your task:");

    //	add a name to the card
    //	add a description to the card

    var card = document.createElement("DIV");
    card.setAttribute("id", "card" + cardID); 
    card.setAttribute("class", "card");
    card.setAttribute("data-swimlane-id", slid);

    var cardButtons = document.createElement("DIV");
    cardButtons.setAttribute("class", "card-buttons");

    var btnMoveLeft = document.createElement("INPUT");
    btnMoveLeft.setAttribute("id", "btnMoveLeft" + cardID);
    btnMoveLeft.setAttribute("type", "button");
    btnMoveLeft.setAttribute("value", "◀️");
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
    btnMoveRight.setAttribute("value", "▶️");
    btnMoveRight.setAttribute("data-move-direction","right");
    btnMoveRight.setAttribute("data-card-id", cardID);
    btnMoveRight.addEventListener("click", moveCard);
    cardButtons.appendChild(btnMoveRight);

    card.appendChild(cardButtons);

    var title = document.createElement("P");
    title.innerHTML = txtTitle;
    card.appendChild(title);

    var desc = document.createElement("P");
    desc.innerHTML = txtDescription;
    card.appendChild(desc);

    let swimlane = document.querySelector("#swimlane" + slid);
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


//add a name to the swimlane
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