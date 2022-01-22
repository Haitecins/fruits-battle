interface PlayerProps {
  health: number;
  mana: number;
  not_moving_ticks: number;
  countdown: number;
  isRunning: boolean;
  isEnded: boolean;
  reset: () => void;
  [propName: string]: number | string | boolean | Function;
}
