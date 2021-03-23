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

var li = document.querySelectorAll("li");
for (var i = 0; i < li.length; i++) {
    li[i].addEventListener('mouseover', function () {
        for (var j = 0; j < li.length; j++) {
            li[j].style.backgroundColor = '#1d374c';
        }
        this.style.backgroundColor = 'rgb(113, 154, 190)';
    })
    li[i].addEventListener('mouseout', function () {
        for (var j = 0; j < li.length; j++) {
            li[j].style.backgroundColor = '#1d374c';
        }
    })
}

var t = null;
t = setTimeout(time, 1000); //开始运行
function time() {
    clearTimeout(t); //清除定时器
    dt = new Date();
    var y = dt.getFullYear();
    var mt = dt.getMonth() + 1;
    mt = mt < 10 ? '0' + mt : mt;
    var day = dt.getDate();
    day = day < 10 ? '0' + day : day;
    var h = dt.getHours(); //获取时
    h = h < 10 ? '0' + h : h;
    var m = dt.getMinutes(); //获取分
    m = m < 10 ? '0' + m : m;
    var s = dt.getSeconds(); //获取秒
    s = s < 10 ? '0' + s : s;
    document.querySelector(".showtime").innerHTML = "当前时间： " + y + "年" +
        mt + "月" + day + " " + h + "时" + m + "分" + s + "秒";
    t = setTimeout(time, 1000); //设定定时器，循环运行
}

var showdata = document.querySelector(".showdata");
var search = document.querySelector(".search");
var searchbtn
var i = 0;
search.addEventListener("click", function () {
    i++;
    if (i % 2 == 1) {
        showdata.style.display = "block";
    }
    else {
        showdata.style.display = "none";
    }

})







