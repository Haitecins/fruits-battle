import randomNumber from "./randomNumber";

const setChance = (chance: number, fixed: number = 0): boolean => {
  const random = randomNumber({
    min: 0,
    max: 100,
    fixed,
  });
  return random <= (chance > 100 ? 100 : chance);
};

export default setChance;
