define(["app", "ko"],function(app,ko){
    app.vm.populatable = function() {
        return {
            populate: function(model){
                var vm = this;
                for(var key in model){
                    if(model.hasOwnProperty(key) && vm.hasOwnProperty(key)){
                        if(ko.isObservable(vm[key]) || ko.isComputed(vm[key])){
                            vm[key](model[key]);
                        } else {
                            vm[key] = model[key];
                        }
                    }
                }
            }
        };
    };
});