"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var Contextmenu_1 = require("./Contextmenu");
var DrawerPalete_1 = require("./DrawerPalete");
var MapPalete_1 = require("./MapPalete");
var Selector_1 = require("./Selector");
var checkbox = document.getElementById("selectNext");
var _ = require("lodash");
document.getElementById("input");
var Cursor = /** @class */ (function () {
    function Cursor(images) {
        var _this = this;
        this.selectedBlocks = [];
        this.next = false;
        this.keyDown = false;
        this.helperBlocksArray = [];
        this.changeState = 0;
        this.history = [];
        this.copiedBlocks = [];
        this.pasting = false;
        this.pasteX = -1;
        this.pasteY = -1;
        this.pickBlock = function (block) {
            if (_this.selectedBlocks.length === 0)
                return;
            if (_this.history.length > _this.changeState - 1) {
                _this.history = _this.history.slice(0, _this.changeState + 1);
            }
            _this.changeState++;
            var changeContent = function () {
                return _this.selectedBlocks.forEach(function (item) { return item.setContent(block.content); });
            };
            if (!_this.next) {
                changeContent();
                _this.unSelect();
                _this.selectedBlocks = [];
            }
            else if (_this.next) {
                changeContent();
                _this.unSelect();
                var tempBlock = _this.mapPalete.blocks
                    .map(function (block) { return block; })
                    .find(function (block) {
                    return block.index ===
                        _this.selectedBlocks[_this.selectedBlocks.length - 1].index + 1;
                });
                _this.selectedBlocks = [];
                _this.selectedBlocks.push(tempBlock);
                _this.selectedBlocks[0].select();
            }
            _this.history.push(_this.getHistoryImages());
        };
        this.mapBlockClick = function (block) {
            if (!_this.pasting) {
                if (_this.selectedBlocks.length > 0)
                    _this.unSelect();
                if (!(_this.keyDown && (_this.keyId === "Control" || _this.keyId === "Meta")))
                    _this.selectedBlocks = [];
                var tempBlocks = _this.selectedBlocks.filter(function (b) { return b.index !== block.index; });
                if (tempBlocks.length === _this.selectedBlocks.length)
                    _this.selectedBlocks.push(block);
                else
                    _this.selectedBlocks = __spreadArray([], tempBlocks, true);
                _this.selectedBlocks.forEach(function (block) { return block.select(); });
            }
            else {
                _this.selectedBlocks = [];
                _this.unSelect();
                _this.pasting = false;
                _this.mapPalete.paste(_this.copiedBlocks, _this.pasteX, _this.pasteY);
                if (_this.history.length > _this.changeState - 1) {
                    _this.history = _this.history.slice(0, _this.changeState + 1);
                }
                _this.changeState++;
                _this.history.push(_this.getHistoryImages());
            }
        };
        this.selectorEffect = function (selector) {
            var tempBlockArray = _this.mapPalete.blocks
                .map(function (block) { return block; })
                .filter(function (block) { return _this.elementsOverlap(block.block, selector); });
            _this.helperBlocksArray.filter(function (block) { return !tempBlockArray.includes(block); });
            _this.helperBlocksArray.forEach(function (block) { return block.unSelect(); });
            __spreadArray([], tempBlockArray, true).forEach(function (block) { return block.select(); });
            _this.helperBlocksArray = __spreadArray([], tempBlockArray, true);
        };
        this.setSelector = function (selector) {
            _this.helperBlocksArray = [];
            if (_this.selectedBlocks.length > 0)
                _this.unSelect();
            if (!(_this.keyDown && (_this.keyId === "Control" || _this.keyId === "Meta")))
                _this.selectedBlocks = [];
            var tempBlockArray = _this.mapPalete.blocks
                .map(function (block) { return block; })
                .filter(function (block) { return _this.elementsOverlap(block.block, selector); });
            __spreadArray([], tempBlockArray, true).forEach(function (block) { return _this.selectedBlocks.push(block); });
            _this.selectedBlocks.forEach(function (block) { return block.select(); });
        };
        this.useContenxtmenu = function (x, y) { };
        this.undo = function () {
            if (_this.changeState === 0)
                return;
            _this.changeState -= 1;
            _this.mapPalete.overritePalete(_this.history[_this.changeState]);
        };
        this.reundo = function () {
            if (_this.changeState === _this.history.length - 1)
                return;
            _this.changeState += 1;
            _this.mapPalete.overritePalete(_this.history[_this.changeState]);
        };
        this.copy = function () {
            var width = _this.selectedBlocks[0].x;
            var height = _this.selectedBlocks[0].y;
            _this.copiedBlocks = _this.selectedBlocks.map(function (block) {
                return {
                    x: block.x - width,
                    y: block.y - height,
                    content: block.content
                };
            });
        };
        this.cut = function () {
            _this.copy();
            _this.selectedBlocks.forEach(function (block) { return block.setContent(""); });
            _this.changeState++;
            _this.history.push(_this.getHistoryImages());
            _this.unSelect();
            if (_this.history.length > _this.changeState - 1) {
                _this.history = _this.history.slice(0, _this.changeState + 1);
            }
            _this.changeState++;
            _this.history.push(_this.getHistoryImages());
        };
        this.paste = function () {
            if (_this.copiedBlocks.length === 0)
                return;
            _this.pasting = true;
            if (_this.history.length > _this.changeState - 1) {
                _this.history = _this.history.slice(0, _this.changeState + 1);
            }
            _this.changeState++;
            _this.history.push(_this.getHistoryImages());
        };
        this.getFirstElementToPaste = function (x, y) {
            if (!_this.pasting)
                return;
            if (x !== _this.pasteX || _this.pasteY !== y) {
                _this.pasteX = x;
                _this.pasteY = y;
                _this.mapPalete.overritePalete(_this.history[_this.history.length - 1]);
                _this.mapPalete.tempOverrite(_this.copiedBlocks, x, y);
            }
        };
        this.getHistoryImages = function () {
            return _this.mapPalete.blocks.map(function (block) {
                return block.content === undefined ? "" : block.content;
            });
        };
        this.unSelect = function () {
            _this.selectedBlocks.forEach(function (block) { return block.unSelect(); });
        };
        this["delete"] = function () {
            _this.selectedBlocks.forEach(function (block) { return block.setContent(""); });
            _this.unSelect();
            _this.selectedBlocks = [];
            if (_this.history.length > _this.changeState - 1) {
                _this.history = _this.history.slice(0, _this.changeState + 1);
            }
            _this.changeState++;
            _this.history.push(_this.getHistoryImages());
        };
        this.save = function () {
            var data = _this.mapPalete.blocks.map(function (block) { return block.content; });
            var dataToSave = JSON.stringify(data);
            var type = "application/json";
            var filename = "map.json";
            _this.saveFile(dataToSave, filename, type);
        };
        this.saveFile = function (data, filename, type) {
            var blob = new Blob([data], { type: type });
            var url = URL.createObjectURL(blob);
            var link = document.createElement("a");
            link.innerText = "save";
            link.href = url;
            link.download = filename;
            document.querySelector("body").appendChild(link);
            link.click();
            setTimeout(function () {
                URL.revokeObjectURL(url);
            }, 0);
            document.querySelector("body").removeChild(link);
        };
        this.load = function () {
            var fileInput = document.querySelector("#input");
            fileInput.click();
            fileInput.onchange = function (e) {
                var file = fileInput.files[0];
                if (!file) {
                    console.error("No file selected");
                    return;
                }
                var reader = new FileReader();
                reader.onerror = function (event) {
                    console.error("File could not be read! Code " + event.target.error.code);
                };
                reader.onload = function () {
                    var jsonData = JSON.parse(String(reader.result));
                    _this.mapPalete.overritePalete(jsonData);
                };
                reader.readAsText(file);
            };
        };
        this.filledPalete = new DrawerPalete_1["default"](this.pickBlock, images);
        this.mapPalete = new MapPalete_1["default"](this.mapBlockClick, this.getFirstElementToPaste);
        this.mapBlocks = this.mapPalete.blocks;
        checkbox.onclick = function () { return (_this.next = !_this.next); };
        this.selector = new Selector_1["default"](this.setSelector, this.selectorEffect);
        document.addEventListener("keydown", function (e) {
            _this.keyDown = true;
            console.log(e.key);
            _this.keyId = e.key;
            if ((e.ctrlKey || e.metaKey) &&
                (_this.keyId === "c" || _this.keyId === "C")) {
                _this.copy();
            }
            else if ((e.ctrlKey || e.metaKey) &&
                (_this.keyId === "x" || _this.keyId === "X")) {
                _this.cut();
            }
            else if ((e.ctrlKey || e.metaKey) &&
                (_this.keyId === "v" || _this.keyId === "V")) {
                _this.paste();
            }
            else if ((e.ctrlKey || e.metaKey) &&
                (_this.keyId === "z" || _this.keyId === "Z")) {
                _this.undo();
            }
            else if ((e.ctrlKey || e.metaKey) &&
                (_this.keyId === "y" || _this.keyId === "Y")) {
                _this.reundo();
            }
            else if (_this.keyId === "Backspace") {
                _this["delete"]();
            }
            else if ((e.ctrlKey || e.metaKey) &&
                (_this.keyId === "s" || _this.keyId === "S")) {
                e.preventDefault();
                _this.save();
            }
            else if ((e.ctrlKey || e.metaKey) &&
                (_this.keyId === "l" || _this.keyId === "L")) {
                e.preventDefault();
                _this.load();
            }
        });
        this.contextmenu = new Contextmenu_1["default"](this.useContenxtmenu, this.undo, this.reundo, this.copy, this.cut, this.paste, this.save, this.load);
        document.addEventListener("keyup", function () { return (_this.keyDown = false); });
        document.querySelector("body").onclick = function () {
            _this.contextmenu.hide();
        };
        document.oncontextmenu = function (e) {
            e.preventDefault();
            _this.contextmenu.show(e.clientX, e.clientY);
        };
        this.history.push(this.getHistoryImages());
    }
    Cursor.prototype.elementsOverlap = function (el1, el2) {
        var domRect1 = el1.getBoundingClientRect();
        var domRect2 = el2.getBoundingClientRect();
        return !(domRect1.top > domRect2.bottom ||
            domRect1.right < domRect2.left ||
            domRect1.bottom < domRect2.top ||
            domRect1.left > domRect2.right);
    };
    return Cursor;
}());
exports["default"] = Cursor;
