/* eslint-disable */
// rgb to hex
export const rgbToHex = (r, g, b) => {
    var hex = ((r<<16) | (g<<8) | b).toString(16);
    return "#" + new Array(Math.abs(hex.length-7)).join("0") + hex;
  }

  // hex to rgb
  export const hexToRgb = (hex) => {
    var rgb = [];
    for(var i=1; i<7; i+=2){
        rgb.push(parseInt("0x" + hex.slice(i,i+2)));
    }
    return rgb;
  }

  // 计算渐变过渡色
  export const gradient = (startColor,endColor,step) => {
    // 将 hex 转换为rgb
    var sColor = hexToRgb(startColor),
      eColor = hexToRgb(endColor);
    // 计算R\G\B每一步的差值
    var rStep = (eColor[0] - sColor[0]) / step;
    var gStep = (eColor[1] - sColor[1]) / step;
    var bStep = (eColor[2] - sColor[2]) / step;
    var gradientColorArr = [];
    for(var i=0;i<step;i++){
      // 计算每一步的hex值
      gradientColorArr.push(rgbToHex(parseInt(rStep*i+sColor[0]),parseInt(gStep*i+sColor[1]),parseInt(bStep*i+sColor[2])));
    }
    return gradientColorArr;
  }
  export default {
    gradient,
    rgbToHex,
    hexToRgb
  }