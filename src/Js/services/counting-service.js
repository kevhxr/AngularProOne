define('countingService',function(){

    'use strict';

    function countingService() {
        addition(1,2);
    }

    function addition(a,b){
        console.log(a+b);
    }
    addition(1,2);

})