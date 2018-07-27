"use strict";


angular.module('app.Validation', ['ui.router'])


angular.module('app.Validation').config(function ($stateProvider) {

    $stateProvider
        .state('app.Validation', {
            abstract: true,
            data: {
                title: 'Validation'
            }
        })
        //二级菜单
        .state('app.Validation.Validation', {
            abstract: true,
            data: {
                title: 'Validation'
            }
        })
        //三级菜单
        .state('app.Validation.Validation.CAAccumulation', {
            url: '/Validation/Validation/CAAccumulation',
            data: {
                title: 'CA Accumulation'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/Validation/views/CAAccumulation.html',
                    controller: 'CAAccumulationCtrl',
                }
            }
        })
        .state('app.Validation.Validation.MarkupAccumulation', {
            url: '/Validation/Validation/MarkupAccumulation',
            data: {
                title: 'Markup Accumulation'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/Validation/views/MarkupAccumulation.html',
                    controller: 'MarkupAccumulationCtrl',
                }
            }
        })
        .state('app.Validation.Validation.CycleQtQAccumulation', {
            url: '/Validation/Validation/CycleQtQAccumulation',
            data: {
                title: 'Cycle QtQ Accumulation'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/Validation/views/CycleQtQAccumulation.html',
                    controller: 'CycleQtQAccumulationCtrl',
                }
            }
        })
        .state('app.Validation.Validation.ConsumptionbaseAccumulation-detail', {
            url: '/Validation/Validation/ConsumptionbaseAccumulation-detail',
            data: {
                title: 'Consumption base Accumulation-detail'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/Validation/views/ConsumptionbaseAccumulation.html',
                    controller: 'ConsumptionbaseAccumulation-detailCtrl',
                }
            }
        })
        .state('app.Validation.Validation.OthercategoryAccumulation', {
            url: '/Validation/Validation/OthercategoryAccumulation',
            data: {
                title: 'Other category Accumulation'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/Validation/views/OthercategoryAccumulation.html',
                    controller: 'OthercategoryAccumulationCtrl',
                }
            }
        })
        .state('app.Validation.Validation.AlliancefundAccumulation', {
            url: '/Validation/Validation/AlliancefundAccumulation',
            data: {
                title: 'Alliance fund Accumulation '
            },
            views: {
                "content@app": {
                    templateUrl: 'app/Validation/views/AlliancefundAccumulation.html',
                    controller: 'AlliancefundAccumulationCtrl',
                }
            }
        })
        .state('app.Validation.Validation.QTQPNtakedownAccumulation', {
            url: '/Validation/Validation/QTQPNtakedownAccumulation',
            data: {
                title: 'QTQ PN take down  Accumulation'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/Validation/views/QTQPNtakedownAccumulation.html',
                    controller: 'QTQPNtakedownAccumulationCtrl',
                }
            }
        })
        .state('app.Validation.Validation.Outtapedetail', {
            url: '/Validation/Validation/Outtapedetail',
            data: {
                title: 'Out tape detail'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/Validation/views/Outtapedetail.html',
                    controller: 'OuttapedetailCtrl',
                }
            }
        })
        .state('app.Validation.Validation.ResultcheckingbyMTM', {
            url: '/Validation/Validation/ResultcheckingbyMTM',
            data: {
                title: 'Result checking by MTM'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/Validation/views/ResultcheckingbyMTM.html',
                    controller: 'ResultcheckingbyMTMCtrl',
                }
            }
        })


});