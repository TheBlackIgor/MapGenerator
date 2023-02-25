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
