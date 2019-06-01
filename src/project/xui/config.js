export const isProd = process.env.NODE_ENV === 'production'

export let pid = '9527'
export const platform = '1'
export const apiBase = 'https://api.huishoubao.com/'
export const baseHost = 'https://mobile.huishoubao.com/'
export const selfReportUri = 'https://logreport.huishoubao.com/selfreport/'

export const logreport = {
  callee: '被调用者ID',
  calleeIp: '被调用者IP',
  caller: '调用者ID',
  callerIp: '调用者IP'
}

export const validations = [{
  name: 'userName',
  rules: [{
    rule: /^.{2,}$/,
    error: '联系人为2个以上字符'
  }]
}, {
  name: 'address',
  rules: [{
    rule: /^.{4,}$/,
    error: '详细地址为4个及以上字符'
  }]
}, {
  name: 'tel',
  rules: [{
    rule: /^[1][0-9]{10}$/,
    error: '手机号码格式不正确'
  }]
}, {
  name: 'cardNumber',
  rules: [{
    rule: /^.{15,}$/,
    error: '身份证输入不正确'
  }]
}]

// 小程序版本号
export const version = 'V1.0.0'
export const appid = 'wx58f984ee339d8d54'
export const secret = '1de7409a53b7ba2e2540ad21844c424f'

export default {
  appid,
  secret,
  version,
  isProd,
  pid,
  baseHost,
  platform,
  apiBase,
  validations,
  selfReportUri,
  logreport
}
