import Palete from "./Palets";

export default class Cursor {
  pickedBlock: HTMLDivElement;
  drawerItems: HTMLDivElement[];
  mapItems: HTMLDivElement[];
  filledPalete: Palete;
  emptyPalete: Palete;

  constructor(images: string[]) {
    this.filledPalete = new Palete(this.pickBlock, images);
    this.emptyPalete = new Palete(() => {});
  }

  pickBlock = (block: HTMLDivElement) => {
    this.pickedBlock = block;
    console.log(block);
  };
}
