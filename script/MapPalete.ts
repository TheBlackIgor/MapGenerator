import MapBlock from "./MapBlock.js";
import { CopyI } from "./types.js";

export default class MapPalete {
  blocks: MapBlock[] = [];
  constructor(
    func: (block: MapBlock) => void,
    getFirstElementToPaste: (x: number, y: number) => void
  ) {
    const columns = 20;
    const rows = 32;
    for (let i = 0; i < columns * rows; i++) {
      const block = new MapBlock(
        func,
        getFirstElementToPaste,
        String(i),
        i % rows,
        Number(parseInt((i / rows).toFixed(2)))
      );
      this.blocks.push(block);
    }
  }
  overritePalete = (array: string[]) => {
    for (let i = 0; i < this.blocks.length; i++) {
      this.blocks[i].setContent(array[i]);
      this.blocks[i].setBorder(null);
    }
  };

  tempOverrite = (array: CopyI[], x: number, y: number) => {
    let i = 0;
    this.blocks.forEach((block) => {
      if (i !== array.length)
        if (block.x === array[i].x + x && block.y === array[i].y + y) {
          block.setImage(array[i].content);
          block.setBorder("green");
          i++;
        }
    });
  };

  paste = (array: CopyI[], x: number, y: number) => {
    let i = 0;
    this.blocks.forEach((block) => {
      if (i !== array.length)
        if (block.x === array[i].x + x && block.y === array[i].y + y) {
          block.setContent(array[i].content);
          block.setBorder(null);
          i++;
        }
    });
  };
}
