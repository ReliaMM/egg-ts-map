"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getViewAmap3D(FILE_NAME_JS) {
    return `<!DOCTYPE html>
  <html>
  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
      <link rel="stylesheet" type="text/css" href="https://a.amap.com/jsapi_demos/static/bezier/bezier.css">
      <title id="titlePage"></title>
      <style type="text/css">
      html * {
        padding: 0;
        margin: 0;
      }
      html {
          height: 100%
      }
      body {
          height: 100%;
          margin: 0px;
          padding: 0 20px;
          font-family: "微软雅黑";
      }
      .cell {
          padding:0 6px;
      }
      #container {
          height: 800px;
          width: 100%;
      }
      #r-result {
          width: 100%;
          padding-bottom: 50px;
      }
      #pageTopTitle{
        font-size:12px;
      }
      .ipt {
          outline: none;
      }
      .ipt.active {
          background-color: #1296db;
          color: #fff;
          border-radius: 4px;
          font-size: 12px;
      }
      .input-wrap{
        margin:  6px 0 ;
      }
      .section__split {
        padding:  10px 0 0 0;
      }
      .section__desc {
        font-size: 12px;
        padding:  10px 0 0 0;
      }
      .max {
        margin: 0 10px 0 0 ;
        width: 100px;
      }
      .bezierInp {
        display: none;
      }
      .graph {
        padding: 10px 10px 10px 20px;
      }
      .amap-marker-label{
            border: 0;
            background-color: transparent;
        }
      .info {
        padding: .75rem 1.25rem;
        margin-bottom: 1rem;
        border-radius: .25rem;
        position: fixed;
        top: 1rem;
        background-color: white;
        width: auto;
        min-width: 22rem;
        border-width: 0;
        right: 1rem;
        box-shadow: 0 2px 6px 0 rgba(114, 124, 245, .5);
      }
        .info{
          position: relative;
          top: 0;
          right: 0;
          min-width: 0;
      }

      </style>
  </head>
  <body>
      <div id="container"></div>
      <div class="graph">
          <h3 id="pageTopTitle"></h3>
          <input class="bezierInp" type="text" id="bezierInp" readonly="readonly" />
          <figure>
              <canvas id="curve" width="210" height="550"></canvas>
              <figcaption id="axisHeat">热度</figcaption>
              <figcaption id="axisHeight">高度</figcaption>
          </figure>
           <div id="r-result">
            <button id="showHeatMapBtn">显示热力图</button>
            <button id="hideHeatMapBtn">关闭热力图</button>
            <button id="showMarkerBtn">显示点</button>
            <button id="hideMarkerBtn">隐藏点</button>
            <div class="input-wrap" id="inputWrap"></div>
      </div>
      </div>
  </body>
  <script type="text/javascript" src="http://test.oainsight.zebra-c.com/lib/core/jquery-1.10.2.min.js?_=1517278420871"></script>
  <script type="text/javascript" src="./data/${FILE_NAME_JS}.js"></script>
  <script src="https://webapi.amap.com/maps?v=1.4.15&key=6cedc88e67be9d6a3cb729a3edf90ce2&plugin=AMap.CustomLayer,AMap.ControlBar,AMap.Heatmap"></script>
  <script src="https://a.amap.com/jsapi_demos/static/bezier/bezier.js"></script>
  <script type="text/javascript">

var map = '';
var heatmapOverlay = '';
var heatmapOpts = {}
var ObjeHandler = {
    init(){
        this.markerGroup = []
        this.createIpt()
        this.initBaiduMap()
        this.creatPointer()
        this.action()
        $("#inputWrap .ipt:eq(0)").trigger('click')
    },
    setTitle(name) {
        document.querySelector("#titlePage").innerText = name
        document.querySelector("#pageTopTitle").innerText = name
    },
    setMap (type, value) {
       var heatMapData = EXTRA_DATA[0]
       var max = value || heatMapData.max[type]
        heatmapOverlay.setDataSet({
            data: this.getPointes(heatMapData.heatMap[type]),
            max
        });
    },
    getPointes (heatData) {
        var points = []
        for (var i = 0, len = heatData.length; i < len; i++) {
            var temp = heatData[i];
            var obj = {
                lng: temp[0],
                lat: temp[1],
                count: temp[2],
            }
            points.push(obj);
        }
        return points
    },
    action () {
      var _this = this
      $("#inputWrap").on('click', '.ipt', function() {
          var type = $(this).attr('data-type')
          var city = $(this).attr('data-city')
          var value = $(this).prev('.max').val()
          $(this).addClass('active').siblings().removeClass('active')
          var name = $(this).val()
          _this.setTitle(name)
          _this.setMap(type, value)
          _this.gotoPointer(city)
      })
       $('#showMarkerBtn').on('click', function(){
          _this.showMarker()
      })
      $('#hideMarkerBtn').on('click', function(){
          _this.hideMarker()
      })
      $('#hideHeatMapBtn').on('click', function(){
          _this.hideHeatMap()
      })
      $('#showHeatMapBtn').on('click', function(){
          _this.showHeatMap()
      })
    },
    createIpt () {
        var btnStr = '', maxStr = '';
        var heatMapData = EXTRA_DATA[0]
        var city = heatMapData.city
        var max = heatMapData.max
        Object.keys(heatMapData.heatMap).map(item => {
          btnStr += '<span class="section__desc">'+item + '最大值：' + '<b>'+ max[item] + '</b>'+'</span><br/><input class="max" type="number" placeholder="'+item+'热力图权重 默认'+max[item]+'"></input><input class="ipt" data-type="'+item+'" data-city="'+city+'" type="button" value="'+city+' - '+item+'"></input></br>'
        })
        $('#inputWrap').append(btnStr);
    },
    creatPointer () {
      let pointerA = EXTRA_DATA[1]
      let pointerB = EXTRA_DATA[2] || []
      let big = this.addPointer(pointerA.pointer || [], pointerA.icon, 32, true)
      let small = this.addPointer(pointerB.pointer || [], pointerB.icon, 16, true)
      this.markerGroup = [...big, ...small]
    },
    addPointer(data, icon, size, action) {
      // var myIcon = new BMap.Icon(icon, new BMap.Size(size, size));
      var myIcon = new AMap.Icon({
          size: new AMap.Size(size, size),
          image: icon,
      });
      var pointArray = []
      let markerGroup = []
      for(var i=0;i<data.length;i++){
          var marker = new AMap.Marker({
              position: new AMap.LngLat(data[i][0],data[i][1]),
              icon: myIcon,
              offset: new AMap.Pixel(-13, -30)
          });

          markerGroup.push(marker)
          map.add([marker]);    //增加点
          action === true && this.markerAction(marker, data[i][2])
      }
      return markerGroup
    },
    gotoPointer (city) {
      map.setCity(city);
    },
    initBaiduMap () {
      map = new AMap.Map("container", {
        viewMode: '3D',
        pitch: 10,
        resizeEnable: true,
        center: [116.418261, 39.921984],
        zoom: 11.5
      });
      map.addControl(new AMap.ControlBar({}));
      heatmapOpts = {
          //3d 相关的参数
          '3d': {
              //热度转高度的曲线控制参数，可以利用左侧的控制面板获取
              heightBezier: [0.4, 0.2, 0.4, 0.8],
              //取样精度，值越小，曲面效果越精细，但同时性能消耗越大
              gridSize: 2,
              heightScale: 1
          }
      };
      //初始化heatmap对象
      heatmapOverlay = new AMap.Heatmap(map, heatmapOpts);
      this.initBezierInp()
    },
    initBezierInp () {
      var bezierInp = document.getElementById('bezierInp');
      function onBezierUpdate(val) {
          bezierInp.value = (val);
          heatmapOpts['3d'].heightBezier = val;
          if (heatmapOverlay) {
              heatmapOverlay.setOptions(heatmapOpts);
          }
      }
      bezierHelper.setBezier(heatmapOpts['3d'].heightBezier);
      bezierInp.value = (bezierHelper.getBezier());
      window.onBezierUpdate = onBezierUpdate;
    },
    showMarker(){
      this.markerGroup.map(item => {
        item.show()
      })
    },
    hideMarker(){
      this.markerGroup.map(item => {
        item.hide()
      })
    },
    markerAction(marker, text) {
      marker.on('mouseover' , function(e){
        marker.setLabel({
          direction: 'top',
          content:"<div class='info'>"+text+"</div>",
        })
      })
       marker.on('mouseout' , function(e){
        marker.setLabel("")
      })
    },
    hideHeatMap () {
        heatmapOverlay.hide();
    },
    showHeatMap () {
        heatmapOverlay.show();
    }
}
$(function(){
  ObjeHandler.init()
})
</script>
</html>`;
}
exports.getViewAmap3D = getViewAmap3D;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zaXRpb24taGFzLXBvaW50ZXItYW1hcC0zZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBvc2l0aW9uLWhhcy1wb2ludGVyLWFtYXAtM2QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxTQUFnQixhQUFhLENBQUMsWUFBWTtJQUV4QyxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsrQ0E4R3NDLFlBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBZ0xuRCxDQUFBO0FBQ1IsQ0FBQztBQWpTRCxzQ0FpU0MifQ==