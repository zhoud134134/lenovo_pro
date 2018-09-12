"use strict";

angular.module('app.Report').controller('OuttapeSummaryCtrl', function ($scope,$rootScope,$state,$stateParams,$timeout) {
    $rootScope.getCycle().then(function(data){
        $scope.cycledata = data.result;
    });
    $('#final table').stickySort({ sortable: true });
    //����˵�����ϲ�ָ����񣨱��idΪ_w_table_id��ָ���У�����Ϊ_w_table_colnum������ͬ�ı������ڵ�Ԫ��
    //����˵����_w_table_id Ϊ��Ҫ���кϲ���Ԫ��ı���id������HTMl��ָ����� id="data" ���˲���ӦΪ #data
    //����˵����_w_table_colnum Ϊ��Ҫ�ϲ���Ԫ��������С�Ϊ���֣�������ߵ�һ��Ϊ1��ʼ����
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
    //����˵�����ϲ�ָ����񣨱��idΪ_w_table_id��ָ���У�����Ϊ_w_table_rownum������ͬ�ı������ڵ�Ԫ��
    //����˵����_w_table_id Ϊ��Ҫ���кϲ���Ԫ��ı��id������HTMl��ָ����� id="data" ���˲���ӦΪ #data
    //����˵����_w_table_rownum Ϊ��Ҫ�ϲ���Ԫ��������С��������ʽ��ο�jQuery��nth-child�Ĳ�����
    //          ���Ϊ���֣��������ߵ�һ��Ϊ1��ʼ����
    //          "even" ��ʾż����
    //          "odd" ��ʾ������
    //          "3n+1" ��ʾ������Ϊ1��4��7��10.......
    //����˵����_w_table_maxcolnum Ϊָ�����е�Ԫ���Ӧ������������������������ֵ�ĵ�Ԫ�񽫲����бȽϺϲ���
    //          �˲�������Ϊ�գ�Ϊ����ָ���е����е�Ԫ��Ҫ���бȽϺϲ���
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