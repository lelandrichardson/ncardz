define([
    "app",
    "ko",
    "jquery",
    "_",
    "amplify",
    "ko.extensions",
    "sortable",
    "vendor/bootstrap.min"
],
function(app,ko,$,_,amplify){
    app.vm = app.vm || {};
    app.ui = app.ui || {};

    app.ui.swatches = {
        TURQUOISE:'#1ABC9C',
        GREEN_SEA:'#16A085',
        EMERLAND:'#2ECC71',
        NEPHRITIS:'#27AE60',
        PETER_RIVER:'#3498DB',
        BELIZE_HOLE:'#2980B9',
        AMETHYST:'#9B59B6',
        WISTERIA:'#8E44AD',
        //WET_ASPHALT:'#34495E',
        //MIDNIGHT_BLUE:'#2C3E50',
        SUN_FLOWER:'#F1C40F',
        ORANGE:'#F39C12',
        CARROT:'#E67E22',
        PUMPKIN:'#D35400',
        ALIZARIN:'#E74C3C',
        POMEGRANATE:'#C0392B',
        CLOUDS:'#ECF0F1',
        SILVER:'#BDC3C7',
        CONCRETE:'#95A5A6',
        ASBESTOS:'#7F8C8D'
    };
    
    // utility methods
    var meta = function() {
        return function(){};
    };


    app.vm.Card = function(spec){
        spec = spec || {};
        // model data
        this.tags = ko.observable();
        this.body = ko.observable().focusable();
        this.dateCreated = ko.observable();
        this.source = ko.observable();

        // UI Observables
        this.ui = meta();
        this.ui.highlighted = ko.observable(false);

        // initialization
        this.populate(spec);
    };
    // static
    _.extend(app.vm.Card,{
       emptyTemplate: {
           title: 'title'
       }
    });
    // instance functions
    _.extend(app.vm.Card.prototype, {
        populate: function(data) {
            this.body(data.body || '');
            this.dateCreated(data.dateCreated || new Date());
            this.source(data.source || '');
        }
    });













    app.vm.Main = function(spec){
        var self = this;
        this.cards = ko.observableArray(ko.utils.cmap(spec.cards || [],app.vm.Card));
        this.outlineCards = ko.observableArray([]);


        this.addNewCard = function() {
            var toAdd = new app.vm.Card();
            this.cards.unshift(toAdd);
            toAdd.title.focused(true);
        };

        this.removeCard = function(card) {
            self.cards.destroy(card);
        };
    };


    return app;
});
