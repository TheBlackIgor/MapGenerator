"use strict";
exports.__esModule = true;
var Contextmenu = /** @class */ (function () {
    function Contextmenu(click, undo, reundo, copy, cut, paste, save, load) {
        var _this = this;
        this.parent = document.getElementById("contextmenu");
        this.show = function (posX, posY) {
            _this.parent.style.display = "flex";
            _this.parent.style.left = posX + "px";
            if (posY > 600)
                _this.parent.style.top = posY - _this.parent.clientHeight + "px";
            else
                _this.parent.style.top = posY + "px";
        };
        this.hide = function () { return (_this.parent.style.display = "none"); };
        this.undoBtn = document.createElement("div");
        this.undoBtn.innerHTML = "Undo";
        this.undoBtn.onclick = function () { return undo(); };
        this.reundoBtn = document.createElement("div");
        this.reundoBtn.innerHTML = "Reundo";
        this.reundoBtn.onclick = function () { return reundo(); };
        this.copyBtn = document.createElement("div");
        this.copyBtn.innerHTML = "Copy";
        this.copyBtn.onclick = function () { return copy(); };
        this.cutBtn = document.createElement("div");
        this.cutBtn.innerHTML = "Cut";
        this.cutBtn.onclick = function () { return cut(); };
        this.pasteBtn = document.createElement("div");
        this.pasteBtn.innerHTML = "Paste";
        this.pasteBtn.onclick = function () { return paste(); };
        this.saveBtn = document.createElement("div");
        this.saveBtn.innerHTML = "Save";
        this.saveBtn.onclick = function () { return save(); };
        this.loadBtn = document.createElement("div");
        this.loadBtn.innerHTML = "Load";
        this.loadBtn.onclick = function () { return load(); };
        this.parent.appendChild(this.undoBtn);
        this.parent.appendChild(this.reundoBtn);
        this.parent.appendChild(this.copyBtn);
        this.parent.appendChild(this.cutBtn);
        this.parent.appendChild(this.pasteBtn);
        this.parent.appendChild(this.saveBtn);
        this.parent.appendChild(this.loadBtn);
    }
    return Contextmenu;
}());
exports["default"] = Contextmenu;
