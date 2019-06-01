// /* eslint-disable */
import EXIF from 'exif-js'
function getImgExif (image) {
  let fs = wx.getFileSystemManager()
  return new Promise((resolve, reject) => {
    try {
      fs.readFile({
        filePath: image,
        // encoding: 'base64',
        success: res => {
          EXIF.enableXmp()
          EXIF.getData({src: res.data}, function (res) {
            delete res.src
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
