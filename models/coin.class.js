class Coin extends CollactableObjects {
  width = 120;
  height = 120;

  IMAGES = [
    'img_pollo_locco/img/8_coin/coin_1.png',
    'img_pollo_locco/img/8_coin/coin_2.png'
  ];


  /**
 * Class representing a coin in the game and Create a coin
 */
  constructor() {
    super().loadImage(this.IMAGES[0]);
    this.loadImages(this.IMAGES);
    this.animate();
    this.x = 250 + Math.random() * 1700;
    this.y = 50 + Math.random() * 310;
  }

  /**
  * Animate the coin.
  * Starts the coin's blinking and bouncing animations
  */
  animate() {
    this.coinBlink();
    this.coinBounce();
  }

  /**
    * Make the coin bounce up and down.
    * The coin moves down by 8 units every 500 milliseconds and moves back up after 100 milliseconds
    */
  coinBounce() {
    setInterval(() => {
      this.y += 8;
      setTimeout(() => {
        this.y -= 8;
      }, 100);
    }, 500);
  }

  /**
  * Make the coin blink.
  * Plays the coin's animation every 250 milliseconds
  */
  coinBlink() {
    setInterval(() => {
      this.playAnimation(this.IMAGES);
    }, 250);
  }

}