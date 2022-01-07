import {
  audio,
  fruits,
  items,
  levels,
  player,
  statistics,
  timer,
  verify,
} from "../data/index.js";
import {
  antiCheatVerification,
  builtEntity,
  calcRepair,
  collideEntity,
  gameOver,
  playRandSound,
  playSound,
  probability,
  randArrItem,
  randomNumber,
  showDetails,
  timeFormat,
} from "../libs/index.js";
import "./wrapper.js";

window.navigator.userAgent.match(
  /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
) && $("body").empty().html('<p id="isMobile">暂不支持移动端运行此游戏</p>');

console.log(
  "%cp" + "%cr" + "%co" + "%cd" + "%cu" + "%cc" + "%ct" + "%ci" + "%co" + "%cn",
  "color:red",
  "color:green",
  "color:orange",
  "color:aqua",
  "color:hotpink",
  "color:gray",
  "color:purple",
  "color:black",
  "color:pink",
  "color:yellow"
);
$("#wrapper").removeAttr("style");
$("#STARTGAME").one("click", () => {
  // 暂时关闭游戏区域验证，等待其他项目验证完毕后再次打开。
  verify.LEAVING_THE_GAME_AREA.enabled = false;
  // 反作弊验证
  antiCheatVerification();
  // 打开游戏区域验证
  verify.LEAVING_THE_GAME_AREA.enabled = true;
  // 重置玩家的默认位置
  $("#fruit-basket").css({
    left: $("#wrapper").width() / 2 - $("#fruit-basket").width() / 2,
    top: $("#wrapper").height,
  });
  playSound({ src: audio.click });
  $("#readme").fadeOut(300, () => {
    $("#player-status").animate({ height: 42 }, 300, "swing");
    $("#fruit-basket").animate(
      {
        top: $("#wrapper").height() / 2 - $("#fruit-basket").width() / 2,
      },
      600,
      "swing",
      function () {
        $(this).mousedown((e) => {
          // 获取鼠标的坐标与该对象的坐标之间的距离
          const x = e.clientX - $(this).position().left;
          const y = e.clientY - $(this).position().top;

          $(document).on({
            mousemove(e) {
              if (player.countdown > 0 && player.health > 0) {
                // 获取鼠标的坐标减去对象之间坐标的位置
                let left = e.clientX - x;
                let top = e.clientY - y;

                // 阻止超出游戏区域
                if (left < 0) left = 0;
                if (top < 0) top = 0;
                if (left > $("#wrapper").width() - $("#fruit-basket").width()) {
                  left = $("#wrapper").width() - $("#fruit-basket").width();
                }
                if (
                  top >
                  $("#wrapper").height() -
                    $("#fruit-basket").height() -
                    $("#player-status").height()
                ) {
                  top =
                    $("#wrapper").height() -
                    $("#fruit-basket").height() -
                    $("#player-status").height();
                }

                player.not_moving_ticks = 0;
                statistics.NEVER_MOVED = false;

                $("#fruit-basket").css({ left, top });
              }
            },
            mouseup() {
              $(this).off("mousemove");
            },
          });
        });

        const container = {
          // 需要生成的实体列表
          entities: [...fruits, ...items],
          // 实体生成冷却时间
          cd: 0,
          // 腐烂水果生成计数
          badCounts: 0,
        };

        // 主定时器
        timer.main = setInterval(() => {
          // 反作弊验证
          antiCheatVerification();
          // 满足结束游戏的条件
          if (player.countdown < 0 || player.health <= 0) gameOver();
          // 玩家未进行移动行为的惩罚
          player.not_moving_ticks++;
          // 500=5秒
          if (player.not_moving_ticks >= 500) {
            // 减少生命值
            player.health--;
            // 当前分数大于0时
            if (statistics.SCORES > 0) {
              // 扣除当前游戏得分的 10%
              statistics.SCORES = statistics.SCORES - statistics.SCORES * 0.1;
              playRandSound({ audio: audio.hit, promise: true });
            }
            player.not_moving_ticks = 0;
          }
          $("#health > i").text(() => {
            if (player.health > 10) player.health = 10;
            return player.health;
          });
          $("#mana > i").text(() => {
            // 魔力值自动恢复
            player.mana > 100 ? (player.mana = 100) : (player.mana += 0.005);
            return calcRepair({ formula: player.mana, fixed: 0 });
          });
          $("#current-scores > i").text(
            calcRepair({ formula: statistics.SCORES })
          );
          $("#countdown > i").text(() => {
            statistics.PLAYTIME += 0.01;
            return timeFormat(Math.ceil((player.countdown -= 0.01)));
          });
          // 操纵所有水果、道具的移动
          $(".fruits, .items").each(function () {
            const left = $(this).prop("xSpeed");
            const top = $(this).prop("ySpeed");

            $(this).animate({ left, top }, 0, "swing", function () {
              const limit = 4;

              // 超出一定距离时删除元素
              if (
                $(this).position().left < -($(this).width() + limit) ||
                $(this).position().top < -($(this).height() + limit) ||
                $(this).position().left > $("#wrapper").width() + limit ||
                $(this).position().top > $("#wrapper").height() + limit
              ) {
                $(this).remove();
              }
            });
          });
          // 玩家与水果之间发生的碰撞
          $.each(fruits, function () {
            const { scores, id } = $(this)[0];

            collideEntity({
              // 对象
              id,
              // 比较对象
              contrast: $("#fruit-basket"),
              // 碰撞后发生的事件
              collided(obj) {
                // 获取该元素是不是一个腐烂水果
                const isBad = obj.hasClass("bad"),
                  // 获取目前的总分数
                  before = statistics.SCORES,
                  // 计算最终的分数结果
                  result =
                    levels.BASE_SCORES +
                    scores +
                    (levels.BASE_SCORES + scores) * levels.BASE_SCORES_MULTIPLE;
                statistics.TOTAL_FRUITS++;
                if (isBad) {
                  // 清空健康水果拾取计数奖励
                  statistics.HEALTHY_FRUIT_COUNTS = 0;
                  // 清空奖励分数序列
                  statistics.REWARD_SCORES_ARRAY.length = 0;
                  // 增加总计拾取的腐烂水果
                  statistics.TOTAL_BAD_FRUITS++;
                  // 增加腐烂水果的拾取计数
                  statistics.BAD_FRUIT_COUNTS++;
                  if (statistics.BAD_FRUIT_COUNTS >= 5) {
                    player.health--;
                    playRandSound({
                      audio: audio.hit,
                      promise: true,
                    });
                    statistics.BAD_FRUIT_COUNTS = 0;
                  }
                  // 当玩家的游戏分数处于负数时，
                  // 每次拾取腐烂水果都将减少1点生命值。
                  if (statistics.SCORES < 0) {
                    player.health--;
                    playRandSound({
                      audio: audio.hit,
                      promise: true,
                    });
                  }
                  statistics.SCORES -= result / 0.35;
                  playRandSound({
                    audio: audio.eat,
                    promise: true,
                  });
                } else {
                  // 增加健康水果的拾取计数
                  statistics.HEALTHY_FRUIT_COUNTS++;
                  if (statistics.HEALTHY_FRUIT_COUNTS >= 10) {
                    if (player.health < 10) {
                      playSound({
                        src: audio.pop,
                      });
                      player.health++;
                    }
                    statistics.HEALTHY_FRUIT_COUNTS = 0;
                  }
                  // 添加拾取的水果的分数到奖励分数序列
                  statistics.REWARD_SCORES_ARRAY.push(result);
                  if (statistics.REWARD_SCORES_ARRAY.length >= 15) {
                    let rewardScores = 0;

                    $.each(
                      statistics.REWARD_SCORES_ARRAY,
                      (index, value) => (rewardScores += value)
                    );
                    // 奖励 15个水果总和的 35%游戏分数
                    statistics.SCORES += rewardScores * 0.35;
                    // 播放特殊的声音
                    playSound({
                      src: audio.burp,
                      promise: true,
                    });
                    statistics.REWARD_SCORES_ARRAY.length = 0;
                  } else {
                    playRandSound({
                      audio: audio.eat,
                      promise: true,
                    });
                  }
                  statistics.SCORES += result;
                }
                // 显示分数细节
                showDetails({
                  id,
                  pos: {
                    x: obj.position().left,
                    y: obj.position().top,
                  },
                  // 获取之前的数值
                  before: before,
                  // 与当前数值进行比较
                  after: statistics.SCORES,
                  // 额外的函数，常用于添加额外样式。
                  extra() {
                    return isBad ? "bad" : "";
                  },
                });
                obj.remove();
              },
            });
          });
          // 玩家与道具之间发生的碰撞
          $.each(items, function (index) {
            const { id } = $(this)[0];
            const { min, max } = items[index].valid;

            collideEntity({
              id,
              contrast: $("#fruit-basket"),
              collided(obj) {
                if (
                  probability(
                    randomNumber({
                      min,
                      max,
                    })
                  )
                ) {
                  items[index].effect(obj);

                  playRandSound({
                    audio: audio.equip_chain,
                    promise: true,
                  });
                } else {
                  playRandSound({
                    audio: audio.eat,
                    promise: true,
                  });
                }
                obj.remove();
              },
            });
          });

          function built() {
            // 创建实体函数
            const summon = () =>
              builtEntity({
                className: type + " " + id,
                x() {
                  if (probability(30)) {
                    // 30% 的概率会生成在顶部
                    return randomNumber({
                      min: 0,
                      max: $("#wrapper").width() - $(this).width(),
                    });
                  } else {
                    return randArrItem([
                      -$(this).width(),
                      $("#wrapper").width(),
                    ])[0];
                  }
                },
                y() {
                  // 判断该元素的X轴是否在游戏区域可见范围内
                  if (
                    $(this).position().left >= 0 &&
                    $(this).position().left < $("#wrapper").width()
                  ) {
                    return -$(this).height();
                  } else {
                    return randomNumber({
                      min: 0,
                      max:
                        $("#wrapper").height() -
                        $(this).height() -
                        $("#player-status").height(),
                    });
                  }
                },
                xSpeed() {
                  const getXSpeed = randomNumber({
                    min:
                      levels.BASE_MOVE_SPEED *
                      speed.min *
                      randomNumber({
                        min: 0.7,
                        max: 1.4,
                        fixed: 2,
                      }),
                    max:
                      levels.BASE_MOVE_SPEED *
                      speed.max *
                      randomNumber({
                        min: 0.7,
                        max: 1.4,
                        fixed: 2,
                      }),
                    fixed: 1,
                  });

                  if ($(this).position().left < 0) {
                    return "+=" + getXSpeed;
                  } else if ($(this).position().left >= $("#wrapper").width()) {
                    return "-=" + getXSpeed;
                  } else if ($(this).position().top < 0) {
                    if (probability(25)) {
                      // 25% 的概率X轴不会偏移
                      return "+=0";
                    } else {
                      return (
                        randArrItem(["+=", "-="])[0] +
                        calcRepair({
                          formula:
                            getXSpeed *
                            randomNumber({
                              min: 0.5,
                              max: 1.75,
                              fixed: 1,
                            }),
                        })
                      );
                    }
                  }
                },
                ySpeed() {
                  const getYSpeed = randomNumber({
                    min: levels.BASE_MOVE_SPEED * speed.min,
                    max: levels.BASE_MOVE_SPEED * speed.max,
                    fixed: 1,
                  });

                  if ($(this).position().top < 0) {
                    return "+=" + getYSpeed;
                  } else {
                    if (probability(25)) {
                      // 25% 的概率Y轴不会偏移
                      return "+=0";
                    } else {
                      return (
                        randArrItem(["+=", "-="])[0] +
                        calcRepair({
                          formula:
                            getYSpeed *
                            randomNumber({
                              min: 0.75,
                              max: 1.25,
                              fixed: 1,
                            }),
                        })
                      );
                    }
                  }
                },
                extra(obj) {
                  // 本次生成的水果是否变成腐烂水果
                  if (obj.hasClass("fruits")) {
                    if (probability(levels.BAD_FRUITS_CHANCE, 2)) {
                      obj.addClass("bad");
                    }
                  }
                },
              });
            // 获取实体
            const { type, id, speed } = randArrItem(container.entities)[0];

            type === "fruits" &&
              probability(levels.HEALTHY_FRUITS_SPAWN_CHANCE) &&
              summon();

            type === "items" &&
              statistics.PLAYTIME > 10 &&
              probability(levels.ITEMS_SPAWN_CHANCE) &&
              summon();
          }
          // 执行实体生成函数
          if (
            ++container.cd >=
            10 - (10 * Math.abs(100 - levels.ENTITY_SPAWN_SPEED + 1)) / 100
          ) {
            built();
            container.cd = 0;
          }
        }, 10);
        // 难度定时器
        timer.difficulty = setTimeout(
          function levelsUp() {
            clearTimeout(timer.difficulty);
            playSound({ src: audio.orb });
            // 淡入淡出效果
            $("#levels").fadeIn(500).delay(3000).fadeOut(500);
            // 等级提升
            $("#levels > p").text(function () {
              return "Lv." + ++levels.DIFFICULTY_LEVELS;
            });
            // 所有升级项目
            const levelsUpList = [
              {
                chance: 29.5,
                title: '<b class="base-scores">基础得分</b>',
                data: levels.BASE_SCORES,
                change() {
                  return (levels.BASE_SCORES += randomNumber({
                    min: 0.01,
                    max: 0.1,
                    fixed: 2,
                  }));
                },
              },
              {
                chance: 26.2,
                title: '<b class="base-multiple">基础得分倍率</b>',
                data: levels.BASE_SCORES_MULTIPLE,
                symbol: levels.BASE_SCORES_MULTIPLE < 1.25 ? "x" : "x (Max)",
                change() {
                  levels.BASE_SCORES_MULTIPLE += randomNumber({
                    min: 0.01,
                    max: 0.02,
                    fixed: 2,
                  });

                  if (levels.BASE_SCORES_MULTIPLE > 1.25) {
                    levels.BASE_SCORES_MULTIPLE = 1.25;
                    return levels.BASE_SCORES_MULTIPLE;
                  }
                  return levels.BASE_SCORES_MULTIPLE;
                },
              },
              {
                chance: 31.3,
                title: '<b class="base-speed">基础移动速度</b>',
                data: levels.BASE_MOVE_SPEED,
                symbol: levels.BASE_MOVE_SPEED < 10.5 ? "" : " (Max)",
                change() {
                  levels.BASE_MOVE_SPEED += randomNumber({
                    min: 0.01,
                    max: 0.1,
                    fixed: 2,
                  });

                  if (levels.BASE_MOVE_SPEED > 10.5) {
                    levels.BASE_MOVE_SPEED = 10.5;
                    return levels.BASE_MOVE_SPEED;
                  }
                  return levels.BASE_MOVE_SPEED;
                },
              },
              {
                chance: 33.3,
                title: '<b class="entity-spawn-speed">实体</b> 生成速度',
                data: levels.ENTITY_SPAWN_SPEED,
                symbol: levels.ENTITY_SPAWN_SPEED < 150 ? "%" : "% (Max)",
                change() {
                  levels.ENTITY_SPAWN_SPEED += randomNumber({
                    min: 0.2,
                    max: 1.4,
                    fixed: 2,
                  });

                  if (levels.ENTITY_SPAWN_SPEED > 150) {
                    levels.ENTITY_SPAWN_SPEED = 150;
                    return levels.ENTITY_SPAWN_SPEED;
                  }
                  return levels.ENTITY_SPAWN_SPEED;
                },
              },
              {
                chance: 36.4,
                title: '<b class="items-des-chance">游戏道具</b> 生成概率',
                data: levels.ITEMS_SPAWN_CHANCE,
                symbol: levels.ITEMS_SPAWN_CHANCE < 28 ? "%" : "% (Max)",
                change() {
                  levels.ITEMS_SPAWN_CHANCE += randomNumber({
                    min: 0.1,
                    max: 1.6,
                    fixed: 2,
                  });

                  if (levels.ITEMS_SPAWN_CHANCE > 28) {
                    levels.ITEMS_SPAWN_CHANCE = 28;
                    return levels.ITEMS_SPAWN_CHANCE;
                  }
                  return levels.ITEMS_SPAWN_CHANCE;
                },
              },
              {
                chance: 37.1,
                title: '<b class="healthy-fruits">新鲜水果</b> 生成概率',
                data: levels.HEALTHY_FRUITS_SPAWN_CHANCE,
                symbol:
                  levels.HEALTHY_FRUITS_SPAWN_CHANCE < 70 ? "%" : "% (Max)",
                change() {
                  levels.HEALTHY_FRUITS_SPAWN_CHANCE += randomNumber({
                    min: 0.1,
                    max: 1.6,
                    fixed: 2,
                  });

                  if (levels.HEALTHY_FRUITS_SPAWN_CHANCE > 70) {
                    levels.HEALTHY_FRUITS_SPAWN_CHANCE = 70;
                    return levels.HEALTHY_FRUITS_SPAWN_CHANCE;
                  }
                  return levels.HEALTHY_FRUITS_SPAWN_CHANCE;
                },
              },
              {
                chance: 39.8,
                title: '<b class="bad-fruits">腐烂水果</b> 生成概率',
                data: levels.BAD_FRUITS_CHANCE,
                symbol: levels.BAD_FRUITS_CHANCE < 50 ? "%" : "% (Max)",
                change() {
                  levels.BAD_FRUITS_CHANCE += randomNumber({
                    min: 1,
                    max: 3.2,
                    fixed: 2,
                  });

                  if (levels.BAD_FRUITS_CHANCE > 50) {
                    levels.BAD_FRUITS_CHANCE = 50;
                    return levels.BAD_FRUITS_CHANCE;
                  }
                  return levels.BAD_FRUITS_CHANCE;
                },
              },
            ];
            // 显示此次升级项目的容器
            const levelContainer = $("#levels > div");
            // 清空上一次的项目
            levelContainer.empty();
            // 格式模板
            const elemTemplate = ({ title, data, symbol, change }) => {
              return `<p>${title}&nbsp;<i class="items-min-valid">${calcRepair({
                formula: data,
              })}${
                symbol || ""
              }</i>&nbsp;to&nbsp;<i class="healthy-fruits">${calcRepair({
                formula: change(),
              })}${symbol || ""}</i></p>`;
            };
            // 过滤掉未达成条件的项目
            const filterList = levelsUpList.filter(({ chance }) =>
              probability(chance, 2)
            );
            // 如果有升级项目的话就套用模板，没有升级项目则会随机获取一条。
            const getUpList = filterList.length && filterList.map(elemTemplate);
            if (getUpList.length) {
              levelContainer.html(getUpList);
            } else {
              levelContainer.html(elemTemplate(randArrItem(levelsUpList)[0]));
            }
            timer.difficulty = setTimeout(
              levelsUp,
              randomNumber({
                min: 5000,
                max: 15000,
              })
            );
          },
          randomNumber({
            min: 5000,
            max: 15000,
          })
        );
      }
    );
  });
});
