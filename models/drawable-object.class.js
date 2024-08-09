class DrawableObject {
  x = 120;
  y = 280;
  width = 100;
  height = 150;
  img;
  imageCache = {};
  currentImage = 0;

  /**load images*/
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
 * Preloads images from an array of file paths.
 * @param {string[]} array - An array of image file paths.*/
  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**draw on canva */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}