function collideEntity({ id, contrast, collided } = {}) {
  const getContrast = contrast;

  $(`.${id}`).each(function () {
    if (
      !(
        getContrast.position().top + getContrast.height() <
          $(this).position().top ||
        getContrast.position().left >
          $(this).position().left + $(this).width() ||
        getContrast.position().top >
          $(this).position().top + $(this).height() ||
        getContrast.position().left + getContrast.width() <
          $(this).position().left
      )
    ) {
      if (collided) collided($(this));
    }
  });
}

export default collideEntity;
