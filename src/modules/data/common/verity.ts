import $ from "jquery";

const verify: Verity = {
  // Prevent elements from disappearing (delete elements).
  DELETE_PLAYER_ELEMENT: {
    enabled: true,
    check() {
      return $("#fruit-basket")[0] == null;
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
        width: $("#fruit-basket").width(),
        height: $("#fruit-basket").height(),
      },
    },
    check() {
      return (
        $("#fruit-basket").width() !== parseFloat(this.custom.attrs.width) ||
        $("#fruit-basket").height() !== parseFloat(this.custom.attrs.height)
      );
    },
    actions() {
      $("#fruit-basket").css({
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
        $("#fruit-basket").position().left < 0 ||
        $("#fruit-basket").position().left >
          ($("#app") as any).width() - ($("#fruit-basket") as any).width() ||
        $("#fruit-basket").position().top < 0 ||
        $("#fruit-basket").position().top >
          ($("#app") as any).height() -
            ($("#player-status") as any).height() -
            ($("#fruit-basket") as any).height()
      );
    },
    actions() {
      if ($("#fruit-basket").position().left < 0) {
        $("#fruit-basket").css({ left: 0 });
      }
      if (
        $("#fruit-basket").position().left >
        ($("#app") as any).width() - ($("#fruit-basket") as any).width()
      ) {
        $("#fruit-basket").css({
          left:
            ($("#app") as any).width() - ($("#fruit-basket") as any).width(),
        });
      }
      if ($("#fruit-basket").position().top < 0) {
        $("#fruit-basket").css({ top: 0 });
      }
      if (
        $("#fruit-basket").position().top >
        ($("#app") as any).height() -
          ($("#player-status") as any).height() -
          ($("#fruit-basket") as any).height()
      ) {
        $("#fruit-basket").css({
          top:
            ($("#app") as any).height() -
            ($("#player-status") as any).height() -
            ($("#fruit-basket") as any).height(),
        });
      }
    },
  },
};

export default verify;
