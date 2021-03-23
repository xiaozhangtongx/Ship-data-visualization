// GL版命名空间为BMapGL
var map = new BMa Map("allmap");    // 创建Map实例
map.centerAndZoom(new BMapGL.Point(118.5, 27.5), 5);  // 初始化地图,设置中心点坐标和地图级别
map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
map.setMapType(BMAP_EARTH_MAP);      // 设置地图类型为地球模式