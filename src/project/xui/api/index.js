import fetch from '&/utils/fetch'

export default {
  // formId 收集
  // reportFormId ({ formId }) {
  //   return fetch.post(`${config.apiBase}api/report/formid`, { formid: formId })
  // }
  jscode2session ({appid, secret, code, grantType = 'authorization_code'}) {
    return fetch.post(`https://api.weixin.qq.com/sns/jscode2session?&appid=${appid}&secret=${secret}&js_code=${code}&grant_type=${grantType}`)
  }
}
