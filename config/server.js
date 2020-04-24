const restify = require('restify');
const plugins = require('restify').plugins
const corsMiddleware = require("restify-cors-middleware");

const cors = corsMiddleware({
  origins: ["*"],
  allowHeaders: ["Authorization"],
  exposeHeaders: ["Authorization"]
});

const app = restify.createServer({
  name: "thingYota-api"
});

app.use(plugins.jsonBodyParser({ mapParams: true }));
app.use(plugins.acceptParser(app.acceptable));
app.use(plugins.jsonp({ mapParams: true }));
app.use(plugins.queryParser({ mapParams: true }));
app.use(plugins.fullResponse());

app.pre(cors.preflight);
app.use(cors.actual);

module.exports = app;
