import Contextmenu from "./Contextmenu";
import DrawerBlock from "./DrawerBlock";
import DrawerPalete from "./DrawerPalete";
import MapBlock from "./MapBlock";
import MapPalete from "./MapPalete";
import Selector from "./Selector";
const checkbox = document.getElementById("selectNext");
import { BlockI, CopyI } from "./types.js";
var _ = require("lodash");
document.getElementById("input");

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
  history: string[][] = [];
  copiedBlocks: CopyI[] = [];
  pasting: boolean = false;
  pasteX = -1;
  pasteY = -1;

  constructor(images: string[]) {
    this.filledPalete = new DrawerPalete(this.pickBlock, images);
    this.mapPalete = new MapPalete(
      this.mapBlockClick,
      this.getFirstElementToPaste
    );
    this.mapBlocks = this.mapPalete.blocks;
    checkbox.onclick = () => (this.next = !this.next);

    this.selector = new Selector(this.setSelector, this.selectorEffect);
    document.addEventListener("keydown", (e) => {
      this.keyDown = true;
      console.log(e.key);
      this.keyId = e.key;
      if (
        (e.ctrlKey || e.metaKey) &&
        (this.keyId === "c" || this.keyId === "C")
      ) {
        this.copy();
      } else if (
        (e.ctrlKey || e.metaKey) &&
        (this.keyId === "x" || this.keyId === "X")
      ) {
        this.cut();
      } else if (
        (e.ctrlKey || e.metaKey) &&
        (this.keyId === "v" || this.keyId === "V")
      ) {
        this.paste();
      } else if (
        (e.ctrlKey || e.metaKey) &&
        (this.keyId === "z" || this.keyId === "Z")
      ) {
        this.undo();
      } else if (
        (e.ctrlKey || e.metaKey) &&
        (this.keyId === "y" || this.keyId === "Y")
      ) {
        this.reundo();
      } else if (this.keyId === "Backspace") {
        this.delete();
      } else if (
        (e.ctrlKey || e.metaKey) &&
        (this.keyId === "s" || this.keyId === "S")
      ) {
        e.preventDefault();
        this.save();
      } else if (
        (e.ctrlKey || e.metaKey) &&
        (this.keyId === "l" || this.keyId === "L")
      ) {
        e.preventDefault();
        this.load();
      }
    });
    this.contextmenu = new Contextmenu(
      this.useContenxtmenu,
      this.undo,
      this.reundo,
      this.copy,
      this.cut,
      this.paste,
      this.save,
      this.load
    );

    document.addEventListener("keyup", () => (this.keyDown = false));
    document.querySelector("body").onclick = () => {
      this.contextmenu.hide();
    };
    document.oncontextmenu = (e) => {
      e.preventDefault();
      this.contextmenu.show(e.clientX, e.clientY);
    };
    this.history.push(this.getHistoryImages());
  }

  pickBlock = (block: DrawerBlock) => {
    if (this.selectedBlocks.length === 0) return;
    if (this.history.length > this.changeState - 1) {
      this.history = this.history.slice(0, this.changeState + 1);
    }
    this.changeState++;
    const changeContent = () =>
      this.selectedBlocks.forEach((item) => item.setContent(block.content));
    if (!this.next) {
      changeContent();
      this.unSelect();
      this.selectedBlocks = [];
    } else if (this.next) {
      changeContent();
      this.unSelect();
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
    this.history.push(this.getHistoryImages());
  };

  mapBlockClick = (block: MapBlock) => {
    if (!this.pasting) {
      if (this.selectedBlocks.length > 0) this.unSelect();
      if (
        !(this.keyDown && (this.keyId === "Control" || this.keyId === "Meta"))
      )
        this.selectedBlocks = [];
      const tempBlocks = this.selectedBlocks.filter(
        (b) => b.index !== block.index
      );
      if (tempBlocks.length === this.selectedBlocks.length)
        this.selectedBlocks.push(block);
      else this.selectedBlocks = [...tempBlocks];
      this.selectedBlocks.forEach((block) => block.select());
    } else {
      this.selectedBlocks = [];
      this.unSelect();
      this.pasting = false;
      this.mapPalete.paste(this.copiedBlocks, this.pasteX, this.pasteY);
      if (this.history.length > this.changeState - 1) {
        this.history = this.history.slice(0, this.changeState + 1);
      }
      this.changeState++;
      this.history.push(this.getHistoryImages());
    }
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
    if (this.selectedBlocks.length > 0) this.unSelect();
    if (!(this.keyDown && (this.keyId === "Control" || this.keyId === "Meta")))
      this.selectedBlocks = [];
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
    this.changeState -= 1;
    this.mapPalete.overritePalete(this.history[this.changeState]);
  };
  reundo = () => {
    if (this.changeState === this.history.length - 1) return;
    this.changeState += 1;
    this.mapPalete.overritePalete(this.history[this.changeState]);
  };
  copy = () => {
    let width = this.selectedBlocks[0].x;
    let height = this.selectedBlocks[0].y;
    this.copiedBlocks = this.selectedBlocks.map((block) => {
      return {
        x: block.x - width,
        y: block.y - height,
        content: block.content,
      };
    });
  };
  cut = () => {
    this.copy();
    this.selectedBlocks.forEach((block) => block.setContent(""));
    this.changeState++;
    this.history.push(this.getHistoryImages());
    this.unSelect();
    if (this.history.length > this.changeState - 1) {
      this.history = this.history.slice(0, this.changeState + 1);
    }
    this.changeState++;
    this.history.push(this.getHistoryImages());
  };
  paste = () => {
    if (this.copiedBlocks.length === 0) return;
    this.pasting = true;
    if (this.history.length > this.changeState - 1) {
      this.history = this.history.slice(0, this.changeState + 1);
    }
    this.changeState++;
    this.history.push(this.getHistoryImages());
  };

  getFirstElementToPaste = (x: number, y: number) => {
    if (!this.pasting) return;
    if (x !== this.pasteX || this.pasteY !== y) {
      this.pasteX = x;
      this.pasteY = y;
      this.mapPalete.overritePalete(this.history[this.history.length - 1]);
      this.mapPalete.tempOverrite(this.copiedBlocks, x, y);
    }
  };

  getHistoryImages = () => {
    return this.mapPalete.blocks.map((block) =>
      block.content === undefined ? "" : block.content
    );
  };

  unSelect = () => {
    this.selectedBlocks.forEach((block) => block.unSelect());
  };
  delete = () => {
    this.selectedBlocks.forEach((block) => block.setContent(""));
    this.unSelect();
    this.selectedBlocks = [];
    if (this.history.length > this.changeState - 1) {
      this.history = this.history.slice(0, this.changeState + 1);
    }
    this.changeState++;
    this.history.push(this.getHistoryImages());
  };

  save = () => {
    const data = this.mapPalete.blocks.map((block) => block.content);
    const dataToSave = JSON.stringify(data);
    const type = "application/json";
    const filename = "map.json";

    this.saveFile(dataToSave, filename, type);
  };
  saveFile = (data: string, filename: string, type: string) => {
    const blob = new Blob([data], { type: type });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.innerText = "save";
    link.href = url;
    link.download = filename;

    document.querySelector("body").appendChild(link);
    link.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 0);
    document.querySelector("body").removeChild(link);
  };

  load = () => {
    const fileInput: HTMLInputElement = document.querySelector("#input");
    fileInput.click();
    fileInput.onchange = (e) => {
      const file = fileInput.files[0];
      if (!file) {
        console.error("No file selected");
        return;
      }
      const reader = new FileReader();
      reader.onerror = function (event) {
        console.error(
          "File could not be read! Code " + event.target.error.code
        );
      };
      reader.onload = () => {
        const jsonData = JSON.parse(String(reader.result));
        this.mapPalete.overritePalete(jsonData);
      };
      reader.readAsText(file);
    };
  };
}
