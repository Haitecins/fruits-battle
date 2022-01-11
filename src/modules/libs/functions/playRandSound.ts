import playSound from "./playSound";
import randArrItem from "./randArrItem";

function playRandSound({ audio, volume, loop, promise }: PlayRandSoundProps) {
  // 播放列表中随机一种声音
  playSound({
    src: randArrItem(audio)[0],
    volume,
    loop,
    promise,
  });
}

export default playRandSound;
