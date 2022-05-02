import { v4 as uuidv4 } from "uuid";

export const generateLevel = () => {
  let points = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  for (let i = points.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i);
    let k = points[i];
    points[i] = points[j];
    points[j] = k;
  }
  const level = [];
  points.forEach((val) => level.push({ id: uuidv4(), val: val }));
  return level;
};

export const makeGuess = (guessed, previous, current) => {
  if (!(previous === current)) {
    return [...guessed];
  }
  if (guessed.includes(current)) {
    return [...guessed];
  }
  return [...guessed, current];
};
