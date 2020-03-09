const path = require('path');
if (process.env.NODE_ENV == "development") {
  require('dotenv').config({
    path: path.resolve('.env.development')
  });
}

const server = require('./config/server')
const PORT = process.env.PORT || 8000;
const router = require('./routes');
// databse
const {sequelize} = require('./database')
const mongodb = require('./config/mongodb');

// db
sequelize.authenticate()
  .then(() => console.info("Database has connected"))
  .catch((err) => console.warn("Dtabase Error connection", err))

sequelize.sync({ force: true })
.then(() => {
  console.log(`Database & tables created!`)
})

mongodb
  .then(data => console.log('momgobd has coonected'))
  .catch(error => console.log("eeror on first connection"))


// Rotas
server.use(router)

server.get("/", (req,res) => res.send({teste: "teste"}))

server.listen(PORT , () => {
  console.info(`Server runs im ${PORT}`);
  console.info("Press CTRL+C to kill then")
})

