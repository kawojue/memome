export const pollLevels = [
    { id: 1, name: 'Enigmatic Engager', pointRange: [0, 19] },
    { id: 2, name: 'Enigmatic Emissary', pointRange: [19, 38] },
    { id: 3, name: 'Alluring Adept', pointRange: [38, 57] },
    { id: 4, name: 'Curious Curator', pointRange: [57, 76] },
    { id: 5, name: 'Curious Connoisseur', pointRange: [76, 95] },
    { id: 6, name: 'Curious Compiler', pointRange: [95, 114] },
    { id: 7, name: 'Analytical Maestro', pointRange: [114, 133] },
    { id: 8, name: 'Mysterious Maestro', pointRange: [133, 152] },
    { id: 9, name: 'Jubilant Juggler', pointRange: [152, 171] },
    { id: 10, name: 'Delightful Dynamo', pointRange: [171, 190] },
    { id: 11, name: 'Whimsical Whisperer', pointRange: [190, 209] },
    { id: 12, name: 'Questioning Quasar', pointRange: [209, 228] },
    { id: 13, name: 'Fun-loving Luminary', pointRange: [228, 247] },
    { id: 14, name: 'Frolicsome Luminary', pointRange: [247, 266] },
    { id: 15, name: 'Playful Pollster', pointRange: [266, 285] },
    { id: 16, name: 'Pondering Prodigy', pointRange: [285, 304] },
    { id: 17, name: 'Enthusiastic Examiner', pointRange: [304, 323] },
    { id: 18, name: 'Questionnaire Curator', pointRange: [323, 342] },
    { id: 19, name: 'Survey Sage', pointRange: [342, 361] },
    { id: 20, name: 'Option Oracle', pointRange: [361, 380] },
    { id: 21, name: 'Polling Paragon', pointRange: [380, 399] },
    { id: 22, name: 'Polling Pioneer', pointRange: [399, 418] },
    { id: 23, name: 'Polling Prestige', pointRange: [418, 437] },
    { id: 24, name: 'Polling Picasso', pointRange: [437, 456] },
    { id: 25, name: 'Polling Prodigy', pointRange: [456, 475] }
]

// Scraped Online

// const newLevels = pollLevels.map((levels, index) => {
//     const offset = 19 as const
//     const lowerBound = index * offset
//     const upperBound = (index + 1) * offset

//     return {
//         ...levels,
//         id: index + 1,
//         pointRange: [lowerBound, upperBound]
//     }
// })