var sys = require('sys');

var cachedAPIs = {};

exports.isWidgetCached = function(widgetName) {
  return typeof cachedAPIs[widgetName] !== 'undefined';
}

exports.getCachedWidget = function(widgetName) {
  return cachedAPIs[widgetName];
}

exports.persistWidget = function(widget, callback) {
  cachedAPIs[widget.name] = widget;

  callback();
}

exports.reset_widgetCache = function(callback) {
  delete cachedAPIs;

  callback();
}