import { Coords } from "../settings"

export type StatPoints = {
    HEALTH: number,
    MAX_HEALTH: number,
    MOVEMENT?: number,
    PROTECTION?: number,
    ENERGY?: number,
    MAX_ENERGY?: number,
}

export const defaultLootableObjectStats: StatPoints = {
    HEALTH: 3,
    MAX_HEALTH: 3,
}

export type EntityProps = {
    id: string,
    nameTag: string,
    baseStats: StatPoints,
    position?: Coords
}

export class Entity {
    private _id: string
    private _nameTag: string
    private _baseStats: StatPoints
    private _modifiedStats: StatPoints
    private _position: Coords | null = null

    public constructor({
        id,
        nameTag,
        baseStats,
        position
    }: EntityProps) {
        this._id = id
        this._nameTag = nameTag
        this._baseStats = baseStats
        this._modifiedStats = baseStats
        position ? this._position = position : null
    }

    public placeOnBoard(position: Coords) {
        this._position = position
        // More stuff
    }


    // STATS ADDITIONS
    public addMovement(movementPoints: number): void {
        if (movementPoints > 0 && this._modifiedStats.MOVEMENT) {
            this._modifiedStats.MOVEMENT += movementPoints
        }
    }
    public addProtection(protectionPoints: number): void {
        if (protectionPoints > 0 && this._modifiedStats.PROTECTION) {
            this._modifiedStats.PROTECTION += protectionPoints
        }
    }
    public addEnergy(energyPoints: number): void {
        if (
            energyPoints > 0 && 
            this._modifiedStats.ENERGY && this._baseStats.MAX_ENERGY &&
            this._modifiedStats.ENERGY < this._baseStats.MAX_ENERGY // If energy is not full
        ) {
            // Prevent entity from having more energy than its max capacity
            this._modifiedStats.ENERGY = Math.min(
                energyPoints + this._modifiedStats.ENERGY, 
                this._baseStats.MAX_ENERGY
            )
        }
    }
    public addHealth(healthPoints: number): void {
        if (
            healthPoints > 0 && 
            this._modifiedStats.HEALTH < this._baseStats.MAX_HEALTH // If health is not full
        ) {
            // Prevent entity from having more health than its max capacity
            this._modifiedStats.HEALTH = Math.min(
                healthPoints + this._modifiedStats.HEALTH, 
                this._baseStats.MAX_HEALTH
            )
        }
    }


    // STATS SUBTRACTIONS
    public subtractMovement(movementPoints: number): number | undefined {
        if (movementPoints <= 0) return
        if (!this._modifiedStats.MOVEMENT) return
        // Cap at 0
        Math.max(
            this._modifiedStats.MOVEMENT - movementPoints,
            0
        )
        // Return end value
        return this._modifiedStats.MOVEMENT
    }
    public subtractProtection(protectionPoints: number): number | undefined {
        if (protectionPoints <= 0) return
        if (!this._modifiedStats.PROTECTION) return
        // Cap at 0
        this._modifiedStats.PROTECTION = Math.max(
            this._modifiedStats.PROTECTION - protectionPoints,
            0
        )
        // Return end value
        return this._modifiedStats.PROTECTION
    }
    public subtractEnergy(energyPoints: number): number | undefined {
        if (energyPoints <= 0) return
        if (!this._modifiedStats.ENERGY) return
        // Cap at 0
        this._modifiedStats.ENERGY = Math.max(
            this._modifiedStats.ENERGY - energyPoints,
            0
        )
        // Return end value
        return this._modifiedStats.ENERGY
    }
    public takeDamage(damage: number) {
        if (damage <= 0) return
        if (!this._modifiedStats.PROTECTION) return
        // Damage overpasses protection
        if (damage > this._modifiedStats.PROTECTION) {
            const remainingDamage = this._modifiedStats.PROTECTION - damage
            this.subtractProtection(this._modifiedStats.PROTECTION)
            if (remainingDamage >= this._modifiedStats.HEALTH) {
                this._modifiedStats.HEALTH = 0
            }
        } else {
            // Protection can handle damage by itself
            this.subtractProtection(damage)
        }
    }

    public resetStats() {
        this._modifiedStats.MOVEMENT = this._baseStats.MOVEMENT
        this._modifiedStats.PROTECTION = this._baseStats.PROTECTION
        this._modifiedStats.ENERGY = this._baseStats.MAX_ENERGY
    }


    // ENTITY STATES
    public isDead(): boolean {
        return this._modifiedStats.HEALTH === 0
    }
    public canMove(): boolean {
        return this._modifiedStats.MOVEMENT ? this._modifiedStats.MOVEMENT > 0 : false
    }
    public hasProtection(): boolean {
        return this._modifiedStats.PROTECTION ? this._modifiedStats.PROTECTION > 0 : false
    }
    public hasEnoughEnergy(energy: number): boolean {
        return this._modifiedStats.ENERGY ? this._modifiedStats.ENERGY >= energy : false
    }


    // GETTERS
    get id(): string {
        return this._id
    }
    get nameTag(): string {
        return this._nameTag
    }
    get position(): Coords | null {
        return this._position
    }
    get health(): number {
        return this._modifiedStats.HEALTH
    }
    get maxHealth(): number {
        return this._baseStats.MAX_HEALTH
    }
    get energy(): number {
        return this._modifiedStats.ENERGY || 0
    }
    get maxEnergy(): number {
        return this._baseStats.MAX_ENERGY || 0
    }
    get movement(): number {
        return this._modifiedStats.MOVEMENT || 0
    }
    get protection(): number {
        return this._modifiedStats.PROTECTION || 0
    }


    // SETTERS
    set position(newPosition: Coords | null) {
        this._position = newPosition
    }
}