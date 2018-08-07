"use strict";


angular.module('app.layout', ['ui.router'])

.config(function ($stateProvider, $urlRouterProvider) {


    $stateProvider
        .state('app', {
            abstract: true,
            views: {
                root: {
                    templateUrl: 'app/layout/layout.tpl.html'
                }
            }

        }
    )
    .state('login', {
        url : '/login',
        views: {
            root: {
                templateUrl: 'login.html'
            }
        },
        data: {
            title: 'Login',
            htmlId: 'extr-page'
        },
    })
        .state('app.indexPage', {
            url : '/indexPage',
            views: {
                "content@app": {
                    templateUrl: 'indexPage.html',
                    //controller: 'OthercategorymaintenanceCtrl',
                }
            },
            data: {
                title: 'index',
                //htmlId: 'extr-page'
            },
        })

    $urlRouterProvider.otherwise('/indexPage');
        //$urlRouterProvider.otherwise('/dashboard');

})

