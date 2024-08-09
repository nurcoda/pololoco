/**
 * Represents a small chicken that can move and animate.
 * @extends MovableObject
 */

class Chicken_small extends MovableObject {
  y = 380;
  width = 50;
  height = 50;
  chicken_sound = new Audio('audio/chicken.mp3');
  intervalMove;

  IMAGES_WALKING = [
    'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
  ];

  IMAGES_DEAD = [
    'img_pollo_locco/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
  ];

  /**
     * Creates an instance of Chicken_small.
     * Loads initial image, sets random position and speed, and starts animation.
     */
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 400 + Math.random() * 1200;
    this.speed = 0.3 + Math.random() * 0.9;
    this.animate();
  }

  /**
   * Starts the movement and animation of the chicken.
   */
  animate() {
    this.smallChickenMoving();
    this.smallChickenAnimation();
  }

  /**
 * Moves the chicken to the left continuously.
 * Sets an interval to update the position.
 */
  smallChickenMoving() {
    this.intervalMove = setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }

  /**
 * Animates the chicken based on its state (walking or dead).
 * Checks if the chicken is dead and updates the animation accordingly.
 */
  smallChickenAnimation() {
    let intervalDead = setInterval(() => {
      if (this.isDead()) {
        clearInterval(this.intervalMove);
        this.playAnimation(this.IMAGES_DEAD);
        clearInterval(intervalDead);
      } else {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 160);
  }
}