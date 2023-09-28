export const pollLevels = [
    { id: 1, name: 'Enigmatic Engager', pointRange: [0, 89] },
    { id: 2, name: 'Enigmatic Emissary', pointRange: [89, 178] },
    { id: 3, name: 'Alluring Adept', pointRange: [178, 267] },
    { id: 4, name: 'Curious Curator', pointRange: [267, 356] },
    { id: 5, name: 'Curious Connoisseur', pointRange: [356, 445] },
    { id: 6, name: 'Curious Compiler', pointRange: [445, 534] },
    { id: 7, name: 'Analytical Maestro', pointRange: [534, 623] },
    { id: 8, name: 'Mysterious Maestro', pointRange: [623, 712] },
    { id: 9, name: 'Jubilant Juggler', pointRange: [712, 801] },
    { id: 10, name: 'Delightful Dynamo', pointRange: [801, 890] },
    { id: 11, name: 'Whimsical Whisperer', pointRange: [890, 979] },
    { id: 12, name: 'Questioning Quasar', pointRange: [979, 1068] },
    { id: 13, name: 'Fun-loving Luminary', pointRange: [1068, 1157] },
    { id: 14, name: 'Frolicsome Luminary', pointRange: [1157, 1246] },
    { id: 15, name: 'Playful Pollster', pointRange: [1246, 1335] },
    { id: 16, name: 'Pondering Prodigy', pointRange: [1335, 1424] },
    { id: 17, name: 'Enthusiastic Examiner', pointRange: [1424, 1513] },
    { id: 18, name: 'Questionnaire Curator', pointRange: [1513, 1602] },
    { id: 19, name: 'Survey Sage', pointRange: [1602, 1691] },
    { id: 20, name: 'Option Oracle', pointRange: [1691, 1780] },
    { id: 21, name: 'Polling Paragon', pointRange: [1780, 1869] },
    { id: 22, name: 'Polling Pioneer', pointRange: [1869, 1958] },
    { id: 23, name: 'Polling Prestige', pointRange: [1958, 2047] },
    { id: 24, name: 'Polling Picasso', pointRange: [2047, 2136] },
    { id: 25, name: 'Polling Prodigy', pointRange: [2136, 2225] }
]

// Scraped Online

// const newLevels = pollLevels.map((levels, index) => {
//     const lowerBound = index * 89
//     const upperBound = (index + 1) * 89

//     return {
//         ...levels,
//         id: index + 1,
//         pointRange: [lowerBound, upperBound]
//     }
// })