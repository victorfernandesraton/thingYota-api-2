const restify = require('restify');
const plugins = require('restify').plugins
// handlers de error
const error = require('../utils/error');

const app = restify.createServer({
  name: "thingYota-api"
});

app.use(plugins.jsonBodyParser({ mapParams: true }));
app.use(plugins.acceptParser(app.acceptable));
app.use(plugins.jsonp({ mapParams: true }));
app.use(plugins.queryParser({ mapParams: true }));
app.use(plugins.fullResponse());

// Error do cliente
app.use(error.clientErrorHandler)
// Logs de erro
app.use(error.logErrors)
// error handler
app.use(error.errorHandler)

module.exports = app;
