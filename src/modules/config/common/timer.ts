const timer: TimerProps = {
  // 主定时器，负责游戏的核心功能。
  main: null,
  // 难度定时器，负责处理游戏难度。
  difficulty: null,
};

interface TimerProps {
  main: NodeJS.Timeout | null | number;
  difficulty: NodeJS.Timeout | null | number;
}

export { TimerProps };

export default timer;
