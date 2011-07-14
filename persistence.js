var sys = require('sys'),
    Db = require('mongodb').Db,
    Server = require('mongodb').Server;

exports.if_widgetNotPersisted = function(widgetName, callback) {
  var db = new Db('jquery-ui-api', new Server('127.0.0.1', 27017, {}), { native_parser: true });

  db.open(function(err, db) {
    db.collection('widgets', function(err, collection) {

      collection.find({ 'name' : widgetName }, function(err, cursor) {
        cursor.toArray(function(err, docs) {
          db.close();

          if (docs.length === 0)
            callback.call(widgetName, widgetName);
        });
      });
    });
  });
}

exports.persistWidget = function(widget) {
  var db = new Db('jquery-ui-api', new Server('127.0.0.1', 27017, {}), { native_parser: true });

  db.open(function(err, db) {
    db.collection('widgets', function(err, collection) {
      collection.insert(widget);

      sys.puts('Inserted ' + widget.name);

      db.close();
    });
  });
}