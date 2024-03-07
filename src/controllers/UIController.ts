

class UIController {
    private _UIEnergy: HTMLElement | null = document.getElementById("energy-counter")
    private _UIMaxEnergy: HTMLElement | null = document.getElementById("max-energy-counter")
    private _UIDeckCounter: HTMLElement | null = document.getElementById("deck-counter")
    private _UIDiscardPileCounter: HTMLElement | null = document.getElementById("discard-pile-counter")

    constructor() {

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
}

export default new UIController()