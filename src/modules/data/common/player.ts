import __TEST_COUNTDOWN__ from "@/test/__countdown__";

const player: PlayerProps = {
  // 剩余生命值，最大上限为10。
  health: 5,
  // 魔力值，初始为50，每3秒回复1点，最大上限为100。
  mana: 50,
  // 玩家未进行移动行为的计时
  not_moving_ticks: 0,
  // 游戏倒计时。
  countdown: __TEST_COUNTDOWN__.enabled ? __TEST_COUNTDOWN__.value : 90,
  // 游戏运行状态
  isRunning: false,
  // 游戏结束状态
  isEnded: false,
  reset() {
    Object.keys(player).forEach((index) => {
      player[index] = playerCopy[index];
    });
  },
};
const playerCopy: PlayerProps = { ...player };

export default player;
