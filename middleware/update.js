// // const checkUpdate = (body, doc) => {
// //     for (const key in body) {
// //         if (Object.hasOwnProperty.call(body, key)) {
// //             if (typeof body[key] == "object") { checkUpdate(body[key], doc[key]) };
// //             if (body[key] === "id") continue;
// //             if (body[key] !== doc[key]) {
// //                 doc[key] = body[key]
// //             }
// //         }
// //     }
// // }
// const checkUpdate2 = (body, doc) => {
//     for (const [key, value] of Object.entries(body)) {
//         if (key == "address") { checkUpdate2(body.address, doc.address) };
//         console.log(key)
//         if (key === "_id") continue;
//         if (value == doc[key]) {
//             continue;
//         } else {
//             doc[key] = value
//         }
//     }
// }

// let obj = JSON.parse(`{
//     "_id": 2,
//     "fullName": "StudentTwo",
//     "age": 9,
//     "asd":"asd",
// "address": { "city": "Cairo", "street": "Zaayat", "building": "41" },

//     "level": "KG1"
// }`)
// let body = JSON.parse(`{
//     "_id": 2,
//     "fullName": "StudentOne",
//     "age": 12,
// "address": { "city": "Cairoooo", "building": "41" },

//     "level": "KG1"
// }`)
// console.log(obj)
// checkUpdate2(body, obj)
// console.log(obj)

// // module.exports = checkUpdate