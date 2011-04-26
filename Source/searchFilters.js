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

var searchFilters = new Class({

    Extends: listManager,
    
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
        
        this.filtersWrapper = this.construct();
        
        this.parent(this.filtersWrapper, options);
        
    },
    
    construct: function(){
            
    return new Element('ul').inject(new Element('form', {
            'action': this.options.action,
            'name': 'searchfilters',
            'method': 'get'
        }).inject(this.element, 'top'));
        
    },
    
    add: function(rowOptions){
   
        if (this.numberOfFiltersRow > this.options.max) return;
       
        var option;
        var options = [];
        
        var clickOnOption = function(configs) {return {'click': function(el){
            this.addFilterControls(this.getRow(el).getChildren('.searchfilters-filtercontrolsel'), configs.type);
            }.bind(this)
           };
        }.bind(this);
        
        Object.each(this.options.filters, function(configs, value){
           
            option = new Element('option', {
                'value': value,
                'text': configs.title,
                'class': 'searchfilters-row-option-filtertype-' + configs.type,
                'events': clickOnOption(configs)
                });
            
            options.include(option);
  
          });
        
        var select = [new Element('select', {}).adopt(options), Element('div', {'class': 'searchfilters-filtercontrolsel'})];
        
        rowOptions.rowHTML = rowOptions.rowHTML.combine(select);
        
        this.parent(rowOptions);
    
        this.numberOfFiltersRow++;
        
    },

    addFilterControls: function(el, type){

        el.set('html', '');

        var customFilter = this.fireEvent('addingFilterControls', [type]);
        
        var filterControls;
        
        switch(type){
                case 'date':
                    filterControls = this.filterType_date(el);
                break;
                case 'bool':
                    filterControls = this.filterType_bool(el);
                break;
                case 'text':
                    filterControls = this.filterType_text(el);
                break;
                default:
                    filterControls = el.adopt();
                break;
        }
        
        this.fireEvent('addedFilterControls', [type, filterControls]);
        
    },
    
    filterType_date: function(el){

        el.adopt([
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
                ),

                new Element('input', {'type': 'text'}),

                new Element('select').adopt(
                        new Element('option', {'text': 'days', 'value': 'days'}),
                        new Element('option', {'text': 'weeks', 'value': 'weeks'}),
                        new Element('option', {'text': 'months', 'value': 'months'}),
                        new Element('option', {'text': 'years', 'value': 'years'})
                )
        ]);

    },

    filterType_bool: function(el){

        el.adopt(new Element('input', {
            'type': 'checkbox'
        }));

    },
    
    filterType_text: function(el){

        el.adopt([
                    
            new Element('select', {
                'name': 'searchfilters-select-filtertype-text-select-' + this.numberOfFiltersRow
            }).adopt(
                new Element('option', {'text': 'matches', 'value': 'matches', 'selected': 'selected'}),
                new Element('option', {'text': 'contains', 'value': 'contains'}),
                new Element('option', {'text': 'begins with', 'value': 'begins-with'}),
                new Element('option', {'text': 'ends with', 'value': 'ends-with'}),
                new Element('option', {'text': 'is', 'value': 'is'})
            ),

            new Element('input', {
                'type': 'text',
                'name': 'searchfilters-select-filtertype-text-input-' + this.numberOfFiltersRow,
                'value': ''
            })
                    
        ]);

    },
    
    remove: function(el){

        this.parent(this.getRow(el));
        
        this.numberOfFiltersRow--;
    
    },
    
    removeAll: function(){
    
        this.parent();
        
        this.numberOfFiltersRow = 0;

    },
    
    getRow: function(el){

        return document.id(el.target).getParent('.listmanager-row');
        
    }
    
});
