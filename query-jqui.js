var sys = require('sys'),
    request = require('request'),
		jsdom = require('jsdom');
		
var Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;

var widgets = ['draggable', 'droppable', 'resizable', 'selectable', 'tabs'];
							 //'sortable', 'accordion', 'autocomplete', 'button',
							 //'datepicker', 'dialog', 'progressbar', 'slider',
							 //'tabs', 'position'];

for (var i = 0; i < widgets.length; i++) {
  ifWidgetNotPersisted(widgets[i], function(widgetName) {
    sys.puts(widgetName + ' not persisted; accessing the tubes.');
  
    requestWidgetDocs(widgetName, function(widget) {
      persistWidget(widget);
    });
	});
}

function ifWidgetNotPersisted(widgetName, callback) {
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

function persistWidget(widget) {
  var db = new Db('jquery-ui-api', new Server('127.0.0.1', 27017, {}), { native_parser: true });
  
  db.open(function(err, db) {
    db.collection('widgets', function(err, collection) {
      collection.insert(widget);
      
      sys.puts('Inserted ' + widget.name);
      
      db.close();
    });
  });
}

function requestWidgetDocs(widgetName, callback) {
	request('http://jqueryui.com/demos/' + widgetName, function(error, response, body) {
		jsdom.env({ html: body, scripts: 'jquery-1.6.2.js'}, function(err, window) {
			var $ = window.jQuery,
					widget = {};

			widget.name = widgetName; 

			// Build options array.
			widget.options = [];

			$('#options li.option').each(function() {
				var $this = $(this),
						option = {};

				option.description = $this.find('.option-description p').text();
				option.referenceURL = 'http://jqueryui.com/demos/' + widgets[i] + 
															'/#' + this.id.substring(7);
				option.type = $this.find('.option-type').text();
				option.default = $this.find('.option-default').text();

				widget.options.push(option);
			});

			// Build events array.
			widget.events = [];

			$('#events li.event').each(function() {
				var $this = $(this),
						event = {};

				event.name = $this.find('.event-name').text();
				event.description = $this.find('.event-description p').text();
				event.type = $this.find('.event-type').text();

				widget.events.push(event);
			});

			// Build the methods array.
      widget.methods = [];

			$('#methods li.method').each(function() {
				var $this = $(this),
						method = {};

				method.name = $this.find('.method-name').text();
				method.description = $this.find('.method-signature').text().replace(/\n/g, '');

				widget.methods.push(method);
			});

      if (typeof callback === 'function') {
				callback.call(widget, widget);
			}
		});
	});
}
