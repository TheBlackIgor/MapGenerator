"use strict";
exports.__esModule = true;
var map = document.getElementById("map");
var body = document.querySelector("body");
var Selector = /** @class */ (function () {
    function Selector(select, tempSelect) {
        var _this = this;
        this.mouseDown = false;
        window.addEventListener("scroll", function (e) {
            console.log(body.scrollTop);
            _this.selector.style.height =
                _this.selector.style.height + window.pageYOffset + "px";
        });
        map.onmousedown = function (e) {
            _this.startWithOffset = false;
            if (e.button !== 0)
                return;
            if (_this.selector)
                map.removeChild(_this.selector);
            _this.mouseDown = true;
            _this.startPosX = e.clientX;
            _this.startPosY = e.clientY;
            _this.selector = document.createElement("div");
            _this.selector.classList.add("selector");
            map.appendChild(_this.selector);
            if (window.pageYOffset > 0)
                _this.startWithOffset = true;
            else
                _this.startWithOffset = false;
        };
        map.onmousemove = function (e) {
            if (!_this.mouseDown)
                return;
            var width = 0;
            var height = 0;
            var startPosX = 0;
            var startPosY = 0;
            if (_this.startPosX > e.clientX) {
                width = _this.startPosX - e.clientX;
                startPosX = e.clientX;
            }
            else {
                width = e.clientX - _this.startPosX;
                startPosX = _this.startPosX;
            }
            if (_this.startPosY > e.clientY) {
                height = _this.startPosY - e.clientY;
                startPosY = e.clientY;
            }
            else {
                height = e.clientY - _this.startPosY;
                startPosY = _this.startPosY;
            }
            _this.selector.style.left = startPosX + "px";
            if (_this.startWithOffset)
                _this.selector.style.top = startPosY + window.pageYOffset + "px";
            else
                _this.selector.style.top = startPosY + "px";
            _this.selector.style.width = width + "px";
            if (_this.startWithOffset)
                _this.selector.style.height = height + "px";
            else
                _this.selector.style.height = height + window.pageYOffset + "px";
            tempSelect(_this.selector);
        };
        map.onmouseup = function (e) {
            if (e.button !== 0)
                return;
            _this.mouseDown = false;
            select(_this.selector);
            map.removeChild(_this.selector);
            _this.selector = null;
        };
    }
    return Selector;
}());
exports["default"] = Selector;
