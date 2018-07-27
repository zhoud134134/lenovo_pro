"use strict";


angular.module('app.Basicdata', ['ui.router'])


angular.module('app.Basicdata').config(function ($stateProvider) {

    $stateProvider
        .state('app.Basicdata', {
            abstract: true,
            data: {
                title: 'Basic data'
            }
        })
        //二级菜单
        .state('app.Basicdata.Masterdatamaintenance', {
            abstract: true,
            data: {
                title: 'Master data maintenance'
            }
        })
        .state('app.Basicdata.DatasourceDetail', {
            abstract: true,
            data: {
                title: 'Data source Detail'
            }
        })
        //三级菜单
        .state('app.Basicdata.Masterdatamaintenance.Segmentmaintenance', {
            url: '/Basicdata/Masterdatamaintenance/Segmentmaintenance',
            data: {
                title: 'Segment maintenance'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/Basicdata/views/Segmentmaintenance.html',
                    controller: 'SegmentmaintenanceCtrl',
                }
            }
        })
        .state('app.Basicdata.Masterdatamaintenance.BUmaintenance', {
            url: '/Basicdata/Masterdatamaintenance/BUmaintenance',
            data: {
                title: 'BU maintenance'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/Basicdata/views/BUmaintenance.html',
                    controller: 'BUmaintenanceCtrl',
                }
            }
        })
        .state('app.Basicdata.Masterdatamaintenance.Commoditymaintenance', {
            url: '/Basicdata/Masterdatamaintenance/Commoditymaintenance',
            data: {
                title: 'Commodity maintenance'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/Basicdata/views/Commoditymaintenance.html',
                    controller: 'CommoditymaintenanceCtrl',
                }
            }
        })
        .state('app.Basicdata.Masterdatamaintenance.OtherCategorymasterdata', {
            url: '/Basicdata/Masterdatamaintenance/OtherCategorymasterdata',
            data: {
                title: 'Other Category master data'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/Basicdata/views/OtherCategorymasterdata.html',
                    controller: 'OtherCategorymasterdataCtrl',
                }
            }
        })
        .state('app.Basicdata.Masterdatamaintenance.DataMapping', {
            url: '/Basicdata/Masterdatamaintenance/DataMapping',
            data: {
                title: 'Data Mapping'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/Basicdata/views/DataMapping.html',
                    controller: 'DataMappingCtrl',
                }
            }
        })
        .state('app.Basicdata.DatasourceDetail.Markupdetail', {
            url: '/Basicdata/DatasourceDetail/Markupdetail',
            data: {
                title: 'Markup detail'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/Basicdata/views/Markupdetail.html',
                    controller: 'MarkupdetailCtrl',
                }
            }
        })
        .state('app.Basicdata.DatasourceDetail.EBRQtydetail', {
            url: '/Basicdata/DatasourceDetail/EBRQtydetail',
            data: {
                title: 'EBR/宇宙版Qty detail'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/Basicdata/views/EBRQtydetail.html',
                    controller: 'EBRQtydetailCtrl',
                }
            }
        })
        .state('app.Basicdata.DatasourceDetail.CFEBMCdetail', {
            url: '/Basicdata/DatasourceDetail/CFEBMCdetail',
            data: {
                title: 'CFE BMC detail'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/Basicdata/views/CFEBMCdetail.html',
                    controller: 'CFEBMCdetailCtrl',
                }
            }
        })
        .state('app.Basicdata.DatasourceDetail.BPCCAdetail', {
            url: '/Basicdata/DatasourceDetail/BPCCAdetail',
            data: {
                title: 'BPC CA detail'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/Basicdata/views/BPCCAdetail.html',
                    controller: 'BPCCAdetailCtrl',
                }
            }
        })
        .state('app.Basicdata.DatasourceDetail.BPCBMCForecastdetail', {
            url: '/Basicdata/DatasourceDetail/BPCBMCForecastdetail',
            data: {
                title: 'BPC BMC Forecast detail'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/Basicdata/views/BPCBMCForecastdetail.html',
                    controller: 'BPCBMCForecastdetailCtrl',
                }
            }
        })


});