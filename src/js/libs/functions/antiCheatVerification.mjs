import { verify } from "../../data/index.mjs";

function antiCheatVerification() {
  for (let verifyKey in verify) {
    const currentItem = verify[verifyKey];

    if (currentItem.enabled) {
      if (currentItem.check()) {
        currentItem.actions();
      }
    }
  }
}

export default antiCheatVerification;
