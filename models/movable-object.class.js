class MovableObject extends DrawableObject {
  speed = 0.15;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  otherDirection = false;
  applyGravityInterval;
  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }

  /**Apply simple gravaty to the game with acceleration */
  applyGravity() {
    this.applyGravityInterval = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
      if (this.y > 130 && this instanceof Character) {
        this.y = 130;
      }
    }, 1000 / 25);
  }

  /**checkt if an object is above the ground */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 130;
    }
  }

  /**Checks if the object is above the ground level. */
  /**@returns {boolean} True if the object is above the ground, false otherwise. */
  isColliding(mo) {
    return this.x + this.width - this.offset.right >= mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom >= mo.y + mo.offset.top &&
      this.x + this.offset.left <= mo.x + mo.height - mo.offset.right &&
      this.y + this.offset.top <= mo.y + mo.width - mo.offset.bottom;
  }

  /**this function plays an animation using an array of images it calculates the index i based on the current image and the total number of images
then, it retrieves the image path from the images array finally, it updates the this.img property with the cached image and increments the currentImage counter*/
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**This function moves an object to the right it increases the x coordinate by the specified speed*/
  moveRigth() {
    this.x += this.speed;
  }

  /**This function moves an object to the left it increases the x coordinate by the specified speed*/
  moveLeft() {
    this.x -= this.speed;
  }

  /**This function makes an object jump it sets the vertical speed (speedY) to 25*/
  jump() {
    this.speedY = 25;
  }

  /**This function makes an object perform a “chicken jump” it sets the vertical speed (speedY) to 20*/
  jumpOfChicken() {
    this.speedY = 20;
  }

  /**Checks when the object was hitted and delete energy*/
  hit() {
    let currentTime = new Date().getTime();
    if (currentTime - this.lastHit > 500) {
      this.energy -= 30;
      if (this.energy < 0) {
        this.energy = 0;
      } else {
        this.lastHit = currentTime;
      }
      this.x -= 30;
    }
  }

  /**Decreases the endboss energy when hit by an end boss*/
  hitByEndboss() {
    this.energy -= 100;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }


  /**Decreases the endboss energy when hitting an end boss*/
  hitEndboss() {
    this.energy -= 30;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }


  /**Decreases the character's energy when hitting an endboss*/
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.7;
  }

  /**make the energy to 0*/
  killTheEnemy() {
    this.energy = 0;
  }

  /**This function checks whether an object is dead based on its energy level  it returns true if the energy is equal to 0, indicating that the object has no energy left
  otherwise, it returns false*/
  isDead() {
    return this.energy == 0;
  }
}