const deckConstructor = require('./deck.js');
const dealerConstructor = require('./dealer.js');
const lucky21Constructor = require('./lucky21.js');

test('a new game should have 50 cards left in the deck', () => {
  let deck = deckConstructor();
  let dealer = dealerConstructor();
  let game = lucky21Constructor(deck, dealer);
  expect(game.state.deck.length).toEqual(50);
});

test('a new game should have 2 drawn cards', () => {
  let deck = deckConstructor();
  let dealer = dealerConstructor();
  let game = lucky21Constructor(deck, dealer);
  expect(game.state.cards.length).toEqual(2);
});

test('guess21OrUnder should draw the next card', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '10H', '09S', '01D', '05L',
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  
  // Act
  game.guess21OrUnder(game, dealer);
  
  // Assert
  // console.log(game.state.cards);
  expect(game.state.cards.length).toEqual(3);
  expect(game.state.cards[2]).toEqual('01D');
});

test('guessOver21 should draw the next card', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '10H', '09S', '01D', '05L',
  ];
  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  
  // Act
  game.guessOver21(game, dealer);
  
  // Assert
  // console.log(game.state.cards);
  expect(game.state.cards.length).toEqual(3);
  expect(game.state.cards[2]).toEqual('01D');
});

test('getCard of valid card', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '10H', '09S', '01D', '05L',
  ];

  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  
  // Act
  var res = game.getCard('05L');
  game.state.card = dealer.draw(deck);

  // Assert
  // console.log(game.state.cards);
  expect(game.state.card).toEqual('01S');
  // expect(game.state.cards[2]).toEqual('01D');
});

test('getCard of undefined card', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '10H', '09S', '01D', '05L',
  ];

  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  
  // Act
  var res = game.getCard(game);

  // Assert
  // console.log(game.state.cards);
  expect(game.state.card).toBe(undefined);
});


test('getCard get all of the players cards after draw', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
      '10H', '09S', '01D', '05L',
  ];

  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => {};
  
  // Inject our dependencies
  let game = lucky21Constructor(deck, dealer);
  
  // Act
  
  game.state.card = dealer.draw(deck);
  game.state.card = dealer.draw(deck);
  
  var res = game.getCards(game);
  // Assert
  // console.log(game.state.cards);
  expect(res).toBe(['05L', '01D', '09S', '10H']);
});


//Test drawing all cards in a deck?
//Test if first two cards exceed 21?