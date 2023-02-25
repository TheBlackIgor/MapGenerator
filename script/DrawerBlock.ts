const items = document.getElementById("items");

export default class DrawerBlock {
  block: HTMLDivElement;
  id: string;
  content: string;
  index: number;

  constructor(func: (item: DrawerBlock) => void, content: string, id: string) {
    this.index = Number(id);
    this.id = "drawer" + id;
    this.content = content;
    this.block = document.createElement("div");
    this.block.classList.add("block");
    this.block.setAttribute("id", this.id);

    this.setImage(content);
    if (items) items.appendChild(this.block);
    this.block.onclick = () => func(this);
  }

  parseImage = (x: string) => {
    return `url("${x}")`;
  };

  setImage = (x: string) => {
    this.block.style.backgroundImage = `url("${x}")`;
  };
}
