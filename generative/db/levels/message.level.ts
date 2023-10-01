export const messageLevels = [
    { id: 1, name: 'Novice Enthusiast', pointRange: [0, 11] },
    { id: 2, name: 'Luminary Artist', pointRange: [11, 22] },
    { id: 3, name: 'Celestial Luminary', pointRange: [22, 33] },
    { id: 4, name: 'Masterful Messenger', pointRange: [33, 44] },
    { id: 5, name: 'Mystical Messenger', pointRange: [44, 55] },
    { id: 6, name: 'Eloquent Emissary', pointRange: [55, 66] },
    { id: 7, name: 'Cheerful Chatterbox', pointRange: [66, 77] },
    { id: 8, name: 'Charismatic Chimer', pointRange: [77, 88] },
    { id: 9, name: 'Charming Communicator', pointRange: [88, 99] },
    { id: 10, name: 'Captivating Communicator', pointRange: [99, 110] },
    { id: 11, name: 'Starry Performer', pointRange: [110, 121] },
    { id: 12, name: 'Enchanted Voyager', pointRange: [121, 132] },
    { id: 13, name: 'Virtuoso Voyager', pointRange: [132, 143] },
    { id: 14, name: 'Enchanted Virtuoso', pointRange: [143, 154] },
    { id: 15, name: 'Anonymity Virtuoso', pointRange: [154, 165] },
    { id: 16, name: 'Anonymous Aristocrat', pointRange: [165, 176] },
    { id: 17, name: 'Quirky Quester', pointRange: [176, 187] },
    { id: 18, name: 'Wordsmith Wanderer', pointRange: [187, 198] },
    { id: 19, name: 'Apprentice Entertainer', pointRange: [198, 209] },
    { id: 20, name: 'Jovial Jester', pointRange: [209, 220] },
    { id: 21, name: 'Anonymous Aficionado', pointRange: [220, 231] },
    { id: 22, name: 'Merry Message Maven', pointRange: [231, 242] },
    { id: 23, name: 'Whimsy Wizard', pointRange: [242, 253] },
    { id: 24, name: 'Whimsical Wordsmith', pointRange: [253, 264] },
    { id: 25, name: 'Grand Illuminator', pointRange: [264, 275] }
]

// Scraped Online

// const newLevels = messageLevels.map((levels, index) => {
//     const offset = 11 as const
//     const lowerBound = index * offset
//     const upperBound = (index + 1) * offset

//     return {
//         ...levels,
//         id: index + 1,
//         pointRange: [lowerBound, upperBound]
//     }
// })
