export class Player extends Phaser.Physics.Arcade.Sprite
{
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor (scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y, 'cat');

        this.setOrigin(0.5, 0.5);
        this.scale = 2;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        if (scene.input.keyboard) {
            this.cursors = scene.input.keyboard.createCursorKeys();
        } else {
            throw new Error('Keyboard input is not available');
        }

        this.setCollideWorldBounds(true);

        this.createAnimations();
        this.play('idle');
    }

    createAnimations ()
    {
        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers('cat', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
    }

    update() {
        const speed = 800;
        const jumpPower = 4000;

        if (this.cursors.left?.isDown) {
            this.setVelocityX(-speed);
            this.setFlipX(false);
        } else if (this.cursors.right?.isDown) {
            this.setVelocityX(speed);
            this.setFlipX(true);
        } else {
            this.setVelocityX(0);
        }

        if (this.cursors.up?.isDown && this.body?.blocked.down) {
            this.setVelocityY(-jumpPower);
        }
    }
}