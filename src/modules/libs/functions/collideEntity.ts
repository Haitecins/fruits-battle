import $ from "jquery";

function collideEntity({ id, contrast, collided } = {}) {
  $(`.${id}`).each(function () {
    if (
      !(
        contrast.position().top + contrast.height() < $(this).position().top ||
        contrast.position().left > $(this).position().left + $(this).width() ||
        contrast.position().top > $(this).position().top + $(this).height() ||
        contrast.position().left + contrast.width() < $(this).position().left
      )
    ) {
      if (collided) collided($(this));
    }
  });
}

export default collideEntity;
