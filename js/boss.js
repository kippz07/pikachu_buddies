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
	var pp = 0;
	var count = 0;


	var thunderbolt = {"dmg": 95, "acc": 100, "pp": 15, "flinch": 10};
	var hiddenPower = {"dmg": 60, "acc": 100, "pp": 15, "flinch": 0};
	var thunder = {"dmg": 110, "acc": 70, "pp": 10, "flinch": 10};
	var thunderShock = {"dmg": 40, "acc": 100, "pp": 30, "flinch": 10};
	var hydroPump = {"dmg": 110, "acc": 80, "pp": 5, "flinch": 0};
	var darkPulse = {"dmg": 80, "acc": 100, "pp": 15, "flinch": 10};
	var iceBeam = {"dmg": 90, "acc": 100, "pp": 10, "flinch": 10};
	var dragonPulse = {"dmg": 85, "acc": 100, "pp": 10, "flinch": 0};

	var $att1 = $('#attack1');
	var $att2 = $('#attack2');
	var $att3 = $('#attack3');
	var $att4 = $('#attack4');

	var $pp1 = $('#pp1');
	var $pp2 = $('#pp2');
	var $pp3 = $('#pp3');
	var $pp4 = $('#pp4');

	$pp1.html(thunderbolt.pp);
	$pp2.html(hiddenPower.pp);
	$pp3.html(thunder.pp);
	$pp4.html(thunderShock.pp);

	$att1.click(function (event) {
		pp = thunderbolt.pp;
		if (pp > 0) {
			remHealth = remHealth - (thunderbolt.dmg * 100 / bossHealth);
			$bossHealthbar.css('width', remHealth + '%');
			pp--;
			$pp1.html(pp);
		}
		if (remHealth <= 0) {
			endLevel('human');
		} else {
			count++;
			play();
		}
	})

	$att2.click(function (event) {
		pp = hiddenPower.pp;
		if (pp > 0) {
			remHealth = remHealth - (hiddenPower.dmg * 100 / bossHealth);
			$bossHealthbar.css('width', remHealth + '%');
			pp--;
			$pp2.html(pp);
		}
		if (remHealth <= 0) {
			endLevel('human');
		} else {
			count++;
			play();
		}
	})

	$att3.click(function (event) {
		pp = thunder.pp;
		if (pp > 0){
			remHealth = remHealth - (thunder.dmg * 100 / bossHealth);
			$bossHealthbar.css('width', remHealth + '%');
			pp--;
			$pp3.html(pp);
		}
		if (remHealth <= 0) {
			endLevel('human');
		} else {
			count++;
			play();
		}	
	})

	$att4.click(function (event) {
		pp = thunderShock.pp;
		if (pp > 0) {
			remHealth = remHealth - (thunderShock.dmg * 100 / bossHealth);
			$bossHealthbar.css('width', remHealth + '%');
			pp--;
			$pp4.html(pp);
		}
		
		if (remHealth <= 0) {
			endLevel('human');
		} else {
			count++;
			play();
		}
	})

	play();

	function play () {
		if (count % 2 === 0) {
			$hideAttacks.hide();

		} else {
			$hideAttacks.show();
			setTimeout(function () {
				blastoiseAttack();
			},1000);
		}
	}

	function blastoiseAttack () {
		var number = randomNumber(4);
		switch (number) {
			case 0:
				pp = hydroPump.pp;
				if (pp > 0) {
					pikaremHealth = pikaremHealth - (hydroPump.dmg * 100 / pikachuHealth);
					$pikachuHealthbar.css('width', pikaremHealth + '%');
					pp--;
				}
				break;
				
			case 1:
				pp = darkPulse.pp;
				if (pp > 0) {
					pikaremHealth = pikaremHealth - (darkPulse.dmg * 100 / pikachuHealth);
					$pikachuHealthbar.css('width', pikaremHealth + '%');
					pp--;
				}
				break;
				
			case 2:
				pp = iceBeam.pp;
				if (pp > 0) {
					pikaremHealth = pikaremHealth - (iceBeam.dmg * 100 / pikachuHealth);
					$pikachuHealthbar.css('width', pikaremHealth + '%');
					pp--;
				}
				break;
				
			case 3:
				pp = dragonPulse.pp;
				if (pp > 0) {
					pikaremHealth = pikaremHealth - (dragonPulse.dmg * 100 / pikachuHealth);
					$pikachuHealthbar.css('width', pikaremHealth + '%');
					pp--;
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

	function endLevel (player) {
		$winlose.fadeIn('slow');
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

	function randomNumber (number) {
		var min = Math.ceil(0);
		var max = Math.floor(number);
		var num = Math.floor(Math.random() * (max - min)) + min;
		return num;
	}

});