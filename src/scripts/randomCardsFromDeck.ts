import { Card } from "../classes/CardController"

export function randomCardsFromDeck(deck: Card[], numberOfCards =  4): Card[] {
    const cards: Card[] = []

    const alreadyReturnedIndexes: number[] = []

    Array.from(new Array(numberOfCards)).forEach((card) => {
        let index = Math.floor(Math.random() * deck.length)
        while (alreadyReturnedIndexes.includes(index)) {
            index = Math.floor(Math.random() * deck.length)
        }
        cards.push(deck[index])
        alreadyReturnedIndexes.push(index)
    })

    return cards
}