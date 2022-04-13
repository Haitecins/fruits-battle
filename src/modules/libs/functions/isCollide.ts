import elements from "@/modules/config/common/elements";

const { nodes } = elements;
/**
 * 检测是否与玩家发生碰撞
 * @param compare 与玩家节点进行比较的对象
 * @returns 是否发生碰撞
 */
const isCollide = (compare: JQuery<HTMLElement>): boolean => {
  return !(
    nodes.player.position().top + (nodes.player.height() as number) <
      compare.position().top ||
    nodes.player.position().left >
      compare.position().left + (compare.width() as number) ||
    nodes.player.position().top >
      compare.position().top + (compare.height() as number) ||
    nodes.player.position().left + (nodes.player.width() as number) <
      compare.position().left
  );
};

export default isCollide;
