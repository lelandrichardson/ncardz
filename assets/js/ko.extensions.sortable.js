// BINDING HANDLERS (jQuery Dependencies)
// ---------------------------------------------------------------------
;define(["ko","jquery", "sortable"],function(ko, $){
    var unwrap = ko.utils.unwrapObservable,
        extend = ko.utils.extend,
        forEach = $.each;

    ko.utils.cmap = function (array, ctor) {
        // Constructor mapping function (used often in viewmodels)
        return $.map(array, function (el) { return new ctor(el); });
    };

    ko.bindingHandlers.cardSortable = {
        init: function(element, valueAccessor, allBindingsAccessor, data, context){

            var allbindings = allBindingsAccessor(),
                value = valueAccessor(),
                passedOptions = unwrap(value.options) || {};

            extend(passedOptions,{
                forcePlaceholderSize: false,
                helper: function(e,li) {
                    copyHelper= li.clone().insertAfter(li);
                    return li.clone();
                },
                stop: function() {
                    copyHelper && copyHelper.remove();
                }
            });




            return ko.bindingHandlers.sortable.init(
                element,
                valueAccessor,
                newAllBindings,
                newData,
                context
            );
        },
        update: ko.bindingHandlers.sortable.update
    };

});