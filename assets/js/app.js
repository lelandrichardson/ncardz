// MAIN APP
define(
[
    "jquery",
    "ko",
    "_",
    "amplify",
    "vendor/knockout-sortable.min",
    "ko.extensions",
    "ko.extensions.jquery"
],
function($,ko,_,amplify){
    var app = {
        run: function(spec) {
            var vm = new app.vm.Main(spec);

            ko.applyBindings(vm);

            return vm;
        }
    };

    return app;
});