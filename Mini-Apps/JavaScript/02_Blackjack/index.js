let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let player = {
    name: "Unknown",
    chips: 0,
};

let txt_messeage = document.getElementById("txt-message");
let txt_cards = document.getElementById("txt-cards");
let txt_sum = document.getElementById("txt-sum");
let txt_player = document.getElementById("txt-player");

txt_player.textContent = player.name + ": $" + player.chips;


function getRandomCard() {
    let randomNum = Math.floor(Math.random() * 13) + 1;
    if (randomNum > 10) {
        return 10;
    } else if (randomNum === 1) {
        return 11;
    } else {
        return randomNum;
    };
};

function getAllCards() {
    let str_cards = "";
    for (let i=0; i<cards.length; i++) {
        str_cards = str_cards + " " + cards[i];
    };
    return str_cards;
};

function startGame() {
    if (isAlive === false) {
        isAlive = true;
        cards.push(getRandomCard());
        cards.push(getRandomCard());
        sum = cards[0] + cards [1];
        renderGame();
    };
};

function renderGame() {    
    txt_sum.textContent = "Sum: " + sum;
    txt_cards.textContent = "Cards: " + getAllCards();
    if (sum<21) {
        message = "Do you want to draw a new card? 🙂";
    } else if (sum === 21) {
        message = "Yes sir! You have got Blackjack! 🥳";
        hasBlackJack = true;
    } else {
        message = "Sorry! You are out of game! 😭";
        isAlive = false;
    };
    console.log(message);
    txt_messeage.textContent = message;
};

function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard();
        cards.push(card);
        sum += card;
        renderGame();
    };
};