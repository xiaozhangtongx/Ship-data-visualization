// // GL版命名空间为BMapGL
// var map = new BMapGL.Map("allmap");    // 创建Map实例
// map.centerAndZoom(new BMapGL.Point(118.5, 27.5), 5);  // 初始化地图,设置中心点坐标和地图级别
// map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
// map.setMapType(BMAP_EARTH_MAP);      // 设置地图类型为地球模式
var map = new BMap.Map("allmap");
var point = new BMap.Point(114.046304, 22.628841);
map.centerAndZoom(point, 5);
var opts = {
    position: point,    // 指定文本标注所在的地理位置
    offset: new BMap.Size(1, 3)    //设置文本偏移量
}
var label = new BMap.Label("深圳市", opts);  // 创建文本标注对象
label.setStyle({
    color: "red",
    fontSize: "16px",
    height: "20px",
    lineHeight: "20px",
    fontFamily: "微软雅黑"
});

map.addOverlay(label);