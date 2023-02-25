import MapBlock from "./MapBlock.js";

export default class MapPalete {
  blocks: MapBlock[] = [];
  constructor(func: (block: MapBlock) => void) {
    const columns = 20;
    const rows = 32;
    for (let i = 0; i < columns * rows; i++) {
      const block = new MapBlock(
        func,
        String(i),
        i % rows,
        Number(parseInt((i / rows).toFixed(2)))
      );
      this.blocks.push(block);
    }
  }
  undo = (array: MapBlock[]) => {
    for (let i = 0; i < this.blocks.length; i++) {
      this.blocks[i].setBlock(array[i].block);
    }
  };
}
