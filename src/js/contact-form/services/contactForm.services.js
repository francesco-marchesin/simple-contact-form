angular.module('contactForm.services', [])
.factory('ContactFormService', [
    '$http',
    '$timeout',
    function($http, $timeout){
        return {
            send: function(url, newContact){
                return $timeout(function(){
                    return $http.post(url, newContact);
                }, 2000);
            }
        };
    }
]);
