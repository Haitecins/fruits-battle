import { playSound, randArrItem } from "../index.js";

function playRandSound({ audio, volume, loop, promise } = {}) {
  // 播放列表中随机一种声音
  playSound({
    src: randArrItem(audio)[0],
    volume,
    loop,
    promise,
  });
}

export default playRandSound;
