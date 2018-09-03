"use strict";


angular.module('app.OperationData', ['ui.router'])


angular.module('app.OperationData').config(function ($stateProvider) {

    $stateProvider
        .state('app.OperationData', {
            abstract: true,
            data: {
                title: 'OperationData'
            }
        })
        //二级菜单
        .state('app.OperationData.Dealmaintenance', {
            abstract: true,
            data: {
                title: 'Deal maintenance'
            }
        })
        .state('app.OperationData.Bizdatamaintenance', {
            abstract: true,
            data: {
                title: 'Biz data maintenance'
            }
        })
        .state('app.OperationData.Bizdatamanualupload', {
            abstract: true,
            data: {
                title: 'Biz data manual upload'
            }
        })
        //三级菜单
        .state('app.OperationData.Dealmaintenance.Dealmaintenance', {
            url: '/OperationData/Dealmaintenance/Dealmaintenance',
            data: {
                title: 'Deal maintenance'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/OperationData/views/Dealmaintenance.html',
                    controller: 'DealmaintenanceCtrl',
                }
            }
        })
        .state('app.OperationData.Bizdatamaintenance.CAmaintenance', {
            url: '/OperationData/Bizdatamaintenance/CAmaintenance',
            data: {
                title: 'CA maintenance'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/OperationData/views/CAmaintenance.html',
                    controller: 'CAmaintenanceCtrl',
                }
            }
        })
       /* .state('app.OperationData.Bizdatamaintenance.CAmanualupload', {
            url: '/OperationData/Bizdatamaintenance/CAmanualupload',
            data: {
                title: 'CA manual upload'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/OperationData/views/CAmanualupload.html',
                    controller: 'CAmanualuploadCtrl',
                }
            }
        })*/
        .state('app.OperationData.Bizdatamaintenance.Markupmaintenance', {
            url: '/OperationData/Bizdatamaintenance/Markupmaintenance',
            data: {
                title: 'Markup maintenance'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/OperationData/views/Markupmaintenance.html',
                    controller: 'MarkupmaintenanceCtrl',
                }
            }
        })
        .state('app.OperationData.Bizdatamaintenance.CycleQtQ', {
            url: '/OperationData/Bizdatamaintenance/CycleQtQ',
            data: {
                title: 'Cycle QTQ'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/OperationData/views/CycleQTQ.html',
                    controller: 'CycleQtQCtrl',
                }
            }
        })
        .state('app.OperationData.Bizdatamaintenance.ConsumptionBasemaintenance', {
            url: '/OperationData/Bizdatamaintenance/ConsumptionBasemaintenance',
            data: {
                title: 'Consumption Base maintenance'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/OperationData/views/ConsumptionBasemaintenance.html',
                    controller: 'ConsumptionBasemaintenanceCtrl',
                }
            }
        })
       /* .state('app.OperationData.Bizdatamaintenance.Othercategorymaintenance', {
            url: '/OperationData/Bizdatamaintenance/Othercategorymaintenance',
            data: {
                title: 'Other category maintenance'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/OperationData/views/Othercategorymaintenance.html',
                    controller: 'OthercategorymaintenanceCtrl',
                }
            }
        })*/
        .state('app.OperationData.Bizdatamaintenance.Alliancefundmaintenance', {
            url: '/OperationData/Bizdatamaintenance/Alliancefundmaintenance',
            data: {
                title: 'Alliance fund maintenance'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/OperationData/views/Alliancefundmaintenance.html',
                    controller: 'AlliancefundmaintenanceCtrl',
                }
            }
        })
        .state('app.OperationData.Bizdatamaintenance.QTQPNtakedown', {
            url: '/OperationData/Bizdatamaintenance/QTQPNtakedown',
            data: {
                title: 'QTQ PN take down'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/OperationData/views/QTQPNtakedown.html',
                    controller: 'OPQTQPNtakedownCtrl',
                }
            }
        })
        .state('app.OperationData.Bizdatamanualupload.AccountTemplateManualUpload', {
            url: '/OperationData/Bizdatamaintenance/AccountTemplateManualUpload',
            data: {
                title: 'Account template manual upload'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/OperationData/views/AccountTemplateManualUpload.html',
                    controller: 'AccountTemplateManualUploadCtrl',
                }
            }
        })
        .state('app.OperationData.Bizdatamanualupload.MegaDealRelatedMaintenance', {
            url: '/OperationData/Bizdatamaintenance/MegaDealRelatedMaintenance',
            data: {
                title: 'Mega Deal related  maintenance'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/OperationData/views/MegaDealRelatedMaintenance.html',
                    controller: 'MegaDealRelatedMaintenanceCtrl',
                }
            }
        })
        .state('app.OperationData.Bizdatamanualupload.CAmanualupload', {
            url: '/OperationData/Bizdatamaintenance/CAmanualupload',
            data: {
                title: 'CA manual upload'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/OperationData/views/CAmanualupload.html',
                    controller: 'CAmanualuploadCtrl',
                }
            }
        })
        .state('app.OperationData.Bizdatamanualupload.Othercategorymaintenance', {
            url: '/OperationData/Bizdatamaintenance/Othercategorymaintenance',
            data: {
                title: 'Other category main...'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/OperationData/views/Othercategorymaintenance.html',
                    controller: 'OthercategorymaintenanceCtrl',
                }
            }
        })



        /*.state('app.OperationData.login', {
            url : '/login',
            views: {
                "content@app": {
                    templateUrl: 'app/layout/login.html',
                    controller: 'AlliancefundmaintenanceCtrl',
                }
            }
        })*/

});