
try{
    new QWebChannel(qt.webChannelTransport, function (channel) {
        window.pyjs = channel.objects.testObject;    //??????JS?
    });
}catch(e){
    console.log(e);
}

function sent(){
    try{
        pyjs.testPy2JS();
    }catch(e){
        alert(e);
    }
}
function sentOnTime(){
    try{
        pyjs.onTimeData();
    }catch(e){
        alert(e);
    }
}
var map = new BMap.Map("map", {
    enableMapClick: false
});// ??Map??
map.centerAndZoom(new BMap.Point(114.5,30.5), 11);  // ?????,????????????
map.enableScrollWheelZoom(true); // ????????

/*------????------*/
//??
var allData=[];//??????????------?python?????????6?????????
var allHeatData=[];
var allActionData=[];//????????------?python???????????????
var actionData=[]//?????????????
var showingDate=null;//0-5??????????6??????
var wmsg=null,wmsg2=null;//??????
var initFlag=false;//?????????????false?????
//??
var trajectHeat=[];     //???????????
var allYearTrajec=null; //???????????
var earlyTrajec=null;   //??????????????
var lateTrajec=null;    //??????????????
var forecastFlag=false; //???????????false?????????
var heatInit=false;     //???????????



function init(){//???????
    for(var i=0;i<allData.length;i++){//???????????
        trajectHeat.push(drawHeat(allData[i]));
        trajectHeat[i].hide();
        for(var j=0;j<allData[i].length;j++){
            allHeatData.push(allData[i][j]);
        }
    }
    allYearTrajec=drawHeat(allHeatData);
    allYearTrajec.hide();
}

/*---------??---------*/

function forecast(){
    if(!forecastFlag){//????
        lateTrajec.show();
        $('#forecastButton').text('????');
        forecastFlag=!forecastFlag;
    }else{
        lateTrajec.hide();
        $('#forecastButton').text('????');
        forecastFlag=!forecastFlag;
    }
}
function showOnTimeData(){
    sentOnTime();
    setTimeout(function(){
        var getHeatMSG='allActionData= '+wmsg2+";";
        eval(getHeatMSG);
        actionData=dataDivision(allActionData);//???????????????
        $("#forecastButton").show();
        $('#map').show();
        $('#numberPage').hide();
        $('#sideOption').hide();
        $("#forecastButton").removeAttr("disabled");
        $("#forecastButton").css("cursor","pointer");
        if(heatInit){
            for(var i=0;i<allData.length;i++){//???????
                trajectHeat[i].hide();
            }
            allYearTrajec.hide();
        }
        if(earlyTrajec){//?????????????
            earlyTrajec[0].show();
            earlyTrajec[1].show();
        }else{//????????????????????
            earlyTrajec = drawPrevious(actionData[0]) ;
            lateTrajec = drawForecast(actionData[1]) ;
            lateTrajec.hide();
        }
    }, 2000);
}
function showMap(){
    if(initFlag){
        if(earlyTrajec){
            earlyTrajec[0].hide();
            earlyTrajec[1].hide();
            lateTrajec.hide();
        }
        $('#map').show();
        $('#numberPage').hide();
        $('#sideOption').show();
        $('#forecastButton').hide();
    }else{
        alert('??????????????');
    }
    
}
function showNum(){
    if(initFlag){
        if(earlyTrajec){
            earlyTrajec[0].hide();
            earlyTrajec[1].hide();
            lateTrajec.hide();
        }
        $('#map').hide();
        $('#numberPage').show();
        $('#sideOption').hide();
        $('#forecastButton').hide();
        barChart(yp,month_flow);
        lineChart(dom.get(0),date31,day_flow[0]);
        lineChart(dom.get(1),date28,day_flow[1]);
        lineChart(dom.get(2),date31,day_flow[2]);
        lineChart(dom.get(3),date30,day_flow[3]);
        lineChart(dom.get(4),date31,day_flow[4]);
        lineChart(dom.get(5),date30,day_flow[5]);
        chooseJan();//?????????
    }else{
        alert('???????????????')
    }
    
}
function dataInit(){
    initFlag=true;
    sent();
    setTimeout(function(){
        var getMSG='allData= '+wmsg+";";
        eval(getMSG);
        init();
    }, 1500);
    heatInit=true;
    $('#initButton').attr('disabled',true);
    $('#initButton').css('cursor',"not-allowed");
}


function showJan(){
    destroyOther(0);
    showingDate=0;
}
function showFeb(){
    destroyOther(1);
    showingDate=1;
}
function showMar(){
    destroyOther(2);
    showingDate=2;
}
function showApr(){
    destroyOther(3);
    showingDate=3;
}
function showMay(){
    destroyOther(4);
    showingDate=4;
}
function showJune(){
    destroyOther(5);
    showingDate=5;
}
function showYear(){
    destroyOther(6);
    showingData=6;
}


function destroyOther(now){//?????????????
    for(var i=0;i<allData.length;i++){
        trajectHeat[i].hide();
    }
    allYearTrajec.hide();
    if(now<6){
        trajectHeat[now].show();
    }else{
        allYearTrajec.show();
    }
}


/*????--?????????????????????
* result???????????????
*/
function dataDivision(result){
    var endTime=52;//??????????????
    var last,flag=false;
    var early=[];
    var late=[];
    for(var i=0;i<result.length;i++){
        var e=[],l=[];
        result[i].map(function(item,index){
            if(item.t<50){
                last = item;
                e.push(item);
            }
            if(item.t>45&&item.t<endTime){
                if(!flag){
                    l.push(last);
                    flag = true;
                }
                l.push(item);
            }
        });
        early.push(e);
        late.push(l);
    }
    return [early,late];
}


/*????,????--????????????????*/
function drawPrevious(early){
    /*????*/
    var previousData=[];
    for (var i = 0; i < early.length; i++) {
        var line = early[i];
        var coordinates = [];
        for (var j = 0; j < line.length; j++) {
            coordinates.push([line[j].x, line[j].y]);
        }
        previousData.push({
            geometry: {
                type: 'LineString',
                coordinates: coordinates
            }
        });
    }
    var previousDataSet = new mapv.DataSet(previousData);
    var options = {
        strokeStyle: 'white',//'rgb(55, 50, 250)',
        globalCompositeOperation: 'lighter',
        shadowColor: 'blue',//'rgb(55, 50, 250)',
        shadowBlur: 1.0,
        methods: {
            click: function (item) {
            }
        },
        lineWidth: 2.0,
        draw: 'simple'
    }
    mapvLayerPrevious = new mapv.baiduMapLayer(map, previousDataSet, options);
    /*????*/
    var timeData=[]
    for (var i = 0; i < early.length; i++) {
        var line = early[i];
        var coordinates = [];
        for (var j = 0; j < line.length; j++) {
            coordinates.push([line[j].x, line[j].y]);
            timeData.push({
                geometry: {
                    type: 'Point',
                    coordinates: [line[j].x, line[j].y]
                },
                count: 1,
                time: line[j].t
            });
        }
    }
    var dataSet = new mapv.DataSet(timeData);
    var options = {
        fillStyle: 'rgb(255,0,0)',//????
        globalCompositeOperation: 'lighter',
        size: 2,
        animation: {
            type: 'time',
            stepsRange: {
                start: 0,
                end: 100
            },
            trails: 3,//??????
            duration: 5,//???????
        },
        draw: 'simple'
    }
    mapvLayerAction = new mapv.baiduMapLayer(map, dataSet, options);
    return [mapvLayerPrevious,mapvLayerAction];
}

/*????--????????*/
function drawForecast(late){
    /*?????*/
    var lastData=[];
    
    for (var i = 0; i < late.length; i++) {
        var line = late[i];
        var coordinates = [];
        for (var j = 0; j < line.length; j++) {
            coordinates.push([line[j].x, line[j].y]);
        }
        lastData.push({
            geometry: {
                type: 'LineString',
                coordinates: coordinates
            }
        });
    }
    var lastDataSet = new mapv.DataSet(lastData);

    var options = {
        strokeStyle: 'green',//'rgb(55, 50, 250)',
        globalCompositeOperation: 'lighter',
        shadowColor: 'blue',//'rgb(55, 50, 250)',
        shadowBlur: 1.0,
        methods: {
            click: function (item) {
            }
        },
        lineWidth: 2.0,
        draw: 'simple'
    }
    mapvLayerForecast = new mapv.baiduMapLayer(map, lastDataSet, options);
    return mapvLayerForecast;
}

/*????????*/
function drawHeat(heatData){
    var dataSet = new mapv.DataSet(heatData);
    var options = {
        size: 3,
        gradient: { 0.1: "rgb(0,255,255)", 0.3: "rgb(0,255,0)", 0.6: "yellow", 0.8: "rgb(255,0,0)"},
        max: 100,
        // range: [0, 100], // ????????
        // minOpacity: 0.5, // ??????
        // maxOpacity: 1,
        draw: 'heatmap'
    }
    var mapvLayerHeat = new mapv.baiduMapLayer(map, dataSet, options);
    return mapvLayerHeat;
}


/*-----????-----*/
var date28=[];
for(var i=1;i<29;i++){
    date28.push(i);
}
var date30=[];
for(var i=1;i<31;i++){
    date30.push(i);
}
var date31=[];
for(var i=1;i<32;i++){
    date31.push(i);
}
var yp=$('#yearPage').get(0);
var month_flow=[20646, 19090, 22117, 19526, 18500, 19557];
var day_flow=[[751, 747, 810, 666, 785, 720, 825, 823, 837, 747, 769, 773, 758, 757, 787, 777, 735, 738, 731, 741, 745, 680, 637, 607, 579, 441, 484, 493, 303, 400,500], [579, 609, 657, 534, 575, 692, 649, 638, 703, 533, 468, 579, 720, 764, 745, 757, 597, 755, 798, 784, 756, 702, 822, 699, 710, 748, 850, 667], [613, 783, 768, 761, 395, 689, 693, 766, 786, 753, 752, 726, 626, 703, 812, 832, 784, 770, 718, 753, 808, 647, 679, 786, 708, 697, 735, 528, 707, 671, 668], [724, 705, 677, 689, 688, 711, 744, 686, 603, 631, 721, 731, 681, 664, 548, 509, 413, 563, 799, 661, 714, 699, 729, 646, 535, 594, 597, 540, 643, 681], [576, 303, 637, 598, 728, 658, 678, 563, 576, 697, 636, 495, 589, 651, 562, 633, 699, 578, 634, 765, 749, 736, 697, 724, 797, 788, 831, 268, 329, 694, 708], [724, 741, 720, 728, 685, 732, 783, 747, 685, 542, 596, 747, 511, 540, 714, 731, 772, 714, 726, 704, 617, 556, 715, 689, 717, 717, 748, 274, 682,731]]
var allYearNumber=120513
var dom=$('.monthPage');
function lineChart(dom,date,number){
    var myChart = echarts.init(dom);
    var app = {};
    var option = {
        title: {
            text: '??????'
        },
        tooltip: {
            trigger: 'axis'
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value} ?'
            }
        },
        series: [
            {
                name: '????',
                type: 'line',
                data: number,
                markPoint: {
                    data: [
                        {type: 'max', name: '???'},
                        {type: 'min', name: '???'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '???'}
                    ]
                }
            },
        ]
  };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}

function chooseJan(){
    $('#footer button').css('background-color','rgb(150,150,150)');
    $($('#footer button')[0]).css('background-color','rgb(220,220,220)')
    $('#yearPage').hide();
    dom.hide();
    $(dom[0]).show();
}
function chooseFeb(){
    $('#footer button').css('background-color','rgb(150,150,150)');
    $($('#footer button')[1]).css('background-color','rgb(220,220,220)')
    $('#yearPage').hide();
    dom.hide();
    $(dom[1]).show()
}
function chooseMar(){
    $('#footer button').css('background-color','rgb(150,150,150)');
    $($('#footer button')[2]).css('background-color','rgb(220,220,220)')
    $('#yearPage').hide();
    dom.hide();
    $(dom[2]).show()
}
function chooseApr(){
    $('#footer button').css('background-color','rgb(150,150,150)');
    $($('#footer button')[3]).css('background-color','rgb(220,220,220)')
    $('#yearPage').hide();
    dom.hide();
    $(dom[3]).show()
}
function chooseMay(){
    $('#footer button').css('background-color','rgb(150,150,150)');
    $($('#footer button')[4]).css('background-color','rgb(220,220,220)')
    $('#yearPage').hide();
    dom.hide();
    $(dom[4]).show()
}
function chooseJune(){
    $('#footer button').css('background-color','rgb(150,150,150)');
    $($('#footer button')[5]).css('background-color','rgb(220,220,220)')
    $('#yearPage').hide();
    dom.hide();
    $(dom[5]).show()
}
function chooseYear(){
    $('#footer button').css('background-color','rgb(150,150,150)');
    $('#chooseWholeYear').css('background-color','rgb(220,220,220)');
    dom.hide();
    $('#yearPage').show();
}

function barChart(dom,number){
    var myChart = echarts.init(dom);
    var option = {
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // ??????????????
                    type: 'shadow'        // ??????????'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['??', '??', '??', '??', '??', '??'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '??????',
                    type: 'bar',
                    barWidth: '60%',
                    data: number
                }
            ]
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}

var k=(30.615998-30.542374)/(114.347652-114.297635);
console.log(k);
