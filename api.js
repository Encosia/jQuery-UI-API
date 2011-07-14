var sys = require('sys'),
    scraper = require('./scraper.js'),
    persistence = require('./persistence.js');
		
// An array of the jQuery UI widgets to target, named corresponding to their URL on the site.
var widgets = ['draggable', 'droppable', 'resizable', 'selectable',
							 'sortable', 'accordion', 'autocomplete', 'button',
							 'datepicker', 'dialog', 'progressbar', 'slider',
							 'tabs', 'position'];

for (var i = 0; i < widgets.length; i++) {
  persistence.if_widgetNotPersisted(widgets[i], function(widgetName) {
    sys.puts(widgetName + ' not yet persisted; accessing the tubes.');
  
    scraper.requestWidgetDocs(widgetName, function(widget) {
      persistence.persistWidget(widget);
    });
	});
}