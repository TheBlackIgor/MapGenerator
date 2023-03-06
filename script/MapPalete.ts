import MapBlock from "./MapBlock.js";
import { CopyI } from "./types.js";

export default class MapPalete {
  blocks: MapBlock[] = [];

  rows = 40;
  columns = 32;
  constructor(
    func: (block: MapBlock) => void,
    getFirstElementToPaste: (x: number, y: number) => void
  ) {
    for (let i = 0; i < this.rows * this.columns; i++) {
      const block = new MapBlock(
        func,
        getFirstElementToPaste,
        String(i),
        i % this.columns,
        Number(parseInt((i / this.columns).toFixed(2)))
      );
      this.blocks.push(block);
    }
  }
  overritePalete = (array: string[]) => {
    for (let i = 0; i < this.blocks.length; i++) {
      this.blocks[i].setContent(array[i] === null ? "" : array[i]);
      this.blocks[i].setBorder(null);
    }
  };

  tempOverrite = (array: CopyI[], mouseX: number, mouseY: number) => {
    array.forEach((item) => {
      const correstpondingBlock = this.blocks.find(
        ({ x, y }) => item.x + mouseX == x && item.y + mouseY === y
      );
      if (correstpondingBlock !== undefined) {
        correstpondingBlock.setImage(item.content);
        correstpondingBlock.setBorder("green");
      }
    });
  };

  paste = (array: CopyI[], mouseX: number, mouseY: number) => {
    array.forEach((item) => {
      const correstpondingBlock = this.blocks.find(
        ({ x, y }) => item.x + mouseX == x && item.y + mouseY === y
      );
      if (correstpondingBlock !== undefined) {
        correstpondingBlock.setContent(item.content);
        correstpondingBlock.setBorder(null);
      }
    });
  };
}
