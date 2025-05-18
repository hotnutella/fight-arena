export class Player extends Phaser.Physics.Arcade.Image
{
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    spine: any;

    constructor (scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y, '');

        this.setOrigin(0.5, 0.5);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        if (scene.input.keyboard) {
            this.cursors = scene.input.keyboard.createCursorKeys();
        } else {
            throw new Error('Keyboard input is not available');
        }

        this.setCollideWorldBounds(true);

        this.createAnimations();
        this.spine.animationState.setAnimation(0, 'idle', true);
    }

    createAnimations ()
    {
        this.spine = this.scene.add.spine(this.x, this.y, 'character-json', 'character-atlas');
        this.spine.setScale(0.35);
        this.spine.setDepth(10);
        this.spine.skeleton.updateWorldTransform();

        console.log(this.spine);
        const spineWidth = this.spine.displayWidth;
        const spineHeight = this.spine.displayHeight;

        this.body?.setSize(spineWidth, spineHeight);
        this.body?.setOffset(-spineWidth / 2, -spineHeight * 0.6);
    }

    update() {
        const speed = 800;
        const jumpPower = 4000;
    
        if (this.cursors.left?.isDown) {
            this.setVelocityX(-speed);
            this.spine.scaleX = -0.35;
        } else if (this.cursors.right?.isDown) {
            this.setVelocityX(speed);
            this.spine.scaleX = 0.35;
        } else {
            this.setVelocityX(0);
        }
    
        if (this.cursors.up?.isDown && this.body?.blocked.down) {
            this.setVelocityY(-jumpPower);
        }
    
        this.spine.x = this.x;
        this.spine.y = this.y;
    }
}