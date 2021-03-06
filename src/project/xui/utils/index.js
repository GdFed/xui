import sha1 from 'sha1'
import {translation} from '&/config'

// 数字签名
export function signUrl (url = '', obj = {}) {
  obj = Object.assign(obj, getQuery(url))
  let sign = 'signkey'
  let objKeys = Object.keys(obj)
  objKeys = objKeys.filter(item => item !== 'sign')
  objKeys = objKeys.sort()
  objKeys.forEach(item => {
    sign += `${item}${obj[item]}`
  })
  sign += sign
  sign = sha1(sign)
  return buildQuery(url, 'sign', sign)
}

/**
 * 获取url的query
 */
export function getQuery (url = '') {
  let obj = {}
  if (url.indexOf('?') !== -1) {
    let objArr = url.split('?')[1].split('&') || []
    for (let i = 0; i < objArr.length; i++) {
      let param = objArr[i].split('=')
      if (param[0] !== 'page') {
        obj[param[0]] = param[1]
      }
    }
  }
  return obj
}

/**
 * 追加参数到url
 */
export function buildQuery (url = '', key, value) {
  return url.indexOf('?') === -1 ? `${url}?${key}=${value}` : `${url}&${key}=${value}`
}

/**
 * 追加多个参数到url
 */
export function buildQuerys (url = '', obj = {}) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      url = buildQuery(url, key, obj[key])
    }
  }
  return url
}

// 格式化时间
export function formatTime (date = new Date()) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].join('/')
  const t2 = [hour, minute, second].map(formatNum).join(':')

  return `${t1} ${t2}`
}
// 格式化元
export function formatMoney (money) { // money 分 type 是否转成元
  money = formatNum(money, 3)
  return `${money.slice(0, -2)}.${money.slice(-2)}`
}

// 格式化数字
export function formatNum (num, digit = 2, str = '0') {
  return num.toString().padStart(digit, str)
}
// 云函数
export function func (name, data = {}, config = {}) {
  return wx.cloud.callFunction({name, data, config})
}
export function isEmpty (obj) {
  return Object.keys(obj).length === 0
}
export function isArray (arr) {
  return arr instanceof Array
}
export function isObject (obj) {
  return obj instanceof Object
}
export function translate (str) {
  return translation[str] || str
}
// 美化代码
export function pretty (obj, splitStr = '|--', line = 0) {
  if (isEmpty(obj) && isArray(obj)) return '[]'
  if (isEmpty(obj) && isObject(obj)) return '{}'
  let strPretty = line === 0 ? '' : '\r\n'
  for (let a in obj) {
    if (obj.hasOwnProperty(a)) {
      if (typeof obj[a] === 'object') {
        if (obj[a] instanceof Number) {
          strPretty += ''.padStart(splitStr.length * line, splitStr) + translate(a) + ' : ' + obj[a] + ' [' + obj[a].numerator + '/' + obj[a].denominator + ']\r\n'
        } else if (isArray(obj[a])) {
          strPretty += ''.padStart(splitStr.length * line, splitStr) + translate(a) + ' : ' + `[${obj[a].join()}]` + '\r\n'
        } else {
          strPretty += ''.padStart(splitStr.length * line, splitStr) + translate(a) + ' : ' + pretty(obj[a], splitStr, line + 1) + '\r\n'
        }
      } else {
        strPretty += ''.padStart(splitStr.length * line, splitStr) + translate(a) + ' : ' + obj[a] + '\r\n'
      }
    }
  }
  return strPretty
}

export default {
  signUrl,
  buildQuery,
  buildQuerys,
  formatMoney,
  formatNum,
  formatTime,
  func,
  pretty,
  isArray,
  isObject,
  isEmpty
}
