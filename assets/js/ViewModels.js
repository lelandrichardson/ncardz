define(
[
    "app",
    "ko",
    "jquery",
    "_",
    "amplify",
    "vendor/knockout-sortable.min"

],
function(app,ko,$,_,amplify){
    app.vm = app.vm || {};

    app.vm.Card = function(spec){
        this.title = ko.observable(spec.title || '');
        this.body = ko.observable(spec.body || '');
    };

    app.vm.Main = function(spec){
        this.cards = ko.observableArray(ko.utils.cmap(spec.cards || [],app.vm.Card));

        this.addNewCard = function() {
            this.newCard(new app.vm.Card({}));
        };
        this.saveNewCard = function(){
            this.cards.push(this.newCard());
            this.newCard(null);
        }
        this.newCard = ko.observable();

    };


    return app;
});
