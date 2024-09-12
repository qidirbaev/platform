const { decode, encode } = require('punycode')

const str = "This book was a great readǵ."

const encoded = encode(str)
const doubleEncoded = encode(encoded)
const decoded = decode(encoded)
const doubleDecoded = decode(doubleEncoded)

console.log(encoded) // Hi my name is Eve
console.log(decoded) // Hi my name is Eve
console.log(doubleEncoded) // Hi%27%20my%20name%20is%20Eve
console.log(doubleDecoded) // Hi ' my name is Eve