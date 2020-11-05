const container = document.getElementById('container');
const button = document.getElementById('fetch');
const cards = document.querySelectorAll('.memory-card');

button.addEventListener('click', async (e) => {
  const response = await fetch('http://localhost:3000/getDogs');
  const json = await response.json();
  // console.log("МЕНЯЕМ ТЕКСТ ", json);
  // container.innerHTML = `<img src="${json.message}"/>`;
  cards.forEach((el, i) => {
    el.querySelector('.front-face').setAttribute('src', json[i]);
    console.log('ИЩЕМ ЭЛЬ', el);
  })
});

let firstCard;
let secondCard;

// console.log('ALL CARDS', cards);

let flippedCard = false;
let boardLocked = false;

const flipCard = e => {
  if (boardLocked) return;

  const target = e.target.parentElement;
  // console.log("EVENT", e.target.parentElement);
  if (target === firstCard) return;
  target.classList.add('flip');
  // console.log("Value of cart", target.dataset.value);

  if (!flippedCard) {
    flippedCard = true;
    firstCard = target;
  } else {
    flippedCard = false;
    secondCard = target;

    checkForMatch();
  }
};

const checkForMatch = () => {
  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
  } else {
  boardLocked = true;
  setTimeout(() => {
    firstCard.classList.remove("flip")
    secondCard.classList.remove("flip")
    resetCard();
  }, 1000)
  }
}

cards.forEach(card => {
  card.addEventListener('click', flipCard);
  const randomCards = Math.floor(Math.random() * cards.length);
  console.log("RANDOM CARDS", randomCards);
  card.style.order = randomCards;
});

const resetCard = () => {
  // [flippedCard, boardLocked] = [false, false];
  // [firstCard, secondCard] = [null, null];
  flippedCard = boardLocked = false;
  firstCard = secondCard = null;
}
