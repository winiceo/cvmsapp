import 'f7css';
import 'f7colors';
import './assets/app.less';

import $ from "jquery";
import 'framework7'; 
import angular from "angular"; 
import uiRouter from 'angular-ui-router';  
import Controllers from './app/controllers/base';
import Loading from './app/components/loading';


angular.module('f7.app', []); // view controllers etc.
angular.module('f7.services', []); // services
angular.module('f7.filters', []); // filter
angular.module('f7.factories', []); // helper
angular.module('f7.directives', []); // directives

angular.module('f7.libs', [uiRouter]);
console.log(Controllers.name)
angular.module('f7', ['f7.services', 'f7.filters', 'f7.factories', 'f7.directives', 'f7.app', 'f7.libs', Controllers.name])

    .run(function () {
        window.application = new Framework7({
            modalTitle: '友情提示',
            //material: false,
            pushState: true,
            route: false,
            initPageMaterialTabbar:true,
            onAjaxStart: function (xhr) {
                window.application.showIndicator();
            },
            onAjaxComplete: function (xhr) {
                window.application.hideIndicator();
            },
            swipePanel: 'left'
        });
         
        window.$$ = Dom7;
    })

    .constant('Config', {
        constantVariables: 'constantValue'
    })
    .config(($locationProvider) => {
        "ngInject";
        
    })

    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider
            .state('app', {
                url: '/app',
                templateUrl: '/page/app.html'
            })
            .state('app.home', {
                url: '/home',
                views: {
                    AppContent: {
                        templateUrl: '/page/home.html',
                        controller: 'home'
                    }
                }
            })
            .state('app.detail', {
                url: '/activty/detail/:id',
                views: {
                    AppContent: {
                        templateUrl: '/page/activty.detail.html',
                        controller: 'activty_detail'
                    }
                }
            })

            .state('app.counit', {
                url: '/counit',
                views: {
                    AppContent: {
                        templateUrl: '/page/counit.html',
                        controller: 'counit'
                    }
                }
            })
            .state('app.vote', {
                url: '/vote',
                views: {
                    AppContent: {
                        templateUrl: '/page/vote.html',
                        controller: 'vote'
                    }
                }
            })
            .state('app.vote_detail', {
                url: '/vote/detail/:id',
                views: {
                    AppContent: {
                        templateUrl: '/page/vote.detail.html',
                        controller: 'vote_detail'
                    }
                }
            })
            .state('app.survey', {
                url: '/survey',
                views: {
                    AppContent: {
                        templateUrl: '/page/survey.html',
                        controller: 'survey'
                    }
                }
            })
            .state('app.survey_detail', {
                url: '/survey/detail/:id',
                views: {
                    AppContent: {
                        templateUrl: '/page/survey.detail.html',
                        controller: 'survey_detail'
                    }
                }
            })
            .state('app.shop', {
                url: '/shop',
                views: {
                    AppContent: {
                        templateUrl: '/page/shop.html',
                        controller: 'shop'
                    }
                }
            }).state('app.order', {
                url: '/order',
                views: {
                    AppContent: {
                        templateUrl: '/page/order.html',
                        controller: 'order'
                    }
                }
            })
            .state('app.award_detail', {
                url: '/award/detail/:id',
                views: {
                    AppContent: {
                        templateUrl: '/page/award.detail.html',
                        controller: 'award_detail'
                    }
                }
            })
            .state('app.card', {
                url: '/card',
                views: {
                    AppContent: {
                        templateUrl: '/page/card.html',
                        controller: 'card'
                    }
                }
            })
            .state('app.settings', {
                url: '/settings',
                views: {
                    AppContent: {
                        templateUrl: '/page/settings.html',
                        controller: 'settings'
                    }
                }
            })
            .state('app.profile', {
                url: '/profile',
                views: {
                    AppContent: {
                        templateUrl: '/page/profile.html',
                        controller: 'profile'
                    }
                }
            }) 
            .state('app.myactivty', {
                url: '/myactivty',
                views: {
                    AppContent: {
                        templateUrl: '/page/myactivty.html',
                        controller: 'myactivty'
                    }
                }
            })

        //~!states!~
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        }); 
        $urlRouterProvider.otherwise("/app/home");
        
    })
    .controller('root.controller', ['$rootScope', '$state', function ($rootScope, $state) {

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

        });
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            console.log('state changed');
            Loading.hide();
            setTimeout(function () {
             
                window.application.initPage($('.pages'));
            });
        });
        $rootScope.$on('$viewContentLoading', function (event, toState, toParams, fromState, fromParams) {

        });
        $rootScope.$on('$viewContentLoaded', function (event, toState, toParams, fromState, fromParams) {

        });
    }]);
