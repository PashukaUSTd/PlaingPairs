function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function renderCard(deck, fieldSize) {
  const renderedDeck = [];
  const shuffledDeck = shuffle(deck);
  shuffledDeck.splice((fieldSize*2), deck.length)
  shuffledDeck.forEach(e => {
    const model = `
    <div class="flip-container" ontouchstart="this.classList.toggle('hover');">
      <div class="flipper">
       <div class="front">
          <img src = "/images/kanoha.jpeg"></img>
       </div>
       <div class="back">
          <img src="${e}"></img>
       </div>
      </div>
    </div>`;
    renderedDeck.push(model);
  })
  const shuffledRenderedDeck = shuffle(renderedDeck);
  shuffledRenderedDeck.forEach(e => {
    const $card = document.createElement('div');
    $card.innerHTML = e;
    $table.append($card);
  })
}

function createCardTable(fieldSize) {
  $table.classList.add('table');
  $table.classList.add(`table${fieldSize}x4`);
  renderCard(images, fieldSize);
  document.body.append($table);
}

function callFunc(quantity, fieldSize) {
  for (let count = 0; count < quantity; count++) {
    createCardTable(fieldSize);
  }
}

function compare(array) {
  let i = array.length;
  if (array.length === 1 || array[i - 2].innerHTML === array[i - 1].innerHTML) {
    return false;
  } else {
    return true;
  }
}

function checkClass(nodeList) {
  const array = [];
  nodeList.forEach(e => {
    array.push(e.classList.value)
  })
  return array.every(elem => elem === "flipper rotated");
}

function playPair(timerID) {
  const journal = [];
  const cards = document.querySelectorAll('.flipper');
  const $playAgain = document.createElement('button');
  $playAgain.classList.add('play-again');
  $playAgain.textContent = 'Сыграть еще раз';

  cards.forEach(e => e.addEventListener('click', () => {
    clearTimeout(timerID);

    if (!e.classList.contains('rotated')) {
      e.classList.add('rotated');
      if (journal.length >= 2) {
        journal.splice(0, 2);
      }
      journal.push(e)
      if (compare(journal)) {
        setTimeout(function() {
          journal[0].classList.remove('rotated');
          e.classList.remove('rotated');
        }, 400)
      }
    }

    if (checkClass(cards)) {
      document.body.append($playAgain);
    }

    timerID = setTimeout(function() {
      window.location.reload();
    }, 60000)
  }))

  $playAgain.addEventListener('click', () => {
    window.location.reload();
  })
}

const images = ['../images/naruto.jpeg', '../images/deidara.jpeg', '../images/saske.jpeg',
'../images/madara.jpeg', '../images/boruto.jpeg', '../images/kakashi.jpeg', '../images/minato.jpeg',
'../images/pain.jpeg','../images/itachi.png', '../images/jiraya.jpeg','../images/jogi.jpeg',
'../images/gaara.jpeg']
const $table = document.createElement('div');
const $button = document.querySelector('button');

$button.addEventListener('click', function(e) {
  e.preventDefault();

  const inputs = document.querySelectorAll('input');
  const form = document.querySelector('.form');

  inputs.forEach(e => {
    if (e.checked) {
      callFunc(2, +e.id);
    }
  })

  form.classList.add('visually-hidden');

  let timerID = setTimeout(function() {
    window.location.reload();
  }, 60000)

  playPair(timerID);
})





