import { DifficultyLevel } from "./types";

type Difficulty = {
  size: {
    width: number;
    height: number;
  };
  bombCount: number;
};

export const defaultConfig = {
  size: {
    width: 5,
    height: 5,
  },
  bombCount: 4,
};

const DifficultyMap = new Map<DifficultyLevel, Difficulty>([
  [DifficultyLevel.EASY, defaultConfig],
  [
    DifficultyLevel.MEDIUM,
    {
      size: {
        width: 10,
        height: 10,
      },
      bombCount: 20,
    },
  ],
  [
    DifficultyLevel.HARD,
    {
      size: {
        width: 15,
        height: 15,
      },
      bombCount: 56,
    },
  ],
]);

export default DifficultyMap;
