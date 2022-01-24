import elements from "@/configs/common/elements";
import refreshHistory from "@/libs/functions/refreshHistory";

const { nodes } = elements;
!window.localStorage.getItem("app_history")
  ? nodes.readme.historyElement.html('<h1 id="none-saves">暂无游戏记录</h1>')
  : refreshHistory();
