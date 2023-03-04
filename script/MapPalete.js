"use strict";
exports.__esModule = true;
var MapBlock_js_1 = require("./MapBlock.js");
var MapPalete = /** @class */ (function () {
    function MapPalete(func, getFirstElementToPaste) {
        var _this = this;
        this.blocks = [];
        this.rows = 40;
        this.columns = 32;
        this.overritePalete = function (array) {
            for (var i = 0; i < _this.blocks.length; i++) {
                _this.blocks[i].setContent(array[i] === null ? "" : array[i]);
                _this.blocks[i].setBorder(null);
            }
        };
        this.tempOverrite = function (array, mouseX, mouseY) {
            array.forEach(function (item) {
                var correstpondingBlock = _this.blocks.find(function (_a) {
                    var x = _a.x, y = _a.y;
                    return item.x + mouseX == x && item.y + mouseY === y;
                });
                if (correstpondingBlock !== undefined) {
                    correstpondingBlock.setImage(item.content);
                    correstpondingBlock.setBorder("green");
                }
            });
        };
        this.paste = function (array, mouseX, mouseY) {
            // let i = 0;
            // this.blocks.forEach((block) => {
            //   if (i !== array.length)
            //     if (block.x === array[i].x + x && block.y === array[i].y + y) {
            //       block.setContent(array[i].content);
            //       block.setBorder(null);
            //       i++;
            //     }
            // });
            array.forEach(function (item) {
                var correstpondingBlock = _this.blocks.find(function (_a) {
                    var x = _a.x, y = _a.y;
                    return item.x + mouseX == x && item.y + mouseY === y;
                });
                if (correstpondingBlock !== undefined) {
                    correstpondingBlock.setContent(item.content);
                    correstpondingBlock.setBorder(null);
                }
            });
        };
        for (var i = 0; i < this.rows * this.columns; i++) {
            var block = new MapBlock_js_1["default"](func, getFirstElementToPaste, String(i), i % this.columns, Number(parseInt((i / this.columns).toFixed(2))));
            this.blocks.push(block);
        }
    }
    return MapPalete;
}());
exports["default"] = MapPalete;
