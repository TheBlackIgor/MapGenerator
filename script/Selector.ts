const map = document.getElementById("map");
const body = document.querySelector("body");

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
  startWithOffset: boolean;

  constructor(
    select: (selector: HTMLDivElement) => void,
    tempSelect: (selector: HTMLDivElement) => void
  ) {
    window.addEventListener("scroll", (e) => {
      console.log(body.scrollTop);
      this.selector.style.height =
        this.selector.style.height + window.pageYOffset + "px";
    });
    map.onmousedown = (e: MouseEvent) => {
      this.startWithOffset = false;
      if (e.button !== 0) return;
      if (this.selector) map.removeChild(this.selector);
      this.mouseDown = true;
      this.startPosX = e.clientX;
      this.startPosY = e.clientY;
      this.selector = document.createElement("div");
      this.selector.classList.add("selector");
      map.appendChild(this.selector);
      if (window.pageYOffset > 0) this.startWithOffset = true;
      else this.startWithOffset = false;
    };
    map.onmousemove = (e: MouseEvent) => {
      if (!this.mouseDown) return;
      let width = 0;
      let height = 0;
      let startPosX = 0;
      let startPosY = 0;
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
      if (this.startWithOffset)
        this.selector.style.top = startPosY + window.pageYOffset + "px";
      else this.selector.style.top = startPosY + "px";
      this.selector.style.width = width + "px";
      if (this.startWithOffset) this.selector.style.height = height + "px";
      else this.selector.style.height = height + window.pageYOffset + "px";
      tempSelect(this.selector);
    };

    map.onmouseup = (e) => {
      if (e.button !== 0) return;
      this.mouseDown = false;
      select(this.selector);
      map.removeChild(this.selector);
      this.selector = null;
    };
  }
}
