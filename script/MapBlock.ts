const map = document.getElementById("map");

export default class MapBlock {
  id: string;
  block: HTMLDivElement;
  content: string;
  index: number;
  x: number;
  y: number;

  constructor(
    func: (item: MapBlock) => void,
    getFirstElementToPaste: (x: number, y: number) => void,
    id: string,
    x: number,
    y: number
  ) {
    this.id = "map" + id;
    this.index = Number(id);
    this.block = document.createElement("div");
    this.block.classList.add("block");
    // this.block.setAttribute("id", this.id);
    this.block.setAttribute("x", String(x));
    this.block.setAttribute("y", String(y));
    this.block.setAttribute("index", id);
    if (map) map.appendChild(this.block);
    this.block.onclick = () => func(this);
    this.block.onmouseover = () => getFirstElementToPaste(x, y);
    this.x = x;
    this.y = y;
  }

  resetContent = () => {
    this.setImage(this.content);
  };

  setContent(data: string) {
    this.content = data;
    this.setImage(data);
  }

  setImage = (x: string) => {
    this.block.style.backgroundImage = `url("${x}")`;
  };
  select() {
    this.block.classList.add("selected");
  }
  unSelect() {
    this.block.classList.remove("selected");
  }

  setBlock = (newBlock: HTMLDivElement) => {
    this.block = newBlock;
  };
  setBorder = (color: string) => {
    this.block.style.borderColor = color;
  };
}
