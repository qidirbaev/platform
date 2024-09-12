const jwt = require('jwt-simple')

const adminObject = {
  username: 'begzat',
  password: '123456'
}

const token = jwt.encode(adminObject, 'secret')
const decoded = jwt.decode(token, 'secret')

const isAdmin = (token) => {
  try {
    const user = jwt.decode(token, 'secret')
    return user.password === adminObject.password
  } catch (err) {
    return false
  }
}

console.log({ token })
console.log({ decoded })

console.log(isAdmin(token)) // true