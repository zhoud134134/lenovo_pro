"use strict";

angular.module('app.OperationData').controller('OthercategorymaintenanceCtrl', function ($scope,$http,OthercategorymaintenanceService,$state,$stateParams,$location) {

    $scope.ww = true;
    $scope.btnSwitch = function(flag){
        if(flag == 'w'){
            $scope.ww = false;
        }else if(flag == 'p'){
            $scope.ww = true;
        }
    }


    new superTable("demoTable", {
        cssSkin: "sDefault",
        fixedCols: 3, //固定几列
        headerRows: 3,  //头部固定行数
        onStart: function () {
            this.start = new Date();
        },
        onFinish: function () {
        }
    });


    $("#div_container").css("width", "1280px");//这个宽度是容器宽度，不同容器宽度不同
    $(".fakeContainer").css("height", "666px");//这个高度是整个table可视区域的高度，不同情况高度不同
    //.sData是调用superTables.js之后页面自己生成的  这块就是出现滚动条 达成锁定表头和列的效果

    $(".sData").css("width", "689px");//这块的宽度是用$("#div_container")的宽度减去锁定的列的宽度
    $(".sData").css("height", "590px");//这块的高度是用$("#div_container")的高度减去锁定的表头的高度


    //请求表格数据调用方法
    OthercategorymaintenanceService.getOthercategoryData().then(function(data){

        if(data.code == 0){
            $scope.categoryData = data.result;
            console.log($scope.categoryData);
            for(var i=0;i< $scope.categoryData.length;i++){
               console.log($scope.categoryData[i]);
            }
        }

    },function(data){
        console.log(data);
    });
})