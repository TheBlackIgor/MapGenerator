"use strict";
exports.__esModule = true;
var MapBlock_js_1 = require("./MapBlock.js");
var MapPalete = /** @class */ (function () {
    function MapPalete(func) {
        var _this = this;
        this.blocks = [];
        this.overritePalete = function (array) {
            for (var i = 0; i < _this.blocks.length; i++) {
                _this.blocks[i].setContent(array[i]);
            }
        };
        var columns = 20;
        var rows = 32;
        for (var i = 0; i < columns * rows; i++) {
            var block = new MapBlock_js_1["default"](func, String(i), i % rows, Number(parseInt((i / rows).toFixed(2))));
            this.blocks.push(block);
        }
    }
    return MapPalete;
}());
exports["default"] = MapPalete;
