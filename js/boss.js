$(function() {

	var $main = $('main');
	var $bossLevel = $('#boss');
	var bossHealth = 500;
	var remHealth = 100;
	var $bossHealthbar = $('#bosshealthbar');
	var pikachuHealth = 500;
	var pikaremHealth = 100;
	var $pikachuHealthbar = $('#pikachuhealthbar');
	var $hideAttacks = $('#hideAttacks');
	var $winlose = $('#winlose');
	$winlose.hide();
	var $okbutton = $('#winlose button');
	var $blastoise = $('#blastoise');
	var $pikachu = $('#pikachuboss');
	var pikachuhit = 'raw/raichu.wav';
	var blastoisehit = 'raw/blastoise.wav';
	var $turn = $('#turn');
	var $missed = $('#missed');
	$missed.hide();
	var count = 0;
	var damage = 0;
	var creature = '';

	var thunderbolt = {"dmg": 95, "acc": 70, "pp": 15, "flinch": 10};
	var hiddenPower = {"dmg": 60, "acc": 90, "pp": 15, "flinch": 0};
	var thunder = {"dmg": 110, "acc": 60, "pp": 10, "flinch": 10};
	var thunderShock = {"dmg": 40, "acc": 100, "pp": 30, "flinch": 10};

	var bossMoves = {
		"blastoise": [{"dmg": 110, "acc": 60, "pp": 5, "flinch": 0}, 
			{"dmg": 70, "acc": 85, "pp": 15, "flinch": 10}, 
			{"dmg": 90, "acc": 70, "pp": 10, "flinch": 10},
			{"dmg": 85, "acc": 80, "pp": 10, "flinch": 0},
			"raw/blastoise.wav"],
		"charizard": [{"dmg": 120, "acc": 55, "pp": 5, "flinch": 0}, 
			{"dmg": 100, "acc": 60, "pp": 10, "flinch": 0}, 
			{"dmg": 85, "acc": 80, "pp": 10, "flinch": 0},
			{"dmg": 40, "acc": 100, "pp": 25, "flinch": 0},
			"raw/charizard.wav"],
		"venusaur": [{"dmg": 55, "acc": 95, "pp": 25, "flinch": 0}, 
			{"dmg": 85, "acc": 90, "pp": 15, "flinch": 0}, 
			{"dmg": 150, "acc": 70, "pp": 10, "flinch": 0},
			{"dmg": 80, "acc": 80, "pp": 10, "flinch": 0},
			"raw/venusaur.wav"]
	}

	var $att1 = $('#attack1');
	var $att2 = $('#attack2');
	var $att3 = $('#attack3');
	var $att4 = $('#attack4');

	$('#pp1').html(thunderbolt.acc + '%');
	$('#pp2').html(hiddenPower.acc + '%');
	$('#pp3').html(thunder.acc + '%');
	$('#pp4').html(thunderShock.acc + '%');
	$('#dmg1').html(thunderbolt.dmg);
	$('#dmg2').html(hiddenPower.dmg);
	$('#dmg3').html(thunder.dmg);
	$('#dmg4').html(thunderShock.dmg);

	function setAttacks () {
		if ($blastoise.hasClass('blastoise')) {
			return bossMoves.blastoise;
		} else if ($blastoise.hasClass('charizard')) {
			return bossMoves.charizard;
		} else if ($blastoise.hasClass('venusaur')) {
			return bossMoves.venusaur;
		}
	}

	function setBossAudio () {
		if ($blastoise.hasClass('blastoise')) {
			return bossMoves.blastoise[4];
		} else if ($blastoise.hasClass('charizard')) {
			return bossMoves.charizard[4];
		} else if ($blastoise.hasClass('venusaur')) {
			return bossMoves.venusaur[4];
		}
	}

	function playerAttack (attack, accuracy) {
		if (accuracy < attack.acc){
			remHealth = remHealth - (attack.dmg * 100 / bossHealth);
			$bossHealthbar.css('width', remHealth + '%');
			playSound(setAttacks()[4]);
			$blastoise.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
		} else {
			$missed.show();
				setTimeout(function () {
				$missed.fadeOut(600);
			},300);
		}
		if (remHealth <= 0) {
			endLevel('human');
		} else {
			count++;
			play();
		}
	}

	$att1.click(function (event) {
		var accuracy = randomNumber(100);
		playerAttack(thunderbolt, accuracy);
	})

	$att2.click(function (event) {
		var accuracy = randomNumber(100);
		playerAttack(hiddenPower, accuracy);
	})

	$att3.click(function (event) {
		var accuracy = randomNumber(100);
		playerAttack(thunder, accuracy);	
	})

	$att4.click(function (event) {
		var accuracy = randomNumber(100);
		playerAttack(thunderShock, accuracy);
	})

	$okbutton.click(function () {
		resetLevel();
	})


	play();

	function play () {
		if (count % 2 === 0) {
			setTimeout(function() {
				$turn.html('Your turn!');
				$hideAttacks.hide();
			},1000);
			
		} else {
			$hideAttacks.show();
			setTimeout(function() {
				$turn.html('Opponent\'s turn');
				setTimeout(function () {
				blastoiseAttack();
				},1000);
			},1000);
		}
	}

	function bossAttack (attack, accuracy) {
		if (accuracy < attack.acc) {
			pikaremHealth = pikaremHealth - (attack.dmg * 100 / pikachuHealth);
			$pikachuHealthbar.css('width', pikaremHealth + '%');
			playSound(pikachuhit);
			$pikachu.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
		} else {
			$missed.show();
			setTimeout(function () {
				$missed.fadeOut(600);
			},300);
		}
	}

	function blastoiseAttack () {
		var number = randomNumber(4);
		var accuracy = randomNumber(100);
		switch (number) {
			case 0:
				bossAttack(setAttacks()[0], accuracy);
				break;
				
			case 1:
				bossAttack(setAttacks()[1], accuracy);
				break;
				
			case 2:
				bossAttack(setAttacks()[2], accuracy);
				break;
				
			case 3:
				bossAttack(setAttacks()[3], accuracy);
				break;	
		}
		if (pikaremHealth <= 0) {
			endLevel('comp');
		} else {
			count++;
			play();
		}
	}

	function playSound(path) {
        var audioElement = document.createElement('audio');
  		audioElement.setAttribute('src', path);
  		audioElement.currentTime = 0;
  		audioElement.play();
    }

	function endLevel (player) {
		$winlose.fadeIn('slow');
		$hideAttacks.hide();
		switch (player) {
			case 'human':
				$('#winlose p').html('You won! +30 points');
				$winlose.addClass('win');
				break;
			
			case 'comp':
				$('#winlose p').html('Pikachu fainted!');
				$winlose.addClass('lose');
				break;
		}
	}

	function resetLevel () {
		count = 0;
		$pikachuHealthbar.css('width', '100%');
		$bossHealthbar.css('width', '100%');
		$winlose.hide();
		remHealth = 100;
		pikaremHealth = 100;
	}

	function randomNumber (number) {
		var min = Math.ceil(0);
		var max = Math.floor(number);
		var num = Math.floor(Math.random() * (max - min)) + min;
		return num;
	}

});