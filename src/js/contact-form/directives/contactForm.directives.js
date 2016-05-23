angular.module('contactForm.directives', [])
.directive('contactForm', [
    function(){
        return {
            restrict: 'E',
            scope: {
                'contactFormOptions': '='
            },
            templateUrl: 'js/contact-form/views/contact-form.html',
            controller: 'ContactFormController'
        }
    }
])
