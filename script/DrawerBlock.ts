const items = document.getElementById("items");

export default class DrawerBlock {
  block: HTMLDivElement;
  id: string;

  constructor(
    func: (block: HTMLDivElement) => void,
    content: string,
    id: string
  ) {
    this.id = "drawer" + id;
    this.block = document.createElement("div");
    this.block.classList.add("block");
    this.block.setAttribute("id", this.id);

    this.block.style.backgroundImage = this.parseImage(content);
    if (items) items.appendChild(this.block);
    this.block.click = () => func(this.block);
  }

  parseImage = (x: string) => {
    return `url("${x}")`;
  };
}
