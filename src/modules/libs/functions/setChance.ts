import Random from "@/libs/classes/Random";

const setChance = (chance: number, fixed = 0): boolean => {
  const random = new Random(0, 100, fixed).getNumber();
  return random <= (chance > 100 ? 100 : chance);
};

export default setChance;
