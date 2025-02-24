import { Scene } from 'phaser';
import { Player } from '../objects/Player';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.TileSprite;
    msg_text : Phaser.GameObjects.Text;
    ground: Phaser.Physics.Arcade.StaticGroup;
    player: Player;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        const worldWidth = this.scale.width * 3;
        this.physics.world.setBounds(0, 0, worldWidth, this.scale.height);

        this.player = new Player(this, worldWidth / 2, 384);

        this.camera = this.cameras.main;
        this.camera.setBackgroundColor('#00ff00');
        this.camera.startFollow(this.player, true, 0.1, 0.1);
        this.camera.setBounds(0, 0, worldWidth, this.scale.height);

        this.background = this.add.tileSprite(0, 0, worldWidth, this.scale.height, 'background')
            .setOrigin(0, 0)
            .setScrollFactor(0);

        this.ground = this.physics.add.staticGroup();
        for (let x = 0; x < worldWidth; x += 48) {
            this.ground.create(x, 744, 'terrain', 2).setOrigin(0, 0.5);
        }

        this.player.setDepth(10);

        this.physics.add.collider(this.player, this.ground);
    }

    update ()
    {
        const playerX = this.player.x;
        const camera = this.camera;
        const screenWidth = this.scale.width;
        const edgeThreshold = 200;

        if (playerX > camera.scrollX + edgeThreshold && playerX < camera.scrollX + screenWidth - edgeThreshold) {
            camera.scrollX = playerX - screenWidth / 2;
        }

        this.player.update();
    }
}
