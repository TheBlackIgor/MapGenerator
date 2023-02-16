"use strict";
exports.__esModule = true;
var MapBlock_js_1 = require("./MapBlock.js");
var DrawerBlock_js_1 = require("./DrawerBlock.js");
var Palete = /** @class */ (function () {
    function Palete(func, images) {
        if (images === void 0) { images = []; }
        var _this = this;
        this.blocks = [];
        this.getItems = function () { return _this.blocks; };
        if (images.length === 0) {
            var columns = 20;
            var rows = 32;
            for (var i = 0; i < columns * rows; i++) {
                var block = new MapBlock_js_1["default"](func, String(i));
                this.blocks.push(block);
            }
        }
        else {
            var columns = 20;
            var rows = 32;
            for (var i = 0; i < columns * rows; i++) {
                var block = new DrawerBlock_js_1["default"](func, images[i], String(i));
                this.blocks.push(block);
            }
        }
    }
    return Palete;
}());
exports["default"] = Palete;
