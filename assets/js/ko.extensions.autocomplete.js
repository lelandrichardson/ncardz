// BINDING HANDLERS (no dependencies)
// ---------------------------------------------------------------------
;define(["ko","jquery","AutoComplete"],function(ko,$){
    var extend = ko.utils.extend;

    var defaultOptions = {
        placeholderHTML: 'Search Fruits',
        initialValue: [['Apple'], ['Banana']],
        lists: {
            fruits: ['Apple', 'Banana', 'Orange']
        }
    };
    // AutoComplete
    ko.bindingHandlers.AutoComplete = {
        init: function(element, valueAccessor) {
            var observable = valueAccessor();

            var options = $.extend(defaultOptions,{
                //initialValue: observable(), //TODO: uncomment this
                onChange: function(newValue, oldValue){
                    observable(newValue);
                }
            });


            observable.widget = new AutoComplete(element, defaultOptions);
            observable.focused = ko.observable(false);
            observable.textValue = ko.observable();

            // bind some observables to the input element that might be useful
            ko.applyBindingsToNode($(element).find(".autocomplete-input")[0], {
                hasfocus: observable.focused,
                value: observable.textValue
            });

            // make sure we clean up the widget afterwards
            ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                observable.widget.destroy();
            });


            return { controlsDescendantBindings: true };
        },
        update: function(element,valueAccessor){
            var observable = valueAccessor();
        }
    };


});