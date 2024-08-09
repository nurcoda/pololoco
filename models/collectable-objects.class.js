class CollactableObjects extends MovableObject {
  y = 355;

  /*
   * Create a collectible object
   * Initializes the object with a random horizontal position
   * The horizontal position of the collectible object
   * A random value between 400 and 1900
   */
  constructor() {
    super();
    this.x = 400 + Math.random() * 1500;
  }
}