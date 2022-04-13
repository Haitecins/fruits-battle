import jQuery from "jquery";

const elements = {
  nodes: {
    document: jQuery(document),
    body: jQuery("body"),
    app: jQuery("#app"),
    player: jQuery("#fruit-basket"),
    readme: {
      element: jQuery("#readme"),
      startButton: jQuery("#STARTGAME"),
      totalFruits: jQuery("#total-fruits"),
      totalItems: jQuery("#total-items"),
      historyElement: jQuery("#history"),
      icons: {
        element: jQuery("#fruit-icon"),
        items: jQuery("#readme-menu>ul>li>span"),
        contents: jQuery("#readme>div:last-child>article"),
      },
    },
    statusbar: {
      element: jQuery("#player-status"),
      health: jQuery("#health>i"),
      mana: jQuery("#mana>i"),
      scores: jQuery("#current-scores>i"),
      countdown: jQuery("#countdown>i"),
    },
    levels: {
      element: jQuery("#levels"),
      container: jQuery("#levels>div"),
      value: jQuery("#levels>p"),
    },
    gameover: {
      element: jQuery("#gameover"),
      playtime: jQuery("#over-playtime"),
      levels: jQuery("#over-levels"),
      achievements: {
        element: jQuery("#over-achievements>ul"),
        totals: jQuery("#over-achievements-length"),
      },
      totals: {
        fruits: jQuery("#over-total-fruits"),
        badFruits: jQuery("#over-total-bad-fruits"),
      },
      scores: jQuery("#over-scores"),
      details: jQuery("#over-details"),
      restart: jQuery("#RESTART"),
      spawnpoint: jQuery("#SPAWNPOINT"),
    },
  },
  entities: {
    // 因为实体在游戏中是不确定的，所以需要变为函数让定时器调用
    totals: () => jQuery("#app>.fruits,#app>.items"),
    fruits: () => jQuery("#app>.fruits"),
    items: () => jQuery("#app>.items"),
  },
  clearEntities: () => jQuery("#app>*:not(div)").remove(),
  resetPageStyles: () =>
    jQuery("*:not(#readme):not(#readme *)").removeAttr("style"),
  resetIndexStyles: () => jQuery("*:not(#readme *)").removeAttr("style"),
};

export default elements;
