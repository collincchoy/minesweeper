export const initialize2dArray = ({
  width,
  height,
  fillWith,
}: {
  width: number;
  height: number;
  fillWith: number | string;
}) => {
  return Array.from(Array(height), () => new Array(width).fill(fillWith));
};

export const convert1dTo2d = (position: number, size: number) => {
  return {
    x: position % size,
    y: Math.floor(position / size),
  };
};

export const setupBoard = (board: number[][], bombCount: number) => {
  const boardSize = board.length * board.length;
  const bombPlacements = new Set<number>();

  while (bombPlacements.size < bombCount) {
    bombPlacements.add(Math.floor(Math.random() * boardSize));
  }

  bombPlacements.forEach((position) => {
    const { x, y } = convert1dTo2d(position, board.length);
    board[y][x] = -1;
  });

  return board;
};
