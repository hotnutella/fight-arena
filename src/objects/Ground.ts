export class Ground extends Phaser.Physics.Arcade.StaticGroup
{
    constructor (scene: Phaser.Scene, worldWidth: number)
    {
        super(scene.physics.world, scene);

        for (let x = 0; x < worldWidth; x += 48) {
            this.create(x, 744, 'terrain', 2).setOrigin(0, 0.5);
        }
    }
}