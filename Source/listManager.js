/*
---
description: List manager. Add and remove element in a list created with li's or div's.

license: MIT-style

authors:
- Jean-Nicolas Boulay Desjardins (http://jean-nicolas.name/)

requires:
- core/1.3:   '*'

provides: listManager

...
*/

var listManager = new Class({
    
    Implements: [Options, Events],
    
    options: {
        listElement: 'li', // or any other element...
        rowHTML: '',
        addWhere: 'after', // 'top', 'bottom', 'after', or 'before'
        target: null,
        noTargetAddWhere: 'top'
    },
    
    initialize: function(el, options){
        this.element = document.id(el);
        this.setOptions(options);
    },
    
    add: function(options){

        this.options = Object.merge(this.options, options);

        if (typeOf(this.options.target) !== 'null'){
            
            var rowPosition = document.id(this.options.target);
            var rowWhere = this.options.addWhere;
            this.options.target = null;
            
        } else {
        
            var rowPosition = this.element;
            var rowWhere = this.options.noTargetAddWhere;
        
        }

        var newRow = new Element(this.options.listElement, {
            'class': 'listmanager-row'
        }).adopt(this.options.rowHTML).inject(rowPosition, rowWhere);

        this.fireEvent('addedRow', [newRow]);
    
    },
    
    remove: function(row){
            
        var removedRow = row;
        document.id(row).destroy();
        this.fireEvent('removedRow', [removedRow]);
        
    },
    
    removeAll: function(){
    
        var removedRows = this.element.getChildren('.listmanager-row');
        this.element.empty();
        this.fireEvent('removedAllRows', [removedRows]);
        
    }
    
});
