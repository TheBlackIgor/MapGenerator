"use strict";
exports.__esModule = true;
var Cursor_js_1 = require("./Cursor.js");
var init = function () {
    var images = [];
    var spriteSheet = new Image();
    spriteSheet.src = "../sprites.png";
    spriteSheet.onload = function () {
        var columns = 32;
        var rows = 20;
        var spriteWidth = spriteSheet.width / columns;
        var spriteHeight = spriteSheet.height / rows;
        for (var r = 0; r < rows; r++) {
            for (var c = 0; c < columns; c++) {
                var canvas = document.createElement("canvas");
                canvas.width = spriteWidth;
                canvas.height = spriteHeight;
                var ctx = canvas.getContext("2d");
                if (ctx) {
                    ctx.clearRect(0, 0, spriteWidth, spriteHeight);
                    ctx.drawImage(spriteSheet, c * spriteWidth, r * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
                    var sprite = new Image();
                    sprite.src = canvas.toDataURL();
                    if (sprite.src)
                        images.push(sprite.src);
                }
            }
        }
        main(images);
    };
};
window.onload = function () {
    init();
};
var main = function (images) {
    new Cursor_js_1["default"](images);
};
