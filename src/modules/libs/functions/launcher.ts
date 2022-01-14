import $ from "jquery";
import audio from "@/data/common/audio";
import fruits from "@/data/common/fruits";
import items from "@/data/common/items";
import levels from "@/data/common/levels";
import player from "@/data/common/player";
import statistics from "@/data/common/statistics";
import timer from "@/data/common/timer";
import elements from "@/data/common/elements";
import verifications from "./verifications";
import builtEntity from "./builtEntity";
import calcRepair from "./calcRepair";
import collideEntity from "./collideEntity";
import ended from "./ended";
import playRandSound from "./playRandSound";
import playSound from "./playSound";
import probability from "./probability";
import randArrItem from "./randArrItem";
import randomNumber from "./randomNumber";
import refreshStatus from "./refreshStatus";
import showDetails from "./showDetails";

const { nodes, entities } = elements;
const launcher = (): void => {
  nodes.player.on("mousedown", function (e) {
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
          if (
            left >
            (nodes.app as any).width() - (nodes.player as any).width()
          ) {
            left = (nodes.app as any).width() - (nodes.player as any).width();
          }
          if (
            top >
            (nodes.app as any).height() -
              (nodes.player as any).height() -
              (nodes.statusbar.element as any).height()
          ) {
            top =
              (nodes.app as any).height() -
              (nodes.player as any).height() -
              (nodes.statusbar.element as any).height();
          }

          player.not_moving_ticks = 0;
          statistics.NEVER_MOVED = false;

          nodes.player.css({ left, top });
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
    verifications();
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
    // 刷新状态栏
    refreshStatus();
    // 操纵所有水果、道具的移动
    entities.includes().each(function () {
      const left = $(this).prop("xSpeed");
      const top = $(this).prop("ySpeed");

      $(this).animate({ left, top }, 0, "swing", function () {
        const limit = 4;

        // 超出一定距离时删除元素
        if (
          $(this).position().left < -(($(this) as any).width() + limit) ||
          $(this).position().top < -(($(this) as any).height() + limit) ||
          $(this).position().left > (nodes.app as any).width() + limit ||
          $(this).position().top > (nodes.app as any).height() + limit
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
        contrast: nodes.player,
        // 碰撞后发生的事件
        collided(entity) {
          // 获取该元素是不是一个腐烂水果
          const isBad = entity.hasClass("bad");
          // 获取目前的总分数
          const before = statistics.SCORES;
          // 计算最终的分数结果
          const result =
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

              statistics.REWARD_SCORES_ARRAY.forEach((value) => {
                rewardScores += value;
              });
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
              x: entity.position().left,
              y: entity.position().top,
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
          entity.remove();
        },
      });
    });
    // 玩家与道具之间发生的碰撞
    $.each(items, function (index) {
      const { id } = $(this)[0];
      const { min, max } = items[index].valid;

      collideEntity({
        id,
        contrast: nodes.player,
        collided(entity) {
          if (
            probability(
              randomNumber({
                min,
                max,
              })
            )
          ) {
            items[index].effect(entity);

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
          entity.remove();
        },
      });
    });
    // 满足结束游戏的条件
    if (player.countdown < 0 || player.health <= 0) ended();

    const built = (callback: () => void) => {
      // 创建实体函数
      const summon = () =>
        builtEntity({
          className: type + " " + id,
          x() {
            if (probability(30)) {
              // 30% 的概率会生成在顶部
              return randomNumber({
                min: 0,
                max: (nodes.app as any).width() - ($(this) as any).width(),
              });
            } else {
              return randArrItem([
                -($(this) as any).width(),
                nodes.app.width(),
              ])[0];
            }
          },
          y() {
            // 判断该元素的X轴是否在游戏区域可见范围内
            if (
              $(this).position().left >= 0 &&
              $(this).position().left < (nodes.app as any).width()
            ) {
              return -($(this) as any).height();
            } else {
              return randomNumber({
                min: 0,
                max:
                  (nodes.app as any).height() -
                  ($(this) as any).height() -
                  (nodes.statusbar.element as any).height(),
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
            } else if ($(this).position().left >= (nodes.app as any).width()) {
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
          extra(element) {
            // 本次生成的水果是否变成腐烂水果
            if (element.hasClass("fruits")) {
              if (probability(levels.BAD_FRUITS_CHANCE, 2)) {
                element.addClass("bad");
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
      callback && callback();
    };
    // 执行实体生成函数
    ++container.cd >=
      9 - (10 * Math.abs(100 - levels.ENTITY_SPAWN_SPEED + 1)) / 100 &&
      built(() => (container.cd = 0));
  }, 10);
  // 难度定时器
  const levelsUp = (): void => {
    clearTimeout(timer.difficulty as number);
    playSound({ src: audio.orb });
    // 淡入淡出效果
    nodes.levels.element.fadeIn(500).delay(3000).fadeOut(500);
    // 等级提升
    nodes.levels.value.text(function () {
      return "Lv." + ++levels.DIFFICULTY_LEVELS;
    });
    // 所有升级项目
    const levelsUpList: LevelsUpListProps = [
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
        symbol: levels.HEALTHY_FRUITS_SPAWN_CHANCE < 70 ? "%" : "% (Max)",
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
    // 清空上一次的项目
    nodes.levels.container.empty();
    // 格式模板
    const elemTemplate = ({
      title,
      data,
      symbol,
      change,
    }: LevelsUpListObject) => {
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
    if ((getUpList as string[]).length) {
      nodes.levels.container.html(getUpList as never);
    } else {
      nodes.levels.container.html(elemTemplate(randArrItem(levelsUpList)[0]));
    }
    timer.difficulty = setTimeout(
      levelsUp,
      randomNumber({
        min: 5000,
        max: 14000,
      })
    );
  };
  timer.difficulty = setTimeout(
    levelsUp,
    randomNumber({
      min: 5000,
      max: 14000,
    })
  );
};

export default launcher;
