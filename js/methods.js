import { uid, DATA } from "./data.js";

export {
  Rand,
  Probability,
  CalcRepair,
  RandArrItems,
  TimeFormat,
  GameOver,
  BuiltEntity,
  CollideEntity,
  ShowDetails,
  PlaySound,
  PlayRandSound,
  UploadDatabase,
  AntiCheatVerification,
};

function Rand({ min, max, fixed = 0 } = {}) {
  if (fixed === 0) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  } else {
    return parseFloat((Math.random() * (max - min) + min).toFixed(fixed));
  }
}

function Probability(chance, fixed = 0) {
  // 返回1-100的百分比数值
  return (
    Rand({
      min: 1,
      max: 100,
      fixed,
    }) <= (chance > 100 ? 100 : chance)
  );
}

function CalcRepair({ formula, ceil = false, fixed = 2 } = {}) {
  let int = 1;

  for (let i = 0; i < fixed; i++) int = int + "0";

  if (ceil) {
    return Math.ceil(formula * int) / int;
  } else {
    return Math.floor(formula * int) / int;
  }
}

function RandArrItems(arr) {
  // 从自定义数组中随机获取其中一项
  let index = Rand({
    min: 0,
    max: arr.length - 1,
  });

  // 返回一个数组，第一个值为随机获取的值，
  // 第二个值为获取到的值在自定义数组中的索引。
  return [arr[index], index];
}

function TimeFormat(num) {
  let m = Math.floor(num / 60),
    s = num % 60;

  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  return m + ":" + s;
}

function GameOver() {
  // save data in database
  UploadDatabase("../php/data.php", {
    uid,
    scores: DATA.statistics.SCORES,
    playtime: DATA.statistics.PLAYTIME,
    useSkills: DATA.statistics.USE_SKILLS,
    totalFruits: DATA.statistics.TOTAL_FRUITS,
    totalBadFruits: DATA.statistics.TOTAL_BAD_FRUITS,
    totalAchievements: DATA.statistics.TOTAL_ACHIEVEMENTS,
    totalMedals: DATA.statistics.TOTAL_MEDALS,
    difficultyLevels: DATA.statistics.DIFFICULTY_LEVELS,
  });

  // 关闭所有定时器
  $.each(DATA.timer, function () {
    clearInterval($(this)[0]);
  });

  // 停止所有正在播放的声音
  // Use native for..in/for..of for better performance.
  for (let objAudio in DATA.audio) {
    if (Array.isArray(DATA.audio[objAudio])) {
      for (let arrAudio of DATA.audio[objAudio]) {
        arrAudio.pause();
      }
    } else {
      DATA.audio[objAudio].pause();
    }
  }

  // jQuery writing method, performance is not as good as native.
  // $.each(DATA.audio, function () {
  //     if (Array.isArray($(this)[0])) {
  //         $.each($(this)[0], function () {
  //             $(this)[0].pause()
  //         })
  //     } else {
  //         $(this)[0].pause()
  //     }
  // })

  $("#wrapper > *:not(div)").remove();
  $("#diff-notify").stop(true).removeAttr("style");
  $("#fruit-basket").hide().removeAttr("style");

  // 结束时播放特定声音
  PlaySound({
    src: DATA.audio.end,
  });

  $("#status").animate({ height: 0 }, 300, "swing");
  $("#finished")
    .show()
    .animate({ opacity: 1 }, 300, "swing", () => {
      $("#all-data").animate({ height: 252 }, 500, "swing", () => {
        // 计算偏差，游戏数值在计算时可能会出现偏差，使用后可以避免偏差。
        const deviation = 0.1;

        // 成就总览
        const achievements = {
          NONE_FRUITS: {
            cond: DATA.statistics.TOTAL_FRUITS <= 0,
            title: "消失的水果",
            description: "没有拾取任何水果。",
          },
          FRUITS_100_UP: {
            cond: DATA.statistics.TOTAL_FRUITS >= 100,
            title: "水果能手",
            description: "累计拾取100个以上的水果。",
          },
          FRUITS_300_UP: {
            cond: DATA.statistics.TOTAL_FRUITS >= 300,
            title: "水果先锋",
            description: "累计拾取300个以上的水果。",
          },
          FRUITS_500_UP: {
            cond: DATA.statistics.TOTAL_FRUITS >= 500,
            title: "水果大师",
            description: "累计拾取500个以上的水果。",
          },
          FRUITS_1000_UP: {
            cond: DATA.statistics.TOTAL_FRUITS >= 1000,
            title: "水果之王",
            description: "累计拾取1000个以上的水果。",
          },
          NONE_BAD_FRUITS: {
            cond:
              DATA.player.countdown <= 0 &&
              DATA.statistics.TOTAL_BAD_FRUITS <= 0,
            title: "绝缘体",
            description: "直至游戏结束，没有拾取一个腐烂水果。",
          },
          BAD_FRUITS_50_UP: {
            cond: DATA.statistics.TOTAL_BAD_FRUITS >= 50,
            title: "烂活，就是有点好。",
            description: "累计拾取50个以上的腐烂水果。",
          },
          BAD_FRUITS_150_UP: {
            cond: DATA.statistics.TOTAL_BAD_FRUITS >= 150,
            title: "这也太烂了吧！",
            description: "累计拾取150个以上的腐烂水果。",
          },
          PLAYTIME_5S_DOWN: {
            cond: DATA.statistics.PLAYTIME <= 5 + deviation,
            title: "开始即结束",
            description: "游戏时长小于5秒。",
          },
          PLAYTIME_80S_UP: {
            cond: DATA.statistics.PLAYTIME >= 80 - deviation,
            title: "还差得远呢",
            description: "游戏时长大于80秒。",
          },
          PLAYTIME_120S_UP: {
            cond: DATA.statistics.PLAYTIME >= 120 - deviation,
            title: "不要停下来啊···",
            description: "游戏时长大于120秒。",
          },
          PLAYTIME_240S_UP: {
            cond: DATA.statistics.PLAYTIME >= 240 - deviation,
            title: "你也是加把劲···",
            description: "游戏时长大于240秒。",
          },
          PLAYTIME_360S_UP: {
            cond: DATA.statistics.PLAYTIME >= 360 - deviation,
            title: "再起不能",
            description: "游戏时长大于360秒。",
          },
          LEVELS_5_UP: {
            cond: DATA.statistics.DIFFICULTY_LEVELS >= 5,
            title: "就这？",
            description: "游戏难度到达5级以上。",
          },
          LEVELS_15_UP: {
            cond: DATA.statistics.DIFFICULTY_LEVELS >= 25,
            title: "就这就这？",
            description: "游戏难度到达25级以上。",
          },
          LEVELS_40_UP: {
            cond: DATA.statistics.DIFFICULTY_LEVELS >= 45,
            title: "就...这...",
            description: "游戏难度到达45级以上。",
          },
          TOO_WATER: {
            cond:
              DATA.statistics.PLAYTIME >= 60 - deviation &&
              DATA.statistics.TOTAL_FRUITS <= 0,
            title: "摸鱼",
            description: "游戏时长大于60秒，并且没有拾取任何水果。",
          },
          NOT_USE_SKILLS: {
            cond: DATA.statistics.USE_SKILLS <= 0,
            title: "法师有个···",
            description: "没有使用魔法技能。",
          },
          NEVER_MOVED: {
            cond: DATA.statistics.NEVER_MOVED,
            title: "安如磐石",
            description: "游戏开始后从未移动过。",
          },
          REMAIN_1_HEALTH: {
            cond: DATA.player.countdown <= 0 && DATA.player.health === 1,
            title: "苟延残喘",
            description: "保持1点生命值直到游戏结束。",
          },
          REMAIN_MAX_HEALTH: {
            cond: DATA.player.countdown <= 0 && DATA.player.health >= 10,
            title: "PERFECT",
            description: "保持最大生命值直到游戏结束。",
          },
        };

        // 显示本局的游戏数据
        const $achievements = $("#achievements > ul");

        $.each(achievements, function () {
          if ($(this)[0].cond) {
            DATA.statistics.TOTAL_ACHIEVEMENTS++;
            $achievements.html(
              $achievements.html() +
                `<li><img src="img/achievements_2.svg" alt=""><div><span>${
                  $(this)[0].title
                }</span><p>${$(this)[0].description}</p></div></li>`
            );
          }
        });

        // 显示本局的游戏数据
        $("#get-playtime > i").text(
          TimeFormat(Math.floor(DATA.statistics.PLAYTIME))
        );
        $("#get-scores > i").text(
          CalcRepair({
            formula: DATA.statistics.SCORES,
          })
        );
        $("#get-total-fruits > i").text(DATA.statistics.TOTAL_FRUITS);
        $("#get-total-achievements > i").text(
          DATA.statistics.TOTAL_ACHIEVEMENTS
        );
        $("#get-total-medals > i").text(DATA.statistics.TOTAL_MEDALS);
      });
    });
}

function BuiltEntity({ className, x, y, xSpeed, ySpeed, extra } = {}) {
  const $e = $("<i/>");

  // 优先加入到 HTML中，解决使用 $(this)方法获取不到信息的问题。
  // 先加入到 HTML中的元素再添加样式也是可行的。
  $e.appendTo($("#wrapper"))
    .addClass(className)
    .css({
      left: x,
      top: y,
    })
    .prop({
      xSpeed,
      ySpeed,
    });

  // 额外的函数，通常用于添加额外的样式。
  if (extra) extra($e);
}

function CollideEntity({ id, contrast, collided } = {}) {
  const getContrast = contrast;

  $("." + id).each(function () {
    if (
      !(
        getContrast.position().top + getContrast.height() <
          $(this).position().top ||
        getContrast.position().left >
          $(this).position().left + $(this).width() ||
        getContrast.position().top >
          $(this).position().top + $(this).height() ||
        getContrast.position().left + getContrast.width() <
          $(this).position().left
      )
    ) {
      if (collided) collided($(this));
    }
  });
}

function ShowDetails({ type, id, pos, before, after, extra, fixed } = {}) {
  const getPos = pos;

  function send(className, text) {
    $("<span/>")
      .appendTo($("#wrapper"))
      .addClass("pickup " + className)
      .html(
        `<img class="icons ${
          extra ? extra() : ""
        }" src="img/${type}/${id}.svg" alt=""> ${text}`
      )
      .css({
        left() {
          // 阻止拾取后显示的信息超出游戏区域
          if (getPos.x < 0) getPos.x = 0;
          if (getPos.x > $("#wrapper").width() - $(this).width()) {
            getPos.x = $("#wrapper").width() - $(this).width();
          }

          return getPos.x;
        },
        top() {
          if (getPos.y < 0) getPos.y = 0;
          if (
            getPos.y >
            $("#wrapper").height() - $("#status").height() - $(this).height()
          ) {
            getPos.y =
              $("#wrapper").height() - $("#status").height() - $(this).height();
          }

          return getPos.y;
        },
      })
      .fadeOut(1500, function () {
        $(this).remove();
      });
  }

  if (after > before) {
    send(
      "get",
      "+" +
        CalcRepair({
          formula: after - before,
          ceil: false,
          fixed,
        })
    );
  } else {
    send(
      "lose",
      CalcRepair({
        formula: after - before,
        ceil: true,
        fixed,
      })
    );
  }
}

function PlaySound({ src, volume = 25, loop = false, promise = false } = {}) {
  // 使用独立播放功能
  // 防止一个正在播放的声音未结束时，无法再次重新播放。
  let audio;

  if (promise) {
    audio = new Audio(src.src);
  } else {
    audio = src;
  }

  audio.volume = volume / 100;
  audio.loop = loop;

  const playPromise = audio.play();

  if (playPromise) playPromise.then().catch();
}

function PlayRandSound({ audio, volume, loop, promise } = {}) {
  // 播放列表中随机一种声音
  PlaySound({
    src: RandArrItems(audio)[0],
    volume,
    loop,
    promise,
  });
}

function UploadDatabase(url, data) {
  $.ajax({
    type: "POST",
    url,
    dataType: "json",
    data,
    success(response) {
      const getTime = response.nowTime;

      if (response.return) {
        console.info(`[${getTime}] ->`, response);
      } else {
        console.error(`[${getTime}] ->`, response.logger);
      }
    },
    error(response) {
      console.error("Unable to upload to server.", response);
    },
  });
}

function AntiCheatVerification() {
  for (let verifyKey in DATA.verify) {
    const currentItem = DATA.verify[verifyKey];

    if (currentItem.enabled) {
      if (currentItem.check()) {
        currentItem.actions();
      }
    }
  }
}
