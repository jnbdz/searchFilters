/*
---
description: searchFilters

authors:
  - Jean-Nicolas Boulay Desjardins (http://jean-nicolas.name)

license:
  - MIT-style license

requires:
  core/1.3:   '*'

provides:
  - searchFilters
...
*/

var searchFilters = Class({

        Implements: [Options, Events],

        options: {
                max: 50,
                filters: {},
                action: ''
        },

        initialize: function(el, options){

                this.element = document.id(el);
                this.setOptions(options);

                this.numberOfFiltersRow = 0;
                this.construct();

        },

        construct: function(){

                Object.each(this.options.filters, function(columns, formName){

                        this.filtersColumns = columns;
                        this.formName = formName;

                });

                this.filtersWrapEl =  new Element('form', {
                        'action': this.options.action,
                        'name': 'searchfilters',
                        'method': 'get'
                }).adopt(new Element('input', {
                        'type': 'hidden',
                        'name': 'searchfilters-formname',
                        'value': this.formName
                })).insert(this.element);

        },

        add: function(){

                if (this.numberOfFiltersRow > this.options.max) return;

                var option = null;
                var options = [];

                Object.each(this.filtersColumns, function(values, column){

                        option = new Element('option', function(){
                                'value': column,
                                'text': values.title,
                                'class': 'searchfilters-row-columns-list-option-filtertype-' + values.type
                        });

                        options.include(option);

                });

                new Element('div', {
                        'class': 'searchfilters-row'
                }).adopt(
                        new Element('select', {'name': 'searchfilters-select-column-name-' + this.numberOfFiltersRow, 'class': 'searchfilters-row-columns-list'}).adopt(options),
                        new Element('div', {'class': 'searchfilters-row-columnoptions'}),
                        new Element('a', {'text': '-', 'class': 'searchfilters-row-remove'}).addEvent('click', this.remove().bind(this)),
                        new Element('a', {'text': '+', 'class': 'searchfilters-row-add'}).addEvent('click', this.add().bind(this))
                ).insert(this.filtersWrapEl);

                this.numberOfFiltersRow = (this.numberOfFiltersRow + 1);

        },

        remove: function(){

                this.getParent('div.searchfilters-row').destroy();

                return this.numberOfFiltersRow = (this.numberOfFiltersRow - 1);

        },

        filterType_text: function(){

                var filterType_text_Select = new Element('select', {
                        'name': 'searchfilters-select-column-filtertype-text-select-' + this.numberOfFiltersRow
                }).adopt(
                        new Element('option', {'text': 'matches', 'value': 'matches', 'selected': 'selected'}),
                        new Element('option', {'text': 'contains', 'value': 'contains'}),
                        new Element('option', {'text': 'begins with', 'value': 'begins-with'}),
                        new Element('option', {'text': 'ends with', 'value': 'ends-with'}),
                        new Element('option', {'text': 'is', 'value': 'is'})
                );

                var filterType_text_Input = new Element('input', {
                        'type': 'text',
                        'name': 'searchfilters-select-column-filtertype-text-input-' + this.numberOfFiltersRow,
                        'value': ''
                });

                return [filterType_text_Select, filterType_text_Input];

        },

        filterType_date: function(){

                new Element('select').adopt(
                        new Element('option', {'text': 'within last', 'value': 'within-last'}),
                        new Element('option', {'text': 'exactly', 'value': 'exactly'}),
                        new Element('option', {'text': 'before', 'value': 'before'}),
                        new Element('option', {'text': 'after', 'value': 'after'}),
                        new Element('option', {'text': 'today', 'value': 'today'}),
                        new Element('option', {'text': 'yesterday', 'value': 'yesterday'}),
                        new Element('option', {'text': 'this week', 'value': 'this-week'}),
                        new Element('option', {'text': 'this month', 'value': 'this-month'}),
                        new Element('option', {'text': 'this year', 'value': 'this-year'})
                );

                new Element('input', {'type': 'text'});

                new Element('select').adopt(
                        new Element('option', {'text': 'days', 'value': 'days'}),
                        new Element('option', {'text': 'weeks', 'value': 'weeks'}),
                        new Element('option', {'text': 'months', 'value': 'months'}),
                        new Element('option', {'text': 'years', 'value': 'years'})
                );

        },

        filterType_bool: function(){

                new Element('input', {
                        'type': 'checkbox'
                });

        }

});
