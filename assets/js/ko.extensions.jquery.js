// BINDING HANDLERS (jQuery Dependencies)
// ---------------------------------------------------------------------
;define(["ko","jquery"],function(ko, $){
    var unwrap = ko.utils.unwrapObservable,
        extend = ko.utils.extend,
        forEach = $.each;

    ko.utils.cmap = function (array, ctor) {
        //Constructor mapping function (used often in viewmodels)
        return $.map(array, function (el) { return new ctor(el); });
    };

    //delegated event handling via $.on
    ko.bindingHandlers.on = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel){
            var eventsToHandle = unwrap(valueAccessor() || {});
            $.each(eventsToHandle, function(key) {
                if (typeof key == "string") {
                    var eventName = key.substr(0,key.indexOf(" ")),
                        selector = key.substr(key.indexOf(" ") + 1);

                    $(element).on(eventName, selector,function(event){
                        var handlerReturnValue;
                        var handlerFunction = valueAccessor()[key];
                        if (!handlerFunction){return;}

                        var context = ko.contextFor(this);

                        try {
                            // Take all the event args, and prefix with the viewmodel
                            var argsForHandler = Array.prototype.slice.call(arguments);
                            argsForHandler.unshift(context.$data);
                            handlerReturnValue = handlerFunction.apply(context.$data, argsForHandler);
                        } finally {
                            if (handlerReturnValue !== true) { // Normally we want to prevent default action. Developer can override this be explicitly returning true.
                                if (event.preventDefault)
                                    event.preventDefault();
                                else
                                    event.returnValue = false;
                            }
                        }
                        //cancel bubbling by default
                        event.cancelBubble = true;
                        if (event.stopPropagation)
                            event.stopPropagation();
                    });
                }
            });
        }
    }




    ko.bindingHandlers.autoGrowUntil = {
        init: function(element, valueAccessor) {
            var maxHeight = ko.utils.unwrapObservable(valueAccessor());
            $(element).keyup(function(e) {
                var $this = $(this);
                while($this.height() < maxHeight && $this.outerHeight() < this.scrollHeight + parseFloat($this.css("borderTopWidth")) + parseFloat($this.css("borderBottomWidth"))) {
                    $this.height($this.height()+1);
                };
            });
        }
    };



    // template binding which clears all children before binding...
    ko.bindingHandlers.templateWithClear = {
        init: function (element, valueAccessor) {
            $(element).children().remove();
            return ko.bindingHandlers.template.init(element, valueAccessor);
        },
        update: ko.bindingHandlers.template.update
    };

    ko.bindingHandlers.slideVisible = {
        update: function(element, valueAccessor, allBindingsAccessor) {
            // First get the latest data that we're bound to
            var value = valueAccessor(), allBindings = allBindingsAccessor();

            // Next, whether or not the supplied model property is observable, get its current value
            var valueUnwrapped = ko.utils.unwrapObservable(value);

            // Grab some more data from another binding property
            var duration = allBindings.slideDuration || 400; // 400ms is default duration unless otherwise specified

            // Now manipulate the DOM element
            if (valueUnwrapped == true)
                $(element).slideDown(duration); // Make the element visible
            else
                $(element).slideUp(duration);   // Make the element invisible
        }
    };

});


// BINDING HANDLERS (jQuery + jQuery UI Dependencies)
// ---------------------------------------------------------------------
;define(["ko","jquery","jquery-ui"],function(ko, $){
    var unwrap = ko.utils.unwrapObservable,
        extend = ko.utils.extend,
        forEach = $.each;

    //sortableList (requires jquery-ui)
    if($.fn.sortable){
        ko.bindingHandlers.sortableList = {
            init: function (element, valueAccessor) {
                var list = valueAccessor();
                var oldPosition = -1;
                $(element).sortable({
                    start: function (event, ui) {
                        //save the initial position for object retrieval later
                        oldPosition = ui.item.index();
                    },
                    update: function (event, ui) {
                        //retrieve our actual data item
                        //note what this old code returned was not the object we wanted.
                        //var item = ui.item.tmplItem().data;
                        var item = list()[oldPosition];
                        //figure out its new position
                        var position = ui.item.index();//ko.utils.arrayIndexOf(ui.item.parent().children(), ui.item[0]);
                        //remove the item and add it back in the right spot
                        if (position >= 0) {
                            list.remove(item);
                            list.splice(position, 0, item);
                        }
                        ui.item.remove();
                    }//,
                    //note this was just for debugging. Hard to inspect an element while also dragging
                    //change: function (event, ui) {
                    //}
                });
            }
        };
    }

    if($.fn.progressbar){
        ko.bindingHandlers.progressBar = {
            init: function(element,valueAccessor){
                $(element).progressbar({ value: unwrap(valueAccessor())});
            },
            update: function(element,valueAccessor){
                $(element).progressbar("option","value",unwrap(valueAccessor()));;
            }
        }
    }

});