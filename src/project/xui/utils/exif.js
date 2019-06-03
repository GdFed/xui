// /* eslint-disable */
import EXIF from '@/libs/exif-js'
// let EXIF = require('@/libs/exif-js')
// import EXIF from 'exif-js'
const exif = new EXIF()
function getImgExif (image) {
  let fs = wx.getFileSystemManager()
  return new Promise((resolve, reject) => {
    try {
      fs.readFile({
        filePath: image,
        // encoding: 'base64',
        success: res => {
          exif.enableXmp()
          exif.getData({src: res.data}, function (res) {
            delete res.src
            res.pretty = exif.pretty(res)
            resolve(res)
          })
        }
      })
    } catch (err) {
      reject(err)
    }
  })
}
export default getImgExif
