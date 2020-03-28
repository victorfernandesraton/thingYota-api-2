const restify = require('restify');
const plugins = require('restify').plugins

const app = restify.createServer({
  name: "thingYota-api"
});

app.use(plugins.jsonBodyParser({ mapParams: true }));
app.use(plugins.acceptParser(app.acceptable));
app.use(plugins.jsonp({ mapParams: true }));
app.use(plugins.queryParser({ mapParams: true }));
app.use(plugins.fullResponse());

module.exports = app;
