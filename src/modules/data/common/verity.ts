import $ from "jquery";
import elements from "./elements";

const { nodes } = elements;
const verify: Verity = {
  // Prevent elements from disappearing (delete elements).
  DELETE_PLAYER_ELEMENT: {
    enabled: true,
    check() {
      return nodes.player[0] == null;
    },
    actions() {
      $(location).attr("href", "about:blank");
    },
  },
  // Players modify CSS property parameters.
  PLAYER_EDIT_ARGUMENTS: {
    enabled: true,
    custom: {
      attrs: {
        width: nodes.player.width(),
        height: nodes.player.height(),
      },
    },
    check() {
      return (
        nodes.player.width() !== parseFloat(this.custom.attrs.width) ||
        nodes.player.height() !== parseFloat(this.custom.attrs.height)
      );
    },
    actions() {
      nodes.player.css({
        width: this.custom.attrs.width,
        height: this.custom.attrs.height,
      });
    },
  },
  // Prevent leaving the game area.
  LEAVING_THE_GAME_AREA: {
    enabled: true,
    check() {
      return (
        nodes.player.position().left < 0 ||
        nodes.player.position().left >
          (nodes.app as any).width() - (nodes.player as any).width() ||
        nodes.player.position().top < 0 ||
        nodes.player.position().top >
          (nodes.app as any).height() -
            (nodes.statusbar.element as any).height() -
            (nodes.player as any).height()
      );
    },
    actions() {
      if (nodes.player.position().left < 0) {
        nodes.player.css({ left: 0 });
      }
      if (
        nodes.player.position().left >
        (nodes.app as any).width() - (nodes.player as any).width()
      ) {
        nodes.player.css({
          left: (nodes.app as any).width() - (nodes.player as any).width(),
        });
      }
      if (nodes.player.position().top < 0) {
        nodes.player.css({ top: 0 });
      }
      if (
        nodes.player.position().top >
        (nodes.app as any).height() -
          (nodes.statusbar.element as any).height() -
          (nodes.player as any).height()
      ) {
        nodes.player.css({
          top:
            (nodes.app as any).height() -
            (nodes.statusbar.element as any).height() -
            (nodes.player as any).height(),
        });
      }
    },
  },
};

export default verify;
