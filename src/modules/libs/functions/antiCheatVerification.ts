import verify from "@/data/common/verity";

const antiCheatVerification = () => {
  for (let verifyKey in verify) {
    const currentItem = verify[verifyKey];
    if (currentItem.enabled) {
      if (currentItem.check()) {
        currentItem.actions();
      }
    }
  }
};

export default antiCheatVerification;
