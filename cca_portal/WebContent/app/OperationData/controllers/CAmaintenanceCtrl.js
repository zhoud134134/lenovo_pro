"use strict";

angular.module('app.OperationData').controller('CAmaintenanceCtrl', function ($scope,$state,$timeout,$stateParams,$rootScope,APP_CONFIG,CAmaintenanceService,navService) {
    //函数说明：合并指定表格（表格id为_w_table_id）指定列（列数为_w_table_colnum）的相同文本的相邻单元格
//参数说明：_w_table_id 为需要进行合并单元格的表格的id。如在HTMl中指定表格 id="data" ，此参数应为 #data
//参数说明：_w_table_colnum 为需要合并单元格的所在列。为数字，从最左边第一列为1开始算起。
    function _w_table_rowspan(_w_table_id, _w_table_colnum) {
        var _w_table_firsttd = "";
        var _w_table_currenttd = "";
        var  _w_table_SpanNum = 0;
        var  _w_table_Obj = $(_w_table_id + " tr td:nth-child(" + _w_table_colnum + ")");
        _w_table_Obj.each(function(i) {
            if(i == 0) {
                _w_table_firsttd = $(this);
                _w_table_SpanNum = 1;
            } else {
                _w_table_currenttd = $(this);
                if(_w_table_firsttd.text() == _w_table_currenttd.text()) {
                    _w_table_SpanNum++;
                    _w_table_currenttd.hide(); //remove();
                    _w_table_firsttd.attr("rowSpan", _w_table_SpanNum);
                } else {
                    _w_table_firsttd = $(this);
                    _w_table_SpanNum = 1;
                }
            }
        });
    }
//函数说明：合并指定表格（表格id为_w_table_id）指定行（行数为_w_table_rownum）的相同文本的相邻单元格
//参数说明：_w_table_id 为需要进行合并单元格的表格id。如在HTMl中指定表格 id="data" ，此参数应为 #data
//参数说明：_w_table_rownum 为需要合并单元格的所在行。其参数形式请参考jQuery中nth-child的参数。
//          如果为数字，则从最左边第一行为1开始算起。
//          "even" 表示偶数行
//          "odd" 表示奇数行
//          "3n+1" 表示的行数为1、4、7、10.......
//参数说明：_w_table_maxcolnum 为指定行中单元格对应的最大列数，列数大于这个数值的单元格将不进行比较合并。
//          此参数可以为空，为空则指定行的所有单元格要进行比较合并。
    function _w_table_colspan(_w_table_id, _w_table_rownum, _w_table_maxcolnum) {
        if(_w_table_maxcolnum == void 0) {
            _w_table_maxcolnum = 0;
        }
        var _w_table_firsttd = "";
        var _w_table_currenttd = "";
        var _w_table_SpanNum = 0;
        $(_w_table_id + " tr:nth-child(" + _w_table_rownum + ")").each(function(i) {
            var _w_table_Obj = $(this).children();
            _w_table_Obj.each(function(i) {
                if(i == 0) {
                    _w_table_firsttd = $(this);
                    _w_table_SpanNum = 1;
                } else if((_w_table_maxcolnum > 0) && (i > _w_table_maxcolnum)) {
                    return "";
                } else {
                    _w_table_currenttd = $(this);
                    if(_w_table_firsttd.text() == _w_table_currenttd.text()) {
                        _w_table_SpanNum++;
                        _w_table_currenttd.hide(); //remove();
                        _w_table_firsttd.attr("colSpan", _w_table_SpanNum);
                    } else {
                        _w_table_firsttd = $(this);
                        _w_table_SpanNum = 1;
                    }
                }
            });
        });
    }

    //初始化Cycle Choose
    CAmaintenanceService.getSelectCycle().then(function(data){
        if(data.code == 0){
            $scope.cycledata = data.result;
        }
        console.log(data);
    },function(data){
        console.log(data);
    });

    //第二部分tab信息展示
    $scope.getPage = function(){
        CAmaintenanceService.getExecute2().then(function(data){
            if(data.code == 0){
                $scope.tablist = data.result;
                $("#tabExample1").dataTable().fnDestroy();
                $timeout(function () {
                    $('#tabExample1').dataTable({
                        "scrollY": 160,
                        "scrollX": true,
                        "dom": '<"top">rt<"bottom"><"clear">',
                        "scrollCollapse": true,
                        //"jQueryUI": true,
                        // "pagingType":   "simple_numbers",
                        stateSave: true,
                        "paging": false,
                        "ordering": false,
                        "bLengthChange": true
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
    $scope.getExecute = function(){
        $scope.taskId = '';
        $scope.search = {
            cycleName : $scope.CycleChoose,
            user : $rootScope.user
        }
        console.log($rootScope.user);
        if(!$scope.CycleChoose){
            alert("请选择条件！");
        }else {
            CAmaintenanceService.getExecute($scope.search).then(function(data){
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

    //点击Search
    $scope.SearchTab = function(){
        if(!$scope.taskId){
            alert("请选择项！");
        }else if($scope.status =='Success' || $scope.status =='Publish'){
            $scope.PRCww=true;

            $scope.TaskID =  $scope.taskId;
            $scope.CycleName = $scope.cyclename;

            //WW
            CAmaintenanceService.getWw($scope.TaskID).then(function(data){
                if(data.code == 0){
                    $scope.WwList = data.result;
                    console.log($scope.WwList);
                }
                console.log(data);
            },function(data){
                console.log(data);
            });

            //PRC
            CAmaintenanceService.getPrc($scope.TaskID).then(function(caprcdata) {
                console.log(caprcdata);
                if (caprcdata.code == 0) {
                    $scope.PrcList = caprcdata.result;
                    console.log($scope.PrcList);

                    var arrSegment=$rootScope.PrcSegment.concat(["Total"]);

                    //$rootScope.PrcSegment.unshift("BU");
                    //$rootScope.PrcSegment.push("Total");
                    $rootScope.PrcBu.push("Total");

                    //$rootScope.segmenttop = [ 'BU', 'PRC Segment', 'PRC Segment', 'PRC Segment', 'PRC Segment', 'PRC Segment', 'PRC Segment', 'PRC Segment', 'Total'];
                    //var caprcthead = ["BU", "Think-T", "T-Model", "Commercial", "SMB", "Consumer", "Others", "YT", "Total"];
                    //var caprctbody = ["Think Pad", "Lenovo NB", "Commercial DT", "Consumer DT", "Workstation", "Chrome", "Server", "Accessory", "Visual", "Total"];


                    $scope.cadata = $rootScope.caprcTabCon($scope.PrcList,  $rootScope.PrcBu,  arrSegment, 'values');
                    console.log($scope.cadata);
                    console.log($rootScope.segmenttop);
                    console.log($rootScope.PrcSegment);
                    console.log(arrSegment);
                    console.log($rootScope.PrcBu);

                    $timeout(function(){
                        console.log("1");
                        //_w_table_colspan("#caprcTab",1,11);
                        //_w_table_rowspan("#caprcTab",1);
                        //_w_table_rowspan("#caprcTab",2);
                        //_w_table_rowspan("#caprcTab",10);
                        //_w_table_rowspan("#caprcTab",11);
                    })
                }
            } ,function(data){
                console.log(data);
            });
        }else {
            alert("暂未执行成功，无法查看！");
        }
    };
    var prc = {
        stype : 'PRC'
    };
    CAmaintenanceService.getPrcBu(prc).then(function(caprcbudata){
        console.log(caprcbudata.result);
        $rootScope.PrcBu=caprcbudata.result;
    }, function (data) {
        console.log(data);
    })
    CAmaintenanceService.getPrcSegment(prc).then(function(caprcsegmentdata){
        console.log(caprcsegmentdata.result);
        $rootScope.PrcSegment=caprcsegmentdata.result;
    }, function (data) {
        console.log(data);
    })
    //删除
    $scope.DelOneItem = function(){
        if(!$scope.taskId){
            alert("请选择项！");
        }else if($scope.status =='Success' || $scope.status =='Publish'|| $scope.status =='Error'){
            if(confirm('确认要删除？')) {
                console.log($scope.taskid);
                $scope.taskid = {
                    uuid: $scope.taskId
                };
                CAmaintenanceService.DelItem($scope.taskid).then(function (data) {
                    if (data.code == 0) {
                        alert("删除成功！");
                        $scope.taskId = '';
                        $scope.getPage();
                        //$("#tabExample").dataTable().fnDestroy();
                        //$scope.PRCWW = true;
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

    //prc时的Download
    $scope.getPRCDownLoad = function(){
        if(!$scope.TaskID){
            return;
        }else{
        CAmaintenanceService.getPrcDown($scope.TaskID).then(function(data){
            console.log(data);
            //type: "application/vnd.ms-excel"}可以保存为xls格式的excel文件（兼容老版本）
            //而使用“application/vnd.openxmlformats-officedocument.spreadsheetml.sheet”则会保存为xlsx
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
    }

    //ww时的Download
    $scope.getWWDownLoad = function(){
        if(!$scope.TaskID){
            return;
        }else{
            CAmaintenanceService.getWwDown($scope.TaskID).then(function(data){
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
    }

    //点击Validate
    $scope.getValidate = function(){
        $scope.validate = {
            zcycle_name : $scope.CycleName,
            zuuid : $scope.TaskID,
            user : $rootScope.user
        };
        console.log($rootScope.user)
        CAmaintenanceService.getValidate($scope.validate).then(function (data) {
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

    //button 切换
    $scope.sw1 = true;
    $scope.ww = false;
    $scope.sw2 = false;
    $scope.btnSwitch = function (flag) {
        if (flag == 'w') {
            $scope.ww = true;
            $scope.sw1 = false;
            //$scope.sw2 = false;
        } else if (flag == 'p') {
            $scope.ww = false;
            $scope.sw1 = true;
            //$scope.sw2 = false;
        }
    }


})