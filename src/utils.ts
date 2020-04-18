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

export const addMarkers = (board: BlockType[][]) => {
  const width = board.length;
  const height = board[0]?.length;
  for (let row = 0; row < width; row++) {
    for (let col = 0; col < height; col++) {
      if (board[row][col].value === BlockValue.BOMB) {
        // Add 1 to all surrounding blocks
        for (let r_offset = -1; r_offset <= 1; r_offset++) {
          for (let col_offset = -1; col_offset <= 1; col_offset++) {
            const r = row + r_offset;
            const c = col + col_offset;
            if (
              r >= 0 &&
              r < height &&
              c >= 0 &&
              c < width &&
              board[r][c].value !== BlockValue.BOMB
            ) {
              board[r][c].value += 1;
            }
          }
        }
      }
    }
  }
  return board;
};

export const setupBoard = (board: BlockType[][], bombCount: number) => {
  const boardSize = board.length * board.length;
  const bombPlacements = new Set<number>();

  while (bombPlacements.size < bombCount) {
    bombPlacements.add(Math.floor(Math.random() * boardSize));
  }

  let withBombs = board.map((row, row_i) =>
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
  return addMarkers(withBombs);
};
