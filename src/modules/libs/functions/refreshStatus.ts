import player from "@/configs/common/player";
import statistics from "@/configs/common/statistics";
import elements from "@/configs/common/elements";
import calcRepair from "@/libs/functions/calcRepair";
import timeFormat from "@/libs/functions/timeFormat";

const {
  nodes: { statusbar },
} = elements;
const refreshStatus = (): void => {
  statusbar.health.text(() => {
    if (player.health > 10) player.health = 10;
    return player.health;
  });
  statusbar.mana.text(() => {
    // 魔力值自动恢复
    player.mana > 100 ? (player.mana = 100) : (player.mana += 0.005);
    return calcRepair({ formula: player.mana, fixed: 0 });
  });
  statusbar.scores.text(calcRepair({ formula: statistics.SCORES }));
  statusbar.countdown.text(() => {
    statistics.PLAYTIME += 0.01;
    return timeFormat(Math.ceil((player.countdown -= 0.01)));
  });
};

export default refreshStatus;
