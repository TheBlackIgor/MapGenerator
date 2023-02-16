import MapBlock from "./MapBlock.js";
import DrawerBlock from "./DrawerBlock.js";

export default class Palete {
  blocks = [];
  constructor(func, images: string[] = []) {
    if (images.length === 0) {
      const columns = 20;
      const rows = 32;
      for (let i = 0; i < columns * rows; i++) {
        const block = new MapBlock(func, String(i));
        this.blocks.push(block);
      }
    } else {
      const columns = 20;
      const rows = 32;
      for (let i = 0; i < columns * rows; i++) {
        const block = new DrawerBlock(func, images[i], String(i));
        this.blocks.push(block);
      }
    }
  }

  getItems = () => this.blocks;
}
