import {
  convert1dTo2d,
  setupBoard,
  initialize2dArray,
  convert2dTo1d,
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
    expect(convert1dTo2d(5, 3)).toStrictEqual({ x: 2, y: 1 });
  });
  it("works with 0", () => {
    expect(convert1dTo2d(0, 3)).toStrictEqual({ x: 0, y: 0 });
  });
  it("works with corner", () => {
    expect(convert1dTo2d(6, 3)).toStrictEqual({ x: 0, y: 2 });
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

describe("setupBoard works", () => {
  /**
   *  [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
   */
  it("returns a board with all of the bombs added", () => {
    const createBlankTile = () => ({ value: 0, uncovered: false });
    const intitialBoard = [
      [createBlankTile(), createBlankTile(), createBlankTile()],
      [createBlankTile(), createBlankTile(), createBlankTile()],
      [createBlankTile(), createBlankTile(), createBlankTile()],
    ];
    const bombsToPlace = 3;
    const result = setupBoard(intitialBoard, bombsToPlace);

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
    expect(countBombs(result)).toBe(bombsToPlace);
  });
});
