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
var Cursor = /** @class */ (function () {
    function Cursor(images) {
        var _this = this;
        this.selectedBlocks = [];
        this.next = false;
        this.keyDown = false;
        this.helperBlocksArray = [];
        this.changeState = 0;
        this.history = [];
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
                _this.selectedBlocks.forEach(function (block) { return block.unSelect(); });
                _this.selectedBlocks = [];
            }
            else if (_this.next) {
                changeContent();
                _this.selectedBlocks.forEach(function (block) { return block.unSelect(); });
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
            if (_this.selectedBlocks.length > 0)
                _this.selectedBlocks.forEach(function (block) { return block.unSelect(); });
            if (!(_this.keyDown && _this.keyId === "Control"))
                _this.selectedBlocks = [];
            _this.selectedBlocks.push(block);
            _this.selectedBlocks.forEach(function (block) { return block.select(); });
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
                _this.selectedBlocks.forEach(function (block) { return block.unSelect(); });
            if (!(_this.keyDown && _this.keyId === "Control"))
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
        this.copy = function () { };
        this.cut = function () { };
        this.paste = function () { };
        this.getHistoryImages = function () {
            return _this.mapPalete.blocks.map(function (block) {
                return block.content === undefined ? "" : block.content;
            });
        };
        this.filledPalete = new DrawerPalete_1["default"](this.pickBlock, images);
        this.mapPalete = new MapPalete_1["default"](this.mapBlockClick);
        this.mapBlocks = this.mapPalete.blocks;
        checkbox.onclick = function () { return (_this.next = !_this.next); };
        this.selector = new Selector_1["default"](this.setSelector, this.selectorEffect);
        document.addEventListener("keydown", function (e) {
            _this.keyDown = true;
            _this.keyId = e.key;
        });
        this.contextmenu = new Contextmenu_1["default"](this.useContenxtmenu, this.undo, this.reundo, this.copy, this.cut, this.paste);
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
