import $ from "jquery";
import fruits from "@/configs/common/fruits";
import items from "@/configs/common/items";
import statistics from "@/configs/common/statistics";
import levels from "@/configs/common/levels";
import elements from "@/configs/common/elements";
import setChance from "@/libs/functions/setChance";
import Random from "@/libs/classes/Random";
import calcRepair from "@/libs/functions/calcRepair";
import { FruitsObject } from "@/types/configs/common/fruits";
import { ItemsObject } from "@/types/configs/common/items";

const { nodes } = elements;
class Entity {
  public element: JQuery<HTMLElement>;

  public constructor() {
    let getEntityObject = new Random().getItem<FruitsObject | ItemsObject>([
      ...fruits,
      ...items,
    ]);
    if (statistics.SUMMONED_FRUIT_COUNTS >= 5) {
      getEntityObject = new Random().getItem<ItemsObject>([...items]);
      statistics.SUMMONED_FRUIT_COUNTS = 0;
    }
    this.element = $("<i/>");
    // 根据难度等级概率生成实体
    if (
      getEntityObject.type === "fruits" &&
      setChance(levels.HEALTHY_FRUITS_SPAWN_CHANCE)
    ) {
      $(this.element).appendTo(nodes.app);
      // 增加生成的水果的计数
      if (statistics.PLAYTIME > 10) statistics.SUMMONED_FRUIT_COUNTS += 1;
    }
    if (
      getEntityObject.type === "items" &&
      statistics.PLAYTIME > 10 &&
      setChance(levels.ITEMS_SPAWN_CHANCE)
    ) {
      $(this.element).appendTo(nodes.app);
    }
    // 添加实体的类名
    $(this.element).addClass(getEntityObject.type);
    $(this.element).addClass(getEntityObject.id);
    $(this.element).css({ zIndex: getEntityObject.priority });
    // 当实体是新鲜水果(fruits)时，有概率变成腐烂水果(bad)。
    if (
      this.element.hasClass("fruits") &&
      setChance(levels.BAD_FRUITS_CHANCE, 2)
    ) {
      this.element.addClass("bad");
    }
    // 添加实体数据
    $(this.element).prop({ data: getEntityObject });
  }

  static directions(): string {
    const dis = ["+=", "-="];
    return new Random().getItem<string>(dis);
  }

  static random = {
    x(entity: JQuery<HTMLElement>): number {
      return setChance(40)
        ? new Random(
            0,
            (nodes.app.width() as number) - (entity.width() as number)
          ).getNumber()
        : new Random().getItem<number>([
            -(entity.width() as number),
            nodes.app.width() as number,
          ]);
    },
    y(entity: JQuery<HTMLElement>): number {
      return new Random(
        0,
        (nodes.app.height() as number) -
          (entity.height() as number) -
          (nodes.statusbar.element.height() as number)
      ).getNumber();
    },
    speed: {
      x(entity: JQuery<HTMLElement>): string {
        const { data } = entity[0] as unknown as {
          data: FruitsObject | ItemsObject;
        };
        const movingSpeed = new Random(
          levels.BASE_MOVE_SPEED *
            data.speed.min *
            new Random(0.7, 1.4, 2).getNumber(),
          levels.BASE_MOVE_SPEED *
            data.speed.max *
            new Random(0.7, 1.4, 2).getNumber(),
          1
        ).getNumber();

        if (entity.position().left < 0) {
          return `+=${movingSpeed}`;
        }
        if (entity.position().left >= (nodes.app.width() as number)) {
          return `-=${movingSpeed}`;
        }
        if (entity.position().top < 0) {
          if (setChance(25)) {
            // 25% 的概率X轴不会偏移
            return "+=0";
          }
          return `${new Random().getItem<string>(["+=", "-="])}${calcRepair({
            formula: movingSpeed * new Random(0.5, 1.75, 1).getNumber(),
          })}`;
        }
        return "";
      },
      y(entity: JQuery<HTMLElement>): string {
        const { data } = entity[0] as unknown as {
          data: FruitsObject | ItemsObject;
        };
        const movingSpeed = new Random(
          levels.BASE_MOVE_SPEED * data.speed.min,
          levels.BASE_MOVE_SPEED * data.speed.max,
          1
        ).getNumber();

        if (entity.position().top < 0) {
          return `+=${movingSpeed}`;
        }
        if (setChance(25)) {
          // 25% 的概率Y轴不会偏移
          return "+=0";
        }
        return `${new Random().getItem<string>(["+=", "-="])}${calcRepair({
          formula: movingSpeed * new Random(0.75, 1.25, 1).getNumber(),
        })}`;
      },
    },
  };

  public location(x: number, y: number): void {
    this.element.css({ left: x, top: y });
    // 检测位置是否正确
    if (
      this.element.position().left >= 0 &&
      this.element.position().left < (nodes.app.width() as number)
    ) {
      this.element.css({ top: -(this.element.height() as number) });
    } else {
      this.element.css({
        top: new Random(
          0,
          (nodes.app.height() as number) -
            (this.element.height() as number) -
            (nodes.statusbar.element.height() as number)
        ).getNumber(),
      });
    }
  }

  public speed(x: string, y: string): void {
    this.element.prop({ xSpeed: x, ySpeed: y });
  }

  public additionals(handler: (entity: JQuery<HTMLElement>) => void): void {
    handler && handler(this.element);
  }
}

export default Entity;
