import { Scene } from 'phaser';
import { Player } from '../objects/Player';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    msg_text : Phaser.GameObjects.Text;
    ground: Phaser.Physics.Arcade.StaticGroup;
    player: Player;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        this.ground = this.physics.add.staticGroup();
        for (let x = 0; x < this.scale.width; x += 48) {
            this.ground.create(x, 744, 'terrain', 2);
        }

        this.player = new Player(this, 512, 384);

        this.physics.add.collider(this.player, this.ground);

        this.input.once('pointerdown', () => {
            this.scene.start('GameOver');
        });
    }

    update ()
    {
        this.player.update();
    }
}
