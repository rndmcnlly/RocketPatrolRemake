class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        this.movementSpeed = 2;
        this.firingSpeed = 4;
        this.isFiring = false;
    }

    update() {
        
        if(Phaser.Input.Keyboard.JustDown(keyF)) {
            this.isFiring = true;
        }

        if(this.isFiring) {

            this.y -= this.firingSpeed;
            if(this.y < 108) {
                this.isFiring = false;
                this.y = game.config.height - borderUISize - borderPadding
            }

        } else {

            if(keyLEFT.isDown) {
                this.x -= this.movementSpeed;
            }
            if(keyRIGHT.isDown) {
                this.x += this.movementSpeed;
            }

            this.x = Phaser.Math.Clamp(this.x, borderUISize+borderPadding, game.config.width - borderUISize - borderPadding);
        }
    }
}