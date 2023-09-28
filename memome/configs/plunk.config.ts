import Plunk from '@plunk/node'

const plunk = new Plunk(process.env.PLUNK_API_KEY!)

export default plunk

// await fetch('https://api.useplunk.com/v1/track', {
//     method: 'POST',
//     body: JSON.stringify({
//         event: "my-new-event",
//         email: "kawojue08@gmail.com"
//     }),
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ~I don't forget stuff like that~',
//     },
// });