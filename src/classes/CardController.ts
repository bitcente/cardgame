import { pointer } from "../components/inputController"
import UIController from "../controllers/UIController"
import { global } from "../states/global"
import { input } from "../states/input"
import { makeId } from "../utils/utils"
import { Entity } from "./Entity"
import * as THREE from "three"

export type CardEffectProps = {
    source: Entity,
    entityTarget: Entity | null
}

export type Card = {
    id: string,
    generatedId?: string,
    title: string,
    image?: string,
    description: string,
    energyCost?: number,
    quick?: boolean,
    range?: number,
    effect: (args: CardEffectProps) => void,
}

export type CardHTML = Card & {
    transform?: string,
    bottom?: string,
    left?: string,
}

export interface CardControllerProps {
    deck: Card[],
    ownerEntity: Entity,
    maxOfCardsInHand?: number
}

export class CardController {
    private _originalDeck: Card[]
    private _deck: Card[]
    private _hand: CardHTML[] = []
    private _discardPile: Card[] = []
    private _maxOfCardsInHand: number = 5
    private _ownerEntity: Entity
    private _handHTML: HTMLElement | null = document.getElementById("hand")

    private a = -.02
    private h = 5
    private k = .5

    private cardHovered = false

    private diff = .1
    private multi = 1.6

    private pointerEnterCardBinded: (e: MouseEvent) => void
    private pointerLeaveCardBinded: (e: MouseEvent) => void
    private pointerDownCardBinded: (e: MouseEvent) => void
    private pointerUpCardBinded: (e: MouseEvent) => void

    public constructor({
        deck,
        ownerEntity,
        maxOfCardsInHand
    }: CardControllerProps) {
        this._originalDeck = deck
        this._deck = this.makeDeckCardsUnique(deck)
        UIController.deckCounter = this._deck.length
        
        this._ownerEntity = ownerEntity
        if (maxOfCardsInHand) this._maxOfCardsInHand = maxOfCardsInHand

        // It's necessary to put pointer methods inside variables to dispose them correctly
        this.pointerEnterCardBinded = this.pointerEnterCard.bind(this)
        this.pointerLeaveCardBinded = this.pointerLeaveCard.bind(this)
        this.pointerDownCardBinded = this.pointerDownCard.bind(this)
        this.pointerUpCardBinded = this.pointerUpCard.bind(this)

        // this is only for testing purposes
        window.addEventListener('keypress', (e) => {
            // discard hand
            if (e.key === 'x') {
                this.discardHand()
            }
            // fill hand
            if (e.key === 'd') {
                this.drawHand()
            }
            // reset turn
            if (e.key === 'r') {
                this.discardHand(() => {
                    this._ownerEntity.resetTurn()
                    setTimeout(() => {
                        this.drawHand()
                    }, 200);
                })
            }
        })
    }

    private makeDeckCardsUnique(deck: Card[]) {
        const deckToTransform = deck
        for (let i = 0; i < deckToTransform.length; i++) {
            const newId = makeId(7)
            deckToTransform[i].generatedId = newId
        }
        return deckToTransform
    }

    public suffle() {
        this._deck.sort(() => Math.random() - 0.5);
    }

    private extractFromDeck(numberOfCardsToExtract: number): Card[] {
        this.suffle()
        if (!this._deck.length) {
            return []
        } if (this._deck.length < numberOfCardsToExtract) {
            return this._deck.splice(0, this._deck.length)
        } else {
            return this._deck.splice(0, numberOfCardsToExtract)
        }
    }

    public drawHand() {
        for (let i = 0; i < this._maxOfCardsInHand; i++) {
            setTimeout(() => {
                this.drawCard()
            }, i * 350);
        }
    }

    public drawCard(): Card {
        // Put all cards from the discard pile to the deck if deck is empty
        if (this._deck.length <= 0) {
            this._deck = this._discardPile
            this._discardPile = []
            UIController.discardPileCounter = this._discardPile.length
        }
        const drawnCard = this.extractFromDeck(1)[0]
        UIController.deckCounter = this._deck.length
        // Add card to hand
        this._hand.push(drawnCard)
        this.createCard(drawnCard)
        return drawnCard
    }

    private removeCardEventListeners(htmlCard: HTMLElement) {
        if (!htmlCard) return
        htmlCard.removeEventListener('mouseenter', this.pointerEnterCardBinded)
        htmlCard.removeEventListener('mouseleave', this.pointerLeaveCardBinded)
        htmlCard.removeEventListener('mousedown', this.pointerDownCardBinded)
        htmlCard.removeEventListener('mouseup', this.pointerUpCardBinded)
    }

    private removeCardFromHand(id: string, htmlCard: HTMLElement, abstractCard: CardHTML) {
        htmlCard.remove()
        this.alignCards()
        this._hand.splice(this._hand.findIndex((card) => card.generatedId === id), 1)
        this._discardPile.push(abstractCard)
        UIController.discardPileCounter = this._discardPile.length
    }

    public discardHand(callBack?: () => void) {
        let cards = document.getElementsByClassName("card") as HTMLCollectionOf<HTMLElement>
        if (cards.length) {
            Array.from(cards).forEach((card, i) => {
                setTimeout(() => {
                    this.discardCard(card.id)
                    
                    if (cards.length == 1) {
                        callBack && callBack()
                    }
                }, i * 350);
            })
        } else {
            callBack && callBack()
        }
    }

    public discardCard(id: string) {
        const cardToUse = this._hand.filter(card => {
            return card.generatedId === id
        })[0]
        
        const htmlCard = this._handHTML?.querySelector('#'+id) as HTMLElement
        if (htmlCard) {
            this.removeCardEventListeners(htmlCard)
            htmlCard.classList.add('discarted')
            setTimeout(() => {
                this.removeCardFromHand(id, htmlCard, cardToUse)
            }, 200);
        }
    }

    useCard(id: string, entityTarget?: Entity) {
        const cardToUse = this._hand.filter(card => {
            return card.generatedId === id
        })[0]
        
        if (!cardToUse) return
        cardToUse.effect({source: this._ownerEntity, entityTarget: entityTarget || null})
        const htmlCard = this._handHTML?.querySelector('#'+id) as HTMLElement
        if (htmlCard) {
            this.removeCardEventListeners(htmlCard)
            htmlCard.classList.add('used')
            setTimeout(() => {
                this.removeCardFromHand(id, htmlCard, cardToUse)
            }, 200);
            this._ownerEntity.subtractEnergy(cardToUse.energyCost || 0)
            UIController.energy = this._ownerEntity.energy
        }
    }


    // HTML
    canUseCard(cardHTML: HTMLElement) {
        const abstractCard = this._hand.filter(aCard => {
            return aCard.generatedId === cardHTML.id
        })[0]
        return !abstractCard.energyCost || this._ownerEntity.energy >= abstractCard.energyCost
    }

    pointerEnterCard(e: MouseEvent) {
        input.HOVER_HAND = true
        const card = e.target as HTMLElement
        if (!card.classList.contains('cant-play')) {
            card.classList.add('is-hovered')
            this.cardHovered = true
            this.alignCards()
        }
    }
    pointerLeaveCard(e: MouseEvent) {
        input.HOVER_HAND = false
        const card = e.target as HTMLElement
        card.classList.remove('is-hovered')
        this.cardHovered = false
        this.alignCards()
    }
    pointerDownCard(e: MouseEvent) {
        const card = e.target as HTMLElement
        if (!card.classList.contains('cant-play')) {
            card.classList.add('dragging')
        }
    }
    pointerUpCard(e: MouseEvent) {
        const card = e.target as HTMLElement
        card.classList.remove('dragging')

        if (pointer.y >= -.2) {
            this.useCard(card.id)
            input.HOVER_HAND = false
            this.cardHovered = false
            this.alignCards()
        }
    }
    

    createCard(card: Card) {
        if (!card) return
        
        const divCard = document.createElement("DIV")
        divCard.id = card.generatedId || card.id
        divCard.classList.add('card')
        divCard.innerHTML = `
            <span class="value">${card.title}</span> 
            <span class="cost">${card.energyCost}</span>
            <span class="description">${card.description}</span>
        `;
        divCard.addEventListener('mouseenter', this.pointerEnterCardBinded)
        divCard.addEventListener('mouseleave', this.pointerLeaveCardBinded)
        divCard.addEventListener('mousedown', this.pointerDownCardBinded)
        divCard.addEventListener('mouseup', this.pointerUpCardBinded)
        setTimeout(() => {
            divCard.classList.add('created')
        }, 0);
        this._handHTML?.appendChild(divCard)
        this.alignCards()
    }

    alignCards() {
        let cards = document.getElementsByClassName("card") as HTMLCollectionOf<HTMLElement>
        
        let count = cards.length
        const hand = this._handHTML

        
        Array.from(cards).forEach((card, i) => {
            if (!this.canUseCard(card)) {
                card.classList.add('cant-play')
            } else {
                card.classList.remove('cant-play')
            }
            const isHovered = card.classList.contains('is-hovered')

            let width = Number(card.offsetWidth)
            let left = width * i / (this.cardHovered ? 1.5 : 2) - (this.cardHovered ? width * .1 : 0)
            let totalwidth = count * (width / 2) + width / (this.cardHovered ? 1.2 : 2);
            let handwidth = /* Number(hand?.offsetWidth) */ 560

            if(totalwidth > handwidth){
                //shift the cards to fit with minimal margin leftover
                let overflow = totalwidth - handwidth
                let shift = (overflow / (count - 1))
                left -= shift * i
                totalwidth = handwidth
            }
            let leftdif = (handwidth - totalwidth) / 2
            
            left += leftdif
            card.style.left = left + (window.innerWidth / 2 - handwidth / 2) + 'px'

            let center = left + width / (this.cardHovered ? 2.5 : 2)
            let xpos = center / handwidth * 10
            let ypos = this.getypos(xpos)
            let rot = this.getrotation(xpos)

            if (hand) {
                let bottom = (ypos / this.k) * /* Number(hand.offsetHeight) */ 315 / 4 + (isHovered ? 50 : 0)
                card.style.bottom = bottom + "px"
                card.style.transform = "rotate(" + (isHovered ? rot * .5 : rot) + "deg)"
            }

        })
    }

    getrotation(xpos: number){
        let ypos = this.getypos(xpos);
        if(xpos < this.h){
            //left of the vertex
            let newx = xpos + this.diff;
            let newy = this.getypos(newx);
    
            let adjacent = newx - xpos;
            let opposite = newy - ypos;
            let angle = Math.atan(opposite / adjacent);
            angle *= 180;
            angle /= Math.PI;
            angle = 0 - angle;
            return angle * this.multi;
        }
        else if(xpos > this.h){
            //right of the vertex
            let newx = xpos - this.diff;
            let newy = this.getypos(newx);
    
            let adjacent = newx - xpos;
            let opposite = newy - ypos;
            let angle = Math.atan(opposite / adjacent);
            angle *= 180;
            angle /= Math.PI;
            angle = 0 - angle;
            return angle * this.multi;
        }
        else{
            //on the vertex
            return 0;
        }
    }

    getypos(xpos: number) {
        let ypos = this.a * Math.pow((xpos - this.h), 2) + this.k;
        return ypos;
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