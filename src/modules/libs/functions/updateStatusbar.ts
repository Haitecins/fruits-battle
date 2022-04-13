import player from "@/modules/config/common/player";
import statistics from "@/modules/config/common/statistics";
import elements from "@/modules/config/common/elements";
import calcRepair from "@/libs/functions/calcRepair";
import timeFormat from "@/libs/functions/timeFormat";

const {
  nodes: { statusbar },
} = elements;
const updateStatusbar = (): void => {
  statusbar.health.text(() => {
    if (player.health > 10) player.health = 10;
    return player.health;
  });
  statusbar.mana.text(() => {
    // 魔力值自动恢复
    player.mana > 100 ? (player.mana = 100) : (player.mana += 0.005);
    return calcRepair(player.mana, false, 0);
  });
  statusbar.scores.text(calcRepair(statistics.SCORES));
  statusbar.countdown.text(() => {
    statistics.PLAYTIME += 0.01;
    const decrement = Math.ceil((player.countdown -= 0.01));

    return timeFormat(decrement);
  });
};

export default updateStatusbar;
