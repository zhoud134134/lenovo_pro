"use strict";


angular.module('app.ControlPoint', ['ui.router'])


angular.module('app.ControlPoint').config(function ($stateProvider) {

    $stateProvider
        .state('app.ControlPoint', {
            abstract: true,
            data: {
                title: 'OperationData'
            }
        })
        //二级菜单
        .state('app.ControlPoint.Costinterlockschedule', {
            url: '/ControlPoint/Costinterlockschedule',
            data: {
                title: 'Cost interlock schedule'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/ControlPoint/views/Costinterlockschedule.html',
                    controller: 'CostinterlockscheduleCtrl',
                }
            }
        })
        .state('app.ControlPoint.CycleVersioncontrol', {
            url: '/ControlPoint/CycleVersioncontrol',
            data: {
                title: 'Cycle & Version control'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/ControlPoint/views/CycleVersioncontrol.html',
                    controller: 'CycleVersioncontrolCtrl',
                }
            }
        })
        .state('app.ControlPoint.Taskqueue', {
            url: '/ControlPoint/Taskqueue',
            data: {
                title: 'Task queue'
            },
            views: {
                "content@app": {
                    templateUrl: 'app/ControlPoint/views/Taskqueue.html',
                    controller: 'TaskqueueCtrl',
                }
            }
        })


});