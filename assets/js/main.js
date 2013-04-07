require.config({
    baseUrl: "/assets/js",
    paths: {
        "jquery": "vendor/jquery.min",
        "jquery-ui": "vendor/jquery-ui.min",
        "ko": "vendor/knockout-2.2.1",
        "_": "vendor/underscore-min",
        "amplify": "vendor/amplify.min"
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
        }
    }
});

require(["app","ko","ViewModels"], function(app) {
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
});