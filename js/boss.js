$(function() {

	var bossHealth = 500;
	var remHealth = 100;
	var $bossHealthbar = $('.healthbar');


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

	$att1.click(function (event) {
		console.log(thunderbolt.dmg);
		remHealth = remHealth - (thunderbolt.dmg * 100 / bossHealth);
		$bossHealthbar.css('width', remHealth + '%');
	})

	$att2.click(function (event) {
		console.log(hiddenPower.dmg);
	})

	$att3.click(function (event) {
		console.log(thunder.dmg);
	})

	$att4.click(function (event) {
		console.log(thunderShock.dmg);
	})



});