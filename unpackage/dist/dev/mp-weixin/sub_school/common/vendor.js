(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["sub_school/common/vendor"],{

/***/ 263:
/*!********************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/shop-project/common/map/openMap.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _transformCoordinate = _interopRequireDefault(__webpack_require__(/*! ./transformCoordinate.js */ 264));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
function openMapByDefault(latitude, longitude, name) {
  uni.openLocation({
    latitude: latitude,
    longitude: longitude,
    name: name,
    address: name,
    fail: function fail() {
      uni.showModal({
        content: '打开地图失败,请重新尝试' });

    } });

}
function openMapByAndroid(latitude, longitude, name) {
  var url = ''; // 回调地址
  var identity = ''; // 程序名称
  if (plus.runtime.isApplicationExist({ pname: 'com.baidu.BaiduMap' })) {// baidumap
    url = "baidumap://map/marker?location=".concat(latitude, ",").concat(longitude, "&title=").concat(name, "&coord_type=gcj02&src=andr.baidu.openAPIdemo");
    identity = 'com.baidu.BaiduMap';
    openURL(url, identity);
  } else
  if (plus.runtime.isApplicationExist({ pname: 'com.autonavi.minimap' })) {// 高德
    url = "androidamap://viewMap?sourceApplication=appname&poiname=".concat(name, "&lat=").concat(latitude, "&lon=").concat(longitude, "&dev=0");
    identity = 'com.autonavi.minimap';
    openURL(url, identity);
  } else
  {
    openMapByDefault(latitude, longitude, name);
  }
}
function openMapByIos(latitude, longitude, name) {
  var url = ''; // 回调地址
  var errorCB = ''; // url失败的回调地址
  var identity = ''; // 程序名称

  if (plus.runtime.isApplicationExist({ action: 'baidumap://' })) {// baidumap
    url = "baidumap://map/marker?location=".concat(latitude, ",").concat(longitude, "&title=").concat(name, "&content=").concat(name, "&src=ios.baidu.openAPIdemo&coord_type=gcj02");
    openURL(url, identity);
  } else
  if (plus.runtime.isApplicationExist({ action: 'iosamap://' })) {// 高德
    url = "iosamap://viewMap?sourceApplication=applicationName&poiname=".concat(name, "&lat=").concat(latitude, "&lon=").concat(longitude, "&dev=0");
    openURL(url, identity);
  } else
  {
    openMapByDefault(latitude, longitude, name);
  }
}
function openURL(url, identity) {
  var newurl = encodeURI(url);
  plus.runtime.openURL(newurl, function (res) {
    uni.showModal({
      content: res.message });

  }, identity);
}
function getCoordByType(longitude, latitude, coord_type) {
  switch (coord_type) {
    case 'gcj02':
      return [longitude, latitude];
      break;
    case 'bd09':
      return _transformCoordinate.default.bd09togcj02(longitude, latitude);
      break;
    case 'wgs84':
      return _transformCoordinate.default.wgs84togcj02(longitude, latitude);
      break;
    default:
      return [longitude, latitude];
      break;}

}var _default =
{
  /* 打开地图 */
  openMap: function openMap(latitude, longitude, name) {var coord_type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'gcj02';
    var arr = getCoordByType(longitude, latitude, coord_type);

















    openMapByDefault(arr[1], arr[0], name);

  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 264:
/*!********************************************************************************************************!*\
  !*** C:/Users/Administrator/Documents/HBuilderProjects/shop-project/common/map/transformCoordinate.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * Created by Wandergis on 2015/7/8.
                                                                                                      * 提供了百度坐标（BD09）、国测局坐标（火星坐标，GCJ02）、和WGS84坐标系之间的转换
                                                                                                      */

//定义一些常量
var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
var PI = 3.1415926535897932384626;
var a = 6378245.0;
var ee = 0.00669342162296594323;

/**
                                  * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
                                  * 即 百度 转 谷歌、高德
                                  * @param bd_lon
                                  * @param bd_lat
                                  * @returns {*[]}
                                  */
function bd09togcj02(bd_lon, bd_lat) {
  var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
  var x = bd_lon - 0.0065;
  var y = bd_lat - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
  var gg_lng = z * Math.cos(theta);
  var gg_lat = z * Math.sin(theta);
  return [gg_lng, gg_lat];
}

/**
   * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
   * 即谷歌、高德 转 百度
   * @param lng
   * @param lat
   * @returns {*[]}
   */
function gcj02tobd09(lng, lat) {
  var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
  var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
  var bd_lng = z * Math.cos(theta) + 0.0065;
  var bd_lat = z * Math.sin(theta) + 0.006;
  return [bd_lng, bd_lat];
}

/**
   * WGS84转GCj02
   * @param lng
   * @param lat
   * @returns {*[]}
   */
function wgs84togcj02(lng, lat) {
  if (out_of_china(lng, lat)) {
    return [lng, lat];
  } else
  {
    var dlat = transformlat(lng - 105.0, lat - 35.0);
    var dlng = transformlng(lng - 105.0, lat - 35.0);
    var radlat = lat / 180.0 * PI;
    var magic = Math.sin(radlat);
    magic = 1 - ee * magic * magic;
    var sqrtmagic = Math.sqrt(magic);
    dlat = dlat * 180.0 / (a * (1 - ee) / (magic * sqrtmagic) * PI);
    dlng = dlng * 180.0 / (a / sqrtmagic * Math.cos(radlat) * PI);
    var mglat = lat + dlat;
    var mglng = lng + dlng;
    return [mglng, mglat];
  }
}

/**
   * GCJ02 转换为 WGS84
   * @param lng
   * @param lat
   * @returns {*[]}
   */
function gcj02towgs84(lng, lat) {
  if (out_of_china(lng, lat)) {
    return [lng, lat];
  } else
  {
    var dlat = transformlat(lng - 105.0, lat - 35.0);
    var dlng = transformlng(lng - 105.0, lat - 35.0);
    var radlat = lat / 180.0 * PI;
    var magic = Math.sin(radlat);
    magic = 1 - ee * magic * magic;
    var sqrtmagic = Math.sqrt(magic);
    dlat = dlat * 180.0 / (a * (1 - ee) / (magic * sqrtmagic) * PI);
    dlng = dlng * 180.0 / (a / sqrtmagic * Math.cos(radlat) * PI);
    mglat = lat + dlat;
    mglng = lng + dlng;
    return [lng * 2 - mglng, lat * 2 - mglat];
  }
}

function transformlat(lng, lat) {
  var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
  ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
  return ret;
}

function transformlng(lng, lat) {
  var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
  ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
  ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
  ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
  return ret;
}

/**
   * 判断是否在国内，不在国内则不做偏移
   * @param lng
   * @param lat
   * @returns {boolean}
   */
function out_of_china(lng, lat) {
  return lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271 || false;
}var _default =

{
  bd09togcj02: bd09togcj02, // 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
  gcj02tobd09: gcj02tobd09, // 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
  wgs84togcj02: wgs84togcj02, // 
  gcj02towgs84: gcj02towgs84 };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/sub_school/common/vendor.js.map