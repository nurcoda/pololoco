class Character extends MovableObject {
  x = 120;
  y = 135;
  width = 150;
  height = 300;
  speed = 10;
  world;
  lastMotion = Date.now();
  offset = {
    top: 120,
    bottom: 12,
    left: 30,
    right: 40
  }


  IMAGES_IDLE = [
    'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png',
    'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-2.png',
    'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-3.png',
    'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-4.png',
    'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-5.png',
    'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-6.png',
    'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-7.png',
    'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-8.png',
    'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-9.png',
    'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-10.png',
  ];

  IMAGES_LONG_IDLE = [
    'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-20.png',
  ]

  IMAGES_WALKING = [
    'img_pollo_locco/img/2_character_pepe/2_walk/W-21.png',
    'img_pollo_locco/img/2_character_pepe/2_walk/W-22.png',
    'img_pollo_locco/img/2_character_pepe/2_walk/W-23.png',
    'img_pollo_locco/img/2_character_pepe/2_walk/W-24.png',
    'img_pollo_locco/img/2_character_pepe/2_walk/W-25.png',
    'img_pollo_locco/img/2_character_pepe/2_walk/W-26.png'
  ];

  IMAGES_JUMPING = [
    'img_pollo_locco/img/2_character_pepe/3_jump/J-31.png',
    'img_pollo_locco/img/2_character_pepe/3_jump/J-32.png',
    'img_pollo_locco/img/2_character_pepe/3_jump/J-33.png',
    'img_pollo_locco/img/2_character_pepe/3_jump/J-34.png',
    'img_pollo_locco/img/2_character_pepe/3_jump/J-35.png',
    'img_pollo_locco/img/2_character_pepe/3_jump/J-36.png',
    'img_pollo_locco/img/2_character_pepe/3_jump/J-37.png',
    'img_pollo_locco/img/2_character_pepe/3_jump/J-38.png',
    'img_pollo_locco/img/2_character_pepe/3_jump/J-39.png'
  ];

  IMAGES_HURT = [
    'img_pollo_locco/img/2_character_pepe/4_hurt/H-41.png',
    'img_pollo_locco/img/2_character_pepe/4_hurt/H-42.png',
    'img_pollo_locco/img/2_character_pepe/4_hurt/H-43.png'
  ];

  IMAGES_DEAD = [
    'img_pollo_locco/img/2_character_pepe/5_dead/D-51.png',
    'img_pollo_locco/img/2_character_pepe/5_dead/D-52.png',
    'img_pollo_locco/img/2_character_pepe/5_dead/D-53.png',
    'img_pollo_locco/img/2_character_pepe/5_dead/D-54.png',
    'img_pollo_locco/img/2_character_pepe/5_dead/D-55.png',
    'img_pollo_locco/img/2_character_pepe/5_dead/D-56.png',
    'img_pollo_locco/img/2_character_pepe/5_dead/D-57.png'
  ];

  /**represents an object constructor for character animations*/
  constructor() {
    super().loadImage('img_pollo_locco/img/2_character_pepe/2_walk/W-21.png');
    this.audioManager = new AudioManager();
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
  }

  /**animates character*/
  animate() {
    setInterval(() => {
      this.audioManager.stopWalkingSound();
      this.characterMoving();
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      this.characterAnimation();
    }, 100);
  }

  /**plays the right character animation based on its current status */
  /** @remarks checkt if the character is dead, hurt, sleeping, jumping, moving */
  characterAnimation() {
    if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
      this.audioManager.playHurtedSound();
    } else if (this.isDead()) {
      this.playAnimation(this.IMAGES_DEAD);
      openLoseScreen();
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
    } else {
      this.idle();
    }
  }

  /**moving animations of character */
  characterMoving() {
    if (this.pushRight()) {
      this.moveCharacterRigth();
    }
    if (this.pushLeft()) {
      this.moveCharacterLeft();
    }
    if (this.pushSpace()) {
      this.jump();
    }
  }

  /** Checks whether the left arrow key on the keyboard is pressed and whether the x-coordinate of the object is smaller than the end of the level on the x-axis*/
  pushLeft() {
    return this.world.keyboard.LEFT && this.x > -600;
  }

  /**character is moving left*/
  moveCharacterLeft() {
    this.moveLeft();
    this.otherDirection = true;
    this.audioManager.playWalkingSound();
    this.lastMotion = Date.now();
  }

  /** Checks whether the right arrow key on the keyboard is pressed and whether the x-coordinate of the object is smaller than the end of the level on the x-axis */
  pushRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }

  /**character is moving right only to 1800px */
  moveCharacterRigth() {
    if (this.x === 1850) {
      this.world.endbossAlert = true;
    }
    this.moveRigth();
    this.otherDirection = false;
    this.audioManager.playWalkingSound();
    this.lastMotion = Date.now();
  }

  /**jump press space */
  pushSpace() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
  }

  /**character jumping*/
  jump() {
    super.jump();
    this.audioManager.playJumpingSound();
    this.lastMotion = Date.now();
  }

  /**character idle */
  idle() {
    if (Date.now() - this.lastMotion >= 10000) {
      this.playAnimation(this.IMAGES_LONG_IDLE);
    } else {
      this.playAnimation(this.IMAGES_IDLE);
    }
  }
}