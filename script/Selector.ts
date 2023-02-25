const map = document.getElementById("map");

interface MouseDownPosI {
  x: number;
  y: number;
}

export default class Selector {
  private mouseDownPos: MouseDownPosI;
  private mouseDown = false;
  selector: HTMLDivElement;
  startPosX: number;
  startPosY: number;

  constructor(
    select: (selector: HTMLDivElement) => void,
    tempSelect: (selector: HTMLDivElement) => void
  ) {
    map.onmousedown = (e: MouseEvent) => {
      if (this.selector) map.removeChild(this.selector);
      this.mouseDown = true;
      this.startPosX = e.clientX;
      this.startPosY = e.clientY;
      this.selector = document.createElement("div");
      this.selector.classList.add("selector");
      map.appendChild(this.selector);
    };
    map.onmousemove = (e: MouseEvent) => {
      let width = 0;
      let height = 0;
      let startPosX = 0;
      let startPosY = 0;
      if (!this.mouseDown) return;
      if (this.startPosX > e.clientX) {
        width = this.startPosX - e.clientX;
        startPosX = e.clientX;
      } else {
        width = e.clientX - this.startPosX;
        startPosX = this.startPosX;
      }
      if (this.startPosY > e.clientY) {
        height = this.startPosY - e.clientY;
        startPosY = e.clientY;
      } else {
        height = e.clientY - this.startPosY;
        startPosY = this.startPosY;
      }
      this.selector.style.left = startPosX + "px";
      this.selector.style.top = startPosY + "px";
      this.selector.style.width = width + "px";
      this.selector.style.height = height + "px";
      tempSelect(this.selector);
    };

    map.onmouseup = () => {
      this.mouseDown = false;
      select(this.selector);
      map.removeChild(this.selector);
      this.selector = null;
    };
  }
}
