import { Card } from "../classes/CardController"
import { playerState } from "../states/player"
import attackController from "./attackController"


class UIController {
    private _UIEnergy: HTMLElement | null = document.getElementById("energy-counter")
    private _UIMaxEnergy: HTMLElement | null = document.getElementById("max-energy-counter")
    private _UIDeckCounter: HTMLElement | null = document.getElementById("deck-counter")
    private _UIDiscardPileCounter: HTMLElement | null = document.getElementById("discard-pile-counter")

    private _UIAttacking: HTMLElement | null = document.getElementById("attacking")

    private _UICancelAttackAction: HTMLElement | null = document.getElementById("cancel-attack-action")

    private _UIChat: HTMLElement | null = document.getElementById("chat")

    constructor() {
        this._UICancelAttackAction?.addEventListener('click', () => {
            const lastCancellableCardUsed = playerState.PLAYER.cardController.history.reverse().find((card: Card) => card.canCancel == true)
            playerState.PLAYER.cardController.extractFromDiscardPile(lastCancellableCardUsed.generatedId)
            attackController.cancelAttackEntity()
        })
    }

    
    set attacking(attacking: boolean) {
        if (attacking) {
            this._UIAttacking?.classList.remove('hidden')
            this._UICancelAttackAction?.classList.remove('hidden')
        } 
        if (!attacking) {
            this._UIAttacking?.classList.add('hidden')
            this._UICancelAttackAction?.classList.add('hidden')
        } 
    }

    set health(health: number) {
        
    }
    set maxHealth(maxHealth: number) {

    }
    set movement(movement: number) {

    }
    set protection(protection: number) {

    }
    set energy(energy: number) {
        if (this._UIEnergy) this._UIEnergy.innerText = String(energy)
    }
    set maxEnergy(maxEnergy: number) {
        if (this._UIMaxEnergy) this._UIMaxEnergy.innerText = String(maxEnergy)
    }
    set deckCounter(deckCounter: number) {
        if (this._UIDeckCounter) this._UIDeckCounter.innerText = String(deckCounter)
    }
    set discardPileCounter(discardPileCounter: number) {
        if (this._UIDiscardPileCounter) this._UIDiscardPileCounter.innerText = String(discardPileCounter)
    }


    sendMessage(message: string) {
        if (!this._UIChat) return

        const text = document.createElement('P')
        text.innerText = message
        this._UIChat.appendChild(text)
        if (this._UIChat.childElementCount > 12) {
            this._UIChat.removeChild(this._UIChat.children[0])
        }
    }
}

export default new UIController()