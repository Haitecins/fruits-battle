import player from "../../data/common/player";
import statistics from "../../data/common/statistics";
import elements from "../../data/common/elements";
import calcRepair from "./calcRepair";
import timeFormat from "./timeFormat";

const {
  nodes: { statusbar },
} = elements;
const refreshStatus = () => {
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
