var sys = require('sys'),
    request = require('request'),
    jsdom = require('jsdom');

exports.requestWidgetDocs = function(widgetName, callback) {
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
				option.referenceURL = 'http://jqueryui.com/demos/' + widgetName + '/#' + this.id.substring(7);
				option.type = $this.find('.option-type').text();
				option.defaultValue = $this.find('.option-default').text();

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