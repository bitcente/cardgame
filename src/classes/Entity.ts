import { Coords, Rotation } from "../settings"
import { global } from "../states/global"

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
    rotation?: Rotation
}

export class Entity {
    private _id: string
    private _nameTag: string
    private _baseStats: StatPoints
    private _modifiedStats: StatPoints
    private _position: Coords
    private _rotation: Rotation
    private _mesh: THREE.Group | undefined

    public constructor({
        id,
        nameTag,
        baseStats,
        position = {x: 0, z: 0},
        rotation = {y: 0},
    }: EntityProps) {
        this._id = id
        this._nameTag = nameTag
        this._baseStats = baseStats
        this._modifiedStats = baseStats
        this._position = position
        this._rotation = rotation
    }

    public placeOnBoard(position: Coords) {
        if (!this._mesh) return
        if (position.x == null) return
        if (position.z == null) return

        this._position = position
        
        global.scene?.add(this._mesh)
        this._mesh.position.set(position.x * 2, 0, position.z * 2)
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
    get rotation(): Rotation {
        return this._rotation
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
    get mesh(): THREE.Group | undefined {
        return this._mesh
    }


    // SETTERS
    set position({x, z}: Coords) {
        this._position = {x, z}
        this._mesh?.position.set(x || 0, 0, z || 0)
        console.log(x, z);
        
    }
    set rotation(newRotation: Rotation) {
        this._rotation = newRotation
    }
    set mesh(newMesh: THREE.Group) {
        this._mesh = newMesh
        this.placeOnBoard(this._position)
    }
}