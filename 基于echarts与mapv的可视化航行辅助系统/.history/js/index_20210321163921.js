

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
    map.addControl(new BMap.MapTypeControl());
    //向地图中添加比例尺控件
    var ctrl_sca = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT });
    map.addControl(ctrl_sca);
}

initMap();//创建和初始化地图


wi.get('../data', function(csvstr) {

    var options = {
        size: 1.5,
        context: 'webgl',
        fillStyle: 'rgba(250, 50, 50, 0.8)',
        draw: 'simple'
    }

    var dataSet = mapv.csv.getDataSet(csvstr);
    dataSet.initGeometry();

    var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);

    $('#loading').hide();

    function finished() {
        mapvLayer.update({
            options: options 
        });
    };

    var gui = new dat.GUI({
        nameMap: {
            size: '大小',
            fillStyle: '颜色'
        }
    });

    gui.add(options, 'size', 0.1, 10).onFinishChange(finished);
    gui.addColor(options, 'fillStyle').onChange(finished);

});
