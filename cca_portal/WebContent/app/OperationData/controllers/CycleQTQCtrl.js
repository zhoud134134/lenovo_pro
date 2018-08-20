"use strict";

angular.module('app.OperationData').controller('CycleQtQCtrl', function ($scope,$state,$stateParams,$location,CycleQTQService,$http,$log,$rootScope,$timeout) {

    //初始化Select-EBR Data
    $scope.ebr =  'EBR_DATE';
    $scope.dataMoth = [];
    CycleQTQService.getSelect($scope.ebr).then(function(data){
        if(data.code == 0){
            $scope.ebrdata = data.result;
            for(var i=0;i< $scope.ebrdata.length;i++){
                $scope.dataMoth.push({data:$scope.ebrdata[i]});
            }
        }
        console.log(data);
    },function(data){
        console.log(data);
    });
    //初始化Select-CFE Data
    $scope.cfe = 'CFE_CYCLE';
    CycleQTQService.getSelect($scope.cfe).then(function(data){
        if(data.code == 0){
            $scope.cfedata = data.result;
        }
        console.log(data);
    },function(data){
        console.log(data);
    });

    //初始化Cycle Choose
    CycleQTQService.getSelectCycle().then(function(data){
        if(data.code == 0){
            $scope.cycledata = data.result;
        }
        console.log(data);
    },function(data){
        console.log(data);
    });

    //多选控件
    $scope.Sel = true;
    $(document).bind('click',function(){
        $scope.Sel = true;
    });
    $scope.openSel = function($event){
        $scope.Sel = false;
        $event.stopPropagation();
    };
    $scope.arr = [];
    $scope.One = function(m){
        m.isChecked = !m.isChecked;
        if(m.isChecked){
            $scope.arr.push(m.data);
        }else {
            for(var i=0;i<$scope.arr.length;i++){
                if($scope.arr[i] == m.data){
                    $scope.arr.splice(i,1);
                    break;
                }
            }
        }
        console.log($scope.arr);
        $scope.EBRData = $scope.arr.join(',');
    };

    //第二部分tab信息展示
    $scope.getPage = function(){
        CycleQTQService.getExecute2().then(function(data){
            console.log(data);
            if(data.code == 0){
                //$scope.noData = false;
                $scope.tablist = data.result;
                $("#tabExample").dataTable().fnDestroy();
                $timeout(function () {
                    $('#tabExample').dataTable({
                        "scrollY": 160,
                        "scrollX": true,
                        "dom": '<"top">rt<"bottom"><"clear">',
                        "scrollCollapse": true,
                        "jQueryUI": true,
                        // "pagingType":   "simple_numbers",
                        stateSave: true,
                        "paging": false,
                        "ordering": false,
                        "bLengthChange": true,
                        //"order": [[ 3, "desc" ]]
                    });
                });
            }
            console.log(data);
        },function(data){
            console.log(data);
        });
    }
    $scope.getPage();

    //点击Execute执行
    //$scope.noData = true;
    $scope.getExecute = function(){
        $scope.taskId = '';
        $scope.search = {
            cycleName : $scope.CycleChoose,
            cfeCycle : $scope.CFEData,
            month : $scope.EBRData,
            user : $rootScope.user
        }
        console.log($scope.search);
        if(!$scope.EBRData || !$scope.CFEData){
            alert("请选择条件！");
        }else {
            CycleQTQService.getExecute($scope.search).then(function(data){
                if(data.code == 0){
                    alert(data.result);
                    $scope.getPage();
                }else {
                    alert(data.msg);
                }
                console.log(data);
            },function(data){
                console.log(data);
            });
        }
    };

    $scope.WW = true;
    $scope.PRC = true;
    //单击整行选中
    $scope.trClick = function($event,id,status,cycleName){
        $($("#tabExample input:radio")).removeAttr("checked");
        $($event.target).parent().find("input:radio").prop("checked",true);
        $scope.taskId = id;
        console.log($scope.taskId)
        $scope.status = status;
        console.log($scope.status)
        $scope.cyclename = cycleName;
        console.log($scope.cyclename)
        //$scope.SearchTaskId(a,b,c)
    }
    //单选获得taskId
   /* $scope.SearchTaskId = function(id,cycleName,status){
        $scope.taskId = id;
        $scope.status = status;
        $scope.cyclename = cycleName;
    };*/

    //点击Search
    $scope.SearchTab = function(){
        if(!$scope.taskId){
            alert("请选择项！");
        }else if($scope.status =='Success' || $scope.status =='Publish'){
            $scope.PRCWW = false;
            $scope.TaskID =  $scope.taskId;
            $scope.CyclName = $scope.cyclename;
            $scope.WW = false;
            $scope.PRC = true;

            //WW
           // $("#PRCExample").dataTable().fnDestroy();
            CycleQTQService.getWw($scope.TaskID).then(function(data){
                if(data.code == 0){
                    $scope.WwList = data.result;
                    $scope.wwTable();
                    console.log($scope.TaskID);
                    console.log($scope.CyclName);
                }
                console.log(data);
            },function(data){
                console.log(data);
            });

            //PRC
            CycleQTQService.getPrc($scope.TaskID).then(function(data) {
                if (data.code == 0) {
                    $scope.PrcList = data.result;
                    console.log($scope.PrcList);
                    $scope.prcTalbe();
                }
                console.log(data)
            } ,function(data){
                console.log(data);
            });
        }else {
            alert("暂未执行成功，无法查看！");
        }
    };


    //删除
    $scope.DelParticular = function(){
        if(!$scope.taskId){
            alert("请选择项！");
        }else if($scope.status =='Success' || $scope.status =='Publish'|| $scope.status =='Error'){
            if(confirm('确认要删除？')) {
                console.log($scope.taskid);
                $scope.taskid = {
                    uuid: $scope.taskId
                };
                CycleQTQService.DelParticular($scope.taskid).then(function (data) {
                    if (data.code == 0) {
                        alert("删除成功！");
                        $scope.taskId = '';
                        $scope.getPage();
                        //$("#tabExample").dataTable().fnDestroy();
                        $scope.PRCWW = true;
                    }else {
                        alert(data.msg);
                    }
                    console.log(data);
                }, function (data) {
                    console.log(data);
                });
            }
        }else {
            alert("还未执行完成！");
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
                "scrollY": 400,
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
                "scrollY": 400,
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

    //点击Segment
    $scope.getSegment = function(){
        $scope.validate = {
            cycleName : $scope.CyclName,
        };
        console.log($scope.validate)
        CycleQTQService.getSegment($scope.validate,$scope.TaskID).then(function (data) {
            if(data.code == 0){
                alert('成功！');
            }else {
                alert(data.msg);
            }
            console.log(data);
        }, function (data) {
            console.log(data);
        });
    };


    //点击Validate
    $scope.getValidate = function(){
        $scope.validate = {
            zcycle_name : $scope.CyclName,
            zuuid : $scope.TaskID,
            user : $rootScope.user
        };
        console.log($scope.validate)
        CycleQTQService.getValidate($scope.validate).then(function (data) {
            if(data.code == 0){
                alert('成功！');
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
            CycleQTQService.getWwSum($scope.TaskID).then(function (data) {
                var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                var objectUrl = URL.createObjectURL(blob);
                var aForExcel = $("<a><span class='forExcel'>下载excel</span></a>").attr("href",objectUrl);
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
            CycleQTQService.getPrcSum($scope.TaskID).then(function (data) {
                var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                var objectUrl = URL.createObjectURL(blob);
                var aForExcel = $("<a><span class='forExcel'>下载excel</span></a>").attr("href",objectUrl);
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
            CycleQTQService.getWwDet($scope.TaskID).then(function (data) {
                var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                var objectUrl = URL.createObjectURL(blob);
                var aForExcel = $("<a><span class='forExcel'>下载excel</span></a>").attr("href",objectUrl);
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
            CycleQTQService.getPrcDet($scope.TaskID).then(function (data) {
                $('#pd1').css('display','block');
                $('#pd2').css('display','none');
                var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                var objectUrl = URL.createObjectURL(blob);
                var aForExcel = $("<a><span class='forExcel'>下载excel</span></a>").attr("href",objectUrl);
                $("body").append(aForExcel);
                $(".forExcel").click();
                aForExcel.remove();
            }, function (data) {
                console.log(data);
            });
        }
    };
});