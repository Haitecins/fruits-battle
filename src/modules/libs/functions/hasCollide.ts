import elements from "@/configs/common/elements";

const { nodes } = elements;
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
