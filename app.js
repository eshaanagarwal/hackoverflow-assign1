let mode = 3 
let colorStore = []
hasPlayerWon = false;
let answerColor = ''
const body = document.querySelector('body')
const value = document.querySelector('#value')
const newBtn = document.querySelector('.newBtn')
const easyBtn = document.querySelector('.easyBtn')
const hardBtn = document.querySelector('.hardBtn')
const easyCards = document.querySelectorAll('.easy')
const hardCards = document.querySelectorAll('.hard')
const allCards = document.querySelectorAll('.card')
const statusGame = document.querySelector('#status')

const getRandomColor = function () {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
}

const setCardColors = function () {
    for (let i = 0; i < mode; i++) {
        colorStore[i] = getRandomColor();
        allCards[i].style.backgroundColor = colorStore[i];
    }
    answer = colorStore[Math.floor(Math.random() * mode)]
}

const reset = function (mode) {
    statusGame.style.opacity = "0"
    hasPlayerWon = false;
    setCardColors();
    value.style.backgroundColor = "transparent"
    value.innerHTML = answer;
    easyCards.forEach(card => {
        card.style.opacity = "1"
        card.style.pointerEvents = "all";
    })
    if (mode == 6)
        hardCards.forEach(card => {
            card.style.opacity = "1"
            card.style.pointerEvents = "all";
        })
    else 
        hardCards.forEach(card => {
            card.style.opacity = "0"
            card.style.pointerEvents = "none";
        })
    setCardColors();
};

const winner = function (id) {
    statusGame.style.color = answer
    statusGame.textContent = "Correct!";
    statusGame.style.opacity = "1"
    hasPlayerWon = true;
    easyCards.forEach(card => {
        card.style.backgroundColor= answer;
        card.style.opacity = "1"
        card.style.pointerEvents = "none";
    })
    if (mode == 6)
        hardCards.forEach(card => {
            card.style.backgroundColor= answer;
            card.style.opacity = "1"
            card.style.pointerEvents = "none";
        })
}

const tryAgain = function (index) {
    allCards[index].style.opacity = "0"
    allCards[index].style.pointerEvents = "none";
    statusGame.style.color = colorStore[index]
    statusGame.style.opacity = "1"
    statusGame.textContent = "Try Again";
}

window.addEventListener('load', () => {
    mode = 3;
    reset(mode);
})

newBtn.addEventListener('click', () => {
    reset(mode)
})

easyBtn.addEventListener('click', () => {
    mode = 3;
    reset(mode)
})

hardBtn.addEventListener('click', () => {
    mode = 6;
    reset(mode)
})

allCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        if (card.style.backgroundColor == answer) {
            winner(index)
        }
        else if (!hasPlayerWon) {
            tryAgain(index)
        }
    })
})