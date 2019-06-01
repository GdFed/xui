import Fly from 'flyio/dist/npm/wx'
import { buildQuery, signUrl } from './index'
import conf from '../config'
// import mock from './mock'
const fly = new Fly()

fly.config.timeout = 30000

fly.interceptors.request.use((config, promise) => {
  const userInfo = wx.getStorageSync('userInfo')
  const token = userInfo ? (userInfo.token || '') : ''
  const disseminatorUid = userInfo ? (userInfo.disseminatorUid || '') : ''

  // current page route
  let currentPath = 'app'
  try {
    // /* eslint-disable no-undef */
    let pages = getCurrentPages()
    let currentPage = pages[pages.length - 1]['route']
    if (currentPage) {
      currentPath = currentPage
    }
  } catch (e) {
    //
  }

  // delete field of which value equal string undefined
  if (config.body) {
    for (let key in config.body) {
      if (config.body.hasOwnProperty(key)) {
        if (config.body[key] === 'undefined' || config.body[key] === '' || config.body[key] === undefined) {
          delete config.body[key]
        }
      }
    }
  }

  // build common query
  if (config.url.indexOf(conf.apiBase) !== -1) {
    config.url = buildQuery(config.url, 'token', token)
    config.url = buildQuery(config.url, 'disseminatorUid', disseminatorUid)
    config.url = buildQuery(config.url, 'version', conf.version)
    config.url = buildQuery(config.url, 'pid', conf.pid)
    config.url = buildQuery(config.url, 'platform', conf.platform)
    config.url = buildQuery(config.url, 'timestamp', Date.parse(new Date()))
    config.url = buildQuery(config.url, 'page', currentPath)
    config.url = signUrl(config.url, config.body)
  }

  if (config.method === 'POST') {
    if (!config.headers) {
      config.headers = {}
    }
    config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/x-www-form-urlencoded'
  }
  // config.headers['group-header'] = 1
  config.startTime = +new Date()
  config.routePath = config.url.split('.com')[1].split('?')[0]
  return config
})

fly.interceptors.response.use(
  res => {
    // console.log(res)
    try {
      const config = res.request

      // 回收宝协议
      if (config.url.indexOf(conf.apiBase) === 0) {
        const code = res.data._errCode
        const timeEnd = +new Date()
        let reportUri = 'https://logreport.huishoubao.com/hjxapps/?1='
        let affix = parseInt(timeEnd / 1000)
        affix += `=${conf.logreport.callee}=${conf.logreport.calleeIp}=${conf.logreport.caller}=${conf.logreport.callerIp}=`
        affix += `${config.routePath}=${code}=${timeEnd - config.startTime}`
        // 可用性上报
        if (conf.isProd) {
          wx.request({ url: reportUri + affix })
        } else {
          console.log(affix)
        }
      }

      return res.data
    } catch (err) {
      console.log(err)
    }
  },
  error => {
    // console.log(error)
    try {
      // 回收宝协议
      if (error.request.url.indexOf(conf.apiBase) === 0) {
        const code = error.status
        const timeEnd = +new Date()
        let reportUri = 'https://logreport.huishoubao.com/hjxapps/?1='
        let affix = parseInt(timeEnd / 1000)
        affix += `=${conf.logreport.callee}=${conf.logreport.calleeIp}=${conf.logreport.caller}=${conf.logreport.callerIp}=`
        affix += `${error.request.routePath}=${code}=${timeEnd - error.request.startTime}`

        // 可用性上报
        if (conf.isProd) {
          wx.request({ url: reportUri + affix })
        } else {
          console.log(affix)
        }
      }

      // mock数据
      // if (+error.status === 404) {
      //   return Promise.resolve(mock(error.request.routePath))
      // }

      return Promise.resolve({
        _errCode: error.status,
        _errStr: error.message,
        data: ''
      })
    } catch (err) {
      console.log(err)
    }
  }
)
export default fly
