function validate_token(token) {
  return token === ADMIN_TOKEN
}

module.exports = {
  validate_token
}