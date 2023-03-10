export default class Contextmenu {
  parent = document.getElementById("contextmenu");
  undoBtn: HTMLDivElement;
  reundoBtn: HTMLDivElement;
  copyBtn: HTMLDivElement;
  cutBtn: HTMLDivElement;
  pasteBtn: HTMLDivElement;
  saveBtn: HTMLDivElement;
  loadBtn: HTMLDivElement;

  constructor(
    click: (x: number, y: number) => void,
    undo: () => void,
    reundo: () => void,
    copy: () => void,
    cut: () => void,
    paste: () => void,
    save: () => void,
    load: () => void
  ) {
    this.undoBtn = document.createElement("div");
    this.undoBtn.innerHTML = "Undo";
    this.undoBtn.onclick = () => undo();
    this.reundoBtn = document.createElement("div");
    this.reundoBtn.innerHTML = "Reundo";
    this.reundoBtn.onclick = () => reundo();
    this.copyBtn = document.createElement("div");
    this.copyBtn.innerHTML = "Copy";
    this.copyBtn.onclick = () => copy();
    this.cutBtn = document.createElement("div");
    this.cutBtn.innerHTML = "Cut";
    this.cutBtn.onclick = () => cut();
    this.pasteBtn = document.createElement("div");
    this.pasteBtn.innerHTML = "Paste";
    this.pasteBtn.onclick = () => paste();
    this.saveBtn = document.createElement("div");
    this.saveBtn.innerHTML = "Save";
    this.saveBtn.onclick = () => save();
    this.loadBtn = document.createElement("div");
    this.loadBtn.innerHTML = "Load";
    this.loadBtn.onclick = () => load();

    this.parent.appendChild(this.undoBtn);
    this.parent.appendChild(this.reundoBtn);
    this.parent.appendChild(this.copyBtn);
    this.parent.appendChild(this.cutBtn);
    this.parent.appendChild(this.pasteBtn);
    this.parent.appendChild(this.saveBtn);
    this.parent.appendChild(this.loadBtn);
  }
  show = (posX: number, posY: number) => {
    this.parent.style.display = "flex";
    this.parent.style.left = posX + "px";
    if (posY > 600)
      this.parent.style.top = posY - this.parent.clientHeight + "px";
    else this.parent.style.top = posY + "px";
  };
  hide = () => (this.parent.style.display = "none");
}
