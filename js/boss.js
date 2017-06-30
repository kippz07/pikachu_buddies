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


	var thunderbolt = {"dmg": 95, "acc": 70, "pp": 15, "flinch": 10};
	var hiddenPower = {"dmg": 60, "acc": 90, "pp": 15, "flinch": 0};
	var thunder = {"dmg": 110, "acc": 60, "pp": 10, "flinch": 10};
	var thunderShock = {"dmg": 40, "acc": 100, "pp": 30, "flinch": 10};
	var hydroPump = {"dmg": 110, "acc": 60, "pp": 5, "flinch": 0};
	var darkPulse = {"dmg": 70, "acc": 85, "pp": 15, "flinch": 10};
	var iceBeam = {"dmg": 90, "acc": 70, "pp": 10, "flinch": 10};
	var dragonPulse = {"dmg": 85, "acc": 80, "pp": 10, "flinch": 0};

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

	$att1.click(function (event) {
		var accuracy = randomNumber(100);
		if (accuracy < thunderbolt.acc){
			remHealth = remHealth - (thunderbolt.dmg * 100 / bossHealth);
			$bossHealthbar.css('width', remHealth + '%');
			playSound(blastoisehit);
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
	})

	$att2.click(function (event) {
		var accuracy = randomNumber(100);
		if (accuracy < hiddenPower.acc) {
			remHealth = remHealth - (hiddenPower.dmg * 100 / bossHealth);
			$bossHealthbar.css('width', remHealth + '%');
			playSound(blastoisehit);
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
	})

	$att3.click(function (event) {
		var accuracy = randomNumber(100);
		if (accuracy < thunder.acc) {
			remHealth = remHealth - (thunder.dmg * 100 / bossHealth);
			$bossHealthbar.css('width', remHealth + '%');
			playSound(blastoisehit);
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
	})

	$att4.click(function (event) {
		var accuracy = randomNumber(100);
		if (accuracy < thunderShock.acc) {
			remHealth = remHealth - (thunderShock.dmg * 100 / bossHealth);
			$bossHealthbar.css('width', remHealth + '%');
			playSound(blastoisehit);
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

	function blastoiseAttack () {
		var number = randomNumber(4);
		var accuracy = randomNumber(100);
		switch (number) {
			case 0:
				if (accuracy < hydroPump.acc) {
					pikaremHealth = pikaremHealth - (hydroPump.dmg * 100 / pikachuHealth);
					$pikachuHealthbar.css('width', pikaremHealth + '%');
					playSound(pikachuhit);
					$pikachu.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
					console.log('attack1');
				} else {
					$missed.show();
						setTimeout(function () {
						$missed.fadeOut(600);
					},300);
					
				}
				break;
				
			case 1:
				if (accuracy < darkPulse.acc) {
					pikaremHealth = pikaremHealth - (darkPulse.dmg * 100 / pikachuHealth);
					$pikachuHealthbar.css('width', pikaremHealth + '%');
					playSound(pikachuhit);
					$pikachu.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
					console.log('attack2');
				} else {
					$missed.show();
						setTimeout(function () {
						$missed.fadeOut(600);
					},300);
				}
				break;
				
			case 2:
				if (accuracy < iceBeam.acc) {
					pikaremHealth = pikaremHealth - (iceBeam.dmg * 100 / pikachuHealth);
					$pikachuHealthbar.css('width', pikaremHealth + '%');
					playSound(pikachuhit);
					$pikachu.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
					console.log('attack3');
				} else {
					$missed.show();
						setTimeout(function () {
						$missed.fadeOut(600);
					},300);
				}
				break;
				
			case 3:
				if (accuracy < dragonPulse) {
					pikaremHealth = pikaremHealth - (dragonPulse.dmg * 100 / pikachuHealth);
					$pikachuHealthbar.css('width', pikaremHealth + '%');
					playSound(pikachuhit);
					$pikachu.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
					console.log('attack4');
				} else {
					$missed.show();
						setTimeout(function () {
						$missed.fadeOut(600);
					},300);
				}
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
				console.log('human won');
				$('#winlose p').html('You won! +30 points');
				$winlose.addClass('win');
				break;
			
			case 'comp':
				console.log('comp won');
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