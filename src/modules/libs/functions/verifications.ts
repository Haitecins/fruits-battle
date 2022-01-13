import verify from "@/data/common/verity";

const verifications = (): void => {
  for (let verifyKey in verify) {
    const currentItem = verify[verifyKey];
    if (currentItem.enabled) {
      if (currentItem.check()) {
        currentItem.actions();
      }
    }
  }
};

export default verifications;
