import { Entity } from "./Entity"

export type CardEffectProps = {
    source: Entity,
    entityTarget: Entity | null
}

export type Card = {
    id: string,
    title: string,
    image?: string,
    description: string,
    energyCost?: number,
    effect: (args: CardEffectProps) => void,
}

export interface CardControllerProps {
    deck: Card[],
    ownerEntity: Entity,
    maxOfCardsInHand?: number
}

export class CardController {
    _deck: Card[]
    _hand: Card[] = []
    _discardPile: Card[] = []
    _maxOfCardsInHand: number = 5
    _ownerEntity: Entity

    public constructor({
        deck,
        ownerEntity,
        maxOfCardsInHand
    }: CardControllerProps) {
        this._deck = deck
        this._ownerEntity = ownerEntity
        if (maxOfCardsInHand) this._maxOfCardsInHand = maxOfCardsInHand
    }

    public suffle() {
        this._deck.sort(() => Math.random() - 0.5);
    }

    private extractFromDeck(numberOfCardsToExtract: number): Card[] {
        this.suffle()
        return this._deck.slice(0, numberOfCardsToExtract)
    }

    public drawHand(): Card[] {
        const drawnHand = this.extractFromDeck(5)
        return this._hand = drawnHand
    }

    public drawCard(): Card {
        // Put all cards from the discard pile to the deck if deck is empty
        if (this._deck.length <= 0) {
            this._deck = this._discardPile
            this._discardPile = []
        }
        const drawnCard = this.extractFromDeck(1)[0]
        // Add card to hand
        this._hand.push(drawnCard)
        return drawnCard
    }

    useCard(index: number, entityTarget?: Entity) {
        const cardToUse = this._hand[index]
        if (!cardToUse) return
        cardToUse.effect({source: this._ownerEntity, entityTarget: entityTarget || null})
        this._hand.splice(index, 1)
        this._discardPile.push(cardToUse)
    }

}