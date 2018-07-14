/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 1] too
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 * 
 * credit: https://gist.github.com/mjackson/5311256
 * 
 */
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return [r, g, b];
}

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 1] and
 * returns h, s, and l in the set [0, 1]
 *
 * @param   {number}  r       The red color value
 * @param   {number}  g       The green color value
 * @param   {number}  b       The blue color value
 * @return  {Array}           The HSL representation
 * 
 * credit: https://gist.github.com/mjackson/5311256
 * 
 */
function rgbToHsl(r, g, b){
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

/**
 * Converts an HWB color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * All values (input and output) are in the [0, 1] range
 *
 * @param   {number}  h       The hue
 * @param   {number}  wh      The whiteness value
 * @param   {number}  bl      The blackness value
 * @return  {Array}           The R, G, B representation
 * 
 * credit: https://gist.github.com/mjackson/5311256
 * 
 */
function hwbToRgb(h, wh, bl) {
 var ratio = wh + bl;
 var i;
 var v;
 var f;
 var n;

 // wh + bl cant be > 1
 if (ratio > 1) {
  wh /= ratio;
  bl /= ratio;
 }

 i = Math.floor(6 * h);
 v = 1 - bl;
 f = 6 * h - i;

 if ((i & 0x01) !== 0) {
  f = 1 - f;
 }

 n = wh + f * (v - wh); // linear interpolation

 var r;
 var g;
 var b;
 switch (i) {
  default:
  case 6:
  case 0: r = v; g = n; b = wh; break;
  case 1: r = n; g = v; b = wh; break;
  case 2: r = wh; g = v; b = n; break;
  case 3: r = wh; g = n; b = v; break;
  case 4: r = n; g = wh; b = v; break;
  case 5: r = v; g = wh; b = n; break;
 }

 return [r, g, b];
};

/**
 * Converts an RGB color value to HWB
 * Assumes r, g, and b are contained in the set [0, 1] and
 * returns h is in the set [0, 1[  and w, b are in the set [0, 1]
 *
 * @param   {number}  r       The red color value
 * @param   {number}  g       The green color value
 * @param   {number}  b       The blue color value
 * @return  {Array}           The HWB representation
 * 
 * credit: http://alvyray.com/Papers/CG/hwb2rgb.htm
 * 
 */
function rgbToHwb(r, g, b) {
    var i, wh, bl, v;
    wh = Math.min(r, g, b);
    v = Math.max(r, g, b);
    bl = 1 - v;
    if (v == wh)
     return [0, wh, bl];
    f = (r == wh) ? g - b : ((g == wh) ? b - r : r - g);
    i = (r == wh) ? 3 : ((g == wh) ? 5 : 1);
    i = i - f / (v - wh);
    if (i==6)
     i = 0;
    return [i/6, wh, bl];
}