"use strict";
exports.__esModule = true;
var DrawerBlock_js_1 = require("./DrawerBlock.js");
var DrawerPalete = /** @class */ (function () {
    function DrawerPalete(func, images) {
        var _this = this;
        this.blocks = [];
        this.getItems = function () { return _this.blocks; };
        var columns = 20;
        var rows = 32;
        for (var i = 0; i < columns * rows; i++) {
            var block = new DrawerBlock_js_1["default"](func, images[i], String(i));
            this.blocks.push(block);
        }
    }
    return DrawerPalete;
}());
exports["default"] = DrawerPalete;
