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
        navService.getUser().then(function (data) {
            console.log(data)
            if (data.code == 0) {
                if(!data.result){
                    window.location.href='https://mcmt.lenovo.com/ccf-prod/index?'+ new Date();
                }else {
                    if(data.result.status == '-1'){
                        alert('没有权限！');
                        window.location.href='https://mcmt.lenovo.com/ccf-prod/index?'+ new Date();
                    }else {
                        sessionStorage.setItem("userResult", JSON.stringify(data.result));
                    }

                }
            }

        }, function (data) {
            console.log(data);
        });

        //    数组去重
        function unique(arr){
            var res = [arr[0]];
            for(var i=1;i<arr.length;i++){
                var repeat = false;
                for(var j=0;j<res.length;j++){
                    if(arr[i] == res[j]){
                        repeat = true;
                        break;
                    }
                }
                if(!repeat){
                    res.push(arr[i]);
                }
            }
            return res;
        }

        //    数组排序
        function bubbleSort(arr) {
            var len = arr.length;
            for (var i = 0; i < len - 1; i++) {
                for (var j = 0; j < len - 1 - i; j++) {
                    if (arr[j] > arr[j+1]) {        // 相邻元素两两对比
                        var temp = arr[j+1];        // 元素交换
                        arr[j+1] = arr[j];
                        arr[j] = temp;
                    }
                }
            }
            return arr;
        }
        //按照另一个数组排序
        function arrCONTarr(a, b) {
            var c = [];
            for (var i = 0; i < b.length; i++) {
                for (var j = 0; j < a.length; j++) {
                    if (a[j] == b[i]) {
                        c.push(a[j]);
                    }
                }
            }
            return c;
        }


        $rootScope.Markupthead = ['PRC','AP','EMEA','NA','Brazil','LAS','HQ','Total'];
        $rootScope.Markuptbody = ['CONSUMER','SMB','COMMERCIAL','Others','Total'];
        //二维表格式化
        $rootScope.SortUnique =function(json,tbody,thead,jsonData){
            //从某个json中取出数据，对数据去重，同时按照要求排序的封装
            function SortUnique(obj,par,arr){
                var jsonArr = [];
                for(var i=0;i<obj.length;i++){
                    jsonArr.push(obj[i][par]);
                }
                return arrCONTarr(unique(jsonArr),arr);
            }

            //获取已经排序的segment，同时仅有数据中的这些
            var segment = SortUnique(json,'segment',tbody)


            //把segment相同的放在一个数组中
            var sameArr = [];
            for(var j=0;j<tbody.length;j++){
                var otherArr = [];
                for(var i=0;i<json.length;i++){
                    if(json[i].segment == tbody[j]){
                        otherArr.push(json[i]);
                    }
                }
                if(otherArr.length) {
                    sameArr.push(otherArr)
                }
            }
            //console.log(sameArr)

            //给已经处理好的数组的项中，根据geo，添加status序号
            for(var j=0;j<sameArr.length;j++){
                for(var n=0;n<sameArr[j].length;n++){
                    for(var i=0;i<thead.length;i++){
                        if(sameArr[j][n].geo == thead[i]){
                            sameArr[j][n].status = i;
                        }
                    }
                }
            }
            console.log(sameArr)

            //创建一个数组，数组中包含对象，对象中包含两项，一项为segment，一项为数组放数据用，其中给数组设置长度及默认项为空字符串
            var dataArr = [];
            //molArr = new Array(thead.length-1).fill('');
            for(var i=0;i<sameArr.length;i++){
                for(var j=0;j<sameArr[i].length;j++){
                    dataArr[i] ={segment : sameArr[i][j].segment , arr:[]};
                    dataArr[i].arr =  new Array(thead.length-1).fill('-');
                }
            }
            console.log(dataArr)
            // var dataArr1 = dataArr;

            //将原本设置的status值作为数组对象数组中的索引，将原本jsonData的值放入正确的索引之中
            //dataArr的数据可以用于不要求全部显示segment，有什么显示什么segment用

            for(var i=0;i<dataArr.length;i++){
                for(var j=0;j<sameArr.length;j++){
                    for(var n=0;n<sameArr[j].length;n++){
                        if(sameArr[j][n].segment == dataArr[i].segment){
                            dataArr[i].arr[sameArr[j][n].status-1] = sameArr[j][n][jsonData];

                        }
                    }
                }
            }
            //console.log(dataArr)



            //Zarr为最终前端所需数据形态，如果展示全部segment，则将已经有的替换到完整的指定项，最终所得为所需结果
            var Zarr = [];
            var molArr2 = new Array(thead.length-1).fill('-');
            for(var i=0;i<tbody.length;i++){
                Zarr.push({segment : tbody[i],arr : molArr2})
            }

            for(var i=0;i<Zarr.length;i++){
                for(var j=0;j<dataArr.length;j++){
                    if(Zarr[i].segment == dataArr[j].segment){
                        Zarr[i] = dataArr[j];
                    }
                }
            }
            return Zarr;

        }


    });


