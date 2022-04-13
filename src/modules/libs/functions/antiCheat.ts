import cheatList from "@/modules/config/common/cheatList";

const antiCheat = (): void => {
  Object.keys(cheatList).forEach((key) => {
    const currentItem = cheatList[key];
    if (currentItem.enabled) {
      if (currentItem.check()) {
        currentItem.actions();
      }
    }
  });
};

export default antiCheat;
