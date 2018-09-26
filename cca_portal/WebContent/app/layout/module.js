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
    ).state('app.indexPage', {
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
        .state('Jurisdiction', {
            url : '/Jurisdiction',
            views: {
                root: {
                    templateUrl: 'app/layout/JurisdictionPage.html',
                    controller: 'JurisdictionCtrl',
                }
            },
            data: {
                title: 'Jurisdiction',
                htmlId: 'extr-page'
            },
        })

    //$urlRouterProvider.otherwise('/Jurisdiction');
    $urlRouterProvider.otherwise('/indexPage');
        //$urlRouterProvider.otherwise('/dashboard');

})

