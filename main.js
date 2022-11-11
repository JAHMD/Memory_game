const user = document.querySelector(".game .user span");
const score = document.querySelector(".game .score span");
const cards = document.querySelectorAll(".cards-container .card");
const cardsContainer = document.querySelector(".cards-container");
const startBtn = document.querySelector(".start-btn");

let flipped = [];
let sameCards = [];
let scoreCounter = 0;
let state = null;
// startting the game
startBtn.addEventListener("click", () => {
  if (state) {
    user.innerText = state;
  } else {
    state = prompt("Enter your name");
    if (state) user.innerText = state;
    else {
      state = "Guests";
      user.innerText = state;
    }
  }
  startBtn.innerText = "Loading...";
  startBtn.parentElement.style.display = "none";
  showCards();
  startBtn.innerText = "Play";
});
cards.forEach((card) => {
  card.addEventListener("click", () => {
    flipCards(card.firstElementChild);
    setTimeout(() => {
      if (sameCards.length === 20) {
        for (let i = 0; i < sameCards.length; i++) {
          sameCards[i].classList.remove("flip");
        }
        sameCards = [];
        score.innerText = 0;
        startBtn.parentElement.style.display = "flex";
      }
    }, 500);
  });
});
// flips cards function
function flipCards(card) {
  if (!card.classList.contains("flip")) {
    card.classList.add("flip");
    setTimeout(() => {
      flipped.push(card);
    }, 500);
    setTimeout(() => {
      if (flipped.length === 2) {
        if (
          flipped[0].getAttribute("data-id") ===
          flipped[1].getAttribute("data-id")
        ) {
          for (let i = 0; i < flipped.length; i++) {
            sameCards.push(flipped[i]);
          }
        } else {
          score.innerText = ++scoreCounter;
          for (let i = 0; i < flipped.length; i++) {
            flipped[i].classList.remove("flip");
          }
        }
        flipped = [];
      }
    }, 500);
  }
}
// make the cards in random order every time
function randomCards() {
  const randomCards = [...cards].sort((a, b) => Math.random() - 0.5);
  cardsContainer.innerText = "";
  randomCards.forEach((card) => {
    cardsContainer.appendChild(card);
  });
}
// appear cards at the begining of the game
function showCards() {
  randomCards();
  cards.forEach((card) => {
    card.firstElementChild.classList.add("flip");
  });
  setTimeout(() => {
    cards.forEach((card) => card.firstElementChild.classList.remove("flip"));
  }, 2200);
}
