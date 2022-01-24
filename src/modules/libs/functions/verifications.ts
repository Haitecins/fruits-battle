import verify from "@/configs/common/verity";

const verifications = (): void => {
  Object.keys(verify).forEach((key) => {
    const currentItem = verify[key];
    if (currentItem.enabled) {
      if (currentItem.check()) {
        currentItem.actions();
      }
    }
  });
};

export default verifications;
