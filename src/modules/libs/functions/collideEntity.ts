import $ from "jquery";

function collideEntity({ id, contrast, collided }: CollideEntity) {
  $(`.${id}`).each(function () {
    if (
      !(
        contrast.position().top + (contrast as any).height() <
          $(this).position().top ||
        contrast.position().left >
          $(this).position().left + ($(this) as any).width() ||
        contrast.position().top >
          $(this).position().top + ($(this) as any).height() ||
        contrast.position().left + (contrast as any).width() <
          $(this).position().left
      )
    ) {
      if (collided) collided($(this));
    }
  });
}

export default collideEntity;
