export enum BlockValue {
  BOMB = -1,
  EMPTY = 0,
  ONE = 1,
  TWO = 2,
  THREE = 3,
}

export type BlockType = {
  uncovered: boolean;
  value: BlockValue;
  rowIndex?: number;
  colIndex?: number;
};
