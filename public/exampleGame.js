var pacman = {

	direction: 0,

	init: function() {
		game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: pacman.preload, create: pacman.create, update: pacman.update });
	},

	preload: function() {

		game.load.image('phaser', 'assets/sprites/phaser-dude.png');

	},

	create: function() {

		game.stage.backgroundColor = '#736357';

		sprite = game.add.sprite(300, 300, 'phaser');

	},

	update: function() {

		if (pacman.direction == 1)
		{
			sprite.y--;
		}
		else if (pacman.direction == 3)
		{
			sprite.y++;
		}

		if (pacman.direction == 4)
		{
			sprite.x--;
		}
		else if (pacman.direction == 2)
		{
			sprite.x++;
		}

	},

	changeDirection: function (move) {
        pacman.direction = move;
    }
}