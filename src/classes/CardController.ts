import { global } from "../states/global"
import { Entity } from "./Entity"
import * as THREE from "three"

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
    quick?: boolean,
    range?: number,
    effect: (args: CardEffectProps) => void,
}

export interface CardControllerProps {
    deck: Card[],
    ownerEntity: Entity,
    maxOfCardsInHand?: number
}

export class CardController {
    private _originalDeck: Card[]
    private _deck: Card[]
    private _hand: Card[] = []
    private _discardPile: Card[] = []
    private _maxOfCardsInHand: number = 5
    private _ownerEntity: Entity

    public constructor({
        deck,
        ownerEntity,
        maxOfCardsInHand
    }: CardControllerProps) {
        this._originalDeck = deck
        this._deck = deck
        this._ownerEntity = ownerEntity
        if (maxOfCardsInHand) this._maxOfCardsInHand = maxOfCardsInHand

        global.UPDATE.push(this.update.bind(this))
    }

    public suffle() {
        this._deck.sort(() => Math.random() - 0.5);
    }

    private extractFromDeck(numberOfCardsToExtract: number): Card[] {
        this.suffle()
        if (!this.deck.length) {
            return []
        } if (this.deck.length < numberOfCardsToExtract) {
            return this.deck.splice(0, this.deck.length)
        } else {
            return this.deck.splice(0, numberOfCardsToExtract)
        }
    }

    public drawHand(): Card[] {
        const drawnHand = this.extractFromDeck(5)
        for (let i = 0; i < drawnHand.length; i++) {
            this.createCard(drawnHand[i].id)
        }
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
        this.createCard(drawnCard.id)
        return drawnCard
    }

    useCard(index: number, entityTarget?: Entity) {
        const cardToUse = this._hand[index]
        if (!cardToUse) return
        cardToUse.effect({source: this._ownerEntity, entityTarget: entityTarget || null})
        this._hand.splice(index, 1)
        this._discardPile.push(cardToUse)
    }

    createCard(cardId: string) {
        // TODO: add it in HTML
    }

    update() {
        for (let i = 0; i < this.hand.length; i++) {
            const card = this.hand[i];
        }
    }


    // GETTERS
    get originalDeck() {
        return this._originalDeck
    }
    get deck() {
        return this._deck
    }
    get hand() {
        return this._hand
    }
    get discardPile() {
        return this._discardPile
    }
    get maxOfCardsInHand() {
        return this._maxOfCardsInHand
    }
    get ownerEntity() {
        return this._ownerEntity
    }
}