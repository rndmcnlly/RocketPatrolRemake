class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.movementSpeed = 2;
    }

    update() {
        if(keyLEFT.isDown) {
            this.x -= this.movementSpeed;
        }
        if(keyRIGHT.isDown) {
            this.x += this.movementSpeed;
        }
        this.x = Phaser.Math.Clamp(this.x, borderUISize+borderPadding, game.config.width - borderUISize - borderPadding);
    }
}