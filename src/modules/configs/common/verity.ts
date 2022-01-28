import jQuery from "jquery";
import elements from "@/configs/common/elements";
import VerityProps from "@/types/configs/common/verity";

const { nodes } = elements;
const verify: VerityProps = {
  // Prevent elements from disappearing (delete elements).
  DELETE_PLAYER_ELEMENT: {
    enabled: true,
    check() {
      return jQuery("#fruit-basket")[0] == null;
    },
    actions() {
      jQuery(window.location).attr("href", "about:blank");
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
      type ThisCustomProps = { attrs: { width: number; height: number } };
      return (
        nodes.player.width() !== (this.custom as ThisCustomProps).attrs.width ||
        nodes.player.height() !== (this.custom as ThisCustomProps).attrs.height
      );
    },
    actions() {
      type ThisCustomProps = { attrs: { width: number; height: number } };
      nodes.player.css({
        width: (this.custom as ThisCustomProps).attrs.width,
        height: (this.custom as ThisCustomProps).attrs.height,
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
          (nodes.app.width() as number) - (nodes.player.width() as number) ||
        nodes.player.position().top < 0 ||
        nodes.player.position().top >
          (nodes.app.height() as number) -
            (nodes.statusbar.element.height() as number) -
            (nodes.player.height() as number)
      );
    },
    actions() {
      if (nodes.player.position().left < 0) {
        nodes.player.css({ left: 0 });
      }
      if (
        nodes.player.position().left >
        (nodes.app.width() as number) - (nodes.player.width() as number)
      ) {
        nodes.player.css({
          left:
            (nodes.app.width() as number) - (nodes.player.width() as number),
        });
      }
      if (nodes.player.position().top < 0) {
        nodes.player.css({ top: 0 });
      }
      if (
        nodes.player.position().top >
        (nodes.app.height() as number) -
          (nodes.statusbar.element.height() as number) -
          (nodes.player.height() as number)
      ) {
        nodes.player.css({
          top:
            (nodes.app.height() as number) -
            (nodes.statusbar.element.height() as number) -
            (nodes.player.height() as number),
        });
      }
    },
  },
};

export default verify;
