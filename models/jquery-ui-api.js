var sys = require('sys'),
    scraper = require('./scraper.js'),
    persistence = require('./persistence.js');
		
// An array of the jQuery UI widgets to target, named corresponding to their URL on the site.
var widgets = ['draggable', 'droppable', 'resizable', 'selectable',
							 'sortable', 'accordion', 'autocomplete', 'button',
							 'datepicker', 'dialog', 'progressbar', 'slider',
							 'tabs', 'position'];

exports.get_widgetDocs = function(widgetName, callback) {
  if (persistence.isWidgetCached(widgetName)) {
    callback(persistence.getCachedWidget(widgetName));
  } else {
    scraper.requestWidgetDocs(widgetName, function(widget) {
      persistence.persistWidget(widget, function() {
        callback(widget);
      });
    });
  }
}

exports.get_allWidgetDocs = function(callback) {
  var result = [],
      widgetsRemaining = widgets.length;

  for (var i = 0; i < widgets.length; i++) {
    this.get_widgetDocs(widgets[i], function(widget) {
      result.push(widget);

      widgetsRemaining--;

      if (widgetsRemaining === 0)
        callback.call(result, result);
    });
  }
}

exports.reset_widgetCache = function(callback) {
  persistence.reset_widgetCache(callback, function() {
    callback.call();
  });
}