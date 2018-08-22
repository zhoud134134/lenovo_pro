'use strict';

/**
 * @ngdoc overview
 * @name app [smartadminApp]
 * @description
 * # app [smartadminApp]
 *
 * Main module of the application.
 */

angular.module('app', [
    'ngSanitize',
    'ngAnimate',
    'restangular',
    'ui.router',
    'ui.bootstrap',
    //'angularFileUpload',
    'ngFileUpload',



    // Smartadmin Angular Common Module
    'SmartAdmin',

    // App
    //'app.login',
    'app.auth',
    'app.layout',
    'app.chat',
    'app.dashboard',
    'app.calendar',
    'app.inbox',
    'app.graphs',
    'app.tables',
    'app.forms',
    'app.ui',
    'app.widgets',
    'app.maps',
    'app.appViews',
    'app.misc',
    'app.smartAdmin',
    'app.eCommerce',
	
	//自己
    'app.ControlPoint',
    //'angularFileUpload',
    'app.Basicdata',
    'app.OperationData',
    'app.Validation',
    'app.Report',



])
.config(function ($provide, $httpProvider, RestangularProvider) {


    // Intercept http calls.
    $provide.factory('ErrorHttpInterceptor', function ($q) {
        var errorCounter = 0;
        function notifyError(rejection){
            console.log(rejection);
            $.bigBox({
                title: rejection.status + ' ' + rejection.statusText,
                content: rejection.data,
                color: "#C46A69",
                icon: "fa fa-warning shake animated",
                number: ++errorCounter,
                timeout: 6000
            });
        }

        return {
            // On request failure
            requestError: function (rejection) {
                // show notification
                notifyError(rejection);

                // Return the promise rejection.
                return $q.reject(rejection);
            },

            // On response failure
            responseError: function (rejection) {
                // show notification
                notifyError(rejection);
                // Return the promise rejection.
                return $q.reject(rejection);
            }
        };
    });

    // Add the interceptor to the $httpProvider.
    $httpProvider.interceptors.push('ErrorHttpInterceptor');

    RestangularProvider.setBaseUrl(location.pathname.replace(/[^\/]+?$/, ''));

})
.constant('APP_CONFIG', window.appConfig)

.run(function ($rootScope
    , $state, $stateParams,navService
    ) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    // editableOptions.theme = 'bs3';
    //    $rootScope.user = '123';

        $rootScope.$on('$stateChangeStart',function($event, toState, toParams, fromState, fromParams,$timeout){
            //event：该事件的基本信息
            //toState:我们可以得到当前路由的信息，比如路由名称，url,视图的控制器，模板路径等等
            //toParams:我们可以得到当前路由的参数
            //fromState：我们可以得到上一个路由的信息，比如路由名称，url,视图的控制器，模板路径等等
            //fromParams：我们可以得到上一个路由的参数
            /*可以触发的事件包括：
            stateChangeStart当状态改变开始的时候被触发
            $stateChangeSuccess当状态改变成功后被触发
            $stateChangeError当状态改变遇到错误时被触发，错误通常是目标无法载入，需要预载入的数据无法被载入等*/

           if (!$rootScope.userResult) {
               window.location.href='http://mcmt.lenovo.com';
            }
           /*if (toState.name != 'login') {
                alert(1)
               $state.transitionTo("login", null, {notify:false});
               $state.go("login");
                event.preventDefault();

                //window.location.href='http://mcmt.lenovo.com';
            }else {
               alert(2)
           }*/




        });

});


