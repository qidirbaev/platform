function check_if_env_variables_are_set() {
  if (!process.env.PORT_NUMBER) throw new Error("PORT_NUMBER is not set");
  if (!process.env.MONGO_DB_URI) throw new Error("MONGO_DB_URI is not set");
  if (!process.env.MONGO_DB_NAME) throw new Error("MONGO_DB_NAME is not set");
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not set");
  if (!process.env.ADMIN_USERNAME) throw new Error("ADMIN_USERNAME is not set");
  if (!process.env.ADMIN_PASSWORD) throw new Error("ADMIN_PASSWORD is not set");
  if (!process.env.TG_BOT_TOKEN) throw new Error("TG_BOT_TOKEN is not set");
  if (!process.env.TG_BOT_ADMIN_ID) throw new Error("TG_BOT_ADMIN_ID is not set");
  if (!process.env.TG_ORDERS_CHANNEL_ID) throw new Error("TG_ORDERS_CHANNEL_ID is not set");
  if (!process.env.TG_BOT_PAYME_TOKEN) throw new Error("TG_BOT_PAYME_TOKEN is not set");
  if (!process.env.SERVER_URL) throw new Error("SERVER_URL is not set")
}

// Export the function
module.exports = {
  check_if_env_variables_are_set,

}