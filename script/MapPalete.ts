import MapBlock from "./MapBlock.js";

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
    }
  };
}
