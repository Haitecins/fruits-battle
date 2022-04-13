const isMobile = !!window.navigator.userAgent.match(
  /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
);
const useDeviceEvents = (
  event:
    | JQuery.TriggeredEvent<HTMLElement, undefined, HTMLElement, HTMLElement>
    | JQuery.TriggeredEvent<Document, undefined, Document, Document>
): {
  clientX: number;
  clientY: number;
} => {
  if (isMobile) {
    // 获取移动端触摸的事件
    return (
      event as unknown as {
        changedTouches: object[];
      }
    ).changedTouches[0] as never;
  }
  // 获取PC端鼠标的事件
  return event as never;
};

export { isMobile, useDeviceEvents };
