import api from '../api'
import conf from '../config'

var WXBizDataCrypt = require('./WXBizDataCrypt')
export default function crypto ({code, encryptedData, iv}) {
  let appid = conf.appid
  let secret = conf.secret
  return new Promise(async (resolve, reject) => {
    try {
      let ret = await api.jscode2session({appid, secret, code})
      if (+ret.errcode === 0) {
        let sessionKey = ret.session_key
        let data = new WXBizDataCrypt(appid, sessionKey).decryptData(encryptedData, iv)
        resolve(data)
      } else {
        reject(ret)
      }
    } catch (err) {
      reject(err)
    }
  })
}
