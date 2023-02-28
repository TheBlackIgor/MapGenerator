"use strict";
exports.__esModule = true;
var MapBlock_js_1 = require("./MapBlock.js");
var MapPalete = /** @class */ (function () {
    function MapPalete(func, getFirstElementToPaste) {
        var _this = this;
        this.blocks = [];
        this.overritePalete = function (array) {
            for (var i = 0; i < _this.blocks.length; i++) {
                _this.blocks[i].setContent(array[i]);
                _this.blocks[i].setBorder(null);
            }
        };
        this.tempOverrite = function (array, x, y) {
            var i = 0;
            _this.blocks.forEach(function (block) {
                if (i !== array.length)
                    if (block.x === array[i].x + x && block.y === array[i].y + y) {
                        block.setImage(array[i].content);
                        block.setBorder("green");
                        i++;
                    }
            });
        };
        this.paste = function (array, x, y) {
            var i = 0;
            _this.blocks.forEach(function (block) {
                if (i !== array.length)
                    if (block.x === array[i].x + x && block.y === array[i].y + y) {
                        block.setContent(array[i].content);
                        block.setBorder(null);
                        i++;
                    }
            });
        };
        var columns = 20;
        var rows = 32;
        for (var i = 0; i < columns * rows; i++) {
            var block = new MapBlock_js_1["default"](func, getFirstElementToPaste, String(i), i % rows, Number(parseInt((i / rows).toFixed(2))));
            this.blocks.push(block);
        }
    }
    return MapPalete;
}());
exports["default"] = MapPalete;
