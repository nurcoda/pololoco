class Cloud extends MovableObject {
  width = 250;
  height = 150;


  /**
  * Creates an instance of Cloud.
  * Initializes the cloud's image, random position, and starts the animation.
  */
  constructor() {
    super().loadImage('img_pollo_locco/img/5_background/layers/4_clouds/1.png');
    this.x = Math.random() * 2400;
    this.animate();
    this.y = 10 + Math.random() * 30;
  }

  /**
  * Animates the cloud by moving it to the left at a consistent speed.
  * Uses setInterval to move the cloud left every 1/60th of a second.
  */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  };
}