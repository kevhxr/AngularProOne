define(['angular','require'],function(angular,require){
    'use strict';
    require (['countingService']);
    var app = angular.module('myAppOne',[]);
    app.directive('overlay',function(){
        return {
            restrict: 'E',
            replace: true,
            template: '<a href="http://baidu.com">Click me to go to baidu</a>'
        };
    } );
    app.service('countingService',[require('Js/services/counting-service')])
    return app;
})