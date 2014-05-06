$(document).ready(function() {
    sale_by_month();
    sale_by_day();
    memberFun();
    income_expense();
    topReceivable();
    $(".incomeTitle").on("click",function(){
        $("#income").fadeIn();
        $("#expense").hide();
    });
    $(".expenseTitle").on("click",function(){
        $("#expense").fadeIn();
        $("#income").hide();
    });
});
/*本月销售统计相关*/
function sale_by_month(){
    $.ajax({
        url: "/api/my?action=sale_by_month",
        type: 'GET',
        dataType: 'json',
    })
    .done(function(data) {
        var retailAmountArry = [];
        var saleAmountArry = [];
        var amountArry = [];
        for(i = 0 ; i<data.length; i++){
            var retail_amount = data[i].retail_amount;
            var sale_amount = data[i].sale_amount;
            var amount = data[i].amount;
            retailAmountArry.push(retail_amount);
            saleAmountArry.push(sale_amount);
            amountArry.push(amount);
        };
        saleByMonthFun(retailAmountArry,saleAmountArry,amountArry);
    })
    .fail(function() {
        alert("获取本月销售统计数据获取失败！");
    })
    .always(function() {
       
    });
};//获取本月销售统计
function saleByMonthFun(retail_amount,sale_amount,amount) {
    $("#sale_by_month").highcharts({
        colors: [
           '#B4CDEB', 
           '#ACDBA8', 
           '#ECC282'
        ],
    	credits : {
            enabled:false//不显示highCharts版权信息
        },
        title: {
            text: ''//标题为空
        },
        xAxis: {
            categories: ['1', '2', '3', '4', '5', '6',
                '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
            tickPositions:[0,4,9,14,19,24,29,30]//哪些点显示
        },
        yAxis: {
            title: {
                enabled:false
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            formatter: function() {
                return '截至 <b>' + this.x + '</b> 日<br/>' + this.series.name +': <b>'+ Highcharts.numberFormat(this.y, 0, ',') + ' </b>元';
            }
        },
        series: [{
            name: '零售销售额',
            marker: {
                symbol: 'circle'//点形状
            },
            data: retail_amount
        }, {
            name: '批发销售额',
            marker: {
                symbol: 'circle'//点形状
            },
            data: sale_amount
        }, {
            name: '合计销售额',
            marker: {
                symbol: 'circle'//点形状
            },
            data: amount
        }]
    });
};//本月销售统计
/*本月销售统计相关*/

/*本日销售统计相关*/
function sale_by_day(){
    $.ajax({
        url: "/api/my?action=sale_by_day",
        type: 'GET',
        dataType: 'json',
    })
    .done(function(data) {
        var amountArry1 = [];//金额数组
        var costArry1 = [];//成本数组
        var profitArry1 = [];//利润数组
        var amountArry2 = [];//收入数组
        var costArry2 = [];//支出数组
        var profitArry2 = [];//净额数组
        for(i = 0 ; i<2; i++){
            var amount = data[i].amount;//收入
            var cost = data[i].cost;//支出
            var profit = data[i].profit;//利润
            amountArry1.push(amount);
            costArry1.push(cost);
            profitArry1.push(profit);
        };//批发和零售
        amountArry2.push(data[2].amount);
        costArry2.push(data[2].cost);
        profitArry2.push(data[2].profit);//现金
        saleByDayFun1(amountArry1,costArry1,profitArry1);//批发和零售
        saleByDayFun2(amountArry2,costArry2,profitArry2);//现金
    })
    .fail(function() {
        alert("本日销售统计数据获取失败！");
    })
    .always(function() {
       
    });
};//获取本日销售统计
function saleByDayFun1(amount,cost,profit) {
    $("#sale_by_day1").highcharts({
        colors: [
           '#B4CDEB', 
           '#ACDBA8', 
           '#ECC282'
        ],
        chart: {
            type: 'column'
        },
        credits : {
            enabled:false//不显示highCharts版权信息
        },
        title: {
            text: ''//标题为空
        },
        xAxis: {
            categories: ['批发', '零售']
        },
        yAxis: {
            title: {
                enabled:false
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.2f} </b>元</td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        series: [{
            name: '金额',
            data: amount
        }, {
            name: '成本',
            data: cost
        }, {
            name: '利润',
            data: profit
        }]
    });
};//本日销售统计
function saleByDayFun2(amount,cost,profit) {
    $("#sale_by_day2").highcharts({
        colors: [
           '#B4CDEB', 
           '#ACDBA8', 
           '#ECC282'
        ],
        chart: {
            type: 'column'
        },
        credits : {
            enabled:false//不显示highCharts版权信息
        },
        title: {
            text: ''//标题为空
        },
        xAxis: {
            categories: ['现金']
        },
        yAxis: {
            title: {
                enabled:false
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.2f} </b>元</td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        series: [{
            name: '收入',
            data: amount
        }, {
            name: '支出',
            data: cost
        }, {
            name: '净额',
            data: profit
        }]
    });
};//本日销售统计-现金
/*本日销售统计相关*/

/*本日新增会员相关*/
function memberFun(){
    $.ajax({
        url: "/api/my?action=member_added_by_day",
        type: 'GET',
        dataType: 'json',
    })
    .done(function(data) {
        var number = data.number_of_added;
        var numberDOM = "<a>" + number + "</a>";
        document.getElementById("newUserNo").innerHTML = document.getElementById("newUserNo").innerHTML+numberDOM;
    })
    .fail(function() {
        alert("本日新增会员数据获取失败！");
    })
    .always(function() {
       
    });
};//获取本日新增会员
/*本日新增会员相关*/

/*财务收支分析相关*/
function income_expense(){
    $.ajax({
        url: "/api/my?action=income_expense_by_month",
        type: 'GET',
        dataType: 'json',
    })
    .done(function(data) {
        var expenseAmount = data.expense_amount;//支出总金额
        var expenseDOM = "<a>" + expenseAmount + "</a>";
        document.getElementById("expenseAmount").innerHTML = document.getElementById("expenseAmount").innerHTML+expenseDOM;
        var incomeAmount = data.income_amount;//收入总金额
        var incomeDOM = "<a>" + incomeAmount + "</a>";
        document.getElementById("incomeAmount").innerHTML = document.getElementById("incomeAmount").innerHTML+incomeDOM;
        var totalAmount =  incomeAmount - expenseAmount;//总金额
        var totalDOM = "<a>" + totalAmount + "</a>";
        document.getElementById("totalAmount").innerHTML = document.getElementById("totalAmount").innerHTML+totalDOM;
        /*获取支出排序后的数组*/
        var expensesArray = [];
        for(i = 0 ; i<data.expenses.length ; i++){
            var amount = data.expenses[i].amount;
            var name = data.expenses[i].name;
            expensesArray[i] = new Array(name,amount);
        };
        var newexpensesArray = expensesArray.sort(function(a,b){
            return b[0]-a[0];
        });
        expensesFun(newexpensesArray);
        // if(newexpensesArray.length > 4){
        //     var newexpensesArray2 = newexpensesArray;
        //     newexpensesArray.slice(0, 4);
        //     var b = newexpensesArray;
        //     newexpensesArray2.slice(4, newexpensesArray2.length-4);
        //     var a = newexpensesArray2.length-1;
        //     for(i = 0 ; i<newexpensesArray2.length ; i++){
        //         var j = 0;
        //         var k = newexpensesArray2[i][1];
        //         j = j + k;
        //     };
        //     newexpensesArray[4] = new Array("其他",j);
        //     expensesFun(newexpensesArray);
        // }else{
        //     expensesFun(newexpensesArray);
        // }
        /*获取支出排序后的数组*/
        /*获取收入排序后的数组*/
        var incomesArray = [];
        for(i = 0 ; i<data.incomes.length ; i++){
            var amount2 = data.incomes[i].amount;
            var name2 = data.incomes[i].name;
            incomesArray[i] = new Array(name2,amount2);
        };
        var newincomesArray = incomesArray.sort(function(a,b){
            return b[0]-a[0];
        });
        incomesFun(newincomesArray);
        /*获取收入排序后的数组*/
    })
    .fail(function() {
        alert("获取财务收支数据获取失败！");
    })
    .always(function() {
       
    });
};//获取财务收支
function incomesFun(newincomesArray) {
    $('#income').highcharts({
        colors: [
           '#B4CDEB', 
           '#ACDBA8', 
           '#ECC282',
           '#f5eea1',
           '#f49375'
        ],
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        credits : {
            enabled:false//不显示highCharts版权信息
        },
        title: {
            text: ''
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ this.point.name +'</b> 占收入总额 <b>'+ Highcharts.numberFormat(this.percentage, 1) +'%</b><br/>共计 <b>'+ Highcharts.numberFormat(this.y, 0, ',') +'</b> 元';
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: {
                    enabled:true
                }
            }
        },
        series: [{
            type: 'pie',
            name: '占收入总额',
            data: newincomesArray
        }]
    });
};//收入饼图
function expensesFun(newexpensesArray) {
    $('#expense').highcharts({
        colors: [
           '#B4CDEB', 
           '#ACDBA8', 
           '#ECC282',
           '#f5eea1',
           '#f49375'
        ],
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        credits : {
            enabled:false//不显示highCharts版权信息
        },
        title: {
            text: ''
        },
        tooltip: {
            formatter: function() {
                return '<b>'+ this.point.name +'</b> 占支出总额 <b>'+ Highcharts.numberFormat(this.percentage, 1) +'%</b><br/>共计 <b>'+ Highcharts.numberFormat(this.y, 0, ',') +'</b> 元';
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: {
                    enabled:true
                }
            }
        },
        series: [{
            type: 'pie',
            name: '占支出总额',
            data: newexpensesArray
        }]
    });
};//支出饼图
/*财务收支分析相关*/

/*主要客户应收相关*/
function topReceivable(){
    $.ajax({
        url: "/api/my?action=top_receivable_by_month",
        type: 'GET',
        dataType: 'json',
    })
    .done(function(data) {
        var topArray = [];
        for(i = 0 ; i<data.length ; i++){
            var partnerName = top.Cache.Get("partner", data[i].partner_id);
            var actual_receivable = data[i].actual_receivable;
            var added = data[i].added;
            var amount = data[i].amount;
            var topDOM = "<tr><td width='40%'>" + partnerName + "</td><td width='20%' class='fontfr'>" + actual_receivable + "&nbsp元</td><td width='20%' class='fontfr'>" + added + "&nbsp元</td><td width='20%' class='fontfr'>" + amount + "&nbsp元</td></tr>";
            document.getElementById("receivableTable").innerHTML = document.getElementById("receivableTable").innerHTML+topDOM;            
        };
    })
    .fail(function() {
        alert("主要客户应收数据获取失败！");
    })
    .always(function() {
       
    });
};//获取主要客户应收
/*主要客户应收相关*/