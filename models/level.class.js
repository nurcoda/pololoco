class Level {
  enemies;
  endboss;
  clouds;
  backgroundObjects;
  coins;
  bottles;
  level_end_x = 2205;

  /**@param Constructs a new Level object with the specified arrays of enemies and small chickens, clouds, background objects, coins, bottles, endboss, */
  /**@param {Enemy} enemies -array of enemy */
  /**@param {Cloud} clouds -array of cloud */
  /**@param {Coin} coin -array of coin  */
  /**@param {Bottle} bottle -array of bottle */
  /**@param {BackgroundObject} backgroundObjects - array of backgroundelements */
  /** @param {Endboss} endboss -array of endboss */

  constructor(enemies, endboss, coins, bottles, clouds, backgroundObjects) {
    this.enemies = enemies;
    this.endboss = endboss;
    this.coins = coins;
    this.bottles = bottles;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}