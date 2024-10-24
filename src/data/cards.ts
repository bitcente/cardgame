import { Card } from "../classes/CardController"
import attackController from "../controllers/attackController"

export const cards: Card[] = [
    {
        id: "basic_walk",
        title: "Walk",
        description: "You gain 2 movement points.",
        energyCost: 1,
        effect({ source }) {
            source.addMovement(2)
        },
    },
    {
        id: "basic_punch",
        title: "Punch",
        description: "You deal 1 point of damage to anything.",
        energyCost: 1,
        range: 1,
        canCancel: true,
        effect({ source, entityTarget }) {
            attackController.prepareAttackToEntity(source, 1, this.range ?? 0)
        },
    },
    {
        id: "basic_cover",
        title: "Cover",
        description: "You gain 1 protection point.",
        energyCost: 2,
        effect({ source }) {
            source.addProtection(1)
        },
    },
    {
        id: "basic_dash",
        title: "Dash",
        description: "You quickly move 2 squares in a straight line.",
        energyCost: 3,
        effect({ source }) {
            console.log("DASH");
        },
    },
    {
        id: "basic_throw_knife",
        title: "Throw knife",
        description: "You throw a knife at something that is 3 squares away or less dealing 1 point of damage.",
        energyCost: 2,
        range: 3,
        effect({ source }) {
            // deal dmg if range enough
            attackController.prepareAttackToEntity(source, 1, this.range ?? 0)
        },
    },
]


