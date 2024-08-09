/**
 * Class representing the game world.
 */
class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  lastThrowTime = 0;
  intervalIds = [];
  throwableObjects = [];
  coins = [];
  bottles = [];
  hitBottles = new Set();
  statusbar = new Statusbar();
  statusbarCoins = new StatusbarCoins();
  statusbarBottles = new StatusbarBottles();
  statusbarEndboss = new StatusbarEndboss();
  statusbarEndbossAdded = false;
  endbossAlert = false;

  /**
   * Creates an instance of World.
   * @param {HTMLCanvasElement} canvas - The canvas element used for rendering.
   * @param {Keyboard} keyboard - The keyboard input handler.
   */

  constructor(canvas, keyboard) {
    this.audioManager = new AudioManager();
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Draws all game elements on the canvas.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);

    this.addToMap(this.statusbar);
    this.addToMap(this.statusbarCoins);
    this.addToMap(this.statusbarBottles);
    if (this.character.x >= 500) {
      this.addToMap(this.statusbarEndboss);
    };
    this.ctx.translate(this.camera_x, 0);


    this.ctx.translate(-this.camera_x, 0);

    self = this;
    requestAnimationFrame(() => {
      self.draw();
    });
  }

  /**sets game as the world for the character */
  setWorld() {
    this.character.world = this;
    this.character.applyGravity();
    this.character.animate();
  }

  /**runs a loop to check for collisions, throwable objects,character life status */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkCollisionsByEndboss();
      this.checkThrowObjects();
      this.checkCollisionsCoins();
      this.checkCollisionsBottles();
      this.checkBottleCollisionWithAllEnemies();
      this.jumpOnEnemy();
    }, 50);
  }

  /**checkt Character colliding with normal enemy, endboss, bottles, coins */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
        this.character.hit();
        this.statusbar.setPercentage(this.character.energy);
      }
    });
  }

  checkCollisionsByEndboss() {
    this.level.endboss.forEach((endboss) => {
      if (this.character.isColliding(endboss)) {
        this.character.hitByEndboss();
        this.statusbar.setPercentage(this.character.energy);
      }
    });
  }

  checkCollisionsCoins() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.collectCoins(coin, index);
        this.statusbarCoins.setPercentage(this.statusbarCoins.percentage + 12.5);
      }
    });
  }

  checkCollisionsBottles() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.collectBottles(bottle, index);
        this.statusbarBottles.setPercentage(this.statusbarBottles.percentage + 14.3);
      }
    });
  }

  /**checks throw objects */
  checkThrowObjects() {
    const now = Date.now();
    if (this.keyboard.THROW && this.bottles.length > 0 && now - this.lastThrowTime >= 800) {
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
      this.audioManager.playThrowingSound();
      this.throwableObjects.push(bottle);
      this.bottles.pop();
      this.statusbarBottles.setPercentage(this.statusbarBottles.percentage - 10);
      this.lastThrowTime = now;
    }
  }

  /**checkt bottle colliding with all enemy */
  checkBottleCollisionWithAllEnemies() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      this.checkBottleCollisionWithEnemies(bottle, bottleIndex);
      this.checkBottleCollisionWithEndBoss(bottle, bottleIndex);
    });
  }

  /**checkt bottle colliding with enemy */
  checkBottleCollisionWithEnemies(bottle, bottleIndex) {
    this.level.enemies.forEach((enemy, enemyIndex) => {
      if (bottle.isColliding(enemy)) {
        this.audioManager.playKillSound();
        enemy.killTheEnemy();
        this.deleteEnemy(enemyIndex);
        this.deleteBottle(bottleIndex);
      }
    });
  }

  /**checkt bottle colliding with endboss */
  checkBottleCollisionWithEndBoss(bottle, bottleIndex) {
    this.level.endboss.forEach((endboss, endbossIndex) => {
      if (bottle.isColliding(endboss) && !this.hitBottles.has(bottle)) {
        endboss.hitEndboss();
        this.statusbarEndboss.setPercentage(endboss.energy);
        this.hitBottles.add(bottle);
        this.deleteBottle(bottleIndex);
      }
    });
  }

  /**checkt character jumped on an enemy kills the enemy and delete */
  jumpOnEnemy() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.speedY < 0) {
        this.audioManager.playKillSound();
        this.character.jumpOfChicken();
        enemy.killTheEnemy();
        this.deleteEnemy(index);
      }
    });
  }

  /**added objects to the canva */
  addObjectsToMap(objects) {
    objects.forEach(o => {
      this.addToMap(o);
    });
  }

  addToMap(movableObject) {
    if (movableObject.otherDirection) {
      this.flipImage(movableObject);
    }
    movableObject.draw(this.ctx);
    //movableObject.drawFrame(this.ctx);
    // movableObject.drawRedFrame(this.ctx);
    if (movableObject.otherDirection) {
      this.flipImageBack(movableObject);
    }
  }

  /**flip images */
  flipImage(movableObject) {
    this.ctx.save();
    this.ctx.translate(movableObject.width, 0);
    this.ctx.scale(-1, 1);
    movableObject.x = movableObject.x * -1;
  }

  /**flip images back */
  flipImageBack(movableObject) {
    movableObject.x = movableObject.x * -1;
    this.ctx.restore();
  }

  /**coins in to array*/
  collectCoins(coin, index) {
    this.audioManager.playCoinSound();
    this.coins.push(coin);
    this.level.coins.splice(index, 1);
  }

  /**bottle in to array */
  collectBottles(bottle, index) {
    this.audioManager.playBottleSound();
    this.bottles.push(bottle);
    this.level.bottles.splice(index, 1);
  }

  /**slete enemy from array */
  deleteEnemy(index) {
    setTimeout(() => {
      level1.enemies.splice(index, 1);
    }, 400);
  }

  /**delete bottle from array */
  deleteBottle(index) {
    setTimeout(() => {
      this.throwableObjects.splice(index, 1);
    }, 100);
  }
}