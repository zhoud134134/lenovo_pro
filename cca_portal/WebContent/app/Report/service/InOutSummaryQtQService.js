angular.module('app.Report').service("InOutSummaryQtQservice", function ($http, $q, $rootScope, APP_CONFIG) {

    this.getInOutSumdata = function (params) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.baseUrl+'/api/routine/FunInoutSummaryQtq',
            headers: {
                'Authorization' : 'Bearer '+ sessionStorage.getItem("token")
            },
            params:params
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    };

    this.getList = function(arrayList,categorylvl1){
        var list = [];
        for(var i = 0; i < categorylvl1.length; i++){

            var categorylvl2 = [];
            for(var r = 0; r < arrayList.length; r++){
                if(arrayList[r].categorylvl1 == categorylvl1[i]){
                    if(arrayList[r].categorylvl2 == ''){
                        list.push(arrayList[r]);
                    }else{
                        if($rootScope.isNotInArray(categorylvl2,arrayList[r].categorylvl2)){
                            categorylvl2.push(arrayList[r].categorylvl2);
                        }
                    }
                }
            }

            for(var j = 0; j < categorylvl2.length; j++){
                var categorylvl3 = [];
                for(var ar = 0; ar < arrayList.length; ar++){
                    if(arrayList[ar].categorylvl1 == categorylvl1[i] && arrayList[ar].categorylvl2 == categorylvl2[j]){
                        if(arrayList[ar].categorylvl3 == ''){
                            list.push(arrayList[ar]);
                        }else{
                            if($rootScope.isNotInArray(categorylvl3,arrayList[ar].categorylvl3)){
                                categorylvl3.push(arrayList[ar].categorylvl3);
                            }
                        }
                    }
                }

                for(var k = 0; k < categorylvl3.length; k++){
                    for(var arl = 0; arl < arrayList.length; arl++){
                        if(arrayList[arl].categorylvl1 == categorylvl1[i] && arrayList[arl].categorylvl2 == categorylvl2[j] && arrayList[arl].categorylvl3 == categorylvl3[k]){
                            list.push(arrayList[arl]);
                        }
                    }
                }

            }

        }
        return list;
        console.log(list);
    }

});