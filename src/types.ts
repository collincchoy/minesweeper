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
  position: GridPosition;
  flagged: boolean;
};

export type GridPosition = {
  row: number;
  col: number;
};

export type Bomb = {
  position: GridPosition;
  flagged: boolean;
};
