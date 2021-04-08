class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('starfield', 'assets/starfield.png');
        this.load.image('rocket', 'assets/rocket.png');
        this.load.image('spaceship', 'assets/spaceship.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {

        this.p1Score = 0;

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        this.starfield = this.add.tileSprite(
            0,0,640,480, 'starfield'
        ).setOrigin(0,0);

        this.p1Rocket = new Rocket(
            this,
            game.config.width / 2,
            game.config.height - borderUISize - borderPadding,
            'rocket'
        );

        this.ship1 = new Ship(this, 100, 120, 'spaceship', 0, 1).setOrigin(0,0);
        this.ship2 = new Ship(this, 200, 200, 'spaceship', 0, 1).setOrigin(0,0);
        this.ship3 = new Ship(this, 300, 240, 'spaceship', 0, 1).setOrigin(0,0);


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

        // score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 100
          };

        this.scoreLeft = this.add.text(borderUISize+borderPadding, borderUISize+borderPadding*2, this.p1Score, scoreConfig);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        this.starfield.tilePositionX -= 4;
        this.p1Rocket.update();
        this.ship1.update();
        this.ship2.update();
        this.ship3.update();

        let r = this.p1Rocket;
        for(let s of [this.ship1, this.ship2, this.ship3]) {
            if(r.x < s.x + s.width &&
               r.x + r.width > s.x &&
               r.y < s.y + s.height &&
               r.y + r.height > s.y) {
                   r.reset();
                   this.destroyShip(s);
               }
        }
    }

    destroyShip(ship) {
        ship.alpha = 0;
        let boom = this.add.sprite(ship.x, ship.y, 'explosion');
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        this.p1Score += ship.pointValue;
        this.scoreLeft.setText(this.p1Score);
    }
}