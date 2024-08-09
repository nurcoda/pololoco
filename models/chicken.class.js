/**
 * Class representing a Chicken, an enemy in the game.
 * @extends MovableObject
 */

class Chicken extends MovableObject {
  y = 365;
  width = 70;
  height = 70;
  chicken_sound = new Audio('audio/chicken_sounds.mp3');
  intervalMove;

  IMAGES_WALKING = [
    'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
  ];

  IMAGES_DEAD = [
    'img_pollo_locco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
  ];

  /**
    * Creates an instance of Chicken.
    * Initializes the chicken with random position and speed.
    */
  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 1100 + Math.random() * 1100;
    this.speed = 0.4 + Math.random() * 1;
    this.animate();
  }

  /**
  * Starts the animation for the chicken.
  * Calls functions to handle movement and animation.
  */
  animate() {
    this.chickenMoving();
    this.chickenAnimation();
  }

  /**
  * Moves the chicken to the left continuously.
  * Sets up an interval to move the chicken at a consistent frame rate.
  */
  chickenMoving() {
    this.intervalMove = setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }

  /**
 * Handles the chicken animation.
 * Switches between walking and dead animations based on the chicken's state.
 */
  chickenAnimation() {
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