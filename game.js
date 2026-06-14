// game.js - Corrected Input and Logic
const CONFIG = {
    width: 960, height: 540, groundY: 460,
    playerSpeed: 300, kickPower: 500, specialPower: 850,
    staminaRegen: 20
};

class SoccerScene extends Phaser.Scene {
    constructor() { super('SoccerScene'); }

    preload() {
        this.load.image('background', 'assets/street_cage_bg.png');
        this.load.image('ball', 'assets/ball_pixel.png');
        this.load.spritesheet('striker', 'assets/striker_sheet.png', {
            frameWidth: 140, frameHeight: 153
        });
    }

    create() {
        this.add.image(CONFIG.width/2, CONFIG.height/2, 'background').setDisplaySize(CONFIG.width, CONFIG.height);
        
        // Setup Players
        this.player1 = this.physics.add.sprite(200, CONFIG.groundY, 'striker').setScale(0.8).setCollideWorldBounds(true);
        this.player2 = this.physics.add.sprite(CONFIG.width - 200, CONFIG.groundY, 'striker').setScale(0.8).setCollideWorldBounds(true).setTint(0xff8888);
        this.player2.setFlipX(true);

        this.player1.canAct = true; this.player1.stamina = 100;
        this.player2.canAct = true; this.player2.stamina = 100;

        this.ball = this.physics.add.sprite(CONFIG.width/2, 300, 'ball').setCollideWorldBounds(true).setBounce(0.7).setDrag(100, 0);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

        this.physics.add.collider(this.player1, this.ball);
        this.physics.add.collider(this.player2, this.ball);
        this.physics.add.collider(this.player1, this.player2);
    }

    update() {
        // --- P1 CONTROLS ---
        if (this.player1.canAct) {
            let velX = 0;
            if (this.cursors.left.isDown) { velX = -CONFIG.playerSpeed; this.player1.setFlipX(true); }
            else if (this.cursors.right.isDown) { velX = CONFIG.playerSpeed; this.player1.setFlipX(false); }
            this.player1.setVelocityX(velX);

            if (Phaser.Input.Keyboard.JustDown(this.keyZ)) this.doKick(this.player1, false);
            if (Phaser.Input.Keyboard.JustDown(this.keyX) && this.player1.stamina >= 50) this.doKick(this.player1, true);
        }

        // --- SIMPLE AI ---
        this.simpleAI();
    }

    simpleAI() {
        if (!this.player2.canAct) return;
        const dir = this.ball.x < this.player2.x ? -1 : 1;
        this.player2.setVelocityX(dir * CONFIG.playerSpeed * 0.7);
        this.player2.setFlipX(dir < 0);
        if (Phaser.Math.Distance.Between(this.player2.x, this.player2.y, this.ball.x, this.ball.y) < 70) {
            this.doKick(this.player2, false);
        }
    }

    doKick(player, isSpecial) {
        player.canAct = false;
        player.setVelocityX(0);
        player.play(isSpecial ? 'p1_special' : 'p1_kick', true);

        this.time.delayedCall(200, () => {
            const dir = player.flipX ? -1 : 1;
            const force = isSpecial ? CONFIG.specialPower : CONFIG.kickPower;
            this.ball.setVelocity(force * dir, -200);
            if(isSpecial) player.stamina -= 50;
        });

        this.time.delayedCall(500, () => player.canAct = true);
    }
}
