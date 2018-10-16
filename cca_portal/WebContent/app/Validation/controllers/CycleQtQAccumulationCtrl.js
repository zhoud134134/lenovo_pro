"use strict";

angular.module('app.Validation').controller('CycleQtQAccumulationCtrl', function ($scope,$state,$stateParams,$location,CycleQtQAccumulationService,$http,$log,$rootScope,$timeout) {
    $rootScope.getvalidationCycle('bmc_qtq_caculate').then(function (data) {
        $scope.cycledata = data.result;
    });

    $scope.WW = true;
    $scope.PRC = true;
    $scope.WWShift = true;
    $scope.PRCShift = true;
    //点击Search
    $scope.SearchTab = function(){
        if(!$scope.CycleChoose){
            alert("Please select conditions！");
        }else{
            $scope.PRCWW = false;
            $scope.TaskID =  $scope.CycleChoose.taskId;
            $scope.CycleName = $scope.CycleChoose.cycleName;
            console.log($scope.CycleName);
            $scope.WW = false;
            $scope.PRC = true;
            $('#execute2').css('display', 'block');
            $('#execute1').css('display', 'none');
            //WW
            CycleQtQAccumulationService.getWw($scope.TaskID).then(function(data){
                if(data.code == 0){
                    $('#execute1').css('display', 'block');
                    $('#execute2').css('display', 'none');
                    $scope.WwList = data.result;
                    $scope.wwTable();
                }
                console.log(data);
            },function(data){
                console.log(data);
            });

            //PRC
            CycleQtQAccumulationService.getPrc($scope.TaskID).then(function(data) {
                if (data.code == 0) {
                    $scope.PrcList = data.result;
                    console.log($scope.PrcList);
                    $scope.prcTalbe();
                }
                console.log(data)
            } ,function(data){
                console.log(data);
            });
        }
    };

    $scope.wwTable = function(){
        $("#WWExample").dataTable().fnDestroy();
        $timeout(function () {
            $('#WWExample thead tr').eq(1).find('td').each(function() {
                var title = $('#WWExample thead tr td').eq($(this).index()).text();
                $(this).html('<input type="text" placeholder="Search ' + title + '" />');
            });
            var table = $('#WWExample').DataTable({
                //"processing": true,
                "scrollY": 359,
                "scrollX": true,
                "dom": '<"top">rt<"bottom"><"clear">',
                //"dom": '<"top"i>rt<"bottom"flp><"clear">',
                "scrollCollapse": true,
                //"jQueryUI": true,
                // "pagingType":   "simple_numbers",
                //stateSave: true,
                //"pagingType":   "full_numbers",
                "paging": false,
                "ordering": false,
                //"lengthChange": true,
                "autoWidth": false,
                "data" :  $scope.WwList,
                "columns":[
                    { "data": "qtr" },
                    { "data": "zfingeo" },
                    { "data": "zregion2" },
                    { "data": "cfeBu" },
                    { "data": "cfeSegment" },
                    { "data": "invQty",render: $.fn.dataTable.render.number( ',', '.')},
                    { "data": "cfeCycle" },
                    { "data": "lqBmc" ,render: function ( data, type, row ) {
                        if(data == null){
                            return data;
                        }else {
                            var abc = data + '';
                            return abc.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        }
                    }},
                    { "data": "cqBmc" ,render: function ( data, type, row ) {
                        if(data == null){
                            return data;
                        }else {
                            var abc = data + '';
                            return abc.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        }
                    }},
                    { "data": "nqBmc",  render: function ( data, type, row ) {
                        if(data == null){
                            return data;
                        }else {
                            var abc = data + '';
                            return abc.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        }
                    }},
                    { "data": "cqLq" ,render: function ( data, type, row ) {
                        if(data == null){
                            return data;
                        }else {
                            var abc = data + '';
                            return abc.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        }
                    }},
                    { "data": "nqCq" ,render: function ( data, type, row ) {
                        if(data == null){
                            return data;
                        }else {
                            var abc = data + '';
                            return abc.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        }
                    }},
                    { "data": "lqTtl" ,render: function ( data, type, row ) {
                        if(data == null){
                            return data;
                        }else {
                            var abc = data + '';
                            return abc.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        }
                    }},
                    { "data": "cqTtl" ,render: function ( data, type, row ) {
                        if(data == null){
                            return data;
                        }else {
                            var abc = data + '';
                            return abc.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        }
                    }},
                    { "data": "nqTtl" ,render: function ( data, type, row ) {
                        if(data == null){
                            return data
                        }else {
                            var abc = data + '';
                            return abc.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        }
                    }},
                    { "data": "cqLqTtl" ,render: function ( data, type, row ) {
                        if(data == null){
                            return data;
                        }else {
                            var abc = data + '';
                            return abc.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        }
                    }},
                    { "data": "nqCqTtl",render: function ( data, type, row ) {
                        if(data == null){
                            return data;
                        }else {
                            var abc = data + '';
                            return abc.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        }
                    }},
                ]
            });
            table.columns().eq(0).each(function(colIdx) {
                $('input', table.column(colIdx).header()).on('keyup change', function() {
                    table
                        .column(colIdx)
                        .search(this.value)
                        .draw();
                });
            });
        });
    }

    $scope.prcTalbe = function(id){
        $("#PRCExample").dataTable().fnDestroy();
        $timeout(function () {
            $('#PRCExample thead tr').eq(1).find('td').each(function() {
                var title = $('#PRCExample thead tr td').eq($(this).index()).text();
                $(this).html('<input type="text" placeholder="Search ' + title + '" />');
            });
            var table =$('#PRCExample').DataTable({
                //"processing": true,
                "scrollY": 359,
                "scrollX": true,
                "dom": '<"top">rt<"bottom"><"clear">',
                "scrollCollapse": true,
                //"jQueryUI": true,
                // "pagingType":   "simple_numbers",
                //stateSave: true,
                "paging": false,
                "ordering": false,
                //"lengthChange": true,
                "autoWidth": false,
                "data" : $scope.PrcList,
                "columns": [
                    { "data": "qtr" },
                    { "data": "zfingeo" },
                    { "data": "cfeBu" },
                    { "data": "cfePrcSegment" },
                    { "data": "invQty" ,render: $.fn.dataTable.render.number( ',', '.')},
                    { "data": "cfeCycle" },
                    { "data": "lqBmc" ,render: function ( data, type, row ) {
                        if(data == null){
                            return data;
                        }else {
                            var abc = data + '';
                            return abc.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        }
                    }},
                    { "data": "cqBmc" ,render: function ( data, type, row ) {
                        if(data == null){
                            return data;
                        }else {
                            var abc = data + '';
                            return abc.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        }
                    }},
                    { "data": "nqBmc" ,render: function ( data, type, row ) {
                        if(data == null){
                            return data;
                        }else {
                            var abc = data + '';
                            return abc.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        }
                    }},
                    { "data": "cqLq" ,render: function ( data, type, row ) {
                        if(data == null){
                            return data;
                        }else {
                            var abc = data + '';
                            return abc.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        }
                    }},
                    { "data": "nqCq" ,render: function ( data, type, row ) {
                        if(data == null){
                            return data;
                        }else {
                            var abc = data + '';
                            return abc.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        }
                    }},
                    { "data": "lqTtl" ,render: function ( data, type, row ) {
                        if(data == null){
                            return data;
                        }else {
                            var abc = data + '';
                            return abc.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        }
                    }},
                    { "data": "cqTtl" ,render: function ( data, type, row ) {
                        if(data == null){
                            return data;
                        }else {
                            var abc = data + '';
                            return abc.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        }
                    }},
                    { "data": "nqTtl" ,render: function ( data, type, row ) {
                        if(data == null){
                            return data;
                        }else {
                            var abc = data + '';
                            return abc.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        }
                    }},
                    { "data": "cqLqTtl" ,render: function ( data, type, row ) {
                        if(data == null){
                            return data;
                        }else {
                            var abc = data + '';
                            return abc.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        }
                    }},
                    { "data": "nqCqTtl" ,render: function ( data, type, row ) {
                        if(data == null){
                            return data;
                        }else {
                            var abc = data + '';
                            return abc.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        }
                    }}
                ]
            });
            table.columns().eq(0).each(function(colIdx) {
                $('input', table.column(colIdx).header()).on('keyup change', function() {
                    table
                        .column(colIdx)
                        .search(this.value)
                        .draw();
                });
            });
        });

    }

    $scope.ww = true;
    $scope.btnSwitch = function(flag){
        if(flag == 'w'){
            $scope.WW = false;
            $scope.PRC = true;
            $scope.wwTable();
        }else if(flag == 'p'){
            $scope.WW = true;
            $scope.PRC = false;
            $scope.prcTalbe();
        }
    };

    //点击WW中的Shift view
    $scope.getSegmentWW = function(){
        $scope.WW = true;
        $scope.PRC = true;
        $scope.WWShift = false;
        $scope.PRCShift = true;
        //切换复杂表
        /* $scope.validate = {
         cycleName : $scope.CyclName,
         };
         console.log($scope.validate)
         CycleQtQAccumulationService.getSegment($scope.validate,$scope.TaskID).then(function (data) {
         if(data.code == 0){
         alert('成功！');
         }else {
         alert(data.msg);
         }
         console.log(data);
         }, function (data) {
         console.log(data);
         });*/
    };
    //点击PRC中的Shift view
    $scope.getSegmentPRC = function(){
        $scope.WW = true;
        $scope.PRC = true;
        $scope.WWShift = true;
        $scope.PRCShift = false;
    }
    //点击WW的中Shift view的Shift view
    $scope.getWWShift = function(){
        $scope.WW = false;
        $scope.PRC = true;
        $scope.WWShift = true;
        $scope.PRCShift = true;
    }
//点击PRC的中Shift view的Shift view
    $scope.getPRCShift = function(){
        $scope.WW = true;
        $scope.PRC = false;
        $scope.WWShift = true;
        $scope.PRCShift = true;
    }


    //点击Validate
    $scope.getValidate = function(){
        $scope.validate = {
            zcycle_name : $scope.CycleName,
            zuuid : $scope.TaskID,
            user : $rootScope.user
        };
        CycleQtQAccumulationService.getValidate($scope.validate).then(function (data) {
            if(data.code == 0){
                console.log(data)
                alert('Success!');
                $scope.getPage();
            }else {
                alert(data.msg);
            }
            console.log(data);
        }, function (data) {
            console.log(data);
        });
    };

    //WW时Download Summary
    $scope.getWWDownLoadSum = function(){
        $('#ws2').css('display','block');
        $('#ws1').css('display','none');
        if(!$scope.TaskID){
            return;
        }else {
            CycleQtQAccumulationService.getWwSum($scope.TaskID).then(function (response) {
                var fileName = response.headers("Content-Disposition").split(";")[1].split("filename=")[1];
                fileName=fileName.replace(/\"/g,"");
                var data = response.data;
                //console.log(data);
                var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                var objectUrl = URL.createObjectURL(blob);
                var aForExcel = $("<a><span class='forExcel'>下载excel</span></a>").attr("href",objectUrl);
                aForExcel.attr("download",fileName);
                $("body").append(aForExcel);
                $(".forExcel").click();
                aForExcel.remove();

                $('#ws1').css('display','block');
                $('#ws2').css('display','none');
            }, function (data) {
                console.log(data);
            });
        }
    };

    //Prc时Download Summary
    $scope.getPRCDownLoadSum = function(){
        $('#ps2').css('display','block');
        $('#ps1').css('display','none');
        if(!$scope.TaskID){
            return;
        }else {
            CycleQtQAccumulationService.getPrcSum($scope.TaskID).then(function (response) {
                var fileName = response.headers("Content-Disposition").split(";")[1].split("filename=")[1];
                fileName=fileName.replace(/\"/g,"");
                var data = response.data;
                //console.log(data);
                var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                var objectUrl = URL.createObjectURL(blob);
                var aForExcel = $("<a><span class='forExcel'>下载excel</span></a>").attr("href",objectUrl);
                aForExcel.attr("download",fileName);
                $("body").append(aForExcel);
                $(".forExcel").click();
                aForExcel.remove();

                $('#ps1').css('display','block');
                $('#ps2').css('display','none');
            }, function (data) {
                console.log(data);
            });
        }
    };
    //WW时Download Detail
    $scope.getWWDownLoadDet = function(){
        $('#wd2').css('display','block');
        $('#wd1').css('display','none');
        if(!$scope.TaskID){
            return;
        }else {
            CycleQtQAccumulationService.getWwDet($scope.TaskID).then(function (response) {
                var fileName = response.headers("Content-Disposition").split(";")[1].split("filename=")[1];
                fileName=fileName.replace(/\"/g,"");
                var data = response.data;
                //console.log(data);
                var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                var objectUrl = URL.createObjectURL(blob);
                var aForExcel = $("<a><span class='forExcel'>下载excel</span></a>").attr("href",objectUrl);
                aForExcel.attr("download",fileName);
                $("body").append(aForExcel);
                $(".forExcel").click();
                aForExcel.remove();

                $('#wd1').css('display','block');
                $('#wd2').css('display','none');
                console.log(data);
            }, function (data) {
                console.log(data);
            });
        }
    };

    //Prc时Download Detail
    $scope.getPRCDownLoadDet = function(){
        $('#pd2').css('display','block');
        $('#pd1').css('display','none');
        if(!$scope.TaskID){
            return;
        }else {
            CycleQtQAccumulationService.getPrcDet($scope.TaskID).then(function (response) {
                console.log(response);
                var fileName = response.headers("Content-Disposition").split(";")[1].split("filename=")[1];
                fileName=fileName.replace(/\"/g,"");
                var data = response.data;
                var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                var objectUrl = URL.createObjectURL(blob);
                var aForExcel = $("<a><span class='forExcel'>下载excel</span></a>").attr("href",objectUrl);
                aForExcel.attr("download",fileName);
                $("body").append(aForExcel);
                $(".forExcel").click();
                aForExcel.remove();

                $('#pd1').css('display','block');
                $('#pd2').css('display','none');
            }, function (data) {
                console.log(data);
            });
        }
    };
});