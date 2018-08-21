"use strict";

angular.module('app.Basicdata').controller('SegmentmaintenanceCtrl', function ($scope,$rootScope,$state,$stateParams,APP_CONFIG,SegmentmaintenanceService,Upload) {

    //加载页面、搜索功能
    $scope.SegmentSel = '';
    $scope.goPage = function(){
        $scope.page = {
            limit : APP_CONFIG.limit,
            page : APP_CONFIG.page,
            beanName : $scope.SegmentSel
        }
        console.log($scope.page)
        SegmentmaintenanceService.getPage($scope.page).then(function(data){
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
                SegmentmaintenanceService.delList( $scope.arrlist).then(function(data){
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

    //分页器
    $('.M-box').pagination({
        pageCount : 10,   //总页数
        totalData : 200,  //数据总条数
        current : 1,   //当前第几页
        count : 2,   //当前选中页前后页数
        isHide : false,   //1或0页隐藏分页控件
        keepShowPN :true,   //是否一直显示上一页下一页
        prevContent:'Previous',
        nextContent:'Next',
        callback:function(api){
            $('.now').text(api.getCurrent());
        }
    },function(api){
        $('.now').text(api.getCurrent());
    });


    //下载
    $scope.downLoad = function(){
        $scope.load = {
            type : 'segment'
        }
        SegmentmaintenanceService.download($scope.load).then(function(data){
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
            url:APP_CONFIG.baseUrl+ '/api/smt/attachments',
            data : {
                file : $scope.myfiles,
                username : $rootScope.user
            }
        }).success(function (data, status, headers, config) {
            if(data.code == 0){
                alert('上传成功！');
                $('#myModal').modal('hide');
                $scope.goPage();
            }else {
                alert('上传失败！');
            }
        }).error(function (data, status, headers, config) {
            alert('上传失败！');
            //上传失败
            console.log('error status: ' + status);
        });
    }

})