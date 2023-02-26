"use strict";
exports.__esModule = true;
var map = document.getElementById("map");
var MapBlock = /** @class */ (function () {
    function MapBlock(func, getFirstElementToPaste, id, x, y) {
        var _this = this;
        this.resetContent = function () {
            _this.setImage(_this.content);
        };
        this.setImage = function (x) {
            _this.block.style.backgroundImage = "url(\"".concat(x, "\")");
        };
        this.setBlock = function (newBlock) {
            _this.block = newBlock;
        };
        this.id = "map" + id;
        this.index = Number(id);
        this.block = document.createElement("div");
        this.block.classList.add("block");
        // this.block.setAttribute("id", this.id);
        this.block.setAttribute("x", String(x));
        this.block.setAttribute("y", String(y));
        this.block.setAttribute("index", id);
        if (map)
            map.appendChild(this.block);
        this.block.onclick = function () { return func(_this); };
        this.block.onmouseover = function () { return getFirstElementToPaste(x, y); };
        this.x = x;
        this.y = y;
    }
    MapBlock.prototype.setContent = function (data) {
        this.content = data;
        this.setImage(data);
    };
    MapBlock.prototype.select = function () {
        this.block.classList.add("selected");
    };
    MapBlock.prototype.unSelect = function () {
        this.block.classList.remove("selected");
    };
    return MapBlock;
}());
exports["default"] = MapBlock;
