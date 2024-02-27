import { Card } from "../classes/CardController"

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
        effect({ entityTarget }) {
            entityTarget?.takeDamage(1)
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
]


