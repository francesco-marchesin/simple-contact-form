angular.module('contactForm.controllers', [])
.controller('ContactFormController', [
    '$scope',
    'ContactFormService',
    '$timeout',
    function($scope, ContactFormService, $timeout){

        $scope.options = {
            url: '/contact',
            email: {
                label: 'E-mail',
                placeholder: 'E-mail',
                errors: {
                    required: 'Campo Obbligatorio',
                    invalid: 'Errore nel campo E-mail'
                },
                required: true
            },
            subject: {
                label: 'Oggetto',
                placeholder: 'Oggetto',
                errors: {
                    required: 'Campo Obbligatorio',
                    invalid: 'Errore nel campo Oggetto'
                },
                required: true
            },
            message: {
                label: 'Messaggio',
                placeholder: 'Messaggio',
                minLength: '20',
                maxLength: '2000',
                errors: {
                    required: 'Campo Obbligatorio',
                    minLength: 'Il Messaggio deve contenere almeno 20 caratteri.',
                    maxLength: 'Il Messaggio deve avere una lunghezza massima di 2000 caratteri.'
                },
                required: true
            },
            success: 'E-mail inviata con successo!',
            error: 'È stato riscontrato un errore nell\'invio della mail, se il problema persiste inviare una mail a: mail@example.com',
            sending: 'Invio In corso, attendere....',
            submitButton: 'Invia'
        };

        $scope.submit = function($event, contactForm){
            $event.preventDefault();
            $scope.form = {
                submit: false,
                success: false,
                sending: true
            };
            ContactFormService.send($scope.options.url, $scope.newContact).then(function(response){
                console.log(response);
                $scope.form = {
                    submit: true,
                    success: true,
                    sending: false
                };
                $scope.newContact = {};
                contactForm.$setPristine();
                contactForm.$setUntouched();
                $timeout(function(){
                    $scope.form.submit = false;
                },4000);
            }, function(response){
                console.log(response);
                $scope.form = {
                    submit: true,
                    success: false,
                    sending: false
                };
                $timeout(function(){
                    $scope.form.submit = false;
                },4000);
            });
        };
    }
]);
