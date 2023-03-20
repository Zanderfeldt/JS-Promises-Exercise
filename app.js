let favoriteNumber = 11;
let baseURL = 'http://numbersapi.com';

//P1
$.getJSON(`${baseURL}/${favoriteNumber}?json`).then(data =>{
  console.log(data);
})

//P2
let favoriteNumbers = [11, 33, 44]
$.getJSON(`${baseURL}/${favoriteNumbers}?json`).then(data =>{
  console.log(data);
})

//P3
Promise.all(
  Array.from({ length: 4}, () => {
    return $.getJSON(`${baseURL}/${favoriteNumber}?json`);
  })
).then(data => {
  data.forEach(data => $('body').append(`<p>${data.text}</p>`));
});

//===========================================================
let deckURL = 'https://deckofcardsapi.com/api/deck'

//P1
$.getJSON(`${deckURL}/new/draw/?count=1`).then(data => {
  let value = data.cards[0].value;
  let suit = data.cards[0].suit;
  console.log(`${value} of ${suit}`);
});

//P2
$.getJSON(`${deckURL}/new/draw/?count=1`).then(data => {
  let value = data.cards[0].value;
  let suit = data.cards[0].suit;
  console.log(`${value} of ${suit}`);
  return $.getJSON(`${deckURL}/${data.deck_id}/draw/?count=1`)
}).then(data => {
  let value = data.cards[0].value;
  let suit = data.cards[0].suit;
  console.log(`${value} of ${suit}`);
});

//P3
let deckId = null
let $btn = $('button')
let $cardArea = $('#card-area')

$.getJSON(`${deckURL}/new/shuffle/`).then(data => {
  deckId = data.deck_id;
  $btn.show();
});

$btn.on('click', () => {
  $.getJSON(`${deckURL}/${deckId}/draw/`).then(data => {
    let cardImg = data.cards[0].image;
    $cardArea.append($(`<img src='${cardImg}' style='position: absolute'>`));
    if (data.remaining === 0) {
      $btn.remove();
    }
  });
});