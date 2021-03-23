
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
var searchbtn = document.querySelector(".searchbtn");
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
searchbtn.addEventListener("click", function () {
    showdata.style.display = "block";
})







