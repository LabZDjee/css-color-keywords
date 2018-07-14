function compareArrays(arr1, arr2) {
  var i;
  for (i = 0; i < arr1.length; i++) {
    if (arr1[i] < arr2[i]) return -1;
    if (arr1[i] > arr2[i]) return 1;
  }
  return 0;
}

new Vue({
  el: "#rgbHslTable",
  data: {
    colorArray: [],
    sortByName: false,
    sortByClassLevel: false,
    sortRgbKeyIndex: -1,
    sortRgbKeys: ["r>g>b", "g>b>r", "b>r>g", "r>b>g", "b>g>r", "g>r>b"],
    sortHslKeyIndex: -1,
    sortHslKeys: ["h>s>l", "s>l>h", "l>h>s", "h>l>s", "l>s>h", "s>h>l"],
    sortHwbKeyIndex: -1,
    sortHwbKeys: ["h>w>b", "w>b>h", "b>h>w", "h>b>w", "b>w>h", "w>h>b"]
  },
  methods: {
    rgbAsStr: function(rgb) {
      return rgb.r + ", " + rgb.g + ", " + rgb.b;
    },
    hslAsStr: function(hsl) {
      return hsl.h + ", " + hsl.s + "%, " + hsl.l + "%";
    },
    hwbAsStr: function(hwb) {
      return hwb.h + ", " + hwb.w + "%, " + hwb.b + "%";
    },
    sortRgb: function() {
      var key;
      this.sortByName = false;
      this.sortByClassLevel = false;
      this.sortHwbKeyIndex = -1;
      this.sortHslKeyIndex = -1;
      this.sortRgbKeyIndex =
        (this.sortRgbKeyIndex + 1) % this.sortRgbKeys.length;
      key = this.sortRgbKeys[this.sortRgbKeyIndex];
      function compare(col1, col2) {
        return compareArrays(
          [
            col1.rgb[key.slice(0, 1)],
            col1.rgb[key.slice(2, 3)],
            col1.rgb[key.slice(4, 5)]
          ],
          [
            col2.rgb[key.slice(0, 1)],
            col2.rgb[key.slice(2, 3)],
            col2.rgb[key.slice(4, 5)]
          ]
        );
      }
      this.colorArray.sort(compare);
    },
    sortHsl: function() {
      var key;
      this.sortByName = false;
      this.sortByClassLevel = false;
      this.sortRgbKeyIndex = -1;
      this.sortHwbKeyIndex = -1;
      this.sortHslKeyIndex =
        (this.sortHslKeyIndex + 1) % this.sortHslKeys.length;
      key = this.sortHslKeys[this.sortHslKeyIndex];
      function compare(col1, col2) {
        return compareArrays(
          [
            col1.hsl[key.slice(0, 1)],
            col1.hsl[key.slice(2, 3)],
            col1.hsl[key.slice(4, 5)]
          ],
          [
            col2.hsl[key.slice(0, 1)],
            col2.hsl[key.slice(2, 3)],
            col2.hsl[key.slice(4, 5)]
          ]
        );
      }
      this.colorArray.sort(compare);
    },
    sortHwb: function() {
      var key;
      this.sortByName = false;
      this.sortByClassLevel = false;
      this.sortRgbKeyIndex = -1;
      this.sortHslKeyIndex = -1;
      this.sortHwbKeyIndex =
        (this.sortHwbKeyIndex + 1) % this.sortHwbKeys.length;
      key = this.sortHwbKeys[this.sortHwbKeyIndex];
      function compare(col1, col2) {
        return compareArrays(
          [
            col1.hwb[key.slice(0, 1)],
            col1.hwb[key.slice(2, 3)],
            col1.hwb[key.slice(4, 5)]
          ],
          [
            col2.hwb[key.slice(0, 1)],
            col2.hwb[key.slice(2, 3)],
            col2.hwb[key.slice(4, 5)]
          ]
        );
      }
      this.colorArray.sort(compare);
    },
    sortName() {
      this.sortByName = true;
      this.sortByClassLevel = false;
      this.sortHslKeyIndex = -1;
      this.sortRgbKeyIndex = -1;
      this.sortHwbKeyIndex = -1;
      function compare(col1, col2) {
        return compareArrays([col1.name], [col2.name]);
      }
      this.colorArray.sort(compare);
    },
    sortCssLevel() {
      this.sortByName = false;
      this.sortByClassLevel = true;
      this.sortHslKeyIndex = -1;
      this.sortRgbKeyIndex = -1;
      this.sortHwbKeyIndex = -1;
      function compare(col1, col2) {
        return compareArrays(
          [col1.cssLevel, col1.name],
          [col2.cssLevel, col2.name]
        );
      }
      this.colorArray.sort(compare);
    }
  },
  computed: {
    sortByRgb: function() {
      return this.sortRgbKeyIndex >= 0;
    },
    sortRgbOrderInfo: function() {
      if (!this.sortByRgb) return "";
      return " [" + this.sortRgbKeys[this.sortRgbKeyIndex] + "]";
    },
    sortByHsl: function() {
      return this.sortHslKeyIndex >= 0;
    },
    sortHlsOrderInfo: function() {
      if (!this.sortByHsl) return "";
      return " [" + this.sortHslKeys[this.sortHslKeyIndex] + "]";
    },
    sortByHwb: function() {
      return this.sortHwbKeyIndex >= 0;
    },
    sortHwbOrderInfo: function() {
      if (!this.sortByHwb) return "";
      return " [" + this.sortHwbKeys[this.sortHwbKeyIndex] + "]";
    }
  },
  created: function() {
    this.colorArray = [];
    for (i in extendedColorKeywordsAsRgb) {
      var color = extendedColorKeywordsAsRgb[i];
      var hsl = rgbToHsl(
        color.rgb.r / 255,
        color.rgb.g / 255,
        color.rgb.b / 255
      );
      color.hsl = {
        h: Math.round(hsl[0] * 360),
        s: Math.round(hsl[1] * 100),
        l: Math.round(hsl[2] * 100)
      };
      var hwb = rgbToHwb(
        color.rgb.r / 255,
        color.rgb.g / 255,
        color.rgb.b / 255
      );
      color.hwb = {
        h: Math.round(hwb[0] * 360),
        w: Math.round(hwb[1] * 100),
        b: Math.round(hwb[2] * 100)
      };
      this.colorArray.push(color);
    }
  }
});
