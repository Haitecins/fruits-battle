const timeFormat = (num: number): string => {
  let m: string | number = Math.floor(num / 60);
  let s: string | number = num % 60;

  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` + s : s;

  return `${m}:${s}`;
};

export default timeFormat;
