const map = document.getElementById("map");

export default class MapBlock {
  id: string;
  block: HTMLDivElement;
  content: string;

  constructor(func: () => void, id: string) {
    this.id = "map" + id;
    this.block = document.createElement("div");
    this.block.classList.add("block");
    this.block.setAttribute("id", this.id);
    if (map) map.appendChild(this.block);
    this.block.click = () => func();
  }
}
