import { playSound, randArrItem } from "../index";

function playRandSound({ audio, volume, loop = false, promise } = {}) {
  // 播放列表中随机一种声音
  playSound({
    src: randArrItem(audio)[0],
    volume,
    loop,
    promise,
  });
}

export default playRandSound;
