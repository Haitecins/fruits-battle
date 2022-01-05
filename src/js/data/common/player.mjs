const player = {
  // 剩余生命值，最大上限为10。
  health: 5,
  // 魔力值，初始为50，每3秒回复1点，最大上限为100。
  mana: 50,
  // 玩家未进行移动行为的计时
  not_moving_ticks: 0,
  // 游戏倒计时。
  countdown: 90,
};

export default player;
