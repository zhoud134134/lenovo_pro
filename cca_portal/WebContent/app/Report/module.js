"use strict";


angular.module('app.Report', ['ui.router'])


angular.module('app.Report').config(function ($stateProvider) {

    $stateProvider
        .state('app.Report', {
            abstract: true,
            data: {
                title: 'Report'
            }
        })
        //二级菜单
        .state('app.Report.InOutSummaryQtQ', {
            url: '/Report/InOutSummaryQtQ',
            data: {
                title: 'In+Out Summary QtQ'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/Report/views/InOutSummaryQtQ.html',
                    controller: 'InOutSummaryQtQCtrl',
                }
            }
        })
        .state('app.Report.OuttapeSummary', {
            url: '/Report/OuttapeSummary',
            data: {
                title: 'Out tape Summary'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/Report/views/OuttapeSummary.html',
                    controller: 'OuttapeSummaryCtrl',
                }
            }
        })
        .state('app.Report.OuttapeBUSummary', {
            url: '/Report/OuttapeBUSummary',
            data: {
                title: 'Out tape BU Summary'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/Report/views/OuttapeBUSummary.html',
                    controller: 'OuttapeBUSummaryCtrl',
                }
            }
        })
        .state('app.Report.QTQPNtakedown', {
            url: '/Report/QTQPNtakedown',
            data: {
                title: 'QTQ PN take down'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/Report/views/QTQPNtakedown.html',
                    controller: 'QTQPNtakedownCtrl',
                }
            }
        })



});