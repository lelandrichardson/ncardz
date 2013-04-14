require.config({
    baseUrl: "/assets/js",
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        "jquery": "vendor/jquery.min",
        "jquery-ui": "vendor/jquery-ui.min",
        "ko": "vendor/knockout-2.2.1",
        "_": "vendor/underscore-min",
        "amplify": "vendor/amplify.min",
        "AutoComplete": "vendor/autocomplete-0.2.1",
        "bootstrap": "vendor/bootstrap.min",
        "sortable": "vendor/knockout-sortable"
    },
    shim: {
        "_": {
            exports: '_'
        },
        "jquery": {
            exports: ["$","jQuery"]
        },
        "jquery-ui": {
            deps: ["jquery"]
        },
        "amplify": {
            deps: ["jquery"]
        },
        "app": {
            deps: ["ko","jquery","_","amplify"]
        },
        "bootstrap": {
            deps: ["jquery"]
        },
        "AutoComplete": {
            deps: ["jquery"],
            exports: "AutoComplete"
        }
    }
});

require([
    "app",
    "ko",
    "ViewModels",
    "AutoComplete"
], function(app) {
    var data = {
        cards: [
            {title: "card title 1", body: "this is some card content"},
            {title: "card title 2", body: "this is some card content"},
            {title: "card title 3", body: "this is some card content"},
            {title: "card title 3", body: "this is some card content"},
            {title: "card title 3", body: "this is some card content"},
            {title: "card title 3", body: "this is some card content"},
            {title: "card title 3", body: "this is some card content"},
            {title: "card title 3", body: "this is some card content"},
            {title: "card title 3", body: "this is some card content"},
        ]
    };
    app.run(data);

    $(".paperArea")
    .on("mouseenter",".bullet",function(){
        $(this).parents(".item").addClass("highlighted");
    })
    .on("mouseleave",".bullet",function(){
        $(this).parents(".item").removeClass("highlighted");
    });


//    setInterval(function(){
//        $(".card.ui-sortable-placeholder").height($(".card.ui-sortable-helper").height());
//    },100);


//    var config = {
//        placeholderHTML: 'Search Fruits',
//        lists: {
//            fruits: ['Apple', 'Banana', 'Orange']
//        }
//    };
    //var widget = new AutoComplete(document.getElementById('search_bar'), config);


});