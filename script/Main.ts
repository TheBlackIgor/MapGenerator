import Cursor from "./Cursor.js";
import _ from "lodash";

const init = () => {
  const images: string[] = [];
  let spriteSheet = new Image();
  spriteSheet.src = "../sprites.png";
  spriteSheet.onload = () => {
    const columns = 32;
    const rows = 20;

    const spriteWidth = spriteSheet.width / columns;
    const spriteHeight = spriteSheet.height / rows;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        let canvas = document.createElement("canvas");
        canvas.width = spriteWidth;
        canvas.height = spriteHeight;

        let ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.clearRect(0, 0, spriteWidth, spriteHeight);
          ctx.drawImage(
            spriteSheet,
            c * spriteWidth,
            r * spriteHeight,
            spriteWidth,
            spriteHeight,
            0,
            0,
            spriteWidth,
            spriteHeight
          );
          let sprite = new Image();
          sprite.src = canvas.toDataURL();
          if (sprite.src) images.push(sprite.src);
        }
      }
    }
    main(images);
  };
};

window.onload = () => {
  init();
};

const main = (images: string[]) => {
  new Cursor(images);
};
