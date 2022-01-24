import TimerProps from "@/types/configs/common/timer";

const timer: TimerProps = {
  // 主定时器，负责游戏的核心功能。
  main: null,
  // 难度定时器，负责处理游戏难度。
  difficulty: null,
};

export default timer;
