"use strict";
exports.__esModule = true;
var Palets_1 = require("./Palets");
var Cursor = /** @class */ (function () {
    function Cursor(images) {
        var _this = this;
        this.pickBlock = function (block) {
            _this.pickedBlock = block;
            console.log(block);
        };
        this.filledPalete = new Palets_1["default"](this.pickBlock, images);
        this.emptyPalete = new Palets_1["default"](function () { });
    }
    return Cursor;
}());
exports["default"] = Cursor;
