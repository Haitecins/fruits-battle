import { uid } from "./data/index.js";
import "./pages/app.js";
import "./pages/gameplay.js";
import "./pages/wrapper.js";

// Output account information to the console.
console.warn(
  "\nAccount ID:\n%c" +
    uid +
    "\n\n%c(Not unique, the user ID will be updated every time the page is refreshed.)\n\n" +
    "%c" +
    new Date() +
    "\n",
  "color: orangered",
  "color: gray",
  "color: fuchsia"
);

// Output game information.
console.info(
  "\n%cFruit Wars" +
    "\n%cv2.0-alpha\n" +
    "%cMD5: b8e2bccb9b7301a31b1a00819be642d2\n",
  "color:hotpink",
  "color:green",
  "color:black"
);
