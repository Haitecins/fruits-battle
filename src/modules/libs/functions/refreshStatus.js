import { player, statistics } from "../../data/index.js";
import { calcRepair, timeFormat } from "../index.js";

function refreshStatus() {
  $("#health > i").text(() => {
    if (player.health > 10) player.health = 10;
    return player.health;
  });
  $("#mana > i").text(() => {
    // 魔力值自动恢复
    player.mana > 100 ? (player.mana = 100) : (player.mana += 0.005);
    return calcRepair({ formula: player.mana, fixed: 0 });
  });
  $("#current-scores > i").text(calcRepair({ formula: statistics.SCORES }));
  $("#countdown > i").text(() => {
    statistics.PLAYTIME += 0.01;
    return timeFormat(Math.ceil((player.countdown -= 0.01)));
  });
}

export default refreshStatus;
