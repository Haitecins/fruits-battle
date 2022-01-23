import $ from "jquery";
import Entity from "@/libs/classes/Entity";
import audio from "@/configs/common/audio";
import levels from "@/configs/common/levels";
import player from "@/configs/common/player";
import statistics from "@/configs/common/statistics";
import levelsUpList from "@/configs/events/levelsUpList";
import timer from "@/configs/common/timer";
import elements from "@/configs/common/elements";
import verifications from "@/libs/functions/verifications";
import calcRepair from "@/libs/functions/calcRepair";
import ended from "@/libs/functions/ended";
import playRandSound from "@/libs/functions/playRandSound";
import playSound from "@/libs/functions/playSound";
import setChance from "@/libs/functions/setChance";
import refreshStatus from "@/libs/functions/refreshStatus";
import showDetails from "@/libs/functions/showDetails";
import Random from "@/libs/classes/Random";

const { nodes, entities } = elements;
const launcher = (): void => {
  nodes.player.on({
    mousedown(e) {
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
    },
  });
  // 主定时器
  timer.main = setInterval(() => {
    // 反作弊验证
    verifications();
    // 玩家未进行移动行为的惩罚
    if (++player.not_moving_ticks >= 500) {
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
    // 实体处理程序
    entities.includes().each(function () {
      // 实体的移动
      $(this).animate(
        {
          left: $(this).prop("xSpeed"),
          top: $(this).prop("ySpeed"),
        },
        0,
        "swing",
        function () {
          // 超出游戏区域的阈值
          const maxDis = 8;
          // 超出一定距离时删除元素
          ($(this).position().left < -(($(this) as any).width() + maxDis) ||
            $(this).position().top < -(($(this) as any).height() + maxDis) ||
            $(this).position().left > (nodes.app as any).width() + maxDis ||
            $(this).position().top > (nodes.app as any).height() + maxDis) &&
            $(this).remove();
        }
      );
      // 碰撞事件
      if (
        !(
          nodes.player.position().top + (nodes.player as any).height() <
            $(this).position().top ||
          nodes.player.position().left >
            $(this).position().left + ($(this) as any).width() ||
          nodes.player.position().top >
            $(this).position().top + ($(this) as any).height() ||
          nodes.player.position().left + (nodes.player as any).width() <
            $(this).position().left
        )
      ) {
        const data: FruitsObject & ItemsObject = (this as any).data;
        if (data.type === "fruits") {
          // 获取该元素是不是一个腐烂水果
          const isBadFruit = $(this).hasClass("bad");
          // 获取目前的总分数
          const before = statistics.SCORES;
          // 计算最终的分数结果
          const result =
            levels.BASE_SCORES +
            data.scores +
            (levels.BASE_SCORES + data.scores) * levels.BASE_SCORES_MULTIPLE;
          // 受道具CAKE影响的分数结果
          const cakeItemResult = result * statistics.CAKE_ITEM_INFLUENCE_VALUE;
          statistics.TOTAL_FRUITS++;
          if (isBadFruit) {
            // 清空健康水果拾取计数奖励
            statistics.HEALTHY_FRUIT_COUNTS = 0;
            // 清空奖励分数序列
            statistics.REWARD_SCORES_ARRAY.length = 0;
            // 增加总计拾取的腐烂水果
            statistics.TOTAL_BAD_FRUITS++;
            // 增加腐烂水果的拾取计数
            if (++statistics.BAD_FRUIT_COUNTS >= 5) {
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
            if (++statistics.HEALTHY_FRUIT_COUNTS >= 10) {
              ++player.health < 10 && playSound({ src: audio.pop });
              statistics.HEALTHY_FRUIT_COUNTS = 0;
            }
            // 添加拾取的水果的分数到奖励分数序列
            statistics.REWARD_SCORES_ARRAY.push(cakeItemResult);
            if (statistics.REWARD_SCORES_ARRAY.length >= 15) {
              const totals = statistics.REWARD_SCORES_ARRAY.reduce(
                (previousValue, currentValue) => previousValue + currentValue,
                0
              );
              // 奖励 15个水果总和的 35%游戏分数
              statistics.SCORES += totals * 0.35;
              // 清空数组
              statistics.REWARD_SCORES_ARRAY.length = 0;
              // 播放特殊的声音
              playSound({
                src: audio.burp,
                promise: true,
              });
            } else {
              playRandSound({
                audio: audio.eat,
                promise: true,
              });
            }
            statistics.SCORES += cakeItemResult;
          }
          // 显示分数细节
          showDetails({
            id: data.id,
            pos: {
              x: $(this).position().left,
              y: $(this).position().top,
            },
            // 获取之前的数值
            before: before,
            // 与当前数值进行比较
            after: statistics.SCORES,
            // 额外的函数，常用于添加额外样式。
            extra() {
              return isBadFruit ? "bad" : "";
            },
          });
        }
        if (data.type === "items") {
          if (
            setChance(new Random(data.valid.min, data.valid.max).getNumber())
          ) {
            // 执行道具的效果函数
            data.effect($(this));
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
        }
        // 删除元素
        $(this).remove();
      }
    });
    // 满足结束游戏的条件
    if (player.countdown < 0 || player.health <= 0) ended();
    // 实体生成
    if (
      ++statistics.SUMMON_CD >=
      8 - (10 * Math.abs(100 - levels.ENTITY_SPAWN_SPEED + 1)) / 100
    ) {
      const entity = new Entity();
      const { element } = entity;
      entity.location(Entity.random.x(element), Entity.random.y(element));
      entity.speed(
        Entity.random.speed.x(element),
        Entity.random.speed.y(element)
      );
      statistics.SUMMON_CD = 0;
    }
  }, 10);
  // 难度定时器
  const levelsUp = (): void => {
    clearTimeout(timer.difficulty as number);
    playSound({ src: audio.orb });
    // 淡入淡出效果
    nodes.levels.element.fadeIn(500).delay(4000).fadeOut(500);
    // 等级提升
    nodes.levels.value.text(() => "Lv." + ++levels.DIFFICULTY_LEVELS);
    // 清空上一次的项目
    nodes.levels.container.empty();
    const levelsUpItems = ({
      title,
      data,
      suffixes,
      change,
    }: LevelsUpListObject) => {
      return `<p>${title}&nbsp;<i class="items-min-valid">${calcRepair({
        formula: data() as number,
      })}${
        (suffixes && suffixes()) || ""
      }</i>&nbsp;to&nbsp;<i class="healthy-fruits">${calcRepair({
        formula: change(),
      })}${(suffixes && suffixes()) || ""}</i></p>`;
    };
    // 过滤掉未达成条件的项目
    const filterList = levelsUpList.filter(({ chance }) =>
      setChance(chance, 2)
    );
    // 如果有升级项目的话就套用模板，没有升级项目则会随机获取一条。
    const getUpList = filterList.length && filterList.map(levelsUpItems);
    if ((getUpList as string[]).length) {
      nodes.levels.container.html(getUpList as never);
    } else {
      nodes.levels.container.html(
        levelsUpItems(new Random().getItem<LevelsUpListObject>(levelsUpList))
      );
    }
    timer.difficulty = setTimeout(
      levelsUp,
      new Random(5000, 14000).getNumber()
    );
  };
  timer.difficulty = setTimeout(levelsUp, new Random(5000, 14000).getNumber());
};

export default launcher;
