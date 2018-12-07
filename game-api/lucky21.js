module.exports = (context) => {
  const deckConstructor = context('deck');
  const deck = deckConstructor(context);

  const dealerConstructor = context('dealer');
  const dealer = dealerConstructor(context);

  dealer.shuffle(deck);
  const card0 = dealer.draw(deck);
  const card1 = dealer.draw(deck);
  const state = {
    deck: deck,
    dealer: dealer,
    cards: [
      card0,
      card1,
    ],
    // The card that the player thinks will exceed 21.
    card: undefined,
  };

  return {
    state: state,
    // Is the game over (true or false).
    // Is the game finished.
    // gameOver er hvort leikur inn sé ongoing
    isGameOver: (game) => {
      // Game is over when player has won the game or he has lost the game
      // To check if game is won => call gameWon
      // To check if game is lost => Guess is 21 or under and total is over.
      //                          => Guess is over 21 and total is under
      if (game.playerWon(game) // player won
                // Guess is 21 or under and total is over 21.
                || game.state.card === undefined && game.getTotal(game) > 21
                // Guess is over 21 and total is under or equal to 21
                || game.state.card !== undefined && game.getTotal(game) <= 21
      ) {
        return true;
      }
      return false;
    },
    // Has the player won (true or false).
    // playerWon segir til um hvort leikmaðurinn hafi tapað
    playerWon: (game) => {
      // Criteria for win
      //    => Guess is over 21 and total is over 21
      //    => Guess is under 21 and total is Exactly 21

      if (game.state.card !== undefined && game.getTotal(game) > 21 // Guess is over 21 and total is over 21
                || game.state.card === undefined && game.getTotal(game) === 21 // Guess is under 21 and total is Exactly 21
      ) {
        return true;
      }
      return false;
    },
    // The highest score the cards can yield without going over 21 (integer).
    getCardsValue: (game) => {
      let total = 0;
      const cards = game.getCards(game).slice().sort().reverse(); // Copy cards array so there will be no override
      // then reverse it so that the aces are evaluated last
      cards.forEach((card) => {
        const val = parseInt(card.substring(0, 2));

        if (val === 1) { // Aces
          if (total + 11 > 21) {
            total += 1;
          } else {
            total += 11;
          }
        } else if (val < 10) { // Regular card
          total += val;
        } else { // Royals
          total += 10;
        }
      });
      return total;
    },
    // The value of the card that should exceed 21 if it exists (integer or undefined).
    getCardValue: (game) => {
      if (game.getCard(game) === undefined) {
        return undefined;
      } else if (game.getCard(game).substring(0, 2) == '01') {
        // Ace. An Ace is worth 11 points unless that would yield a total higher than 21 then it's value is 1
        return 11;
      } else if (game.getCard(game).substring(0, 2).startsWith('0')) {
        // Normal Cards
        return parseInt(game.getCard(game).substring(1, 2));
      } else {
        // Royals, The Jack, Queen and King are worth 10 points
        return 10;
      }
    },
    // The cards value + the card value if it exits (integer).
    getTotal: (game) => {
      if (game.getCardValue(game) === undefined) {
        return game.getCardsValue(game);
      }
      return game.getCardValue(game)+ game.getCardsValue(game);
    },
    // The player's cards (array of strings).
    getCards: (game) => {
      return game.state.cards;
    },
    // The player's card (string or undefined).
    getCard: (game) => {
      return game.state.card;
    },
    // Player action (void).
    guess21OrUnder: (game) => {
      game.state.card = dealer.draw(deck);
      game.state.cards.push(game.getCard(game));
      game.state.card = undefined;
    },
    // Player action (void).
    guessOver21: (game) => {
      game.state.card = dealer.draw(deck);
    },
    getState: (game) => {
      return {
        card: game.state.card,
        cards: game.state.cards,
        total: game.getTotal(game),
        isGameOver: game.isGameOver(game),
        playerWon: game.playerWon(game),
      };
    },
  };
};
