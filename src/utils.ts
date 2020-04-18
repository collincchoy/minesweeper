import { BlockType, BlockValue } from "./types";

export function initialize2dArray<T>(
  width: number,
  height: number,
  defaultValue: (row_i: number, col_i: number) => T
) {
  const arr = [];
  for (let row_i = 0; row_i < height; row_i++) {
    const row = [];
    for (let col_i = 0; col_i < width; col_i++) {
      row.push(defaultValue(row_i, col_i));
    }
    arr.push(row);
  }
  return arr;
}

export const convert1dTo2d = (position: number, size: number) => {
  return {
    x: position % size,
    y: Math.floor(position / size),
  };
};

export const convert2dTo1d = (
  row: number,
  col: number,
  width: number,
  height: number
) => {
  return height * row + col;
};

export const setupBoard = (board: BlockType[][], bombCount: number) => {
  const boardSize = board.length * board.length;
  const bombPlacements = new Set<number>();

  while (bombPlacements.size < bombCount) {
    bombPlacements.add(Math.floor(Math.random() * boardSize));
  }

  return board.map((row, row_i) =>
    row.map((block, col_i) => {
      if (
        bombPlacements.has(
          convert2dTo1d(row_i, col_i, board.length, board.length)
        )
      ) {
        return { ...block, value: BlockValue.BOMB };
      }
      return block;
    })
  );
};
