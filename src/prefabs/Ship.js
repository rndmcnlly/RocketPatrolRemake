class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.pointValue = pointValue;
    }

    update() {
        this.x -= 3;
        if(this.x < 0 - this.width) {
            this.x = game.config.width;
        }
    }
}

