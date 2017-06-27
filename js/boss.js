$(function() {

	var bossHealth = 500;
	var remHealth = 100;
	var $bossHealthbar = $('.healthbar');
	var pp = 0;


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
		remHealth = remHealth - (thunderbolt.dmg * 100 / bossHealth);
		$bossHealthbar.css('width', remHealth + '%');
		pp--;
		$pp1.html(pp);
	})

	$att2.click(function (event) {
		pp = hiddenPower.pp;
		remHealth = remHealth - (hiddenPower.dmg * 100 / bossHealth);
		$bossHealthbar.css('width', remHealth + '%');
		pp--;
		$pp2.html(pp);
	})

	$att3.click(function (event) {
		pp = thunder.pp;
		remHealth = remHealth - (thunder.dmg * 100 / bossHealth);
		$bossHealthbar.css('width', remHealth + '%');
		pp--;
		$pp3.html(pp);
	})

	$att4.click(function (event) {
		pp = thunderShock.pp;
		remHealth = remHealth - (thunderShock.dmg * 100 / bossHealth);
		$bossHealthbar.css('width', remHealth + '%');
		pp--;
		$pp4.html(pp);
	})

	function randomNumber (number) {
		var min = Math.ceil(0);
		var max = Math.floor(number);
		var num = Math.floor(Math.random() * (max - min)) + min;
		return num;
	}

});