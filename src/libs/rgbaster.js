/* eslint-disable */
    // Helper functions.
  
    var getImageData = function(img, loaded){

        var canvas =wx.createCanvasContext("canvas");
        canvas.drawImage(img, 0, 0, 300, 150);
        canvas.draw();
        setTimeout(() => {
            wx.canvasGetImageData({canvasId: 'canvas',
            x: 0,
            y: 0,
            width: 300,
            height: 150,
            success (imageData) {
                loaded && loaded(imageData.data);
            }});
        }, 0)
  
    };
  
    var makeRGB = function(name){
      return ['rgb(', name, ')'].join('');
    };
  
    var mapPalette = function(palette){
      var arr = [];
      for (var prop in palette) { arr.push( frmtPobj(prop, palette[prop]) ) };
      arr.sort(function(a, b) { return (b.count - a.count) });
      return arr;
    };  
    
    var fitPalette = function(arr, fitSize) {
      if (arr.length > fitSize ) {
      return arr.slice(0,fitSize);
    } else {
      for (var i = arr.length-1 ; i < fitSize-1; i++) { arr.push( frmtPobj('0,0,0', 0) ) };
      return arr;
    };
    };
    
    var frmtPobj = function(a,b){
      return {name: makeRGB(a), count: b};
    }
  
  
    // RGBaster Object
    // ---------------
    //
    var PALETTESIZE = 10;
  
    var RGBaster = {};
  
    RGBaster.colors = function(img, opts){
  
      opts = opts || {};
      var exclude = opts.exclude || [ ], // for example, to exclude white and black:  [ '0,0,0', '255,255,255' ]
          paletteSize = opts.paletteSize || PALETTESIZE;
  
      getImageData(img, function(data){
  
                var colorCounts   = {},
                    rgbString     = '',
                    rgb           = [],
                    colors        = {
                      dominant: { name: '', count: 0 },
                      palette:  []
                    };
  
                var i = 0;
                for (; i < data.length; i += 4) {
                  rgb[0] = data[i];
                  rgb[1] = data[i+1];
                  rgb[2] = data[i+2];
                  rgbString = rgb.join(",");
  
                  // skip undefined data and transparent pixels
                  if (rgb.indexOf(undefined) !== -1  || data[i + 3] === 0) {
                    continue;
                  }
  
                  // Ignore those colors in the exclude list.
                  if ( exclude.indexOf( makeRGB(rgbString) ) === -1 ) {
                    if ( rgbString in colorCounts ) {
                      colorCounts[rgbString] = colorCounts[rgbString] + 1;
                    }
                    else{
                      colorCounts[rgbString] = 1;
                    }
                  }
  
                }
  
                if ( opts.success ) {
                  var palette = fitPalette( mapPalette(colorCounts), paletteSize+1 );
                  opts.success({
                    dominant: palette[0].name,
                    secondary: palette[1].name,
                    palette:  palette.map(function(c){ return c.name; }).slice(1)
                  });
                }
      });
    };
export default RGBaster;