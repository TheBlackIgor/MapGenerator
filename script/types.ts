export interface BlockI {
  block: HTMLDivElement;
  content: string;
  id: string;
  index: number;
  setContent: (data: string) => void;
  select: () => void;
  unSelect: () => void;
  setImage: (x: string) => void;
}
export interface CopyI {
  x: number;
  y: number;
  content: string;
}

export interface ToPasteI {
  x: number;
  y: number;
  block: HTMLDivElement;
}
