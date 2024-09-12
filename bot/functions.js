const { GrammyError, HttpError } = require('grammy')

function BOT_ERROR_CATCHER(err) {
  const ctx = err.ctx;
  console.error(`EBOT (Can NOT handling update) ${ctx.update.update_id}:`)
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("EBOT GRAMMY:", e.description)
  } else if (e instanceof HttpError) {
    console.error("EBOT TELEGRAM:", e)
  } else {
    console.error("EBOT UNKOWN:", e)
  }
}

module.exports = {
  BOT_ERROR_CATCHER
}