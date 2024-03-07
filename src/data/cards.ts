import { Card } from "../classes/CardController"

export const cards: Card[] = [
    {
        id: "basic_walk",
        title: "Walk",
        description: "You gain 2 movement points.",
        energyCost: 1,
        effect({ source }) {
            source.addMovement(2)
            console.log(source);
            
        },
    },
    {
        id: "basic_punch",
        title: "Punch",
        description: "You deal 1 point of damage to anything.",
        energyCost: 1,
        range: 1,
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
        description: "You throw a knife at something that is 3 squares away or less.",
        energyCost: 2,
        range: 3,
        effect({ entityTarget }) {
            // deal dmg if range enough
            entityTarget?.takeDamage(1)
        },
    },
]


