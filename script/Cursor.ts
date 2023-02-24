import DrawerBlock from "./DrawerBlock";
import MapBlock from "./MapBlock";
import Palete from "./Palets";

export default class Cursor {
  pickedBlock: DrawerBlock;
  selectedBlock: MapBlock;
  filledPalete: Palete;
  emptyPalete: Palete;

  constructor(images: string[]) {
    this.filledPalete = new Palete(this.pickBlock, images);
    this.emptyPalete = new Palete(() => {});
  }

  pickBlock = (block: DrawerBlock) => {
    this.pickedBlock = block;
  };

  selectBlock = (block: MapBlock) => {
    this.selectedBlock = block;
  };
}
