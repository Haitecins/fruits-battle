import elements from "@/configs/common/elements";

const { nodes } = elements;
/**
 * 实体超出游戏区域后删除
 * @param entity 实体名
 */
const hasOutArea = (entity: JQuery<HTMLElement>): void => {
  const maxThreshold = 8;
  // 超出一定距离时删除元素
  (entity.position().left < -((entity.width() as number) + maxThreshold) ||
    entity.position().top < -((entity.height() as number) + maxThreshold) ||
    entity.position().left > (nodes.app.width() as number) + maxThreshold ||
    entity.position().top > (nodes.app.height() as number) + maxThreshold) &&
    entity.remove();
};

export default hasOutArea;
