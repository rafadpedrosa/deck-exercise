const defaultSuitSortOrder = ["HEARTS", "DIAMONDS", "CLUBS", "SPADES"];
const defaultCardSortOrder = {
  2: 1,
  A: 2,
  K: 3,
  Q: 4,
  J: 5,
  0: 6,
  9: 7,
  8: 8,
  7: 9,
  6: 10,
  5: 11,
  4: 12,
  3: 13,
};

// > 0	sort b before a
// < 0	sort a before b
// === 0	keep original order of a and b

const sortCardValue = (cards, sortOrder) => {
  const sortedCards = cards.sort((a, b) => {
    const cardAIndexOf = sortOrder[a.code.substr(0, 1)];
    const cardBIndexOf = sortOrder[b.code.substr(0, 1)];

    if (cardAIndexOf > cardBIndexOf) {
      return 1;
    } else if (cardAIndexOf < cardBIndexOf) {
      return -1;
    } else {
      return 0;
    }
  });

  return sortedCards;
};

export const sortSuitsByRotation = (deck, rotationCard) => {
  const suitSortOrder = buildSuitOrderByCardSuit(rotationCard.suit);
  const cardSortOrder = buildCardSortOrderByCard(rotationCard);

  return sortSuits(deck, suitSortOrder, cardSortOrder);
};

export const sortSuits = (
  deck,
  suitSortOrder = defaultSuitSortOrder,
  sortCardOrder = defaultCardSortOrder
) => {
  const reducedDeck = deck.reduce((accumulator, next) => {
    const suitAccumulator = accumulator[next.suit] || [];

    suitAccumulator.push(next);

    accumulator[next.suit] = suitAccumulator;

    return accumulator;
  }, {});

  const sortedSuits = suitSortOrder.reduce((accumulator, suit) => {
    const result = sortCardValue(reducedDeck[suit] || [], sortCardOrder);

    return accumulator.concat(result);
  }, []);

  return sortedSuits;
};

const buildSuitOrderByCardSuit = (suit) => {
  const copyDefaultSuitSortOrder = [...defaultSuitSortOrder];
  const suitIndex = copyDefaultSuitSortOrder.indexOf(suit);
  const suitSortOrder = copyDefaultSuitSortOrder.splice(suitIndex) || [];

  return suitSortOrder.concat(copyDefaultSuitSortOrder);
};

const buildCardSortOrderByCard = (card) => {
  const copyDefaultCardSortOrder = [...Object.keys(defaultCardSortOrder)];
  const cardIndex = copyDefaultCardSortOrder.indexOf(card.code.substr(0, 1));

  let cardKeysSortOrder = copyDefaultCardSortOrder.splice(cardIndex) || [];
  cardKeysSortOrder = cardKeysSortOrder.concat(copyDefaultCardSortOrder);

  return cardKeysSortOrder.reduce((accumulator, card, index) => {
    accumulator[card] = index + 1;

    return accumulator;
  }, {});
};
