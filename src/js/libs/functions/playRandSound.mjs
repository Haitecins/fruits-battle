import randomArrItem from "./randArrItem.mjs";
import playSound from "./playSound.mjs";

function playRandSound({ audio, volume, loop, promise } = {}) {
  // 播放列表中随机一种声音
  playSound({
    src: randomArrItem(audio)[0],
    volume,
    loop,
    promise,
  });
}

export default playRandSound;
