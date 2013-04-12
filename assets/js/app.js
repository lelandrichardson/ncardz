// MAIN APP
define(
[
    "jquery",
    "ko",
    "_",
    "amplify",
    "vendor/knockout-sortable",
    "ko.extensions",
    "ko.extensions.jquery",
    "ko.extensions.autocomplete"
],
function($,ko,_,amplify){
    var app = {
        run: function(spec) {
            var vm = new app.vm.Main(spec);

            //TODO: remove
            window.pagevm = vm;

            ko.applyBindings(vm);

            return vm;
        }
    };

    return app;
});