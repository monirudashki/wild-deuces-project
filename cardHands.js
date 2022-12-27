let cardsForSeries = ["ace" , "king" , "queen" , "jack" , "ten" , "nine" , "eight" , "seven" , "six" , "five" , "for" , "three"];

export function naturalRoyalFlush(hand , cards) {
    hand = hand.map(x => x.slice(0 , -4).split("-"));
    let color = hand[0][1];
    hand = hand.filter(x => x[1] == color);
    if(hand.length == 5) {
       hand = hand.filter(x => x[0] == "ten" || x[0] == "jack" || x[0] == "queen" || x[0] == "king" || x[0] == "ace"); 
    }

    if(hand.length == 5) {
        cards.forEach(x => x.className = "keepCard");
        return true;
    } else {
        return false;
    }
}

export function forDeuces (hand , cards) {
    hand = hand.filter(x => x.includes("deuce"));

    if(hand.length == 4) {
      cards.forEach(x => x.className = "keepCard");
      return true;
    } else {
      return false;
    }
} 

export function deucesRoyalFlush(hand , cards) {
   hand = hand.map(x => x.slice(0 , -4).split("-"));
    let deuces = hand.filter(x => x[0] == "deuce");
    if(deuces.length > 0) {
        let color = hand.find(el => el[0] != "deuce");
        color = color[1];
        hand = hand.filter(x => x[1] == color || x[0] == "deuce");
        if(hand.length == 5) {
           hand = hand.filter(x => x[0] == "ten" || x[0] == "jack" || x[0] == "queen" || x[0] == "king" || x[0] == "ace" || x[0] == "deuce"); 
        }
        if(hand.length == 5) {
         cards.forEach(x => x.className = "keepCard");
           return true;
        }else {
           return false;
        }
    }
}

export function fiveOfKind(hand , cards) {
    hand = hand.map(x => x.slice(0 , -4).split("-"));
    let deuces = hand.filter(x => x[0] == "deuce");
    if(deuces.length != 0) {
    hand = hand.filter(x => x[0] != "deuce");
    let equalElement = hand[0][0];
    hand = hand.filter(y => y[0] == equalElement);
    if(5 - deuces.length == hand.length) {
       cards.forEach(x => x.className = "keepCard");
       return true;
       
    } else {
       return false;
    }
    } else {
        return false;
    }
}

export function straightFlush(hand , cards) {
    hand = hand.map(x => x.slice(0 , -4).split("-"));
    let color = hand[0][1];
    hand = hand.filter(x => x[1] == color || x[0] == "deuce");
    let isStraightFlush = false;
       if(checkForSeries(hand , "three" , "for" , "five" , "six" , "seven")) {
          isStraightFlush = true;
       } else if (checkForSeries(hand , "eight" , "for" , "five" , "six" , "seven")) {
          isStraightFlush = true;
       } else if (checkForSeries(hand , "eight" , "nine" , "five" , "six" , "seven")) {
         isStraightFlush = true;
       } else if (checkForSeries(hand , "eight" , "nine" , "ten" , "six" , "seven")) {
         isStraightFlush = true;
     } else if (checkForSeries(hand , "eight" , "nine" , "ten" , "jack" , "seven")) {
        isStraightFlush = true;
     } else if (checkForSeries(hand , "eight" , "nine" , "ten" , "jack" , "queen")) {
        isStraightFlush = true;
     } else if (checkForSeries(hand , "nine" , "ten" , "jack" , "queen" , "king")) {
        isStraightFlush = true;
     } else if (checkForSeries(hand , "ace" , "ten" , "jack" , "queen" , "king")) {
        isStraightFlush = true;
     } 

     if(isStraightFlush) {
      cards.forEach(x => x.className = "keepCard");
        return true;
     } else {
        return false;
     }
}

export function forOfKind(hand , cards) {
    hand = hand.map(x => x.slice(0 , -4).split("-"));
    let deuces = hand.filter(x => x[0] == "deuce");
    hand = hand.filter(x => x[0] != "deuce");
    for(let card of cardsForSeries) {
      let equalsHand = checkForEquals(hand , card);
       if(equalsHand.length + deuces.length == 4) {
          let cardForKeep = equalsHand[0][0]
          let keepCards = cards.filter(el => el.alt.includes(cardForKeep) || el.alt.includes("deuce"));
          keepCards.forEach(y => y.className = "keepCard");
          return true;
       }
    }
}

export function fullHouse(hand ,cards) {
    hand = hand.map(x => x.slice(0 , -4).split("-"));
    let deuces = hand.filter(x => x[0] == "deuce");
    hand = hand.filter(x => x[0] != "deuce");
    for(let card of cardsForSeries) {
       let equalsHand = checkForEquals(hand , card);
       if(equalsHand.length + deuces.length == 3) {
          let restCards = hand.filter(x => x[0] != equalsHand[0][0] && x[0] != "deuce");
          if(restCards[0][0] == restCards[1][0]) {
             cards.forEach(x => x.className = "keepCard");
             return true;
             
          }
       }
    }
}

export function flush(hand , cards) {
    hand = hand.map(x => x.slice(0 , -4).split("-"));
    let deuces = hand.filter(x => x[0] == "deuce");
    hand = hand.filter(x => x[0] != "deuce");
    let color = hand[0][1];
    hand = hand.filter(x => x[1] == color);
    if(deuces.length + hand.length == 5) {
      cards.forEach(x => x.className = "keepCard");
        return true;
    }
}

export function straight(hand , cards) { 
    hand = hand.map(x => x.slice(0 , -4).split("-"));
    let isStraightFlush = false;
       if(checkForSeries(hand , "three" , "for" , "five" , "six" , "seven")) {
          isStraightFlush = true;
       } else if (checkForSeries(hand , "eight" , "for" , "five" , "six" , "seven")) {
          isStraightFlush = true;
       } else if (checkForSeries(hand , "eight" , "nine" , "five" , "six" , "seven")) {
         isStraightFlush = true;
       } else if (checkForSeries(hand , "eight" , "nine" , "ten" , "six" , "seven")) {
         isStraightFlush = true;
     } else if (checkForSeries(hand , "eight" , "nine" , "ten" , "jack" , "seven")) {
        isStraightFlush = true;
     } else if (checkForSeries(hand , "eight" , "nine" , "ten" , "jack" , "queen")) {
        isStraightFlush = true;
     } else if (checkForSeries(hand , "nine" , "ten" , "jack" , "queen" , "king")) {
        isStraightFlush = true;
     } else if (checkForSeries(hand , "ace" , "ten" , "jack" , "queen" , "king")) {
        isStraightFlush = true;
     }
     if(isStraightFlush) {
        cards.forEach(x => x.className = "keepCard");
        return true;
     } else {
        return false;
     }   
}

export function threeOfKind(hand , cards) {
    hand = hand.map(x => x.slice(0 , -4).split("-"));
    let deuces = hand.filter(x => x[0] == "deuce");
    hand = hand.filter(x => x[0] != "deuce");
    for(let card of cardsForSeries) {
       let equalsHand = checkForEquals(hand , card);
       if(equalsHand.length + deuces.length == 3) {
          let cardForKeep = equalsHand[0][0]
          let keepCards = cards.filter(el => el.alt.includes(cardForKeep) || el.alt.includes("deuce"));
          keepCards.forEach(y => y.className = "keepCard");
          return true;
       }
    }
}

function checkForSeries(hand, first , second , third , fourth , fifth) {
    let possibleCombination = [first , second , third , fourth , fifth , "deuce"];
    let countCorrect = 0;
    for(let card of hand) {
        if(possibleCombination.includes(card[0])) {
           countCorrect++;
           if(card[0] != "deuce") {
               let index = possibleCombination.indexOf(card[0]);
               if(index != -1) {
                   possibleCombination.splice(index, 1);
                }
            }
        }
    }
    if(countCorrect == 5) {
       return hand;
    }
}

function checkForEquals(hand , card) {
    return hand.filter(x => x[0] == card);
}