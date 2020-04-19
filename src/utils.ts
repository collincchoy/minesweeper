import { BlockType, BlockValue, GridPosition } from "./types";

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

export const convert1dTo2d = (
  position: number,
  width: number,
  height: number
) => {
  return {
    col: position % width,
    row: Math.floor(position / height),
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

export function* getSurroundingNonBombBlocks(
  board: BlockType[][],
  { row, col }: GridPosition
) {
  const width = board.length;
  const height = board[0]?.length;
  for (let r_offset = -1; r_offset <= 1; r_offset++) {
    for (let col_offset = -1; col_offset <= 1; col_offset++) {
      const r = row + r_offset;
      const c = col + col_offset;
      if (
        r >= 0 &&
        r < height &&
        c >= 0 &&
        c < width &&
        board[r][c].value !== BlockValue.BOMB &&
        !(r === row && c === col) // skip block in question
      ) {
        yield { row: r, col: c };
      }
    }
  }
}

export const addMarkers = (board: BlockType[][]) => {
  const width = board.length;
  const height = board[0]?.length;
  for (let row = 0; row < width; row++) {
    for (let col = 0; col < height; col++) {
      if (board[row][col].value === BlockValue.BOMB) {
        // Add 1 to all surrounding blocks
        for (const b of getSurroundingNonBombBlocks(board, { row, col })) {
          board[b.row][b.col].value += 1;
        }
      }
    }
  }
  return board;
};

export const placeBombs = (board: BlockType[][], bombCount: number) => {
  const boardSize = board.length * board.length;
  const bombPlacements = new Set<number>();

  while (bombPlacements.size < bombCount) {
    bombPlacements.add(Math.floor(Math.random() * boardSize));
  }

  return {
    board: board.map((row, row_i) =>
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
    ),
    bombs: bombPlacements,
  };
};

/**
 * Uncover a single block on the board.
 * If the block is empty, then recursively uncover adjacent blocks
 * to find non-empty blocks.
 * @param board full board. Will return a new copy
 * @param block reference to block on the board to uncover. Must be an exact ref
 */
export const uncoverBlock = (board: BlockType[][], block: BlockType) => {
  const uncovered = new Set<GridPosition>();
  const uncover = ({ value, position }: BlockType) => {
    if (uncovered.has(position)) {
      return;
    }
    uncovered.add(position);
    if (value === BlockValue.EMPTY) {
      for (const surrounding of getSurroundingNonBombBlocks(board, position)) {
        uncover(board[surrounding.row][surrounding.col]);
      }
    }
  };
  uncover(block);
  return board.map((row) =>
    row.map((block) => {
      if (uncovered.has(block.position)) {
        return { ...block, uncovered: true };
      }
      return block;
    })
  );
};

export const flagBlock = (board: BlockType[][], block: BlockType) => {
  return board.map((row) =>
    row.map((b) =>
      b.position === block.position ? { ...b, flagged: !b.flagged } : b
    )
  );
};
