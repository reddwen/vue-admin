/**
 *
 * @Author: zli
 * @Date:   2018-04-03 09:50:23
 */

import qs from 'qs';

// 手机号码校验
export function isvalidPhone(str) {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  return reg.test(str)
}

// 密码校验
export function isvalidPass(str) {
  const reg = /^.{6,20}$/;
  return reg.test(str)
}

// 密码校验
export function ispwd(str) {
  const reg = /^(?![^a-zA-Z]+$)(?!\D+$).{8,16}/;
  return reg.test(str)
}

// 正整数校验
export function isPositiveNumber(str) {
  const reg = /^[1-9]\d*$/
  return reg.test(str)
}

// 正整数校验
export function isMinusPositiveNumber(str) {
  const reg = /^(-)?[1-9][0-9]*$/
  return reg.test(str)
}

// 正数 保留两位小数校验
export function isPositiveFloat(str) {
  const reg = /^\d+(\.\d{1,2})?$/
  return reg.test(str)
}


// 设置 localStorage
export function setLocalStorage(key, value) {
  value = value != null ? value : "";
  localStorage.setItem(key, value);
  // var exdate = new Date();
  // exdate.setDate(exdate.getDate() + 15);
  // document.cookie = key + "=" + value + ";expires=" + exdate.toGMTString();

}
// 获取 localStorage
export function getLocalStorage(key) {
  return localStorage.getItem(key);
  // var arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
  // if (arr = document.cookie.match(reg)) {
  //   return (arr[2]);
  // } else {
  //   return false
  // }
}

// 删除 localStorage
export function delLocalStorage(key) {

  // var exp = new Date();
  // exp.setTime(exp.getTime() - 1);
  // var cval = getLocalStorage(key);
  // if (cval != null)
  // document.cookie = key + "=" + cval + ";expires=" + exp.toGMTString();

  return localStorage.removeItem(key);
}

// 延时方法
export function debounce(fn, delay) {
  var timer = null;
  return function () {
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 时间戳转换
export function formatDate(_date) {
  var date = new Date(_date);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}
/**
 * 验证某一个节点是否在模块对应 对应的 权限树中
 */
export function isInpermisionTree(nodeId){
  let permissionArr = qs.parse(getLocalStorage("privileges"));
  return permissionArr.indexOf(nodeId) > -1 ? true : false;

}