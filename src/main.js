require.config({
    paths : {
        'angular':"../vendor/angular/angular.min",
        'jquery':"../vendor/jquery/dist/jquery",
        'require':"../vendor/require/require",
        'app': "Js/app",
        'test1': "Js/test1",
       // 'countingServices': "Js/services/counting-service"
    },
    shim : {
        "angular":{
            exports:"angular"
        },
        "jquery":{
            exports:"jquery"
        },
        "require":{
            exports:"require"
        }
    },
    deps:['app','test1'],
    urlArgs: "bust=" + (new Date()).getTime()
});

