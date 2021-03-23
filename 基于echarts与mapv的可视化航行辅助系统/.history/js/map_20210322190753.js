try {
    new QWebChannel(qt.webChannelTransport, function (channel) {
        window.pyjs = channel.objects.testObject;    //把对象赋值到JS中
    });
} catch (e) {
    console.log(e);
}

function sent() {
    try {
        pyjs.testPy2JS();
    } catch (e) {
        alert(e);
    }
}
function sentOnTime() {
    try {
        pyjs.onTimeData();
    } catch (e) {
        alert(e);
    }
}
//创建和初始化地图函数：
function initMap() {
    createMap();//创建地图
    setMapEvent();//设置地图事件
    addMapControl();//向地图添加控件
}

//创建地图函数：
function createMap() {
    var map = new BMap.Map("allmap");//在百度地图容器中创建一个地图
    var point = new BMap.Point(122.147729, 30.145938);//定义一个中心点坐标
    map.centerAndZoom(point, 9);//设定地图的中心点和坐标并将地图显示在地图容器中
    window.map = map;//将map变量存储在全局
}

//地图事件设置函数：
function setMapEvent() {
    map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
    map.enableScrollWheelZoom();//启用地图滚轮放大缩小
    map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
    map.enableKeyboard();//启用键盘上下左右键移动地图
}

//地图控件添加函数：
function addMapControl() {
    //向地图中添加缩放控件
    var ctrl_nav = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_ZOOM });
    map.addControl(ctrl_nav);
    //向地图中添加缩略图控件
    var ctrl_ove = new BMap.OverviewMapControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: true });
    map.addControl(ctrl_ove);
    //地图样式控件
    map.addControl(new BMap.MapTypeControl());
    //向地图中添加比例尺控件
    var ctrl_sca = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT });
    map.addControl(ctrl_sca);
}

initMap();//创建和初始化地图
/*------变量定义------*/
//数据
var allData = [];//接收全都的热力图数据------从python接收，二维，长度为6，存放六个月的数据
var allHeatData = [];
var allActionData = [];//动态轨迹初始数据------从python接收，二维，每个元素是一条轨迹
var actionData = []//动态轨迹拆分后的数据，二维
var showingDate = null;//0-5表示正在显示的月份，6表示显示半年
var wmsg = null, wmsg2 = null;//用来接收数据
var initFlag = false;//是否完成数据初始化的标志，false表示未完成
//轨迹
var trajectHeat = [];     //存放每月的热力图轨迹层
var allYearTrajec = null; //存放全年的热力图轨迹层
var earlyTrajec = null;   //实时轨迹的历史部分的轨迹图层
var lateTrajec = null;    //实时轨迹的预测部分的轨迹图层
var forecastFlag = false; //是否已经显示预测轨迹，false表示否，默认不显示
var heatInit = false;     //热力图图层是否已初始化

function drawHeat(heatData){
    var dataSet = new mapv.DataSet(heatData);
    var options = {
        size: 3,
        gradient: { 0.1: "rgb(0,255,255)", 0.3: "rgb(0,255,0)", 0.6: "yellow", 0.8: "rgb(255,0,0)"},
        max: 100,
        // range: [0, 100], // 过滤显示数据范围
        // minOpacity: 0.5, // 热力图透明度
        // maxOpacity: 1,
        draw: 'heatmap'
    }
    var mapvLayerHeat = new mapv.baiduMapLayer(map, dataSet, options);
    return mapvLayerHeat;
}
