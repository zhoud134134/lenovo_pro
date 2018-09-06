"use strict";

angular.module('app.Basicdata').controller('OtherCategorymasterdataCtrl', function ($scope,$rootScope,$state,$stateParams,$location,OtherCategorymasterdataService,APP_CONFIG,Upload) {

    //加载页面、搜索功能
    $scope.OtherSel = '';
    $scope.goPage = function(){
        $scope.page = {
            limit : APP_CONFIG.limit,
            page : APP_CONFIG.page,
            beanName : $scope.OtherSel
        }
        console.log($scope.page)
        OtherCategorymasterdataService.getPage($scope.page).then(function(data){
            if(data.code == 0){
                $scope.pageList = data.result.list;
                console.log($scope.pageList)
            }else {
                console.log(data);
            }
            console.log(data);
        },function(data){
            console.log(data);
        })
    }
    $scope.goPage();

    //单选
    $scope.arr = [];
    $scope.One = function(page){
        page.isChecked = !page.isChecked;
        if(page.isChecked){
            $scope.arr.push(page.id);
            if($scope.arr.length == $scope.pageList.length){
                $scope.isCheckedAll = true;
            }
        }else {
            for(var i=0;i<$scope.arr.length;i++){
                if($scope.arr[i] == page.id){
                    $scope.arr.splice(i,1);
                    break
                }
            }
            $scope.isCheckedAll = false;
        }
        console.log($scope.arr)
    }

    //全选
    $scope.All = function(){
        $scope.isCheckedAll = !$scope.isCheckedAll;
        $scope.arr = [];
        for(var i =0;i<$scope.pageList.length;i++){
            if($scope.isCheckedAll){
                $scope.pageList[i].isChecked = true;
                $scope.arr.push($scope.pageList[i].id)
            }else {
                $scope.pageList[i].isChecked = false;
            }
        }
        console.log($scope.arr);
    }

    //删除
    $scope.del = function(){
        if($scope.arr.length<=0){
            alert('请选择要删除的项！');
        }else {
            if(confirm('确认要删除？')){
                $scope.arrlist = $scope.arr.join(',');
                OtherCategorymasterdataService.delList( $scope.arrlist).then(function(data){
                    if(data.code == 0){
                        alert('删除成功！');
                        $scope.goPage();
                    }else {
                        console.log(data);
                    }
                },function(data){
                    console.log(data);
                })
            }
        }
    }

    //下载
    $scope.downLoad = function(){
        $scope.load = {
            type : 'category'
        }
        OtherCategorymasterdataService.download($scope.load).then(function(data){
            console.log(data);
            var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
            var objectUrl = URL.createObjectURL(blob);
            var aForExcel = $("<a><span class='forExcel'>下载excel</span></a>").attr("href",objectUrl);
            $("body").append(aForExcel);
            $(".forExcel").click();
            aForExcel.remove();
        },function(data){
            console.log(data);
        })
    }

    //上传
    $scope.myfiles = {};
    $scope.openUpload = function(){
        $('#myModal').modal('show');
        $scope.myfilesVal = '';
        $scope.fileChange = function(){
            if($scope.myfiles.name){
                $scope.myfilesVal = $scope.myfiles.name;
            }else {
                $scope.myfilesVal = '';
            }
        }
    }

    $scope.upload = function(){
        Upload.upload({
            //服务端接收
            url:APP_CONFIG.baseUrl+ '/api/ocm/attachments',
            data : {
                file : $scope.myfiles,
                username : $rootScope.user
            }
        }).success(function (data, status, headers, config) {
            if(data.code == 0){
                alert('Success！');
                $('#myModal').modal('hide');
                $scope.goPage();
            }else {
                alert('Uploading Failed');
            }
        }).error(function (data, status, headers, config) {
            alert('Uploading Failed');
            //上传失败
            console.log('error status: ' + status);
        });
    }
})