"use strict";

angular.module('app.Report').controller('OuttapeSummaryCtrl', function ($scope,$rootScope,$state,$stateParams,$timeout) {
    $rootScope.getCycle().then(function(data){
        $scope.cycledata = data.result;
    });
    $('#final table').stickySort({ sortable: true });
    //函数说明：合并指定表格（表格id为_w_table_id）指定列（列数为_w_table_colnum）的相同文本的相邻单元格
    //参数说明：_w_table_id 为需要进行合并单元格的表格的id。如在HTMl中指定表格 id="data" ，此参数应为 #data
    //参数说明：_w_table_colnum 为需要合并单元格的所在列。为数字，从最左边第一列为1开始算起。
    function _w_table_rowspan(_w_table_id, _w_table_colnum) {
        var _w_table_firsttd = "";
        var _w_table_currenttd = "";
        var _w_table_SpanNum = 0;
        var _w_table_Obj = $(_w_table_id + " tr th:nth-child(" + _w_table_colnum + ")");
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
    $timeout(function() {
        _w_table_colspan("#table3", 1);
        _w_table_colspan("#table3", 2);
        _w_table_rowspan("#table3", 1);
        _w_table_rowspan("#table3", 2);
        _w_table_rowspan("#table3", 3);
        _w_table_rowspan("#table3", 4);
        _w_table_rowspan("#table3", 5);
        _w_table_rowspan("#table3", 6);
        _w_table_rowspan("#table3", 9);
        _w_table_rowspan("#table3", 10);
        _w_table_rowspan("#table3", 11);
    }, 0)
    $scope.data={
        result:[
            {  name: "FY Cost Guidance(+Benefit/-Hit)",
                name2: "FY Cost Guidance(+Benefit/-Hit)",
                prc: "prc",
                prc1: "prc",
                prc2: "prc",
                prc3: "prc",
                prc4: "prc",
                prc5: "prc",
                ap: "ap",
                ap1: "ap",
                ap2: "ap",
                ap3: "ap",
                ap4: "ap"},
            {
                "name":"FY Cost Guidance(+Benefit/-Hit)",
                "name2":"FY Cost Guidance(+Benefit/-Hit)",
                "prc":"Think-T",
                "prc1":"T-Model",
                "prc2":"Commercial",
                "prc3":"YT",
                "prc4":"TTL",
                "prc5":"TTL",
                "ap":"Consumer",
                "ap1":"SMB",
                "ap2":"Commercial",
                "ap3":"TTL",
                "ap4":"TTL",

            },
            {
                "name":"FY Cost Guidance(+Benefit/-Hit)",
                "name2":"FY Cost Guidance(+Benefit/-Hit)",
                "prc":"Think-T",
                "prc1":"T-Model",
                "prc2":"Commercial",
                "prc3":"YT",
                "prc4":"$M",
                "prc5":"$/CA",
                "ap":"Consumer",
                "ap1":"SMB",
                "ap2":"Commercial",
                "ap3":"$M",
                "ap4":"$/CA"

            }
        ],
        code:0
    };
    console.log($scope.data.result);
    //$scope.demoda = [{
    //    name: "FY Cost Guidance(+Benefit/-Hit)",
    //    name2: "FY Cost Guidance(+Benefit/-Hit)",
    //    prc: "prc",
    //    prc1: "prc",
    //    prc2: "prc",
    //    prc3: "prc",
    //    prc4: "prc",
    //    prc5: "prc",
    //    ap: "ap",
    //    ap1: "ap",
    //    ap2: "ap",
    //    ap3: "ap",
    //    ap4: "ap"
    //},
    //    {
    //        name: "FY Cost Guidance(+Benefit/-Hit)",
    //        name2: "FY Cost Guidance(+Benefit/-Hit)",
    //        prc: "prc",
    //        prc1: "prc",
    //        prc2: "prc",
    //        prc3: "prc",
    //        prc4: "prc",
    //        prc5: "prc",
    //        ap: "ap",
    //        ap1: "ap",
    //        ap2: "ap",
    //        ap3: "ap",
    //        ap4: "ap"
    //    },
    //    {
    //        name: "FY Cost Guidance(+Benefit/-Hit)",
    //        name2: "FY Cost Guidance(+Benefit/-Hit)",
    //        prc: "prc",
    //        prc1: "prc",
    //        prc2: "prc",
    //        prc3: "prc",
    //        prc4: "prc",
    //        prc5: "prc",
    //        ap: "ap",
    //        ap1: "ap",
    //        ap2: "ap",
    //        ap3: "ap",
    //        ap4: "ap"
    //    }
    //]
})