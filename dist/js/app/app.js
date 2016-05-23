angular.module('app', [
    'contactForm'
])
.controller('MainController', [
    '$scope',
    function($scope){
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
    }
]);
