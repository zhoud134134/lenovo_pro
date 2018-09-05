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

            function notifyError(rejection) {
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
        , $state, $stateParams, navService, APP_CONFIG) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        // editableOptions.theme = 'bs3';
        //    $rootScope.user = '123';

        $rootScope.$on('$stateChangeStart', function ($event, toState, toParams, fromState, fromParams, $timeout) {
            //event：该事件的基本信息
            //toState:我们可以得到当前路由的信息，比如路由名称，url,视图的控制器，模板路径等等
            //toParams:我们可以得到当前路由的参数
            //fromState：我们可以得到上一个路由的信息，比如路由名称，url,视图的控制器，模板路径等等
            //fromParams：我们可以得到上一个路由的参数
            /*可以触发的事件包括：
             stateChangeStart当状态改变开始的时候被触发
             $stateChangeSuccess当状态改变成功后被触发
             $stateChangeError当状态改变遇到错误时被触发，错误通常是目标无法载入，需要预载入的数据无法被载入等*/

            //var data = {
            //    "result": {
            //        "displayname": ["Jiaozi JZ1 Han"],
            //        "ITcode": ["hanjz1"],
            //        "email": ["hanjz1@lenovo.com"],
            //        "status": ["1"]
            //    }, "code": 0
            //};
            //sessionStorage.setItem("userResult", JSON.stringify(data.result));
            //
            //$.ajax({
            //    type: "GET",
            //    url: "https://mcmt.lenovo.com/ccf-prod/hello/test?ITcode=hanjz1",
            //    success: function (data) {
            //        console.log(data)
            //        sessionStorage.setItem("token", data);
            //    }
            //});


           navService.getUser().then(function (data) {
                //var data = {"result":{"displayname":["Jiaozi JZ1 Han"],"ITcode":["hanjz1"],"email":["hanjz1@lenovo.com"],"status":["1"],"token":["eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE1MzU5NTQwMDEsInN1YiI6Imhhbmp6MSIsImNyZWF0ZWQiOjE1MzUzNDkyMDExNDh9.QmTq6eDrq5KKYkT83fVVARQVaJA7M7l64UWElI6aVt8cyLMpOjfkr-sZwKKqDKuq9U5eTuXrr8TkP6cj9l_Yhw"]},"code":0}
                console.log(data)

                if (data.code == 0) {
                    if (!data.result) {
                        window.location.href = APP_CONFIG.indexUrl;
                    } else {
                        if (data.result.token[0]) {
                            sessionStorage.setItem("token", data.result.token[0]);
                        } else {
                            alert("没有token!");
                        }
                        if (data.result.status == '-1') {
                            alert('没有权限！');
                            window.location.href = APP_CONFIG.indexUrl;
                        } else {
                            sessionStorage.setItem("userResult", JSON.stringify(data.result));
                        }

                    }
                }

            }, function (data) {
                console.log(data);
            });

        });


        //调取bu、geo、region、segment
        /* navService.getBU().then(function (data) {
         if(data.code == 0){
         sessionStorage.setItem("bu", JSON.stringify(data.result));
         }
         }, function (data) {
         console.log(data);
         });
         navService.getGEO().then(function (data) {
         if(data.code == 0){
         sessionStorage.setItem("geo", JSON.stringify(data.result));
         }
         }, function (data) {
         console.log(data);
         });
         navService.getREGION().then(function (data) {
         if(data.code == 0){
         sessionStorage.setItem("region", JSON.stringify(data.result));
         }
         }, function (data) {
         console.log(data);
         });
         var prc = {
         stype : 'PRC'
         }
         navService.getSEGMENTprc(prc).then(function (data) {
         if(data.code == 0){
         sessionStorage.setItem("segmentPRC", JSON.stringify(data.result));
         }
         }, function (data) {
         console.log(data);
         });
         var ww = {
         stype : 'WW'
         }
         navService.getSEGMENTww(ww).then(function (data) {
         if(data.code == 0){
         sessionStorage.setItem("segmentWW", JSON.stringify(data.result));
         }
         }, function (data) {
         console.log(data);
         });*/


        //$rootScope.Markupthead = ['PRC','AP','EMEA','NA','Brazil','LAS','HQ','Total'];
        // $rootScope.Markuptbody = ['CONSUMER','SMB','COMMERCIAL','Others','Total'];
        //markup ww表格式化
        $rootScope.SortUnique = function (json, tbody, thead, jsonData) {
            //从某个json中取出数据，对数据去重，同时按照要求排序的封装
            function SortUnique(obj, par, arr) {
                var jsonArr = [];
                for (var i = 0; i < obj.length; i++) {
                    jsonArr.push(obj[i][par]);
                }
                return arrCONTarr(unique(jsonArr), arr);
            }

            //获取已经排序的segment，同时仅有数据中的这些
            var segment = SortUnique(json, 'segment', tbody)


            //把segment相同的放在一个数组中
            var sameArr = [];
            for (var j = 0; j < tbody.length; j++) {
                var otherArr = [];
                for (var i = 0; i < json.length; i++) {
                    if (json[i].segment == tbody[j]) {
                        otherArr.push(json[i]);
                    }
                }
                if (otherArr.length) {
                    sameArr.push(otherArr)
                }
            }

            //给已经处理好的数组的项中，根据geo，添加status序号
            for (var j = 0; j < sameArr.length; j++) {
                for (var n = 0; n < sameArr[j].length; n++) {
                    for (var i = 0; i < thead.length; i++) {
                        if (sameArr[j][n].geo == thead[i]) {
                            sameArr[j][n].status = i;
                        }
                    }
                }
            }
            console.log(sameArr)

            //创建一个数组，数组中包含对象，对象中包含两项，一项为segment，一项为数组放数据用，其中给数组设置长度及默认项为空字符串
            var dataArr = [];
            //molArr = new Array(thead.length-1).fill('');
            for (var i = 0; i < sameArr.length; i++) {
                for (var j = 0; j < sameArr[i].length; j++) {
                    dataArr[i] = {segment: sameArr[i][j].segment, arr: []};
                    dataArr[i].arr = new Array(thead.length - 1).fill('-');
                }
            }
            console.log(dataArr);
            // var dataArr1 = dataArr;

            //将原本设置的status值作为数组对象数组中的索引，将原本jsonData的值放入正确的索引之中
            //dataArr的数据可以用于不要求全部显示segment，有什么显示什么segment用

            for (var i = 0; i < dataArr.length; i++) {
                for (var j = 0; j < sameArr.length; j++) {
                    for (var n = 0; n < sameArr[j].length; n++) {
                        if (sameArr[j][n].segment == dataArr[i].segment) {
                            dataArr[i].arr[sameArr[j][n].status - 1] = sameArr[j][n][jsonData];

                        }
                    }
                }
            }
            console.log(dataArr);

            //Zarr为最终前端所需数据形态，如果展示全部segment，则将已经有的替换到完整的指定项，最终所得为所需结果
            var Zarr = [];
            var molArr2 = new Array(thead.length - 1).fill('-');
            for (var i = 0; i < tbody.length; i++) {
                Zarr.push({segment: tbody[i], arr: molArr2})
            }

            for (var i = 0; i < Zarr.length; i++) {
                for (var j = 0; j < dataArr.length; j++) {
                    if (Zarr[i].segment == dataArr[j].segment) {
                        Zarr[i] = dataArr[j];
                    }
                }
            }
            return Zarr;

        }

        $rootScope.markHZ = function (result, thead) {
            var Markuptbody = [];
            for (var i in result) {
                console.log(i)
                Markuptbody.push({name1: 'BMC $M（' + i + '）', name2: 'Markup in Tape $M（' + i + '）', flag: i})
            }

            for (var i = 0; i < Markuptbody.length; i++) {
                Markuptbody[i].data1 = new Array(thead.length).fill('-');
                Markuptbody[i].data2 = new Array(thead.length).fill('-');
            }

            var resultAarr = [];
            for (var i in result) {
                resultAarr.push({title: i, data: result[i], prc: [], total: [], prcData: [], totalData: []});
            }

            for (var i = 0; i < resultAarr.length; i++) {
                for (var j = 0; j < resultAarr[i].data.length; j++) {
                    if (resultAarr[i].data[j].geo == 'PRC') {
                        resultAarr[i].prc.push(resultAarr[i].data[j])
                    } else if (resultAarr[i].data[j].geo == 'Total') {
                        resultAarr[i].total.push(resultAarr[i].data[j])
                    }
                }
            }

            for (var i = 0; i < resultAarr.length; i++) {
                for (var n = 0; n < thead.length; n++) {
                    for (var j = 0; j < resultAarr[i].prc.length; j++) {
                        /*console.log(resultAarr[i].prc[j].segment)*/
                        if (thead[n] == resultAarr[i].prc[j].segment) {
                            resultAarr[i].prc[j].status = n;
                        }
                        if (thead[n] == resultAarr[i].total[j].segment) {
                            resultAarr[i].total[j].status = n;
                        }

                    }
                }
            }

            for (var i = 0; i < resultAarr.length; i++) {
                for (var j = 0; j < Markuptbody.length; j++) {
                    if (resultAarr[i].title == Markuptbody[j].flag) {
                        for (var n = 0; n < resultAarr[i].prc.length; n++) {
                            Markuptbody[j].data1[resultAarr[i].prc[n].status] = resultAarr[i].prc[n].bmc;
                            Markuptbody[j].data2[resultAarr[i].prc[n].status] = resultAarr[i].prc[n].mark45;
                        }
                    }
                }
            }
            console.log(Markuptbody)
            return Markuptbody;
        }

        $rootScope.caprcTabCon=function(json, tbody, thead, jsonData) {
            //从某个json中取出数据，对数据去重，同时按照要求排序的封装?
            function SortUnique(obj, par, arr) {
                var jsonArr = [];
                for(var i = 0; i < obj.length; i++) {
                    jsonArr.push(obj[i][par]);
                }
                return arrCONTarr(unique(jsonArr), arr);
            }

            //获取已经排序的bu，同时仅有数据中的这些
            var bu = SortUnique(json, 'bu', tbody)

            //把segment相同的放在一个数组中
            var sameArr = [];
            for(var j = 0; j < tbody.length; j++) {
                var otherArr = [];
                for(var i = 0; i < json.length; i++) {
                    if(json[i].bu == tbody[j]) {
                        otherArr.push(json[i]);
                    }
                }
                if(otherArr.length) {
                    sameArr.push(otherArr)
                }
            }
            console.log(sameArr)

            //给已经处理好的数组的项中，根据segment，添加status序号
            for(var j = 0; j < sameArr.length; j++) {
                for(var n = 0; n < sameArr[j].length; n++) {
                    for(var i = 0; i < thead.length; i++) {
                        if(sameArr[j][n].segment == thead[i]) {
                            sameArr[j][n].status = i+1;
                        }
                    }
                }
            }
            console.log(sameArr)

            //创建一个数组，数组中包含对象，对象中包含两项，一项为segment，一项为数组放数据用，其中给数组设置长度及默认项为空字符串
            var dataArr = [];
            //					molArr = new Array(thead.length - 1).fill('-');
            for(var i = 0; i < sameArr.length; i++) {
                for(var j = 0; j < sameArr[i].length; j++) {
                    dataArr[i] = {
                        bu: sameArr[i][j].bu,
                        arr: []
                    };
                    dataArr[i].arr = new Array(thead.length).fill('-');
                }
            }
            console.log(dataArr);
            //将原本设置的status值作为数组对象数组中的索引，将原本jsonData的值放入正确的索引之中
            //dataArr的数据可以用于不要求全部显示segment，有什么显示什么segment用
            for(var i = 0; i < dataArr.length; i++) {
                for(var j = 0; j < sameArr.length; j++) {
                    for(var n = 0; n < sameArr[j].length; n++) {
                        if(sameArr[j][n].bu == dataArr[i].bu) {
                            dataArr[i].arr[sameArr[j][n].status-1] = sameArr[j][n][jsonData]
                        }
                    }
                }
            }

            //Zarr为最终前端所需数据形态，如果展示全部segment，则将已经有的替换到完整的指定项，最终所得为所需结果
            var Zarr = [];
            var camolArr2 = new Array(thead.length).fill('-');
            for(var i = 0; i < tbody.length; i++) {
                Zarr.push({
                    bu: tbody[i],
                    arr: camolArr2
                })
            }
            for(var i = 0; i < Zarr.length; i++) {
                for(var j = 0; j < dataArr.length; j++) {
                    if(Zarr[i].bu == dataArr[j].bu) {
                        Zarr[i] = dataArr[j];
                    }
                }
            }
            return Zarr;
        };
        //    数组去重
        function unique(arr) {
            var res = [arr[0]];
            for (var i = 1; i < arr.length; i++) {
                var repeat = false;
                for (var j = 0; j < res.length; j++) {
                    if (arr[i] == res[j]) {
                        repeat = true;
                        break;
                    }
                }
                if (!repeat) {
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
                    if (arr[j] > arr[j + 1]) {        // 相邻元素两两对比
                        var temp = arr[j + 1];        // 元素交换
                        arr[j + 1] = arr[j];
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
    });


