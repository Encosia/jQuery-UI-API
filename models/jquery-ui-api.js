var sys = require('sys'),
    scraper = require('./scraper.js'),
    persistence = require('./persistence.js');
		
// An array of the jQuery UI widgets to target, named corresponding to their URL on the site.
var widgets = ['draggable', 'droppable', 'resizable', 'selectable',
							 'sortable', 'accordion', 'autocomplete', 'button',
							 'datepicker', 'dialog', 'progressbar', 'slider',
							 'tabs', 'position'];

exports.get_widgetDocs = function(widgetName, callback) {
  persistence.if_widgetNotPersisted(widgetName, function(widgetName) {
    scraper.requestWidgetDocs(widgetName, function(widget) {
      persistence.persistWidget(widget, function() {
        callback.call(widget, widget);
      });
    });
  });

  persistence.if_widgetPersisted(widgetName, function(widget) {
    callback.call(widget, widget);
  });
}

exports.reset_widgetCache = function(callback) {
  persistence.reset_widgetCache(callback, function() {
    callback.call();
  });
}