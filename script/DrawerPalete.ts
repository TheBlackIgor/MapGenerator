import DrawerBlock from "./DrawerBlock.js";

interface BlockI {
  block: HTMLDivElement;
  content: string;
  id: string;
  index: number;
}
export default class DrawerPalete {
  blocks: BlockI[] = [];
  constructor(func: (block: DrawerBlock) => void, images: string[]) {
    const columns = 20;
    const rows = 32;
    for (let i = 0; i < columns * rows; i++) {
      const block = new DrawerBlock(func, images[i], String(i));
      this.blocks.push(block);
    }
  }

  getItems = () => this.blocks;
}
