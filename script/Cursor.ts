import Contextmenu from "./Contextmenu";
import DrawerBlock from "./DrawerBlock";
import DrawerPalete from "./DrawerPalete";
import MapBlock from "./MapBlock";
import MapPalete from "./MapPalete";
import Selector from "./Selector";
const checkbox = document.getElementById("selectNext");
import { BlockI } from "./types.js";
var _ = require("lodash");

export default class Cursor {
  pickedBlock: DrawerBlock;
  selectedBlocks: MapBlock[] = [];
  filledPalete: DrawerPalete;
  mapPalete: MapPalete;
  next: boolean = false;
  selector: Selector;
  mapBlocks: BlockI[];
  keyId: string;
  keyDown: boolean = false;
  helperBlocksArray: MapBlock[] = [];
  contextmenu: Contextmenu;
  changeState: number = 0;
  history: MapBlock[][] = [];

  constructor(images: string[]) {
    this.filledPalete = new DrawerPalete(this.pickBlock, images);
    this.mapPalete = new MapPalete(this.mapBlockClick);
    this.mapBlocks = this.mapPalete.blocks;
    checkbox.onclick = () => (this.next = !this.next);

    this.selector = new Selector(this.setSelector, this.selectorEffect);
    document.addEventListener("keydown", (e) => {
      this.keyDown = true;
      this.keyId = e.key;
    });
    this.contextmenu = new Contextmenu(
      this.useContenxtmenu,
      this.undo,
      this.reundo,
      this.copy,
      this.cut,
      this.paste
    );

    document.addEventListener("keyup", () => (this.keyDown = false));
    document.querySelector("body").onclick = () => {
      this.contextmenu.hide();
    };
    document.oncontextmenu = (e) => {
      e.preventDefault();
      this.contextmenu.show(e.clientX, e.clientY);
    };
  }

  pickBlock = (block: DrawerBlock) => {
    if (this.history.length > this.changeState)
      this.history.slice(this.changeState);
    this.changeState++;
    const copyOfPreviousPalete = [...this.mapPalete.blocks].map((item) =>
      _.cloneDeep(item)
    );
    this.history.push(copyOfPreviousPalete);
    const changeContent = () =>
      this.selectedBlocks.forEach((item) => item.setContent(block.content));
    if (!this.next) {
      changeContent();
      this.selectedBlocks.forEach((block) => block.unSelect());
      this.selectedBlocks = [];
    } else if (this.next) {
      changeContent();
      this.selectedBlocks.forEach((block) => block.unSelect());
      const tempBlock = this.mapPalete.blocks
        .map((block) => block)
        .find(
          (block) =>
            block.index ===
            this.selectedBlocks[this.selectedBlocks.length - 1].index + 1
        );
      this.selectedBlocks = [];
      this.selectedBlocks.push(tempBlock);
      this.selectedBlocks[0].select();
    }
  };

  mapBlockClick = (block: MapBlock) => {
    if (this.selectedBlocks.length > 0)
      this.selectedBlocks.forEach((block) => block.unSelect());
    if (!(this.keyDown && this.keyId === "Control")) this.selectedBlocks = [];
    this.selectedBlocks.push(block);
    this.selectedBlocks.forEach((block) => block.select());
  };

  selectorEffect = (selector: HTMLDivElement) => {
    const tempBlockArray = this.mapPalete.blocks
      .map((block) => block)
      .filter((block) => this.elementsOverlap(block.block, selector));
    this.helperBlocksArray.filter((block) => !tempBlockArray.includes(block));
    this.helperBlocksArray.forEach((block) => block.unSelect());
    [...tempBlockArray].forEach((block) => block.select());
    this.helperBlocksArray = [...tempBlockArray];
  };

  setSelector = (selector: HTMLDivElement) => {
    this.helperBlocksArray = [];
    if (this.selectedBlocks.length > 0)
      this.selectedBlocks.forEach((block) => block.unSelect());
    if (!(this.keyDown && this.keyId === "Control")) this.selectedBlocks = [];
    const tempBlockArray = this.mapPalete.blocks
      .map((block) => block)
      .filter((block) => this.elementsOverlap(block.block, selector));
    [...tempBlockArray].forEach((block) => this.selectedBlocks.push(block));
    this.selectedBlocks.forEach((block) => block.select());
  };

  elementsOverlap(el1: HTMLDivElement, el2: HTMLDivElement) {
    const domRect1 = el1.getBoundingClientRect();
    const domRect2 = el2.getBoundingClientRect();

    return !(
      domRect1.top > domRect2.bottom ||
      domRect1.right < domRect2.left ||
      domRect1.bottom < domRect2.top ||
      domRect1.left > domRect2.right
    );
  }

  useContenxtmenu = (x: number, y: number) => {};

  undo = () => {
    if (this.changeState === 0) return;
    this.changeState--;
    this.mapPalete.undo(this.history[this.changeState]);
    this.history.forEach((ar) => console.log(ar[639].block));
  };
  reundo = () => {};
  copy = () => {};
  cut = () => {};
  paste = () => {};
}
