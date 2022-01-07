import { calcRepair, timeFormat } from "../libs/index.js";

if (!window.localStorage.getItem("app_history")) {
  $("#history").html('<h1 style="font-weight:normal;">暂无游戏记录</h1>');
} else {
  const getHistory = JSON.parse(window.localStorage.getItem("app_history"));
  const elemWrapper = getHistory.map((history) => {
    const { statistics, timestamp } = history;
    const { PLAYTIME, SCORES } = statistics;
    const {
      TOTAL_ACHIEVEMENTS,
      TOTAL_FRUITS,
      TOTAL_BAD_FRUITS,
      TOTAL_MEDALS,
      DIFFICULTY_LEVELS,
    } = statistics;
    const mainChunk = () => {
      const historyDate = new Date(timestamp);

      return `<div>
      <p>${historyDate.getFullYear()}/${
        historyDate.getMonth() + 1
      }/${historyDate.getDate()} ${historyDate.getHours()}:${
        historyDate.getMinutes() < 10
          ? `0${historyDate.getMinutes()}`
          : historyDate.getMinutes()
      }
      </p>
      <p>游戏时间 ${timeFormat(calcRepair({ formula: PLAYTIME, fixed: 0 }))}</p>
      <p>最终得分 <span class="base-scores">${calcRepair({
        formula: SCORES,
      })}</span></p>
      </div>`;
    };
    const detailChunk = () => {
      return `<div>
      <p>最高难度等级 <span class="current-levels">Lv.${DIFFICULTY_LEVELS}</p>
      <p>达成的成就数 ${TOTAL_ACHIEVEMENTS}</p>
      <p>获得的奖牌数 ${TOTAL_MEDALS}</p>
      </div>`;
    };
    const countChunk = () => {
      return `<div>
      <p>总计拾取水果 <span class="healthy-fruits">${TOTAL_FRUITS}</span></p>
      <p>总计拾取腐烂水果 <span class="bad-fruits">${TOTAL_BAD_FRUITS}</span></p>
      </div>`;
    };

    return `<div>
      ${mainChunk()}
      ${detailChunk()}
      ${countChunk()}
    </div>`;
  });

  $("#history").html(elemWrapper);
}
