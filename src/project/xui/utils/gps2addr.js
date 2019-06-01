import QQMapWX from './qqmap-wx-jssdk'
var qqmapsdk = {}
function getAddress (exif) {
  // let direction = ''
  // if (exif.GPSImgDirection) {
  //   const directionArry = exif.GPSImgDirection // 方位角
  //   direction = directionArry.numerator / directionArry.denominator
  // }

  let longitude = ''
  if (exif.GPSLongitude) {
    const LongitudeArry = exif.GPSLongitude
    const longLongitude =
      LongitudeArry[0].numerator / LongitudeArry[0].denominator +
      LongitudeArry[1].numerator / LongitudeArry[1].denominator / 60 +
      LongitudeArry[2].numerator / LongitudeArry[2].denominator / 3600
    longitude = longLongitude.toFixed(8)
    // if (exif.GPSLongitudeRef !== 'E') {
    //   longitude = -longitude
    // }
  }
  let latitude = ''
  if (exif.GPSLatitude) {
    const LatitudeArry = exif.GPSLatitude
    const longLatitude =
        LatitudeArry[0].numerator / LatitudeArry[0].denominator +
        LatitudeArry[1].numerator / LatitudeArry[1].denominator / 60 +
        LatitudeArry[2].numerator / LatitudeArry[2].denominator / 3600
    latitude = longLatitude.toFixed(8)
    // if (exif.GPSLatitudeRef !== 'N') {
    //   latitude = -latitude
    // }
  }
  qqmapsdk = new QQMapWX({key: 'FM3BZ-6WDCS-ZWQOF-6Z2EX-4CJWS-AGBNM'})
  return new Promise((resolve, reject) => {
    try {
      qqmapsdk.reverseGeocoder({
        location: {
          latitude,
          longitude
        },
        sig: '2OK7tejUpFxMZyhAfawUejAli7aMtViV',
        success (res) {
          // resolve(res)
          // console.log('success:', res)
        },
        fail (fail) {
          // reject(fail)
          // console.log('fail:', fail)
        },
        complete (result) {
          resolve(result)
        }
      })
    } catch (err) {
      // console.log('catchErr:', err)
    }
  })
}
export default getAddress
