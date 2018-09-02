define(function (require) {
'use strict';



});


angular.module('myAppOne', [])
    .directive('overlay',function(){
        return {
            restrict: 'E',
            replace: true,
            template: '<a href="http://baidu.com">Click me to go to baidu</a>'
        };
    } );