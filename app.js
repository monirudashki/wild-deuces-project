import { deucesRoyalFlush, fiveOfKind, forDeuces, forOfKind, naturalRoyalFlush ,straightFlush, threeOfKind , fullHouse, flush, straight} from "./cardHands.js";
import { cardsDeck  , cardsForDouble} from "./cardController.js"
import { buttonTurnOff, buttonTurnOn } from "./utility.js";

updateNavigation();
let dealCount = 0;
let ignoreArray = [];
let isSecondChanceDone = false;
let credit = 100;

let isDouble = false;

let winTextHands = Array.from(document.getElementsByClassName("winHands"));
let minusBtn = document.getElementsByClassName('minus')[0];
let plusBtn = document.getElementsByClassName('plus')[0];
let betBtn = document.getElementsByClassName('betButton')[0];
let betText = document.getElementsByClassName('tableButtons')[0].getElementsByTagName('p')[1];
let cards = Array.from(document.getElementsByTagName('img')).slice(2);
let creditText = document.getElementsByClassName("tableButtons")[0].getElementsByTagName('p')[0];
let winText = document.getElementsByClassName("tableButtons")[0].getElementsByTagName('p')[2];
document.getElementsByClassName("deck")[0].addEventListener("click", keepCard);

let btnDouble = document.getElementById("double");
buttonTurnOff(btnDouble);
btnDouble.addEventListener("click" , onDouble);

let collectBtn = document.getElementById("collect");
buttonTurnOff(collectBtn);
collectBtn.addEventListener("click" , onCollect);

let dealBtn = document.getElementsByClassName('btn')[0];
dealBtn.addEventListener('click' , onDeal);

minusBtn.addEventListener("click" , () => {
     let betNumber = Number(betBtn.textContent.slice(-1));
     if(betNumber == 1) {
        betNumber = 6;
     }
     betBtn.textContent = `Bet: ${betNumber - 1}`;
     betText.textContent = `Bet: ${betNumber - 1}`;
});

plusBtn.addEventListener("click" , () => {
    let betNumber = Number(betBtn.textContent.slice(-1));
    if(betNumber == 5) {
       betNumber = 0;
    }
    betBtn.textContent = `Bet: ${betNumber + 1}`;
    betText.textContent = `Bet: ${betNumber + 1}`;
});

function updateNavigation() {
    let user;
    if(user) {
      document.getElementsByTagName('a')[1].style.display = "inline";
      document.getElementsByTagName('a')[2].style.display = "none";
      document.getElementsByTagName('a')[3].style.display = "none";
    } else {
      document.getElementsByTagName('a')[1].style.display = "none";
      document.getElementsByTagName('a')[2].style.display = "inline";
      document.getElementsByTagName('a')[3].style.display = "inline";
    }
}


function onDeal (event) {
    event.preventDefault();
    dealCount++;
    buttonTurnOff(plusBtn);
    buttonTurnOff(minusBtn);
    buttonTurnOff(betBtn);
    let firstHand = getHand();
    let bet = Number(betBtn.textContent.slice(-1));
    if(credit <= 0) {
      credit = 0;
      let result = confirm('Game over! Do you want another game?');
      if(result) {
        credit = 100;
      }
    }
    if(credit - bet < 0) {
      bet = credit;
      betText.textContent = `Bet: ${bet}$`
    }
    if(dealCount != 2) {
      credit = credit - bet;
    }
    creditText.textContent = `Credit: ${credit}$`;
    for(let i = 0; i < firstHand.length; i++) {
       cards[i].src = `./images/${firstHand[i]}`;
       cards[i].alt = firstHand[i];
    }
    let isHaveWinHand = false;
    
    if(naturalRoyalFlush(firstHand , cards)) {
      winHand(250 , bet , 9);
      isHaveWinHand = true;
    } else if(forDeuces(firstHand , cards)) {
      winHand(200 , bet , 8);
      isHaveWinHand = true;
    } else if(deucesRoyalFlush(firstHand , cards)) {
      winHand(25 , bet , 7);
      isHaveWinHand = true;
    } else if(fiveOfKind(firstHand , cards)) {
      winHand(16 , bet, 6);
      isHaveWinHand = true;
    } else if(straightFlush(firstHand , cards)) {
      winHand(13 , bet , 5);
      isHaveWinHand = true;
    } else if(forOfKind(firstHand , cards)) {
      isHaveWinHand = true;
      winHand(4 , bet , 4);
    } else if (fullHouse(firstHand , cards)) {
      isHaveWinHand = true;
      winHand(3 , bet , 3);
    } else if(flush(firstHand , cards)) {
      isHaveWinHand = true;
      winHand(2 , bet , 2);
    } else if(straight(firstHand , cards)) {
      isHaveWinHand = true;
      winHand(2 , bet , 1);
    } else if(threeOfKind(firstHand , cards)) {
      isHaveWinHand = true;
      winHand(1 , bet , 0);
    } else {
      buttonTurnOff(collectBtn);
      buttonTurnOff(btnDouble);
      winText.textContent = `Win: 0$`;
      let change = winTextHands.find(x => x.style.color == "black");
      if(change) {
      change.style.color = '#def603';
      }
    }
    
    if(dealCount == 2 && isHaveWinHand && isSecondChanceDone == false) {
       dealCount--;
       isSecondChanceDone = true;
       credit -= bet;
       creditText.textContent = `Credit: ${credit}$`;
    }
    
    if(dealCount == 2) {
       cardsDeck.push(...ignoreArray);
       ignoreArray = [];
       buttonTurnOn(plusBtn);
       buttonTurnOn(minusBtn);
       buttonTurnOn(betBtn);
       cards.forEach(x => x.className = 'image');
       dealCount = 0;
       if(collectBtn.style.backgroundColor == "blue") {
         buttonTurnOff(dealBtn);
       }
       isSecondChanceDone = false;
    }
}

function getHand () {
    let gameHand = [];
    for (let i = 0; i < 5; i++) {
       let current = cardsDeck[Math.floor(Math.random()*cardsDeck.length)];
       if(cards[i].className == "keepCard") {
        gameHand.push(cards[i].alt);
       } else {
        gameHand.push(current);
       }
       ignoreArray.push(current);
       cardsDeck.splice(cardsDeck.indexOf(current) , 1);
    }
    return gameHand;
}

function onCollect (event) {
    event.preventDefault();
    cardsDeck.push(...ignoreArray);
    ignoreArray = [];
    buttonTurnOn(plusBtn);
    buttonTurnOn(minusBtn);
    dealCount = 0;
    let win = winText.textContent.split(" ");
    win = Number(win[1].slice(0, -1));
    credit += win;
    creditText.textContent = `Credit: ${credit}$`;
    if(credit >= 300) {
      confirm("YOU WON THE GAME! DO YOU WANT ANOTHER ONE?");
      if(confirm) {
        creditText.textContent = `Credit: 100$`;
      }
    }
    winText.textContent = 'Win: 0$'
    let change = winTextHands.find(x => x.style.color == "black");
    change.style.color = '#def603';
    buttonTurnOn(dealBtn);
    buttonTurnOff(collectBtn);
    buttonTurnOff(btnDouble);
    cards.forEach(x => x.className = 'image');
    cards.forEach(x => x.src = "./images/back.png");
    isDouble = false;
}

function onDouble (event) {
    event.preventDefault();
    dealBtn.disabled = true;
    buttonTurnOff(dealBtn);
    buttonTurnOff(collectBtn);
    buttonTurnOff(btnDouble);
    isDouble = true;
    cards.forEach(e => e.className = 'image');
    let cardToBeat = cardsDeck[Math.floor(Math.random()*cardsDeck.length)]
    cards[0].src = `./images/${cardToBeat}`;
    cards[0].alt = cardToBeat;
    cards.slice(1).forEach(x => x.src = "./images/back.png");
    cards.slice(1).forEach(y => y.alt = "back");
}

function keepCard(event) {
   event.preventDefault();
   if(isDouble == false) {
   if(event.target.tagName == "IMG" && dealCount != 0) {
   if(event.target.className == "image") {
     event.target.className = "keepCard";
   } else {
     event.target.className = "image";
   }
  }
}

if(isDouble) {
  cardsDeck.push(...ignoreArray);
  ignoreArray = [];
  let chosenCard = cardsDeck[Math.floor(Math.random()*cardsDeck.length)];
  let backs = cards.filter(e => e.alt == "back");
  if(event.target.tagName == "IMG" && backs.length == 4 && event.target != cards[0]) {
     isDouble = false;
     event.target.src = `/images/${chosenCard}`;
     
     let cardToBeat = cards[0].alt.split("-")[0];
     let numberOfCardToBeat = cardsForDouble[cardToBeat];
     let numberOfChosenCard = cardsForDouble[chosenCard.split("-")[0]];
     if(numberOfCardToBeat <= numberOfChosenCard) {
       let win = winText.textContent.split(" ");
       win = Number(win[1].slice(0, -1));
       win *= 2;
       winText.textContent = `Win: ${win}$`
       buttonTurnOn(collectBtn);
       buttonTurnOn(btnDouble);
     } else {
       winText.textContent = `Win: 0$`;
       buttonTurnOff(btnDouble);
       buttonTurnOn(dealBtn);
       isSecondChanceDone = false;
       dealCount = 0;
       let change = winTextHands.find(x => x.style.color == "black");
       change.style.color = '#def603';
     }
  }
}
}

function winHand(win , bet , handNumber) {
  buttonTurnOn(collectBtn);
  buttonTurnOn(btnDouble);
  let change = winTextHands.find(x => x.style.color == "black");
  if(change) {
    change.style.color = '#def603';
  }
  winTextHands[handNumber].style.color = "black";
  winText.textContent = `Win: ${win*bet}$`;
}
