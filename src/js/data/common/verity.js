const verify = {
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
        parseFloat($("#fruit-basket").width()) !==
          parseFloat(this.custom.attrs.width) ||
        parseFloat($("#fruit-basket").height()) !==
          parseFloat(this.custom.attrs.height)
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
          $("#wrapper").width() - $("#fruit-basket").width() ||
        $("#fruit-basket").position().top < 0 ||
        $("#fruit-basket").position().top >
          $("#wrapper").height() -
            $("#player-status").height() -
            $("#fruit-basket").height()
      );
    },
    actions() {
      if ($("#fruit-basket").position().left < 0) {
        $("#fruit-basket").css({ left: 0 });
      }
      if (
        $("#fruit-basket").position().left >
        $("#wrapper").width() - $("#fruit-basket").width()
      ) {
        $("#fruit-basket").css({
          left: $("#wrapper").width() - $("#fruit-basket").width(),
        });
      }
      if ($("#fruit-basket").position().top < 0) {
        $("#fruit-basket").css({ top: 0 });
      }
      if (
        $("#fruit-basket").position().top >
        $("#wrapper").height() -
          $("#player-status").height() -
          $("#fruit-basket").height()
      ) {
        $("#fruit-basket").css({
          top:
            $("#wrapper").height() -
            $("#player-status").height() -
            $("#fruit-basket").height(),
        });
      }
    },
  },
};

export default verify;
