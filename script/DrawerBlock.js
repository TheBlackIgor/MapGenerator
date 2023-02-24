"use strict";
exports.__esModule = true;
var items = document.getElementById("items");
var DrawerBlock = /** @class */ (function () {
    function DrawerBlock(func, content, id) {
        var _this = this;
        this.parseImage = function (x) {
            return "url(\"".concat(x, "\")");
        };
        this.setImage = function (x) {
            _this.block.style.backgroundImage = "url(\"".concat(x, "\")");
        };
        this.id = "drawer" + id;
        this.block = document.createElement("div");
        this.block.classList.add("block");
        this.block.setAttribute("id", this.id);
        this.setImage(content);
        if (items)
            items.appendChild(this.block);
        this.block.onclick = function () { return func(_this.block); };
    }
    return DrawerBlock;
}());
exports["default"] = DrawerBlock;
