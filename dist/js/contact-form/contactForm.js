angular.module('contactForm', [])

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
])

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
])

.directive('contactForm', [
    function(){
        return {
            restrict: 'E',
            scope: {
                'contactFormOptions': '='
            },
            template: `
                <form class="form" name="contactForm" action="{{ contactFormOptions.url }}" method="post" ng-submit="submit($event, contactForm)">
                    <div class="alert alert-info" role="alert" ng-if="form.sending">
                        {{ contactFormOptions.sending }}
                    </div>
                    <div class="alert alert-success" role="alert" ng-if="form.submit && form.success">
                        {{ contactFormOptions.success }}
                    </div>
                    <div class="alert alert-danger" role="alert" ng-if="form.submit && !form.success">
                        {{ contactFormOptions.error }}
                    </div>
                    <div class="form-group">
                        <label for="email">{{ contactFormOptions.email.label }}</label>
                        <input
                            class="form-control"
                            type="email"
                            name="email"
                            placeholder="{{ contactFormOptions.email.placeholder }}"
                            ng-model="newContact.email"
                            ng-required="contactFormOptions.email.required">
                    </div>
                    <div class="alert alert-danger" role="alert" ng-if="contactForm.email.$touched && (contactForm.email.$error.email || contactForm.email.$error.required)">
                        <span ng-if="contactForm.email.$error.email">{{ contactFormOptions.email.errors.invalid }}</span>
                        <span ng-if="contactForm.email.$error.required">{{ contactFormOptions.email.errors.required }}</span>
                    </div>
                    <div class="form-group">
                        <label for="subject">{{ contactFormOptions.subject.label }}</label>
                        <input
                            class="form-control"
                            type="text"
                            name="subject"
                            placeholder="{{ contactFormOptions.subject.placeholder }}"
                            ng-model="newContact.subject"
                            ng-required="contactFormOptions.subject.required">
                    </div>
                    <div class="alert alert-danger" role="alert" ng-if="contactForm.subject.$touched && contactForm.subject.$error.required">
                        <span ng-if="contactForm.subject.$error.required">{{ contactFormOptions.subject.errors.required }}</span>
                    </div>
                    <div class="form-group">
                        <label for="message">{{ contactFormOptions.message.label }}</label>
                        <textarea
                            class="form-control"
                            name="message"
                            rows="8"
                            cols="40"
                            placeholder="{{ contactFormOptions.message.placeholder }}"
                            ng-minlength="contactFormOptions.message.minLength"
                            ng-maxlength="contactFormOptions.message.maxLength"
                            ng-model="newContact.message"
                            ng-required="contactFormOptions.message.required">
                        </textarea>
                    </div>
                    <div class="alert alert-danger" role="alert" ng-if="contactForm.message.$touched && (contactForm.message.$error.required || contactForm.message.$error.minlength || contactForm.message.$error.maxlength)">
                        <span ng-if="contactForm.message.$error.minlength">{{ contactFormOptions.message.errors.minLength }}</span>
                        <span ng-if="contactForm.message.$error.maxlength">{{ contactFormOptions.message.errors.maxLength }}</span>
                        <span ng-if="contactForm.message.$error.required">{{ contactFormOptions.message.errors.required }}</span>
                    </div>
                    <button type="submit" class="btn btn-default" ng-disabled="contactForm.$invalid">{{ contactFormOptions.submitButton }}</button>
                </form>
            `,
            controller: 'ContactFormController'
        }
    }
])
