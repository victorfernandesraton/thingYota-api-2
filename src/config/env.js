module.exports = {
  secret: {
    guest: process.env.SECRET_GUEST,
    user: process.env.SECRET_USER
  },
  db: {
    url: process.env.MONGO_URL,
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    database: process.env.MONGO_DATABASE,
    username: process.env.MONGO_USER,
    password: process.env.MONGO_PASS
  },
  sever: {
    name: process.env.SERVER_NAME,
    port: process.env.PORT
  },
  mqtt: {
    host: process.env.MQTT_HOST,
    port: process.env.MQTT_PORT
  }
}
