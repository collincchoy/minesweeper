import {
  convert1dTo2d,
  placeBombs,
  initialize2dArray,
  convert2dTo1d,
  addMarkers,
  uncoverBlock,
  getSurroundingNonBombBlocks,
} from "./utils";
import { BlockValue, BlockType } from "./types";

describe("initialize2dArray", () => {
  test("3x3 array of zeros", () => {
    expect(initialize2dArray(3, 3, () => 0)).toStrictEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  });
});

describe("convert1dto2d works", () => {
  /**
   *  [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
   */
  test("simple case", () => {
    expect(convert1dTo2d(5, 3, 3)).toStrictEqual({ row: 1, col: 2 });
  });
  it("works with 0", () => {
    expect(convert1dTo2d(0, 3, 3)).toStrictEqual({ row: 0, col: 0 });
  });
  it("works with corner", () => {
    expect(convert1dTo2d(6, 3, 3)).toStrictEqual({ row: 2, col: 0 });
  });
  it("works with a larger board", () => {
    expect(convert1dTo2d(1, 5, 5)).toStrictEqual({ row: 0, col: 1 });
  });
});

describe("convert2dTo1d works", () => {
  /**
   *  [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
   */
  test("simple case", () => {
    expect(convert2dTo1d(1, 2, 3, 3)).toBe(5);
  });
  it("works with 0", () => {
    expect(convert2dTo1d(0, 0, 3, 3)).toBe(0);
  });
  it("works with 3", () => {
    expect(convert2dTo1d(1, 0, 3, 3)).toBe(3);
  });
  it("works with corner", () => {
    expect(convert2dTo1d(2, 0, 3, 3)).toBe(6);
  });
});

const createBoardByValues = (initial: BlockValue[], width = 3, height = 3) => {
  const res: BlockType[][] = [];
  for (let row = 0; row < height; row++) {
    res.push([]);
    for (let col = 0; col < width; col++) {
      res[row].push({
        value: initial[convert2dTo1d(row, col, width, height)],
        uncovered: false,
        position: { row, col },
        flagged: false,
      });
    }
  }
  return res;
};

describe("addMarkers works", () => {
  /**
   *  [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
   */
  it("sets 1s in all around center for 1 center bomb in 3x3", () => {
    const initialBoard = createBoardByValues([0, 0, 0, 0, -1, 0, 0, 0, 0]);
    expect(addMarkers(initialBoard)).toStrictEqual(
      createBoardByValues([1, 1, 1, 1, -1, 1, 1, 1, 1])
    );
  });

  it("accumulates bomb counts", () => {
    const intitialBoard = createBoardByValues([0, 0, 0, -1, -1, -1, 0, 0, 0]);
    expect(addMarkers(intitialBoard)).toStrictEqual(
      createBoardByValues([2, 3, 2, -1, -1, -1, 2, 3, 2])
    );
  });
});

describe("placing bombs works", () => {
  /**
   *  [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
   */
  it("returns a board with all of the bombs added", () => {
    const intitialBoard = createBoardByValues([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const bombsToPlace = 3;
    const { board, bombs } = placeBombs(intitialBoard, bombsToPlace);

    const countBombs = (result: BlockType[][]) =>
      result.reduce(
        (bombCount, row) =>
          bombCount +
          row.reduce(
            (prev, next) => (next.value === BlockValue.BOMB ? prev + 1 : prev),
            0
          ),
        0 // initialValue
      );
    expect(countBombs(board)).toBe(bombsToPlace);
    expect(bombs.size).toBe(bombsToPlace);
  });
});

describe("getSurroundingNonBombBlocks", () => {
  test("center of 3x3 square", () => {
    expect([
      ...getSurroundingNonBombBlocks(
        createBoardByValues([1, 1, 1, 1, 0, 1, 1, 1, 1]),
        { row: 1, col: 1 }
      ),
    ]).toEqual([
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
      { row: 1, col: 0 },
      { row: 1, col: 2 },
      { row: 2, col: 0 },
      { row: 2, col: 1 },
      { row: 2, col: 2 },
    ]);
  });
});

describe("uncoverBlock works", () => {
  /**
   *  [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
   */
  it("uncovers all surrounding, marked (non-bomb) tiles in center", () => {
    const initialBoard = createBoardByValues([1, 1, 1, 1, 0, 1, 1, 1, 1]);
    expect(uncoverBlock(initialBoard, initialBoard[1][1])).toStrictEqual(
      createBoardByValues([1, 1, 1, 1, 0, 1, 1, 1, 1]).map((row) =>
        row.map((block) => ({ ...block, uncovered: true }))
      )
    );
  });
  it("uncovers surrounding, marked (non-bomb) tiles on corner", () => {
    const initialBoard = createBoardByValues([0, 1, 1, 1, 1, 1, 1, 1, 1]);
    let expected = createBoardByValues([0, 1, 1, 1, 1, 1, 1, 1, 1]);
    expected[0][0].uncovered = true;
    expected[0][1].uncovered = true;
    expected[1][0].uncovered = true;
    expected[1][1].uncovered = true;
    expect(uncoverBlock(initialBoard, initialBoard[0][0])).toStrictEqual(
      expected
    );
  });
  it("does not spread if uncovering a number", () => {
    const initialBoard = createBoardByValues([1, 1, 1, 1, 0, 1, 1, 1, 1]);
    let expected = createBoardByValues([1, 1, 1, 1, 0, 1, 1, 1, 1]);
    expected[0][0].uncovered = true;
    expect(uncoverBlock(initialBoard, initialBoard[0][0])).toStrictEqual(
      expected
    );
  });
});
