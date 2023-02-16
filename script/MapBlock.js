"use strict";
exports.__esModule = true;
var map = document.getElementById("map");
var MapBlock = /** @class */ (function () {
    function MapBlock(func, id) {
        this.id = "map" + id;
        this.block = document.createElement("div");
        this.block.classList.add("block");
        this.block.setAttribute("id", this.id);
        if (map)
            map.appendChild(this.block);
        this.block.click = function () { return func(); };
    }
    return MapBlock;
}());
exports["default"] = MapBlock;
