var express = require('express'),
    api = require('./models/jquery-ui-api.js');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.register('.html', require('jqtpl').express);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
app.get('/', function(req, res){
  res.render('index', {
    title: 'The unofficial jQuery UI API'
  });
});

app.get('/api/reset-cache', function(req, res) {
  api.reset_widgetCache(function() {
    res.contentType('application/json');

    res.send(JSON.stringify({ success: true }));
  });
});

app.get('/api/:widgetName', function(req, res) {
  api.get_widgetDocs(req.params.widgetName, function(widget) {
    res.contentType('application/json');

    res.send(JSON.stringify(widget));
  });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
