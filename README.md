search Filters
===========

Like in the Finder on a Mac, this plugin helps filter out search results. It also helps make search more precise.

How to use
----------

new searchFilters(el, {
	max: 50, // int. of the limit of filters are allowd to be used. The default is 50
	action: 'index.php' // where to send the result.
	filters: {
			'column': {"type: "text", "title": "Column"}
		}
});

The "el" variable is to tell where to load the filter plugin and where all the filters will be added. The "max" method is used to limit the number of filters that can be used. The "action" method is used to indicate where the filters information must be send. If not used you can always catch the filters in a object that you can send as JSON to the server. The "filters" method is used to list the different filters.

In the filter you must specify what type of data it is. You have 3 options: text, date and bool.

The event "changed" is used when you add a new filter and when you change the options on the filter. The result in the event is the value of all the filters.

The event "modify" is used when you change a filter's options. The result is the value of that one filter.
