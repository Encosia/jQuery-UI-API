var sys = require('sys'),
    scraper = require('./scraper.js'),
    persistence = require('./persistence.js');
		

var widgets = ['draggable', 'droppable', 'resizable', 'selectable', 'tabs', 'datepicker'];
							 //'sortable', 'accordion', 'autocomplete', 'button',
							 //'datepicker', 'dialog', 'progressbar', 'slider',
							 //'tabs', 'position'];

for (var i = 0; i < widgets.length; i++) {
  persistence.ifWidgetNotPersisted(widgets[i], function(widgetName) {
    sys.puts(widgetName + ' not persisted; accessing the tubes.');
  
    scraper.requestWidgetDocs(widgetName, function(widget) {
      persistence.persistWidget(widget);
    });
	});
}


