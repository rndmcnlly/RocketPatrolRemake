class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('starfield', 'assets/starfield.png');
        this.load.image('rocket', 'assets/rocket.png');
        this.load.image('ship', 'assets/ship.png');
    }

    create() {

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


        this.starfield = this.add.tileSprite(
            0,0,640,480, 'starfield'
        ).setOrigin(0,0);

        this.p1Rocket = new Rocket(this, game.config.width/2,431,'rocket').setOrigin(0.5, 0);
        this.p1Rocket.reset();

        this.shipA = new Ship(this, 300,300,'ship');
        this.shipB = new Ship(this, 400,150,'ship');
        this.shipC = new Ship(this, 100,200,'ship');


        // green UI background
        this.add.rectangle(
            0,
            borderUISize + borderPadding,
            game.config.width,
            borderUISize * 2,
            0x00FF00,
            ).setOrigin(0,0);

        // white borders
	    this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
	    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);

        
    }

    update() {
        this.starfield.tilePositionX -= 4;
        const movementSpeed = 4;
        if(keyLEFT.isDown) {
            this.p1Rocket.x -= movementSpeed;
        }
        if(keyRIGHT.isDown) {
            this.p1Rocket.x += movementSpeed;
        }

        if(Phaser.Input.Keyboard.JustDown(keyF)) {
            this.p1Rocket.firing = true;
        }

        this.shipA.update();
        this.shipB.update();
        this.shipC.update();

        this.p1Rocket.update();
    }
}